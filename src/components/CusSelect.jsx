import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	FormHelperText,
} from '@mui/material';
import { colors } from '../themes';

export const CusSelect = ({
	name,
	placeholder = 'Category',
	label,
	required,
	error,
	items = ['1', '2', '3'],
	onChange,
	value,
	touch,
	disabled,
}) => {
	return (
		<Box sx={{ width: '100%' }}>
			<FormControl
				required={required}
				error={error && touch != undefined}
				fullWidth
			>
				<Select
					name={name}
					value={value || ''}
					onChange={onChange}
					displayEmpty
					sx={{
						textAlign: 'left',
						height: 50,
						color:
							value == undefined
								? 'rgba(158, 158, 158, 0.5)'
								: 'black',
					}}
					disabled={disabled}
				>
					<MenuItem
						value={''}
						disabled
						sx={{
							fontSize: 12,
						}}
					>
						<em>{placeholder}</em>
					</MenuItem>

					{items.map((item, key) => (
						<MenuItem
							value={item}
							key={key}
							sx={{
								fontSize: 12,
							}}
						>
							{item}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export const CusSelectForm = ({
	name,
	placeholder = 'Category',
	label,
	required,
	error,
	items = ['1', '2', '3'],
	onChange,
	value,
	touch,
	disabled,
}) => {
	return (
		<Box
			sx={{ width: '100%' }}
			display="flex"
			alignItems="flex-start"
			flexDirection="column"
			w="100%"
			gap={0.5}
		>
			<InputLabel
				required={required}
				htmlFor={`${name}`}
				sx={{ fontSize: 11, fontWeight: 500, color: colors.primary }}
			>
				{label}
			</InputLabel>

			<FormControl
				required={required}
				error={error && touch != undefined}
				fullWidth
			>
				<Select
					name={name}
					value={value || ''}
					onChange={onChange}
					displayEmpty
					sx={{
						textAlign: 'left',
						height: 40,
						fontSize: 12,
						color:
							value == '' ? 'rgba(158, 158, 158, 0.5)' : 'black',
						':hover': {
							border: '1px solid rgba(216, 161, 26, 0.3)',
						},
					}}
					disabled={disabled}
				>
					<MenuItem
						value={''}
						disabled
						sx={{
							fontSize: 12,
						}}
					>
						<em>{placeholder}</em>
					</MenuItem>

					{items.map((item, key) => (
						<MenuItem
							value={item}
							key={key}
							sx={{
								fontSize: 12,
							}}
						>
							{item}
						</MenuItem>
					))}
				</Select>
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
