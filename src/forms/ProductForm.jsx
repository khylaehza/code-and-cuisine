import { CusMultiple, CusInput, CusSelectForm } from '../components';
import { Grid, Typography } from '@mui/material';

const ProductForm = ({
	form,
	disabled = false,
	method = 'ADD',
	opt,
	setOpt,
}) => {
	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 1, sm: 8, md: 12 }}
		>
			<Grid
				item
				xs={2}
				sm={3}
				md={3}
			>
				<CusInput
					name="code"
					label="Product Code"
					required={true}
					placeholder={'C1A'}
					value={form.values.code}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.code}
					touch={form.touched.code}
					disabled={disabled}
					startAdornment={
						<Typography
							fontSize={12}
							color={'#CCCCCC'}
						>
							e.g.
						</Typography>
					}
				/>
			</Grid>

			<Grid
				item
				xs={4}
				sm={5}
				md={9}
			>
				<CusInput
					name="name"
					label="Product Name"
					required={true}
					placeholder={
						'Mushroom Risotto, Mango Salsa, Roasted Pheasant'
					}
					value={form.values.name}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.name}
					touch={form.touched.name}
					disabled={disabled}
					startAdornment={
						<Typography
							fontSize={12}
							color={'#CCCCCC'}
						>
							e.g.
						</Typography>
					}
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
					placeholder={'Type and click enter to add options.'}
					onChange={(event, value) => {
						form.setFieldValue('options', value);
						setOpt(value);
					}}
					onBlur={form.handleBlur}
					error={form.errors.options}
					touch={form.touched.options}
					disabled={disabled}
					options={[]}
					value={opt}
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
				xs={12}
			>
				<CusInput
					name="image"
					label="Product Image"
					placeholder={'Image'}
					onChange={(e) => {
						form.setFieldValue('image', e.target.files[0]);
						console.log(e.target.files[0]);
					}}
					onBlur={form.handleBlur}
					error={form.errors.image}
					touch={form.touched.image}
					disabled={disabled}
					type={'file'}
					required={true}
				/>
			</Grid>
		</Grid>
	);
};

export default ProductForm;
