import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from '@mui/material/styles'
import AnnuityApp from './App'
import theme from './MyTheme'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AnnuityApp />
		</ThemeProvider>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
