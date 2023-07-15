import React, { useEffect, useState } from 'react'
import { getCookie } from 'typescript-cookie'

import axiosHttp from './axiosHttp'

const CsrfTotenTag = () => {
	const [csrf, setcsrf] = useState('')

	useEffect(() => {
		axiosHttp.get(`/polls/csrf/`, { withCredentials: true }).then(() => {
			const cookie = getCookie('csrftoken')
			if (cookie !== undefined && cookie !== null) {
				setcsrf(cookie)
			}
		})
	}, [])

	// 'csrfmiddlewaretoken'  hidden field can be used in a POST form to send csrftoken if django server is has setting
	// 'CSRF_COOKIE_HTTPONLY = True'
	// with 'CSRF_COOKIE_HTTPONLY = False' the csrftoken can be sent directly as a cookie
	return <input type='hidden' name='csrfmiddlewaretoken' value={csrf} />
}

export default CsrfTotenTag
