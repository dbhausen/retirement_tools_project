import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from '@mui/material/styles'
import App from './App'
import theme from './MyTheme'

function Appp() {
	return (
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	)
}

ReactDOM.render(<Appp />, document.getElementById('root'))
