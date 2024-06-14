import { Box, Typography } from '@mui/material';
import { Body } from '../layout';
const OrderPage = () => {
	return (
		<Body
			content={
				<Box
					direction="column"
					gap={4}
					width={'100%'}
				>
					<Typography color={'black'}>order</Typography>
				</Box>
			}
		/>
	);
};

export default OrderPage;
