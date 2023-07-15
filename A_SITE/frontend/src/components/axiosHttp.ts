import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import env from '../Env'
import AxiosCustomError from './axiosCustomError'

// following used by axios to generate a x-csrftoken header with csrftoken cookie value
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'

const onResponse = (response: AxiosResponse): AxiosResponse => {
	const { method, url } = response.config
	const { status } = response
	// Set Loading End Here
	// Handle Response Data Here
	// Error Handling When Return Success with Error Code Here
	// eslint-disable-next-line no-console
	console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`)

	return response
}

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
	if (axios.isAxiosError(error)) {
		const { message } = error
		const { method, url } = error.config as AxiosRequestConfig
		const { status } = (error.response as AxiosResponse) ?? {}

		// eslint-disable-next-line no-console
		console.log(
			`🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
		)

		switch (status) {
			case 400: {
				const allMessages: string[] = []
				if (error.response?.data.username !== undefined) {
					error.response?.data.username.forEach((m: string) => {
						allMessages.push(m)
					})
				}
				if (error.response?.data.password !== undefined) {
					error.response?.data.password.forEach((m: string) => {
						allMessages.push(m)
					})
				}
				const customError: AxiosCustomError = {
					...error,
					customName:
						allMessages.length > 0
							? 'AxiosRegistrationError'
							: 'AxiosCustomError',
					messageList: allMessages,
				}
				return Promise.reject(customError)
			}
			case 401: {
				// "Login required"
				break
			}
			case 403: {
				// "Permission denied"
				break
			}
			case 404: {
				// "Invalid request"
				break
			}
			case 500: {
				// "Server error"
				break
			}
			default: {
				// "Unknown error occurred"
				break
			}
		}

		if (status === 401) {
			// Delete Token & Go To Login Page if you required.
			sessionStorage.removeItem('token')
		}
	} else {
		// eslint-disable-next-line no-console
		console.log(`🚨 [API] | Error ${error.message}`)
	}

	return Promise.reject(error)
}

const axiosHttp = axios.create({
	// withCredentials adds cookies to request needed for csrftoken and sessionid
	withCredentials: true,
	baseURL: `${env().API_HOST}`,
	headers: {
		'Content-type': 'application/json',
	},
})

axiosHttp.interceptors.response.use(onResponse, onErrorResponse)

export default axiosHttp
