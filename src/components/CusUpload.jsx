import { styled } from '@mui/material/styles';
import {
	Button,
	Box,
	FormControl,
	FormHelperText,
	InputLabel,
} from '@mui/material';
import { Image } from '@mui/icons-material';
import { colors } from '../themes';
const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const CusUpload = ({
	fileName,
	required,
	error,
	touch,
	name,
	onChange,
	onBlur,
	disabled,
	label,
}) => {
	return (
		<Box
			display="flex"
			alignItems="flex-start"
			flexDirection="column"
			w="100%"
			gap={0.5}
		>
			<InputLabel
				required={required}
				htmlFor={`${name}`}
				sx={{
					fontSize: 11,
					fontWeight: 500,
					color: colors.primary,
				}}
			>
				{label}
			</InputLabel>
			<FormControl
				required={required}
				error={error && touch != undefined}
				variant="standard"
				fullWidth
			>
				<Button
					component="label"
					variant="link"
					tabIndex={-1}
					startIcon={<Image sx={{ color: '#3B3B3B' }} />}
					sx={{
						borderRadius: '4px',
						fontSize: 12,
						boxShadow: '0px 0px 2px rgba(76, 96, 133, 0.6)',
						backgroundColor: '#FFF',
						color: fileName
							? '#3B3B3B'
							: 'rgba(158, 158, 158, 0.5)',
						textTransform: 'none',
						fontWeight: 'normal',
						height: 40,
						justifyContent: 'flex-start',
						width: '100%',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						'&.Mui-focused': {
							border: '1px solid rgba(216, 161, 26, 0.3)',
						},
						border: 'none',
						'&:hover': {
							border: '1px solid rgba(216, 161, 26, 0.3)',
						},
					}}
					fullWidth
				>
					<div>
						{fileName ? (
							<div sx={{ textTransform: 'lowercase' }}>
								{fileName}
							</div>
						) : (
							'Upload Image'
						)}
					</div>

					<VisuallyHiddenInput
						type="file"
						name={name}
						onChange={onChange}
						onBlur={onBlur}
						disabled={disabled}
					/>
				</Button>
				{error && touch ? (
					<FormHelperText sx={{ fontSize: 11, color: '#BB0406' }}>
						{error}
					</FormHelperText>
				) : (
					<></>
				)}
			</FormControl>
		</Box>
	);
};

export default CusUpload;
