/* eslint-disable no-unused-vars */
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {
	Route,
	Routes,
	Link,
	matchPath,
	useLocation,
	BrowserRouter as Router,
} from 'react-router-dom'
import {
	AppBar,
	Box,
	Button,
	Grid,
	IconButton,
	Skeleton,
	styled,
	SwipeableDrawer,
	Toolbar,
	Typography,
} from '@mui/material'
import Payout from 'Payout'
import Actuary from 'Actuary'
import Annuity from 'Annuity'
import SizeId from 'SizeId'
import { CoupleContext, CoupleContextProvider } from 'CoupleContext'
import { AnnuityContextProvider } from 'AnnuityContext'
import { useContext, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

import {
	ThemeModeContextProvider,
	ThemeModeContext,
} from 'styles/ThemeModeContext'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { SocialDistanceOutlined } from '@mui/icons-material'
import { blue, green, grey } from '@mui/material/colors'

const StyledToolbar = styled(Toolbar)(() => ({
	alignItems: 'flex-start',

	// Override media queries injected by theme.mixins.toolbar
	'@media all': {
		minHeight: 20,
		maxHeight: 31,
	},
}))
interface StyledTabProps {
	label: any
	value: string
	to: string
	component: any
	disabled?: boolean
}

const AntTabs = styled(Tabs)(({ theme }) => ({
	marginTop: 25,
	borderBottom: '1px solid primary',
	'& .MuiTabs-indicator': {
		//	backgroundColor: theme.palette.grey.A400,
	},
}))

const AntTab = styled((props: StyledTabProps) => (
	<Tab disableRipple={false} {...props} />
))(({ theme }) => ({
	textTransform: 'capitalize',
	minWidth: 0,

	// color: theme.palette.getContrastText(theme.palette.grey.A700),
	// backgroundColor: theme.palette.grey.A700,

	paddingLeft: 5,
	paddingRught: 5,
	paddingTop: 1,
	paddingBottom: 3,

	// fontSizeAdjust: 'from-font',
	'&.MuiTabs-indicator': {
		//	color: theme.palette.background.paper,
	},

	'&:hover': {
		color: green[800],
		backgroundColor: theme.palette.grey.A700,
		// opacity: 1,
	},
	'&.Mui-selected': {
		backgroundColor: theme.palette.grey.A700,
		color: theme.palette.getContrastText(theme.palette.grey.A700),
	},
	'&.Mui-focusVisible': {
		// backgroundColor: '#d1eaff',
	},
	'&.Mui-disabled': {
		color: theme.palette.grey.A400,
	},
}))

function useRouteMatch(patterns: readonly string[]) {
	const { pathname } = useLocation()

	for (let i = 0; i < patterns.length; i += 1) {
		const pattern = patterns[i]
		const possibleMatch = matchPath(pattern, pathname)
		if (possibleMatch !== null) {
			return possibleMatch
		}
	}

	return null
}
const StyledBox = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}))

const Puller = styled(Box)(({ theme }) => ({
	width: 10,
	height: 150,
	backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
	borderRadius: 3,
	position: 'absolute',
	right: 8,

	top: 'calc(50% - 15px)',
}))

function MyTabs() {
	// You need to provide the routes in descendant order.
	// This means that if you have nested routes like:
	// users, users/new, users/edit.
	// Then the order should be ['users/add', 'users/edit', 'users'].
	const routeMatch = useRouteMatch(['/Annuity', '/Payout', '/'])
	const currentTab = routeMatch?.pattern?.path
	const { couple, setStoredCouple } = useContext(CoupleContext)
	const { handleToggle, theme } = useContext(ThemeModeContext)
	const [open, setOpen] = useState(true)
	const drawerBleeding = 10

	const handleToggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen)
	}

	const handleTabChange = () => {
		window.scrollTo(0, 0)
		setStoredCouple(couple)
	}
	const TitleWrapper = styled('div')(() => ({
		top: 1,
		paddingLeft: 75,
		zIndex: 9,
		position: 'absolute',
		color: theme.palette.getContrastText(theme.palette.background.paper),
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'left',
		justifyContent: 'left',
	}))

	return (
		<Box sx={{ paddingTop: '75px', paddingLeft: '100px' }}>
			<SwipeableDrawer
				//		container={container}
				anchor='left'
				open={open}
				onClose={handleToggleDrawer(false)}
				onOpen={handleToggleDrawer(true)}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={false}
				ModalProps={{
					keepMounted: true,
				}}
			>
				<StyledBox
					sx={{
						position: 'absolute',
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: 'visible',
						paddingTop: 70,
						right: 0,
						left: 0,
					}}
				>
					<Typography sx={{ p: 2, color: 'text.secondary' }}>
						51 results
					</Typography>
				</StyledBox>
				<StyledBox
					sx={{
						px: 2,
						pb: 2,
						height: '100%',
						overflow: 'auto',
					}}
				>
					<Skeleton variant='rectangular' height='100%' />
				</StyledBox>
			</SwipeableDrawer>
			<AppBar
				enableColorOnDark={false}
				sx={{
					height: 71,
				}}
			>
				<TitleWrapper>
					<Typography variant='h5'>Annuity Calculator</Typography>
				</TitleWrapper>
				<StyledToolbar>
					<AntTabs
						variant='fullWidth'
						value={currentTab}
						onChange={handleTabChange}
					>
						<AntTab
							label={
								<Grid container direction='column'>
									<Grid>Personal</Grid>
									<Grid>Stats</Grid>
								</Grid>
							}
							value='/'
							to='/'
							component={Link}
						/>
						<AntTab
							label={
								<Grid container direction='column'>
									<Grid>Calculate</Grid>
									<Grid>Annuity</Grid>
								</Grid>
							}
							value='/Annuity'
							to='/Annuity'
							component={Link}
						/>
						<AntTab
							label={
								<Grid container direction='column'>
									<Grid>Payout</Grid>
									<Grid>Table</Grid>
								</Grid>
							}
							value='/Payout'
							to='/Payout'
							component={Link}
						/>
					</AntTabs>
					<IconButton
						sx={{ position: 'absolute', right: 10, ml: 1 }}
						onClick={handleToggle}
						color='inherit'
					>
						{theme.palette.mode === 'light' ? (
							<Brightness4Icon />
						) : (
							<Brightness7Icon />
						)}
					</IconButton>
					<IconButton
						sx={{ position: 'absolute', right: 10, top: 27, ml: 1 }}
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={handleToggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
				</StyledToolbar>
				<SizeId />
			</AppBar>
		</Box>
	)
}

const App = () => (
	<ThemeModeContextProvider>
		<CoupleContextProvider>
			<AnnuityContextProvider>
				<Router>
					<MyTabs />
					<Routes>
						<Route path='*' element={<Actuary />} />
						<Route path='/Annuity' element={<Annuity />} />
						<Route path='/Payout' element={<Payout />} />
					</Routes>
				</Router>
			</AnnuityContextProvider>
		</CoupleContextProvider>
	</ThemeModeContextProvider>
)

export default App
