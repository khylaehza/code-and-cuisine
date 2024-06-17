import { createTheme, ThemeProvider } from '@mui/material';
import RoutesNav from './RoutesNav';
import { DataProvider } from './DataContext';
function App() {
	const theme = createTheme({
		palette: { mode: 'light' },
		typography: {
			fontFamily: ['Outfit', 'sans-serif'].join(','),
			color: '#1C3055',
		},
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						borderRadius: '4px',
						fontSize: 14,
						boxShadow: '0px 0px 2px rgba(76, 96, 133, 0.6)',
						backgroundColor: '#FFF',
						'&.MuiInputBase-input': {
							borderRadius: 'inherit',
							fontSize: 'inherit',
							boxShadow: 'inherit',
						},
						'&.Mui-focused': {
							border: '1px solid rgba(216, 161, 26, 0.3)',
						},
						'&:hover': {
							border: '1px solid rgba(216, 161, 26, 0.3)',
						},
					},

					input: {
						'&::placeholder': {
							color: 'rgba(158, 158, 158, 1)',
						},
					},
				},
			},

			MuiFormLabel: {
				styleOverrides: {
					asterisk: { color: '#BB0406', fontWeight: 'normal' },
				},
			},
			MuiSelect: {
				styleOverrides: {
					root: {
						'& fieldset.MuiOutlinedInput-notchedOutline': {
							border: 'none',
						},
					},
				},
			},
			MuiAutocomplete: {
				styleOverrides: {
					root: {
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							border: 'none',
						},
					},
					input: {
						fontSize: 12,
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<DataProvider>
				<RoutesNav />
			</DataProvider>
		</ThemeProvider>
	);
}

export default App;
