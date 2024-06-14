import { CusButton, CusModal } from '../components';
import { AddOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductForm } from '../forms';

import { db } from '../../firebase-config';
import { ref, set } from 'firebase/database';
import {
	getStorage,
	ref as storeRef,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
const AddProducts = () => {
	const [openProduct, setOpenProduct] = useState(false);
	const [opt, setOpt] = useState([]);

	const SUPPORTED_FORMATS = [
		'image/jpg',
		'image/jpeg',
		'image/gif',
		'image/png',
	];

	const form = useFormik({
		initialValues: {
			code: '',
			name: '',
			image: '',
			category: '',
			options: opt,
			stocks: '',
			cost: '',
			price: '',
			discount: '',
		},
		enableReinitialize: false,
		validationSchema: Yup.object({
			code: Yup.string().required('Product code is required.'),
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
			const storage = getStorage();
			const metadata = {
				contentType: 'image/jpeg',
			};
			const imagesRef = storeRef(storage, `products/${value.code}`);
			const uploadTask = uploadBytesResumable(
				imagesRef,
				value.image,
				metadata
			);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							set(ref(db, 'products/' + value.code), {
								name: value.name,
								image: downloadURL,
								category: value.category,
								options: value.options,
								stocks: value.stocks,
								cost: value.cost,
								price: value.price,
								discount: value.discount,
							})
								.then(() => {
									console.log('Product saved successfully.');
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

			setOpenProduct(false);
			actions.resetForm();
			setOpt([]);
		},
	});

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
				setOpt={setOpt}
				content={
					<ProductForm
						form={form}
						setOpt={setOpt}
						opt={opt}
					/>
				}
			/>
		</>
	);
};

export default AddProducts;
