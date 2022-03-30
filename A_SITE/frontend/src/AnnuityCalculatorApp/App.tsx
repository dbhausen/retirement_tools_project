import { useContext } from 'react'
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
import { AppBar, Box, Grid, styled, Toolbar, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import SizeId from 'SizeId'
import { ThemeModeContext } from 'styles/ThemeModeContext'
import Payout from './Payout'
import Actuary from './Actuary'
import Annuity from './Annuity'
import { AnnuityContextProvider } from './AnnuityContext'
import { CoupleContext, CoupleContextProvider } from './CoupleContext'
import AppMenu from '../AppMenu'

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
const drawerWidth = 240
const AntTabs = styled(Tabs)(() => ({
	marginTop: 3,
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
	paddingTop: 0,
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

function MyTabs() {
	// You need to provide the routes in descendant order.
	// This means that if you have nested routes like:
	// users, users/new, users/edit.
	// Then the order should be ['users/add', 'users/edit', 'users'].
	const routeMatch = useRouteMatch(['/Annuity', '/Payout', '/'])
	const currentTab = routeMatch?.pattern?.path
	const { couple, setStoredCouple } = useContext(CoupleContext)
	const { theme } = useContext(ThemeModeContext)

	const handleTabChange = () => {
		window.scrollTo(0, 0)
		setStoredCouple(couple)
	}
	const TitleWrapper = styled('div')(() => ({
		top: 1,
		paddingLeft: 75,
		paddingBottom: 0,
		// width: 150,
		zIndex: 9,
		position: 'relative',
		color: theme.palette.getContrastText(theme.palette.background.paper),
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'left',
		justifyContent: 'left',
	}))

	return (
		<Box sx={{ paddingTop: '75px', paddingLeft: '100px' }}>
			<AppBar
				enableColorOnDark={false}
				sx={{
					height: 71,
				}}
			>
				<TitleWrapper>
					<Box
						sx={{
							display: {
								xs: 'none',
								sm: 'none',
								md: 'block',
								width: drawerWidth - 21,

								boxSizing: 'border-box',
							},
						}}
					/>
					<Typography variant='h5'>Annuity Calculator</Typography>
				</TitleWrapper>
				<StyledToolbar>
					<Box
						sx={{
							display: {
								xs: 'none',
								sm: 'none',
								md: 'block',
								width: drawerWidth - 21,
								height: 71,

								boxSizing: 'border-box',
							},
						}}
					/>
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
				</StyledToolbar>
				<SizeId />
				<AppMenu />
			</AppBar>
		</Box>
	)
}

const App = () => (
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
)

export default App
