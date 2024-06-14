import { Box } from '@mui/material';
import { useState } from 'react';
import { colors } from '../themes';
import SideNav from './SideNav';
const Body = ({ content }) => {
	const sideNavWidth = 240;
	const [openNav, setOpenNav] = useState(false);

	const sideNavOpen = () => {
		setOpenNav(true);
	};

	const sideNavClose = () => {
		setOpenNav(false);
	};

	return (
		<Box
			display={'flex'}
			bgcolor={colors.background}
			height={'100%'}
			width={'100vw'}
		>
			<SideNav
				sideNavWidth={sideNavWidth}
				openNav={openNav}
				sideNavClose={sideNavClose}
				sideNavOpen={sideNavOpen}
			/>

			<Box
				component="main"
				width={'100%'}
				height={'100vh'}
				p={5}
				display={'flex'}
			>
				{content}
			</Box>
		</Box>
	);
};

export default Body;
