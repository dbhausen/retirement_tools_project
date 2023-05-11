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
import { ThemeModeContext } from '../styles/ThemeModeContext'
import Assets from './Assets'
import Outlook from './Outlook'
import StressResults from './StressResults'
import SizeId from '../components/SizeId'

import AppMenu from '../AppMenu'
import {
	AntTab,
	AntTabs,
	StyledToolbar,
	TitleWrapper,
} from '../components/AntTab'
import { StressTestContextProvider } from './StressTestContext'

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
	const routeMatch = useRouteMatch(['/Assets', '/Outlook', '/StressResults'])
	const currentTab = routeMatch?.pattern?.path
		? routeMatch?.pattern?.path
		: '/Assets'

	const { drawerWidth } = useContext(ThemeModeContext)

	const handleTabChange = () => {
		window.scrollTo(0, 0)
	}

	return (
		<Box sx={{ paddingTop: '75px', paddingLeft: '100px' }}>
			<AppBar
				enableColorOnDark={false}
				sx={{
					height: 70,
				}}
			>
				<TitleWrapper>
					<Box
						sx={{
							display: {
								xs: 'none',
								sm: 'none',
								md: 'block',
								width: drawerWidth - 25,
								boxSizing: 'border-box',
							},
						}}
					/>

					<Typography variant='h5'>Income Stress Test</Typography>
				</TitleWrapper>
				<StyledToolbar>
					<Box
						sx={{
							display: {
								xs: 'none',
								sm: 'none',
								md: 'block',
								width: drawerWidth - 30,

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
									<Grid>Assets/</Grid>
									<Grid>Income</Grid>
								</Grid>
							}
							value='/Assets'
							to='/Assets'
							component={Link}
						/>
						<AntTab
							label={
								<Grid container direction='column'>
									<Grid>Outlook</Grid>
								</Grid>
							}
							value='/Outlook'
							to='/Outlook'
							component={Link}
						/>
						<AntTab
							label={
								<Grid container direction='column'>
									<Grid>Results</Grid>
									<Grid>Table</Grid>
								</Grid>
							}
							value='/StressResults'
							to='/StressResults'
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
	<Router>
		<MyTabs />
		<StressTestContextProvider>
			<Routes>
				<Route path='/Assets' element={<Assets />} />
				<Route path='/Outlook' element={<Outlook />} />
				<Route path='/StressResults' element={<StressResults />} />
			</Routes>
		</StressTestContextProvider>
	</Router>
)

export default App
