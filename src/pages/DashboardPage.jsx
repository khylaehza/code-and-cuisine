import { Box, Typography } from '@mui/material';
import { Body } from '../layout';
const DashboardPage = () => {
	return (
		<Body
			content={
				<Box
					direction="column"
					gap={4}
					width={'100%'}
				>
					<Typography color={'black'}>dashboard</Typography>
				</Box>
			}
		/>
	);
};

export default DashboardPage;
