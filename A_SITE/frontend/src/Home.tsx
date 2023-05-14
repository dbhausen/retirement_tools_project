import { AppBar, Box, Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import { ThemeModeContext } from './contexts/ThemeModeContext'
import AppMenu from './AppMenu'

const Home = () => {
	const { drawerWidth } = useContext(ThemeModeContext)
	return (
		<Box sx={{ paddingTop: '72px', paddingBottom: '10px' }}>
			<AppBar sx={{ height: '70px' }}>
				<Grid container sx={{}}>
					<Grid
						item
						sx={{
							display: {
								xs: 'none',
								sm: 'none',
								md: 'block',
								width: drawerWidth,
								boxSizing: 'border-box',
							},
						}}
					/>
					<Grid>
						<Typography
							variant='h5'
							sx={{ padding: '22px' }}
							gutterBottom
						>
							Retirement Planning Tools
						</Typography>
					</Grid>

					<AppMenu />
				</Grid>
			</AppBar>
			<Typography
				variant='h3'
				component='div'
				sx={{ textAlign: 'center', padding: '15px' }}
				gutterBottom
			>
				The retirement planning tools you always wanted.
			</Typography>
			<Typography
				component='div'
				variant='body1'
				sx={{ padding: '15px' }}
				gutterBottom
			>
				RPT provides robust and configurable tools with no strings attached.
				<ul>
					<li>No Ads</li>
					<li>No Logins</li>
					<li>Secure (no data is sent)</li>
					<li>
						No Sponserships from financial services providers or insurance
						companies
					</li>
				</ul>
			</Typography>
		</Box>
	)
}

export default Home
