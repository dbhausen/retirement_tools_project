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
	Grid,
	IconButton,
	styled,
	Toolbar,
	Typography,
} from '@mui/material'
import Payout from 'Payout'
import Actuary from 'Actuary'
import Annuity from 'Annuity'
import SizeId from 'SizeId'
import { CoupleContext, CoupleContextProvider } from 'CoupleContext'
import { AnnuityContextProvider } from 'AnnuityContext'
import { UserContextProvider } from 'UserContext'
import { useContext } from 'react'

import {
	ThemeModeContextProvider,
	ThemeModeContext,
} from 'styles/ThemeModeContext'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

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

const AntTabs = styled(Tabs)({
	marginTop: 25,
	borderBottom: '1px solid primary',
	'& .MuiTabs-indicator': {
		//	backgroundColor: 'secondary',
	},
})

const AntTab = styled((props: StyledTabProps) => (
	<Tab disableRipple={false} {...props} />
))(({ theme }) => ({
	textTransform: 'capitalize',
	minWidth: 0,

	// color: '#1A237E',
	// backgroundColor: 'secondary',
	paddingTop: 0,
	paddingBottom: 1,

	fontSizeAdjust: 'from-font',

	'&:hover': {
		color: 'secondary',

		opacity: 10,
	},
	'&.Mui-selected': {
		color: theme.palette.secondary.main,
		// backgroundColor: 'secondary.dark',
		borderBottom: '5px solid secondary.light',
	},
	'&.Mui-focusVisible': {
		backgroundColor: '#d1eaff',
	},
	'&.Mui-disabled': {
		color: '#546E7A',
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
	const { handleToggle, theme } = useContext(ThemeModeContext)

	const handleTabChange = () => {
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
			<AppBar enableColorOnDark={true} sx={{ height: 71 }}>
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
						sx={{ ml: 1 }}
						onClick={handleToggle}
						color='inherit'
					>
						{theme.palette.mode === 'light' ? (
							<Brightness4Icon />
						) : (
							<Brightness7Icon />
						)}
					</IconButton>
				</StyledToolbar>
				<SizeId />
			</AppBar>
		</Box>
	)
}

const App = () => (
	<UserContextProvider>
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
	</UserContextProvider>
)

export default App
