import { createTheme, ThemeProvider } from '@mui/material';
import RoutesNav from './RoutesNav';
function App() {
	const theme = createTheme({
		palette: { mode: 'light' },
		typography: {
			fontFamily: ['Outfit', 'sans-serif'].join(','),
			color: '#1C3055',
		},
		components: {
			MuiFormLabel: {
				styleOverrides: {
					asterisk: { color: '#BB0406', fontWeight: 'normal' },
				},
			},
			MuiSelect: {
				styleOverrides: {
					root: {
						borderRadius: '6px',
						'& fieldset.MuiOutlinedInput-notchedOutline': {
							borderColor: 'rgba(28, 48, 85, 0.3)',
						},
					},
				},
			},
			MuiAutocomplete: {
				styleOverrides: {
					root: {
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: 'black',
							borderWidth: '1px',
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
			<RoutesNav />
		</ThemeProvider>
	);
}

export default App;
