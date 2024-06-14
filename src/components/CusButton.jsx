import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { colors } from '../themes';

const buttonStyles = {
	primary: {
		backgroundColor: colors.primary,
		color: colors.background,
		'&:hover': {
			backgroundColor: '#480C0B',
		},
		boxShadow: '0px 0px 8px rgba(217, 217, 217, 1)',
		padding: '7px 15px',
	},
	secondary: {
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		color: colors.primary,
		'&:hover': {
			backgroundColor: colors.accent,
			border: `1px solid ${colors.shadow}`,
		},
		boxShadow: '0px 0px 8px rgba(217, 217, 217, 1)',
		border: `1px solid ${colors.shadow}`,
		padding: '7px 15px',
	},
};

const CusButton = ({ type, variant, label, icon, action }) => {
	const ButtonType = styled(Button)(({ variant }) => ({
		...(variant === 'primary' && buttonStyles.primary),
		...(variant === 'secondary' && buttonStyles.secondary),
	}));

	return (
		<ButtonType
			type={type}
			startIcon={icon}
			onClick={action}
			variant={variant}
		>
			{label}
		</ButtonType>
	);
};

export default CusButton;
