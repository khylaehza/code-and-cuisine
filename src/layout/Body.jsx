import { Box, CssBaseline, Typography } from '@mui/material';
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
		>
			<SideNav
				sideNavWidth={sideNavWidth}
				openNav={openNav}
				sideNavClose={sideNavClose}
				sideNavOpen={sideNavOpen}
			/>

			{content}
		</Box>
	);
};

export default Body;
