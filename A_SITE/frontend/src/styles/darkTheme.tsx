/* eslint-disable no-unused-vars */
import { createTheme } from '@mui/material'
import { blueGrey, green, grey, indigo, red } from '@mui/material/colors'
import commonStyles from './commonStyles'

export default createTheme({
	...commonStyles,
	palette: {
		mode: 'dark',
		primary: {
			main: indigo[400],
		},
		secondary: {
			main: indigo[400],
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
		text: {
			disabled: grey[800],
		},
		background: {
			paper: grey[900],
			default: grey[800],
		},
	},
	components: {
		MuiSlider: {
			styleOverrides: {
				root: {
					'& .Mui-disabled.MuiSlider-thumb': {
						color: grey[800],
					},
				},
			},
		},
	},
})
