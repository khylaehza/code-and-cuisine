import { styled } from '@mui/material/styles';
import {
	Drawer,
	Avatar,
	List,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
} from '@mui/material';
import {
	DashboardRounded,
	DashboardOutlined,
	FoodBankRounded,
	FoodBankOutlined,
	Inventory2Rounded,
	Inventory2Outlined,
	MenuRounded,
	ChevronLeft,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { colors } from '../themes';
import { Logo, User } from '../assets/images';
const SideNav = ({ sideNavWidth, openNav, sideNavClose, sideNavOpen }) => {
	const SideDrawer = styled(Drawer, {
		shouldForwardProp: (prop) => prop !== 'open',
	})(({ theme, open }) => ({
		width: sideNavWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}));

	const DrawerHeader = styled('div')(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: openNav ? 'flex-end' : 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	}));

	const openedMixin = (theme) => ({
		width: sideNavWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.easeIn,
			duration: theme.transitions.duration.enteringScreen,
		}),
		overflowX: 'hidden',
		padding: 6,
		border: 'none',
		backgroundColor: colors.primary,
		boxShadow: '0px 0px 8px rgba(76, 96, 133, 0.5)',
		justifyContent: 'space-between',
	});

	const closedMixin = (theme) => ({
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: `calc(${theme.spacing(7)} + 1px)`,
		[theme.breakpoints.up('sm')]: {
			width: `calc(${theme.spacing(8)} + 1px)`,
		},
		backgroundColor: colors.primary,
		boxShadow: '0px 0px 8px rgba(76, 96, 133, 0.5)',
		justifyContent: 'space-between',
	});

	const location = useLocation();
	const navigate = useNavigate();

	const navs = [
		{
			name: 'Dashboard',
			icon:
				location.pathname == '/' ? (
					<DashboardRounded sx={{ color: colors.secondary }} />
				) : (
					<DashboardOutlined sx={{ color: colors.shadow }} />
				),
			action: () => {
				navigate('/');
			},
			location: '/',
			color: location.pathname == '/' ? colors.secondary : colors.shadow,
			disabled: true,
		},
		{
			name: 'Order',
			icon:
				location.pathname == '/order' ? (
					<FoodBankRounded sx={{ color: colors.secondary }} />
				) : (
					<FoodBankOutlined sx={{ color: colors.shadow }} />
				),
			action: () => {
				navigate('/order');
			},
			location: '/order',
			color:
				location.pathname == '/order'
					? colors.secondary
					: colors.shadow,
			disabled: true,
		},
		{
			name: 'Products',
			icon:
				location.pathname == '/products' ? (
					<Inventory2Rounded
						sx={{ color: colors.secondary, fontSize: 21 }}
					/>
				) : (
					<Inventory2Outlined
						sx={{ color: colors.shadow, fontSize: 21 }}
					/>
				),
			action: () => {
				navigate('/products');
			},
			location: '/products',
			color:
				location.pathname == '/products'
					? colors.secondary
					: colors.shadow,
			disabled: false,
		},
	];

	return (
		<SideDrawer
			variant="permanent"
			open={openNav}
		>
			<DrawerHeader>
				{openNav ? (
					<IconButton onClick={sideNavClose}>
						<ChevronLeft sx={{ color: colors.shadow }} />
					</IconButton>
				) : (
					<IconButton onClick={sideNavOpen}>
						<MenuRounded sx={{ color: colors.shadow }} />
					</IconButton>
				)}
			</DrawerHeader>

			{openNav && (
				<img
					src={Logo}
					alt="Logo"
					style={{ padding: 10 }}
				/>
			)}

			<List sx={{ marginBottom: 4 }}>
				{navs.map((nav, index) => (
					<ListItem
						key={index}
						disablePadding
						sx={{ display: 'block' }}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: openNav ? 'initial' : 'center',
								px: openNav ? 6 : 3,
							}}
							onClick={nav.action}
							disabled={nav.disabled}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: openNav ? 2 : 'auto',
									justifyContent: 'center',
								}}
							>
								{nav.icon}
							</ListItemIcon>
							<ListItemText
								sx={{
									opacity: openNav ? 1 : 0,
									color: nav.color,
									textTransform: 'uppercase',
								}}
							>
								<Typography
									style={{
										fontWeight:
											location.pathname == nav.location
												? 600
												: 400,
									}}
								>
									{nav.name}
								</Typography>
							</ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<Stack gap={1}>
				<Divider
					sx={{
						backgroundColor: colors.divider,
						opacity: 0.2,
					}}
				/>
				<Stack
					px={openNav ? 0.5 : 1.5}
					py={1}
					direction={'row'}
					gap={2}
				>
					<Avatar
						sx={{ width: 35, height: 35 }}
						src={User}
					/>
					{openNav && (
						<Stack>
							<Typography
								fontSize={14}
								fontWeight={'semibold'}
								color={colors.accent}
							>
								KHYLA EHZA HONDRADE
							</Typography>
							<Typography
								fontSize={12}
								color={colors.secondary}
							>
								MANAGER
							</Typography>
						</Stack>
					)}
				</Stack>
			</Stack>
		</SideDrawer>
	);
};

export default SideNav;
