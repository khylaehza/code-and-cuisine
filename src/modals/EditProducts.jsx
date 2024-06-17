import { CusModal } from '../components';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductForm } from '../forms';

import { db, storage } from '../../firebase-config';
import { ref, update } from 'firebase/database';
import {
	ref as storeRef,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

import { useData } from '../DataContext';
const EditProducts = ({
	setOpenEdit,
	openEdit,
	setVariant,
	setMessage,
	setOpenToast,
}) => {
	const { curRow } = useData();
	const [opt, setOpt] = useState([]);
	const [img, setImg] = useState();
	const [fileName, setFileName] = useState('');

	useEffect(() => {
		if (curRow && curRow.options) {
			setOpt(curRow.options);
			setFileName(curRow.image);
		}
	}, [curRow]);

	const SUPPORTED_FORMATS = [
		'image/jpg',
		'image/jpeg',
		'image/gif',
		'image/png',
	];

	const form = useFormik({
		initialValues: curRow,
		enableReinitialize: true,
		image: Yup.mixed().test(
			'fileFormat',
			'Image format must be jpg/jpeg/gif/png only.',
			(value) => value && SUPPORTED_FORMATS.includes(value.type)
		),
		onSubmit: (value, actions) => {
			const productRef = ref(db, `products/${curRow.id}`);

			if (fileName != curRow.image) {
				const metadata = {
					contentType: 'image/jpeg',
				};
				const imagesRef = storeRef(storage, `products/${curRow.id}`);
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
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
								100;
						},
						(error) => {
							console.log(error);
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(
								(downloadURL) => {
									update(productRef, {
										name: value.name,
										category: value.category,
										options: value.options,
										stocks: value.stocks,
										cost: value.cost,
										price: value.price,
										discount: value.discount,
										image: downloadURL,
									})
										.then(() => {
											console.log(
												'Product saved successfully.'
											);
											setVariant('success');
											setMessage(
												'Product edited successfully.'
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
					console.log(error);
					setVariant('error');
					setMessage(error);
					setOpenToast(true);
				}
			} else {
				update(productRef, {
					name: value.name,
					category: value.category,
					options: value.options,
					stocks: value.stocks,
					cost: value.cost,
					price: value.price,
					discount: value.discount,
				})
					.then(() => {
						console.log('Data updated successfully');
						setVariant('success');
						setMessage('Product edited successfully.');
						setOpenToast(true);
					})
					.catch((error) => {
						console.error('Error updating data:', error);
					});
			}

			setOpenEdit(false);
			actions.resetForm();
		},
	});

	const handleClose = () => {
		setOpenEdit(false);
		setOpt(curRow.options);
		setFileName(curRow.image);
		form.resetForm();
	};

	return (
		<>
			<CusModal
				setOpen={setOpenEdit}
				open={openEdit}
				label={'Edit Product'}
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

export default EditProducts;
