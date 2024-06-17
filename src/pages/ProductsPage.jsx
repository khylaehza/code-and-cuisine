import { Typography, Stack } from '@mui/material';
import { Body } from '../layout';
import { colors } from '../themes';
import {
	CusSearch,
	CusSelect,
	CusTable,
	CusToast,
	CusDownload,
} from '../components';
import { AddProducts, EditProducts, DeleteProducts } from '../modals';

import { useData } from '../DataContext';
import { useState } from 'react';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ProductsPage = () => {
	return <Body content={<Content />} />;
};

const Content = () => {
	const [curSearch, setCurSearch] = useState('');
	const { products, curRow, setCurRow } = useData();
	const [category, setCategory] = useState('All');
	const [availability, setAvailability] = useState('All');
	const [openDel, setOpenDel] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);

	const [openToast, setOpenToast] = useState(false);
	const [variant, setVariant] = useState('');
	const [message, setMessage] = useState('');

	const [anchorEl, setAnchorEl] = useState(null);

	const categoryBy = [
		'Appetizers',
		'Breads',
		'Main Courses',
		'Desserts',
		'Beverages',
		'All',
	];
	const availabilityBy = ['Available', 'Not Available', 'All'];

	function createData(
		id,
		name,
		image,
		category,
		options,
		stocks,
		cost,
		price,
		discount
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
			discount,
		};
	}

	let rows =
		products.length > 0
			? products
					.filter((data) => {
						return curSearch.toLowerCase() === ''
							? data
							: data.name
									.toLowerCase()
									.includes(curSearch.toLowerCase());
					})
					.filter((data) => {
						return category == '' || category == 'All'
							? data
							: category == data.category;
					})
					.filter((data) => {
						if (availability == 'All') {
							return data;
						} else if (availability == 'Available') {
							return data.stocks > 0;
						} else if (availability == 'Not Available') {
							return data.stocks == 0;
						}
					})
					.map((value) => {
						const {
							key,
							name,
							image,
							category,
							options,
							stocks,
							cost,
							price,
							discount,
						} = value;

						return createData(
							key,
							name,
							image,
							category,
							options,
							stocks,
							cost,
							price,
							discount
						);
					})
			: [];

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
			label: 'Cost (₱)',
			sort: true,
			numeric: true,
		},
		{
			id: 'price',
			label: 'Price (₱)',
			sort: true,
			numeric: true,
		},
		{
			id: 'discount',
			label: 'Discount (₱)',
			sort: true,
			numeric: true,
		},
	];

	const generatePdf = () => {
		const doc = new jsPDF();
		const filteredColumns = columns.filter(
			(column) => column.id !== 'image'
		);
		const filteredColumnLabels = filteredColumns.map(
			(column) => column.label
		);
		const filteredRows = rows.map((row) => {
			const filteredRow = {};
			filteredColumns.forEach((column) => {
				filteredRow[column.id] = row[column.id];
			});
			return filteredRow;
		});

		const filteredBody = filteredRows.map((row) =>
			filteredColumns.map((column) => row[column.id])
		);

		doc.autoTable({
			head: [filteredColumnLabels],
			body: filteredBody,
			startY: 20,
			styles: { overflow: 'linebreak' },
			didDrawPage: () => {
				doc.text('Products', 10, 10);
			},
		});

		doc.save('Products.pdf');
	};

	const handleDlClick = (event) => {
		setAnchorEl(event.currentTarget);
		generatePdf();
	};

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
					<CusDownload
						handleClick={handleDlClick}
						anchorEl={anchorEl}
					/>

					<AddProducts
						setVariant={setVariant}
						setMessage={setMessage}
						setOpenToast={setOpenToast}
					/>
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
				<CusSearch
					label={'product name'}
					setCurSearch={setCurSearch}
					curSearch={curSearch}
				/>
				<Stack
					direction={'row'}
					width={{ sm: '70%', xs: '100%' }}
					gap={3}
				>
					<Stack width={{ lg: '50%', xs: '50%' }}>
						<CusSelect
							placeholder={'Category'}
							items={categoryBy}
							onChange={(e) => {
								setCategory(e.target.value);
							}}
							value={category}
						/>
					</Stack>
					<Stack width={{ lg: '50%', xs: '50%' }}>
						<CusSelect
							placeholder={'Status'}
							items={availabilityBy}
							onChange={(e) => {
								setAvailability(e.target.value);
							}}
							value={availability}
						/>
					</Stack>
				</Stack>
			</Stack>
			<CusTable
				columns={columns}
				rows={rows}
				setCurRow={setCurRow}
				setOpenEdit={setOpenEdit}
				setOpenDel={setOpenDel}
			/>
			<EditProducts
				setOpenEdit={setOpenEdit}
				openEdit={openEdit}
				optEdit={curRow.options}
				setVariant={setVariant}
				setMessage={setMessage}
				setOpenToast={setOpenToast}
			/>
			<DeleteProducts
				setOpenDel={setOpenDel}
				openDel={openDel}
				setVariant={setVariant}
				setMessage={setMessage}
				setOpenToast={setOpenToast}
			/>
			<CusToast
				variant={variant}
				message={message}
				openToast={openToast}
				setOpenToast={setOpenToast}
			/>
		</Stack>
	);
};
export default ProductsPage;
