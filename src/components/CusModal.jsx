import {
	Modal,
	Box,
	Typography,
	Divider,
	IconButton,
	Stack,
	Button,
} from '@mui/material';
import CusButton from './CusButton';
import { CloseRounded } from '@mui/icons-material';
import moment from 'moment';
import { colors } from '../themes';
const CusModal = ({
	label,
	open,
	setOpen,
	content,
	form,
	method,
	updated,
	setOpt,
}) => {
	const handleClose = () => {
		setOpen(false);
		form.resetForm();
		form.setFieldValue('options', []);
		setOpt([]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		form.handleSubmit();
	};

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		bgcolor: 'background.paper',
		boxShadow: '0px 0px 2px rgba(76, 96, 133, 0.6)',
		p: 4,
		borderRadius: 3,
	};

	return (
		<>
			<Modal
				keepMounted
				open={open}
				onClose={handleClose}
				style={{ overflow: 'scroll', height: '100%' }}
			>
				<form onSubmit={handleSubmit}>
					<Stack
						sx={style}
						gap={2}
					>
						<Box
							display="flex"
							flexDirection={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<Stack flexDirection={'column'}>
								<Typography
									id="title"
									fontSize={16}
									fontWeight={'medium'}
									gutterBottom
									color={colors.primary}
								>
									{label}
								</Typography>
							</Stack>

							<IconButton onClick={handleClose}>
								<CloseRounded
									sx={{ color: '#4C6085', fontSize: 16 }}
								/>
							</IconButton>
						</Box>
						<Divider />

						{content}
						<Stack
							flexDirection={{
								xs: 'column',
								sm: 'row',
								lg: 'row',
							}}
							gap={1}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<Stack
								justifyContent={'center'}
								alignItems={'center'}
							>
								<Typography
									fontSize={11}
									color={'#ABABAB'}
								>
									{method == 'VIEW' && (
										<>
											{updated != ''
												? `Last Updated: ${moment(
														updated
													).format('LLLL')}`
												: ''}
										</>
									)}
								</Typography>
							</Stack>

							<Stack
								flexDirection={'row'}
								gap={1}
								justifyContent={'flex-end'}
								mt={1}
							>
								<CusButton
									label={'Cancel'}
									variant={'secondary'}
									action={handleClose}
								/>

								<Button
									type={'submit'}
									sx={{
										backgroundColor: colors.primary,
										color: colors.background,
										'&:hover': {
											backgroundColor: '#480C0B',
										},
										boxShadow:
											'0px 0px 8px rgba(217, 217, 217, 1)',
										padding: '7px 15px',
									}}
								>
									Save
								</Button>
							</Stack>
						</Stack>
					</Stack>
				</form>
			</Modal>
		</>
	);
};

export default CusModal;
