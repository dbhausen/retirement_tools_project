import { Box, IconButton } from '@mui/material'
import React, { useContext } from 'react'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import MenuIcon from '@mui/icons-material/Menu'
import { ThemeModeContext } from 'styles/ThemeModeContext'

const AppMenu = () => {
	const { handleToggle, theme, mobileOpen, setMobileOpen } =
		useContext(ThemeModeContext)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	return (
		<Box sx={{ marginTop: '70px' }}>
			<IconButton
				sx={{ position: 'absolute', right: 10, top: 0, ml: 1 }}
				onClick={handleToggle}
				color='inherit'
			>
				{theme.palette.mode === 'light' ? (
					<Brightness4Icon />
				) : (
					<Brightness7Icon />
				)}
			</IconButton>
			<IconButton
				sx={{
					display: {
						xs: 'block',
						sm: 'block',
						md: 'none',
						position: 'absolute',
						right: 10,
						top: 25,
						ml: 1,
					},
				}}
				edge='start'
				color='inherit'
				aria-label='open drawer'
				onClick={handleDrawerToggle}
			>
				<MenuIcon />
			</IconButton>
		</Box>
	)
}

export default AppMenu
