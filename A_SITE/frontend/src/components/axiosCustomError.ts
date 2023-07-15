import { AxiosError } from 'axios'

class AxiosCustomError extends AxiosError {
	customName!: string

	messageList!: string[]
}

export default AxiosCustomError
