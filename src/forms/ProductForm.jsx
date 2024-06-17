import { CusMultiple, CusInput, CusSelectForm, CusUpload } from '../components';
import { Grid, Typography } from '@mui/material';

const ProductForm = ({
	form,
	disabled = false,
	opt,
	setOpt,
	setImg,
	fileName,
	setFileName,
}) => {
	const categoryBy = [
		'Appetizers',
		'Breads',
		'Main Courses',
		'Desserts',
		'Beverages',
	];

	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 1, sm: 8, md: 12 }}
		>
			<Grid
				item
				xs={12}
			>
				<CusInput
					name="name"
					label="Product Name"
					required={true}
					placeholder={'e.g. Roasted Peanuts, Crispy Pata, Halo-Halo'}
					value={form.values.name}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.name}
					touch={form.touched.name}
					disabled={disabled}
				/>
			</Grid>

			<Grid
				item
				xs={12}
				sm={4}
				md={8}
			>
				<CusSelectForm
					name="category"
					label="Category"
					required={true}
					placeholder={'Select Category'}
					value={form.values.category}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.category}
					touch={form.touched.category}
					disabled={disabled}
					items={categoryBy}
				/>
			</Grid>

			<Grid
				item
				xs={12}
				sm={4}
				md={4}
			>
				<CusInput
					name="stocks"
					label="Stocks"
					placeholder={'0'}
					value={form.values.stocks}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.stocks}
					touch={form.touched.stocks}
					disabled={disabled}
					type="number"
					inputProps={{ min: 0, step: 'any' }}
					required={true}
				/>
			</Grid>

			<Grid
				item
				xs={12}
			>
				<CusMultiple
					name="options"
					label="Options"
					placeholder={'Type and enter to add options.'}
					onChange={(event, value) => {
						form.setFieldValue('options', value);
						setOpt(value);
					}}
					onBlur={form.handleBlur}
					error={form.errors.options}
					touch={form.touched.options}
					disabled={disabled}
					value={opt}
					options={[]}
				/>
			</Grid>

			<Grid
				item
				xs={12}
				sm={4}
				md={4}
			>
				<CusInput
					name="cost"
					label="Cost"
					placeholder={'0'}
					value={form.values.cost}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.cost}
					touch={form.touched.cost}
					disabled={disabled}
					type="number"
					inputProps={{ min: 0, step: 'any' }}
					startAdornment={
						<Typography
							fontSize={12}
							color={'#CCCCCC'}
						>
							₱
						</Typography>
					}
					required={true}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				sm={4}
				md={4}
			>
				<CusInput
					name="price"
					label="Price"
					placeholder={'0'}
					value={form.values.price}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.price}
					touch={form.touched.price}
					disabled={disabled}
					type="number"
					inputProps={{ min: 0, step: 'any' }}
					startAdornment={
						<Typography
							fontSize={12}
							color={'#CCCCCC'}
						>
							₱
						</Typography>
					}
					required={true}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				sm={8}
				md={4}
			>
				<CusInput
					name="discount"
					label="Discount"
					placeholder={'0'}
					value={form.values.discount}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.discount}
					touch={form.touched.discount}
					disabled={disabled}
					type="number"
					inputProps={{ min: 0, step: 'any' }}
					startAdornment={
						<Typography
							fontSize={12}
							color={'#CCCCCC'}
						>
							₱
						</Typography>
					}
				/>
			</Grid>
			<Grid
				item
				xs={1}
				sm={8}
				md={12}
			>
				<CusUpload
					name="image"
					label="Product Image"
					setImg={setImg}
					fileName={fileName}
					setFileName={setFileName}
					onChange={(e) => {
						let file = e.target.files[0];
						form.setFieldValue('image', e.target.files[0]);
						setFileName(file.name);
						setImg(file);
					}}
					onBlur={form.handleBlur}
					error={form.errors.image}
					touch={form.touched.image}
					disabled={disabled}
					required={true}
				/>
			</Grid>
		</Grid>
	);
};

export default ProductForm;
