import { createTheme, Theme, ThemeProvider } from '@mui/material'
import { createContext, useMemo } from 'react'

import { useDarkMode } from 'usehooks-ts'
import darkTheme from './darkTheme'
import lightTheme from './lightTheme'

interface IThemeModeContext {
	handleToggle: () => void
	theme: Theme
}

const defaultMode = {
	handleToggle: () => {},
	theme: createTheme(),
}

const ThemeModeContext = createContext<IThemeModeContext>(defaultMode)

const ThemeModeContextProvider = ({ children }: any) => {
	const { isDarkMode, toggle } = useDarkMode()
	const mode = isDarkMode ? 'dark' : 'light'
	const handleToggle = toggle

	const contextValue = useMemo(() => {
		const theme = mode === 'light' ? lightTheme : darkTheme
		return {
			handleToggle,
			theme,
		}
	}, [mode, handleToggle])

	const body = document.querySelector('body')
	if (body) {
		body.style.backgroundColor = contextValue.theme.palette.background.paper
		body.style.color = contextValue.theme.palette.getContrastText(
			contextValue.theme.palette.background.paper
		)
	}

	return (
		<ThemeModeContext.Provider value={contextValue}>
			<ThemeProvider theme={contextValue.theme}>{children}</ThemeProvider>
		</ThemeModeContext.Provider>
	)
}

export { ThemeModeContext, ThemeModeContextProvider }
