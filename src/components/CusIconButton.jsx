import { IconButton } from '@mui/material';

const CusIconButton = ({
	icon,
	w = 40,
	h = 40,
	color = '#E0EBF2',
	action,
	label,
	text,
	hover = '#EFF1F4',
	...props
}) => {
	return (
		<IconButton
			color="inherit"
			size="small"
			aria-label={label}
			edge="start"
			sx={{
				width: w,
				height: h,
				borderRadius: 1,
				borderWidth: 2,
				bgcolor: color,
				'&:hover': {
					bgcolor: hover,
				},
			}}
			onClick={action}
			{...props}
		>
			{icon}
			{text}
		</IconButton>
	);
};

export default CusIconButton;
