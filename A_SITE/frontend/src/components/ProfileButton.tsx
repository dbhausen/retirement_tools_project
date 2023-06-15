import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import { IconButton } from '@mui/material'

import axiosHttp from './axiosHttp'

const ProfileButton = (props: any) => {
	const handleClick = () => {
		axiosHttp
			.get('/polls/profile/', { withCredentials: true })
			.then(response2 => {
				// eslint-disable-next-line no-console
				console.log(response2.data)
			})
	}

	return (
		<IconButton {...props} onClick={handleClick}>
			<ViewWeekIcon>profle</ViewWeekIcon>
		</IconButton>
	)
}

export default ProfileButton
