/* eslint-disable no-undef */
import { createTheme, Theme, ThemeProvider } from '@mui/material'
import {
	createContext,
	Dispatch,
	SetStateAction,
	useMemo,
	useState,
} from 'react'

import { useDarkMode } from 'usehooks-ts'
import darkTheme from './darkTheme'
import lightTheme from './lightTheme'

interface IThemeModeContext {
	handleToggle: () => void
	theme: Theme
	setMobileOpen: Dispatch<SetStateAction<boolean>>
	mobileOpen: boolean
	drawerWidth: number
}

const defaultMode = {
	handleToggle: () => {},
	theme: createTheme(),
	setMobileOpen: () => {},
	mobileOpen: false,
	drawerWidth: 240,
}

const ThemeModeContext = createContext<IThemeModeContext>(defaultMode)

const ThemeModeContextProvider = ({ children }: any) => {
	const { isDarkMode, toggle } = useDarkMode()
	const [mobileOpen, setMobileOpen] = useState(false)
	const mode = isDarkMode ? 'dark' : 'light'
	const handleToggle = toggle
	const drawerWidth = 240

	const contextValue = useMemo(() => {
		const theme = mode === 'light' ? lightTheme : darkTheme
		return {
			handleToggle,
			theme,
			mobileOpen,
			setMobileOpen,
			drawerWidth,
		}
	}, [mode, handleToggle, mobileOpen, setMobileOpen, drawerWidth])

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
