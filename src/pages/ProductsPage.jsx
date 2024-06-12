import { Box, Typography } from '@mui/material';
import { Body } from '../layout';
const ProductsPage = () => {
	return (
		<Body
			content={
				<Box
					component="main"
					width={'100%'}
					height={'100vh'}
				>
					<Typography color={'black'}>products</Typography>
				</Box>
			}
		/>
	);
};

export default ProductsPage;
