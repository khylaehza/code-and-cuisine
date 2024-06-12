import { Box, Typography } from '@mui/material';
import { Body } from '../layout';
const DashboardPage = () => {
	return (
		<Body
			content={
				<Box
					component="main"
					width={'100%'}
					height={'100vh'}
				>
					<Typography color={'black'}>dashboard</Typography>
				</Box>
			}
		/>
	);
};

export default DashboardPage;
