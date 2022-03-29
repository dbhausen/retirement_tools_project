import * as ReactDOM from 'react-dom'
import './styles/index.css'

import {
	Divider,
	Drawer,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	styled,
	Toolbar,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import {
	ThemeModeContext,
	ThemeModeContextProvider,
} from 'styles/ThemeModeContext'
import { useContext } from 'react'
import AnnuityApp from './App'

const drawerWidth = 240

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	alignItems: 'flex-start',
	backgroundColor: theme.palette.grey.A700,
	height: 71,

	// Override media queries injected by theme.mixins.toolbar
	//	'@media all': {
	//		minHeight: 20,
	//		maxHeight: 31,
	// 	},
}))

const drawer = (
	<div>
		<StyledToolbar />
		<Divider />
		<List>
			{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
				<ListItem button key={text}>
					<ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			))}
		</List>
		<Divider />
		<List>
			{['All mail', 'Trash', 'Spam'].map((text, index) => (
				<ListItem button key={text}>
					<ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			))}
		</List>
	</div>
)

function App() {
	const { mobileOpen, setMobileOpen } = useContext(ThemeModeContext)
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

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
					<AnnuityApp />
				</Grid>
			</Grid>
		</Paper>
	)
}

ReactDOM.render(
	<ThemeModeContextProvider>
		<App />
	</ThemeModeContextProvider>,
	document.getElementById('root')
)
