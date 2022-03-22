import { createTheme } from '@mui/material'
import { green, grey, red } from '@mui/material/colors'
import commonStyles from './commonStyles'

export default createTheme({
	...commonStyles,
	palette: {
		mode: 'light',
		success: {
			light: green[50],
			main: green[100],
			dark: green[200],
		},
		error: {
			light: red[50],
			main: red[100],
			dark: red[200],
		},
		background: {
			paper: grey[200],
			default: grey[300],
		},
	},
})
