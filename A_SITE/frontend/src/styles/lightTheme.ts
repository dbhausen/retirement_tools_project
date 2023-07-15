import { createTheme } from '@mui/material'
import { blue, green, grey, purple, red } from '@mui/material/colors'
import commonAccordian from './commonAccordian'
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
			main: green[800],
		},
		error: {
			main: red[800],
		},
		background: {
			paper: grey[200],
			default: grey[300],
		},
		grey: {
			A400: blue[900],
			A700: blue[300],
		},
	},
	components: {
		...commonAccordian,
	},
})
