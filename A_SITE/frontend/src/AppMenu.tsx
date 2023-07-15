import { Box, IconButton } from '@mui/material'
import React, { useContext } from 'react'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

import MenuIcon from '@mui/icons-material/Menu'

import LoginLogoutButton from './components/LoginLogoutButton'
import ProfileButton from './components/ProfileButton'
import { ThemeModeContext } from './contexts/ThemeModeContext'
import CsrfTokenTag from './components/CrsfTokenTag'
import { UserContext } from './contexts/UserContext'
import ZodLoginLogoutButton from './components/ZodLoginLogoutButton'

const AppMenu = () => {
	const { handleToggle, theme, mobileOpen, setMobileOpen } =
		useContext(ThemeModeContext)

	const { user } = useContext(UserContext)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	return (
		<Box sx={{ height: '40px' }}>
			<CsrfTokenTag />

			<LoginLogoutButton
				sx={{ position: 'absolute', right: 60, top: 0, ml: 1 }}
				color='inherit'
			/>

			<ZodLoginLogoutButton
				sx={{ position: 'absolute', right: 61, top: 25, ml: 1 }}
				color='inherit'
			/>

			{user.isLoggedIn ? (
				<ProfileButton
					sx={{ position: 'absolute', right: 120, top: 25, ml: 1 }}
					color='inherit'
				/>
			) : null}

			<IconButton
				sx={{ position: 'absolute', right: 30, top: 0, ml: 1 }}
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
						right: 30,
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
