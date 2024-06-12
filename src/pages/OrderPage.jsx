import { Box, Typography } from '@mui/material';
import { Body } from '../layout';
const OrderPage = () => {
	return (
		<Body
			content={
				<Box
					component="main"
					width={'100%'}
					height={'100vh'}
				>
					<Typography color={'black'}>order</Typography>
				</Box>
			}
		/>
	);
};

export default OrderPage;
