import axios from 'axios'
import env from '../Env'

// following used by axios to generate a x-csrftoken header with csrftoken cookie value
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'

const axiosHttp = axios.create({
	// withCredentials adds cookies to request needed for csrftoken and sessionid
	withCredentials: true,
	baseURL: `${env().API_HOST}`,
	headers: {
		'Content-type': 'application/json',
	},
})

export default axiosHttp
