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
import { AppBar, Grid, styled, Toolbar } from '@mui/material'
import Payout from 'Payout'
import Actuary from 'Actuary'
import Annuity from 'Annuity'
import SizeId from 'SizeId'
import { CoupleContext, CoupleContextProvider } from 'CoupleContext'
import { AnnuityContextProvider } from 'AnnuityContext'
import { UserContextProvider } from 'UserContext'
import { blue } from '@mui/material/colors'
import { useContext } from 'react'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	alignItems: 'flex-start',
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(2),

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
	borderBottom: '1px solid primary',
	'& .MuiTabs-indicator': {
		backgroundColor: 'primary',
	},
})

const AntTab = styled((props: StyledTabProps) => (
	<Tab disableRipple={false} {...props} />
))(({ theme }) => ({
	textTransform: 'capitalize',
	minWidth: 0,
	[theme.breakpoints.up('sm')]: {
		minWidth: 0,
	},
	fontWeight: theme.typography.fontWeightLight,
	marginRight: theme.spacing(1),
	color: '#1A237E',
	backgroundColor: 'secondary',
	paddingTop: 0,
	paddingBottom: 0,

	fontSizeAdjust: 'from-font',

	'&:hover': {
		color: '#1A237E',
		fontWeight: theme.typography.fontWeightMedium,
		opacity: 1,
	},
	'&.Mui-selected': {
		color: 'primary',
		fontWeight: theme.typography.fontWeightMedium,
		backgroundColor: blue[500],
		borderBottom: '1px solid secondary',
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

	const handleTabChange = () => {
		setStoredCouple(couple)
	}

	return (
		<AppBar color='secondary'>
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
			</StyledToolbar>
			<SizeId />
		</AppBar>
	)
}

const App = () => (
	<UserContextProvider>
		<CoupleContextProvider>
			<AnnuityContextProvider>
				<Router>
					<Box sx={{ width: '100%' }}>
						<MyTabs />
						<Routes>
							<Route path='*' element={<Actuary />} />
							<Route path='/Annuity' element={<Annuity />} />
							<Route path='/Payout' element={<Payout />} />
						</Routes>
					</Box>
				</Router>
			</AnnuityContextProvider>
		</CoupleContextProvider>
	</UserContextProvider>
)

export default App
