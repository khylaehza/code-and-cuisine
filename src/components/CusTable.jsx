import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CusIconButton from './CusIconButton';
import CusImageViewer from './CusImageViewer';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Paper,
	Stack,
} from '@mui/material';
import { EditRounded, DeleteRounded } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { useData } from '../DataContext';

const CusTable = ({ columns, rows, setOpenEdit, setOpenDel }) => {
	const { setCurRow, curRow } = useData();
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [visibleRows, setVisibleRows] = useState([]);
	const [openImage, setOpenImage] = useState(false);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	useEffect(() => {
		const sortedRows = stableSort(rows, getComparator(order, orderBy));
		const newVisibleRows = sortedRows.slice(
			page * rowsPerPage,
			page * rowsPerPage + rowsPerPage
		);
		setVisibleRows(newVisibleRows);
	}, [rows, order, orderBy, page, rowsPerPage]);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper
				sx={{
					width: '100%',
					borderRadius: 2,
					boxShadow: '0px 0px 8px rgba(217, 217, 217, 1)',
					overflow: 'hidden',
				}}
			>
				<TableContainer
					sx={{ maxHeight: 440, backgroundColor: '#FAF9F6' }}
				>
					<Table
						stickyHeader
						sx={{
							borderRadius: 2,
						}}
					>
						<EnhancedTableHead
							columns={columns}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody
							sx={{
								backgroundColor: '#FFF',
							}}
						>
							{visibleRows.map((row, index) => {
								return (
									<TableRow
										hover
										key={index}
									>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={'center'}
												>
													{column.id == 'image' ? (
														<img
															src={value}
															width={100}
															height={100}
															style={{
																borderRadius: 9,
																objectFit:
																	'contain',
																cursor: 'pointer',
															}}
															onClick={() => {
																setCurRow(row);
																setOpenImage(
																	true
																);
															}}
														/>
													) : column.id ==
													  'options' ? (
														value ? (
															value.join(', ')
														) : (
															'None'
														)
													) : (
														value
													)}
												</TableCell>
											);
										})}

										<TableCell align={'right'}>
											<Stack
												flexDirection={'row'}
												gap={1}
												justifyContent={'center'}
											>
												<CusIconButton
													color="#E9DFC6"
													w={24}
													h={24}
													action={() => {
														setOpenEdit(true);
														setCurRow(row);
													}}
													icon={
														<EditRounded
															sx={{
																height: 15,
																width: 15,
																color: '#1C3055',
															}}
														/>
													}
												/>
												<CusIconButton
													color="#eaa196"
													w={24}
													h={24}
													action={() => {
														setOpenDel(true);
														setCurRow(row);
													}}
													icon={
														<DeleteRounded
															sx={{
																height: 15,
																width: 15,
																color: '#1C3055',
															}}
														/>
													}
												/>
											</Stack>
										</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={columns.length + 1} />
								</TableRow>
							)}
							{rows.length == 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell
										colSpan={columns.length + 1}
										sx={{
											textAlign: 'center',
										}}
									>
										No available products.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<CusImageViewer
				src={curRow.image}
				openImage={openImage}
				setOpenImage={setOpenImage}
				alt={curRow.name}
			/>
		</Box>
	);
};

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
};

function EnhancedTableHead(props) {
	const { columns, order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{columns.map((column) => (
					<TableCell
						key={column.id}
						align={'center'}
						padding={'none'}
						sx={{
							borderBottom: '1px solid rgba(218, 203, 167, 0.5)',
							color: '#520E0D',
							backgroundColor: '#FAF9F6',
						}}
					>
						{!column.sort && column.label}

						{column.sort && (
							<TableSortLabel
								active={orderBy === column.id}
								direction={
									orderBy === column.id ? order : 'asc'
								}
								onClick={createSortHandler(column.id)}
							>
								{column.label}

								{orderBy === column.id ? (
									<Box
										component="span"
										sx={visuallyHidden}
									>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						)}
					</TableCell>
				))}
				<TableCell
					align={'center'}
					padding={'normal'}
					sx={{
						borderBottom: '1px solid rgba(218, 203, 167, 0.5)',
						color: '#520E0D',
						backgroundColor: '#FAF9F6',
					}}
				>
					Actions
				</TableCell>
			</TableRow>
		</TableHead>
	);
}

export default CusTable;
