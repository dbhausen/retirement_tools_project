import { useContext } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton } from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import env from '../Env'

const LoginLogoutButton = (props: any) => {
	const { user, setUser } = useContext(UserContext)

	const handleClick = () =>
		user.isLoggedIn
			? setUser({ name: '', isLoggedIn: false })
			: setUser({ name: 'me', isLoggedIn: true })

	return (
		<IconButton {...props} onClick={handleClick}>
			{user.name}
			{user.isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
			{env().API_HOST}
		</IconButton>
	)
}

export default LoginLogoutButton
