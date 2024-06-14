import { CusButton, CusModal } from '../components';
import { AddOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductForm } from '../forms';
const AddProducts = () => {
	const [openProduct, setOpenProduct] = useState(false);
	const [opt, setOpt] = useState([]);

	console.log(opt);
	const form = useFormik({
		initialValues: {
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
			// name: Yup.string().required('Product name is required.'),
			// category: Yup.string().required('Category is required.'),
			// stocks: Yup.number().required('Stocks is required.'),
			// cost: Yup.number().required('Cost is required.'),
			// price: Yup.number().required('Price is required.'),
			// image: Yup.mixed().test(
			// 	'fileFormat',
			// 	'Image format must be jpg/jpeg/gif/png only.',
			// 	(value) => value && SUPPORTED_FORMATS.includes(value.type)
			// ),
		}),
		onSubmit: (value, actions) => {
			console.log(value);
			setOpenProduct(false);
			actions.resetForm();
			form.setFieldValue('options', []);
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
