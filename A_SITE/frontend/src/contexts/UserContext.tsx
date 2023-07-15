/* eslint-disable no-unused-vars */

import React, {
	createContext,
	useState,
	useEffect,
	useMemo,
	Dispatch,
	SetStateAction,
} from 'react'
import axios from 'axios'

// const axios = require('axios').defaults

interface IUser {
	name: string
	isLoggedIn: boolean
}

interface IUserContext {
	user: IUser
	setUser: Dispatch<SetStateAction<IUser>>
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

const defaultUser = {
	name: 'Anonymous',
	isLoggedIn: false,
}

const defaultContext = {
	user: defaultUser,
	setUser: () => {},
	open: false,
	setOpen: () => {},
}

// create context
const UserContext = createContext<IUserContext>(defaultContext)

const UserContextProvider = ({ children }: any) => {
	const [user, setUser] = useState<IUser>(defaultContext.user)
	const [open, setOpen] = useState(false)

	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			open,
			setOpen,
		}),
		[user, setUser, open, setOpen]
	)

	return (
		// the Provider gives access to the context to its children
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserContextProvider }
