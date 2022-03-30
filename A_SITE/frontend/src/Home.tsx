import { AppBar, Box, Typography } from '@mui/material'
import React from 'react'
import AppMenu from './AppMenu'

const Home = () => (
	<Box sx={{ paddingTop: '75px' }}>
		<AppBar>
			<AppMenu />
		</AppBar>
		<Typography gutterBottom>hello</Typography>
	</Box>
)

export default Home
