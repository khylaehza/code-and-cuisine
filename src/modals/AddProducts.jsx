import { CusButton, CusModal } from '../components';
import { AddOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductForm } from '../forms';

import { db, storage } from '../../firebase-config';
import { ref, set } from 'firebase/database';
import {
	ref as storeRef,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

import { useData } from '../DataContext';
const AddProducts = ({ setVariant, setMessage, setOpenToast }) => {
	const [openProduct, setOpenProduct] = useState(false);
	const [opt, setOpt] = useState([]);
	const [img, setImg] = useState();
	const [fileName, setFileName] = useState();

	const SUPPORTED_FORMATS = [
		'image/jpg',
		'image/jpeg',
		'image/gif',
		'image/png',
	];

	const form = useFormik({
		initialValues: {
			name: '',
			image: '',
			category: img,
			options: opt,
			stocks: '',
			cost: '',
			price: '',
			discount: '',
		},
		enableReinitialize: false,
		validationSchema: Yup.object({
			name: Yup.string().required('Product name is required.'),
			category: Yup.string().required('Category is required.'),
			stocks: Yup.number().required('Stocks is required.'),
			cost: Yup.number().required('Cost is required.'),
			price: Yup.number().required('Price is required.'),
			image: Yup.mixed().test(
				'fileFormat',
				'Image format must be jpg/jpeg/gif/png only.',
				(value) => value && SUPPORTED_FORMATS.includes(value.type)
			),
		}),
		onSubmit: (value, actions) => {
			const metadata = {
				contentType: 'image/jpeg',
			};
			const imagesRef = storeRef(storage, `products/${value.name}`);
			const uploadTask = uploadBytesResumable(
				imagesRef,
				value.image,
				metadata
			);

			try {
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) *
							100;
					},
					(error) => {
						console.log(error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(
							(downloadURL) => {
								set(ref(db, 'products/' + value.name), {
									name: value.name,
									image: downloadURL,
									category: value.category,
									options: value.options,
									stocks: value.stocks,
									cost: Number(value.cost).toFixed(2),
									price: Number(value.price).toFixed(2),
									discount: value.discount
										? Number(value.discount).toFixed(2)
										: Number('0.00').toFixed(2),
								})
									.then(() => {
										console.log(
											'Product saved successfully.'
										);
										setVariant('success');
										setMessage(
											'Product added successfully.'
										);
										setOpenToast(true);
									})
									.catch((error) => {
										console.error(
											'Error saving product:',
											error
										);
									});
							}
						);
					}
				);
			} catch (error) {
				setVariant('error');
				setMessage(error);
				setOpenToast(true);
			}

			setOpenProduct(false);
			actions.resetForm();
			setOpt([]);
			setImg();
			setFileName();
		},
	});

	const handleClose = () => {
		setOpenProduct(false);
		form.resetForm();
		setOpt([]);
		setImg();
		setFileName();
	};
	return (
		<>
			<CusButton
				variant={'primary'}
				label={'Add Product'}
				icon={<AddOutlined />}
				action={() => setOpenProduct(true)}
			/>
			<CusModal
				setOpen={setOpenProduct}
				open={openProduct}
				label={'Add Product'}
				form={form}
				handleClose={handleClose}
				content={
					<ProductForm
						form={form}
						setOpt={setOpt}
						opt={opt}
						setImg={setImg}
						fileName={fileName}
						setFileName={setFileName}
					/>
				}
			/>
		</>
	);
};

export default AddProducts;
