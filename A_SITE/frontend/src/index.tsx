import './styles/index.css'

import {
	Divider,
	Drawer,
	Grid,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	styled,
	Toolbar,
} from '@mui/material'

import CalculateIcon from '@mui/icons-material/Calculate'
import HomeIcon from '@mui/icons-material/Home'
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'
import TabIcon from '@mui/icons-material/Tab'
import { StrictMode, useContext, useState } from 'react'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line no-unused-vars
import { userInfo } from 'os'
import { UserContextProvider } from './contexts/UserContext'
import StressTestApp from './StressTestApp/StressTestApp'
import AnnuityApp from './AnnuityCalculatorApp/AnnuityCalculatorApp'
import Home from './Home'
import {
	ThemeModeContext,
	ThemeModeContextProvider,
} from './contexts/ThemeModeContext'
import SimpleTabs from './TabbedForm/TabGroup'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	alignItems: 'flex-start',
	backgroundColor: theme.palette.grey.A700,
	height: 71,
}))

const appList = [
	{ name: 'Home' },
	{ name: 'Annuity Calculator' },
	{ name: 'Income Stress Test' },
	{ name: 'Tabbed Form' },
]

function App() {
	const { mobileOpen, setMobileOpen, drawerWidth } =
		useContext(ThemeModeContext)
	const [selectedApp, setSelectedApp] = useState<string>('Annuity Calculator')
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}
	const handleClick = (selected: any) => {
		setSelectedApp(selected.app.name)
		setMobileOpen(false)
	}

	const drawer = (
		<div>
			<StyledToolbar />
			<Divider />
			<List>
				{appList.map(app => (
					<ListItemButton
						key={app.name}
						onClick={() => handleClick({ app })}
					>
						<ListItemIcon>
							{app.name === 'Home' ? <HomeIcon /> : null}
							{app.name === 'Annuity Calculator' ? (
								<CalculateIcon />
							) : null}
							{app.name === 'Income Stress Test' ? (
								<NetworkCheckIcon />
							) : null}
							{app.name === 'Tabbed Form' ? <TabIcon /> : null}
						</ListItemIcon>
						<ListItemText primary={app.name} />
					</ListItemButton>
				))}
			</List>
			<Divider />
		</div>
	)

	return (
		<Paper>
			<Grid id='page' container>
				<Grid
					id='menu-space'
					width={drawerWidth}
					sx={{
						display: {
							xs: 'none',
							sm: 'none',
							md: 'block',
						},
					}}
				/>
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { md: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: {
							xs: 'none',
							sm: 'none',
							md: 'block',
							lg: 'block',
						},
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
				<Grid item xs>
					{selectedApp === 'Annuity Calculator' ? <AnnuityApp /> : null}
					{selectedApp === 'Home' ? <Home /> : null}
					{selectedApp === 'Income Stress Test' ? <StressTestApp /> : null}
					{selectedApp === 'Tabbed Form' ? <SimpleTabs /> : null}
				</Grid>
			</Grid>
		</Paper>
	)
}

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
	<StrictMode>
		<UserContextProvider>
			<ThemeModeContextProvider>
				<App />
			</ThemeModeContextProvider>
		</UserContextProvider>
	</StrictMode>
)
