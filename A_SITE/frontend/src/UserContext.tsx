/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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
}

// create context
const UserContext = createContext<IUserContext | null>(null)

const UserContextProvider = ({ children }: any) => {
	const [user, setUser] = useState<IUser>({
		name: 'Anonymous',
		isLoggedIn: false,
	})
	const url = 'https://randomuser.me/api/'

	// fetch a user from a fake backend API
	useEffect(() => {
		const fetchUser = () => {
			// this would usually be your own backend, or localStorage
			// for example

			axios.get(url).then((response: any) => {
				const ruser = response.data.results[0]

				setUser({
					name: ruser.name.last,
					isLoggedIn: true,
				})
			})
		}

		fetchUser()
	}, [])

	const contextValue = useMemo(
		() => ({
			user,
			setUser,
		}),
		[user, setUser]
	)

	return (
		// the Provider gives access to the context to its children
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserContextProvider }
