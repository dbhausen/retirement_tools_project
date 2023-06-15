import { useContext } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton } from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import { getCookie } from 'typescript-cookie'

import { UserContext } from '../contexts/UserContext'

import axiosHttp from './axiosHttp'

const LoginLogoutButton = (props: any) => {
	const { user, setUser } = useContext(UserContext)
	//	const loginURL = `${env().API_HOST}/polls/login/`

	const handleClick = () => {
		if (!user.isLoggedIn) {
			// eslint-disable-next-line no-console
			console.log(`crsftoken=${getCookie('csrftoken')}`)

			axiosHttp
				.post('/polls/login/', {
					username: 'david',
					password: 'MuskieWaters',
				})
				.then(response => {
					// eslint-disable-next-line no-console
					console.log(response.data)
					setUser({ name: response.data.username, isLoggedIn: true })
				})
				.catch(err => {
					// eslint-disable-next-line no-console
					console.log(err)
				})
		} else {
			axiosHttp.post('/polls/logout/').then(() => {
				setUser({ name: '', isLoggedIn: false })
			})
		}
	}

	return (
		<IconButton {...props} onClick={handleClick}>
			{user.name}
			{user.isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
		</IconButton>
	)
}

export default LoginLogoutButton
