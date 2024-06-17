import { Modal, Box, IconButton, Stack } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

const CusImageViewer = ({ src, alt, openImage, setOpenImage }) => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		bgcolor: 'background.paper',
		boxShadow: '0px 0px 2px rgba(76, 96, 133, 0.6)',
		p: 0.5,
		borderRadius: 3,
	};

	return (
		<>
			<Modal
				open={openImage}
				onClose={() => setOpenImage(false)}
			>
				<Box sx={style}>
					<Stack
						flex={'flex'}
						flexDirection={'column'}
					>
						<IconButton
							onClick={() => setOpenImage(false)}
							sx={{
								alignSelf: 'flex-end',
								position: 'absolute',
							}}
						>
							<CloseRounded
								sx={{ color: '#4C6085', fontSize: 16 }}
							/>
						</IconButton>
						<img
							src={src}
							alt={alt}
							style={{ borderRadius: 9, objectFit: 'cover' }}
							width={900}
							height={600}
						/>
					</Stack>
				</Box>
			</Modal>
		</>
	);
};

export default CusImageViewer;
