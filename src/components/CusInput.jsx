import {
	Box,
	Input,
	FormControl,
	InputLabel,
	FormHelperText,
	InputAdornment,
} from '@mui/material';
import { colors } from '../themes';
export const CusInput = ({
	name,
	placeholder,
	label,
	required,
	error,
	type = 'text',
	value,
	onChange,
	onBlur,
	touch,
	disabled,
	startAdornment,
	inputProps,
	multiline,
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
				<Input
					name={name}
					placeholder={`${placeholder}`}
					variant="filled"
					disableUnderline
					fullWidth
					width="100%"
					type={type}
					sx={{
						bgcolor: '#FFF',
						paddingY: 1,
						paddingX: 2,
						textAlign: 'left',
						fontSize: 12,
						height: 40,
					}}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
					disabled={disabled}
					startAdornment={
						<InputAdornment position="start">
							{startAdornment}
						</InputAdornment>
					}
					inputProps={inputProps}
					multiline={multiline}
					rows={multiline ? 3 : 1}
				/>

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

export default CusInput;
