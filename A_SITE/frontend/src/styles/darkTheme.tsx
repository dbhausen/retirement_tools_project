/* eslint-disable no-unused-vars */
import { createTheme } from '@mui/material'
import { blueGrey, green, grey, red } from '@mui/material/colors'
import commonStyles from './commonStyles'

export default createTheme({
	...commonStyles,
	palette: {
		mode: 'dark',
		primary: {
			main: grey[800],
		},
		secondary: {
			main: blueGrey[50],
		},
		success: {
			light: '#0d4b22',
			main: '#072d14',
			dark: '#03230e',
		},
		error: {
			light: '#910808',
			main: '#610505',
			dark: '#420606',
		},
	},
})
