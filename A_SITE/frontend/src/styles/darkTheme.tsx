/* eslint-disable no-unused-vars */
import { createTheme } from '@mui/material'
import { blueGrey, green, grey, indigo, red } from '@mui/material/colors'
import commonAccordian from './commonAccordian'
import commonStyles from './commonStyles'

export default createTheme({
	...commonStyles,
	palette: {
		mode: 'dark',
		primary: {
			main: indigo[300],
		},
		secondary: {
			main: indigo[200],
		},

		success: {
			main: green[400],
		},
		error: {
			main: red[400],
		},
		text: {
			disabled: grey[800],
		},
		background: {
			paper: '#1D1D1D',
			default: '#060606',
		},
		grey: {
			A400: '#1D1D1D',
			A700: '#060606',
		},
	},
	components: {
		MuiSlider: {
			styleOverrides: {
				root: {
					'.Mui-disabled.MuiSlider-thumb': {
						color: grey[800],
					},
					'&.Mui-disabled > .MuiSlider-track': {
						color: grey[800],
					},
					'&.Mui-disabled > .MuiSlider-rail': {
						color: grey[800],
					},
				},
			},
		},
		...commonAccordian,
	},
})
