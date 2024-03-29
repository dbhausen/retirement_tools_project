const env = () => {
	const d = { API_HOST: 'https://www.restreact.com' }
	if (process.env.NODE_ENV === 'development') {
		d.API_HOST = 'http://localhost:8000'
	} else if (process.env.NODE_ENV === 'production') {
		d.API_HOST = 'https://www.restreact.com'
	}
	return d
}
export default env
