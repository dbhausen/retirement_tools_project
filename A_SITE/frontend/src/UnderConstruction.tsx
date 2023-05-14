import { AppBar, Box, Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import { ThemeModeContext } from 'contexts/ThemeModeContext'
import AppMenu from './AppMenu'

interface IProps {
	appName: string
}

const UnderConstruction = (props: IProps) => {
	const { drawerWidth } = useContext(ThemeModeContext)
	const { appName } = props
	return (
		<Box sx={{ paddingTop: '70px', paddingBottom: '10px' }}>
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
							{appName}
						</Typography>
					</Grid>

					<AppMenu />
				</Grid>
			</AppBar>
			<Typography variant='h5' gutterBottom>
				{appName} is under construction
			</Typography>
		</Box>
	)
}

export default UnderConstruction
