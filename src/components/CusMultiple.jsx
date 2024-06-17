import * as React from 'react';
import {
	Chip,
	Autocomplete,
	TextField,
	Box,
	FormControl,
	InputLabel,
	FormHelperText,
} from '@mui/material';
import { colors } from '../themes';
const CusMultiple = ({
	name,
	placeholder,
	label,
	required,
	error,
	value,
	onChange,
	onBlur,
	touch,
	options,
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
				sx={{ fontSize: 11, fontWeight: 'bold', color: colors.primary }}
			>
				{label}
			</InputLabel>
			<FormControl
				required={required}
				error={error && touch != undefined}
				variant="standard"
				fullWidth
			>
				<Autocomplete
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					multiple
					name={name}
					fullWidth
					options={options}
					freeSolo
					renderTags={(value, getTagProps) =>
						value.map((option, index) => {
							const { key, ...tagProps } = getTagProps({ index });
							return (
								<Chip
									variant="outlined"
									label={option}
									key={key}
									{...tagProps}
								/>
							);
						})
					}
					renderInput={(params) => {
						return (
							<TextField
								{...params}
								placeholder={placeholder}
								hiddenLabel
								size="small"
								multiline
								fullWidth
								sx={{
									bgcolor: '#FFF',
									textAlign: 'left',
									fontSize: 12,
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											border: 'none',
										},
									},
								}}
							/>
						);
					}}
				/>

				{error && touch ? (
					<FormHelperText sx={{ fontSize: 11 }}>
						{error}
					</FormHelperText>
				) : (
					<></>
				)}
			</FormControl>
		</Box>
	);
};

export default CusMultiple;
