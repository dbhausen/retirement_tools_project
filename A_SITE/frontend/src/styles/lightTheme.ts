import { createTheme } from '@mui/material'
import { blue, green, grey, purple, red } from '@mui/material/colors'
import commonStyles from './commonStyles'

export default createTheme({
	...commonStyles,
	palette: {
		mode: 'light',
		primary: {
			main: blue[500],
		},
		secondary: {
			main: purple[900],
		},
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
		grey: {
			A400: blue[500],
			A700: blue[600],
		},
	},
})
