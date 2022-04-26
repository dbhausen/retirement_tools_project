import { useContext } from 'react'
import {
	Route,
	Routes,
	Link,
	matchPath,
	useLocation,
	BrowserRouter as Router,
} from 'react-router-dom'
import { AppBar, Box, Grid, Typography } from '@mui/material'
import SizeId from 'components/SizeId'
import { ThemeModeContext } from 'styles/ThemeModeContext'
import Payout from './Payout'
import Actuary from './Actuary'
import Annuity from './Annuity'
import { AnnuityContextProvider } from './AnnuityContext'
import { CoupleContext, CoupleContextProvider } from './CoupleContext'
import AppMenu from '../AppMenu'
import {
	AntTab,
	AntTabs,
	StyledToolbar,
	TitleWrapper,
} from '../components/AntTab'

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
		? routeMatch?.pattern?.path
		: '/Annuity'
	const { couple, setStoredCouple } = useContext(CoupleContext)
	const { drawerWidth } = useContext(ThemeModeContext)

	const handleTabChange = () => {
		window.scrollTo(0, 0)
		setStoredCouple(couple)
	}

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
