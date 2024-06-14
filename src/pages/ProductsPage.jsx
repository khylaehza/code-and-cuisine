import { Typography, Stack } from '@mui/material';
import { Body } from '../layout';
import { colors } from '../themes';
import {
	CusButton,
	CusSearch,
	CusSelect,
	CusTable,
	CusModal,
} from '../components';
import { PrintOutlined } from '@mui/icons-material';
import { AddProducts } from '../modals';
const ProductsPage = () => {
	return <Body content={<Content />} />;
};

const Content = () => {
	function createData(
		id,
		name,
		image,
		category,
		options,
		stocks,
		cost,
		price,
		discounts
	) {
		return {
			id,
			name,
			image,
			category,
			options,
			stocks,
			cost,
			price,
			discounts,
		};
	}

	const rows = [
		createData(
			1,
			'Cupcake',
			'Image',
			'Category',
			'Options',
			335,
			3.7,
			67,
			4.3
		),
		createData(
			2,
			'aupcake',
			'Image',
			'Category',
			'Options',
			305,
			3.7,
			67,
			4.3
		),
		createData(
			3,
			'aupcake',
			'Image',
			'Category',
			'Options',
			305,
			3.7,
			67,
			4.3
		),
		createData(
			4,
			'aupcake',
			'Image',
			'Category',
			'Options',
			305,
			3.7,
			67,
			4.3
		),
		createData(
			5,
			'aupcake',
			'Image',
			'Category',
			'Options',
			305,
			3.7,
			67,
			4.3
		),
		createData(
			6,
			'aupcake',
			'Image',
			'Category',
			'Options',
			305,
			3.7,
			67,
			4.3
		),
		createData(
			7,
			'aupcake',
			'Image',
			'Category',
			'Options',
			305,
			3.7,
			67,
			4.3
		),
		createData(
			8,
			'aupcake',
			'Image',
			'Category',
			'Options',
			305,
			3.7,
			67,
			4.3
		),
	];

	const columns = [
		{
			id: 'name',
			label: 'Name',
			sort: true,
			numeric: false,
		},
		{
			id: 'image',
			label: 'Image',
			sort: false,
			numeric: false,
		},
		{
			id: 'category',
			label: 'Category',
			sort: false,
			numeric: false,
		},
		{
			id: 'options',
			label: 'Options',
			sort: false,
			numeric: false,
		},
		{
			id: 'stocks',
			label: 'Stocks',
			sort: true,
			numeric: true,
		},
		{
			id: 'cost',
			label: 'Cost',
			sort: true,
			numeric: true,
		},
		{
			id: 'price',
			label: 'Price',
			sort: true,
			numeric: true,
		},
		{
			id: 'discounts',
			label: 'Discounts',
			sort: true,
			numeric: true,
		},
	];

	return (
		<Stack
			direction="column"
			gap={4}
			width={'100%'}
		>
			<Stack
				direction={{ lg: 'row', sm: 'row', xs: 'column' }}
				display={'flex'}
				alignItems={{ lg: 'center', sm: 'center' }}
				justifyContent={{ sm: 'space-between' }}
			>
				<Typography
					variant={'h6'}
					fontWeight={'bold'}
					color={colors.primary}
					sx={{ letterSpacing: 1.5 }}
				>
					PRODUCTS
				</Typography>
				<Stack
					direction={{ md: 'row', sm: 'row', xs: 'column' }}
					justifyContent={{ lg: 'space-between', sm: 'flex-start' }}
					gap={{ sm: 3, xs: 1 }}
				>
					<CusButton
						variant={'secondary'}
						label={'Print'}
						icon={<PrintOutlined />}
					/>
					<AddProducts />
				</Stack>
			</Stack>
			<Stack
				direction={{ sm: 'row', xs: 'column' }}
				bgcolor={colors.accent}
				sx={{
					borderRadius: 2,
					boxShadow: '0px 0px 8px rgba(217, 217, 217, 1)',
				}}
				padding={1.5}
				gap={3}
				width={'100%'}
			>
				<CusSearch label={'product name'} />
				<Stack
					direction={'row'}
					width={{ sm: '70%', xs: '100%' }}
					gap={3}
				>
					<Stack width={{ lg: '50%', xs: '50%' }}>
						<CusSelect placeholder={'Category'} />
					</Stack>
					<Stack width={{ lg: '50%', xs: '50%' }}>
						<CusSelect placeholder={'Status'} />
					</Stack>
				</Stack>
			</Stack>
			<CusTable
				columns={columns}
				rows={rows}
			/>
		</Stack>
	);
};
export default ProductsPage;
