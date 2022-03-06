/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import Box from '@mui/material/Box'
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
import { AppBar, Toolbar } from '@mui/material'
import Payout from 'Payout'
import Actuary from 'Actuary'
import Annuity from 'Annuity'
import SizeId from 'SizeId'
import { CoupleContext, defaultCouple } from 'CoupleContext'
import { AnnuityContext, defaultAnnuityConfig } from 'AnnuityContext'
import { useState } from 'react'

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

	return (
		<AppBar color='secondary'>
			<Toolbar>
				<Tabs value={currentTab}>
					<Tab label='Your Stats' value='/' to='/' component={Link} />

					<Tab
						label='Annuity'
						value='/Annuity'
						to='/Annuity'
						component={Link}
					/>
					<Tab
						label='Payout'
						value='/Payout'
						to='/Payout'
						component={Link}
					/>
				</Tabs>
			</Toolbar>
			<SizeId />
		</AppBar>
	)
}

const App = () => {
	const [couple, setCouple] = useState(defaultCouple)
	const [annuityConfig, setAnnuityConfig] = useState(defaultAnnuityConfig)

	return (
		<CoupleContext.Provider
			value={{
				couple,
				setCouple,
			}}
		>
			<AnnuityContext.Provider value={{ annuityConfig, setAnnuityConfig }}>
				<Router>
					<Box sx={{ width: '100%' }}>
						<MyTabs />
						<Routes>
							<Route path='*' element={<Actuary />} />
							<Route path='/Payout' element={<Payout />} />
							<Route path='/Annuity' element={<Annuity />} />
						</Routes>
					</Box>
				</Router>
			</AnnuityContext.Provider>
		</CoupleContext.Provider>
	)
}

export default App
