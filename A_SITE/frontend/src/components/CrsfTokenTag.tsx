import React, { useEffect, useState } from 'react'
import { getCookie } from 'typescript-cookie'

import axiosHttp from './axiosHttp'

const CsrfTotenTag = () => {
	const [csrf, setcsrf] = useState('')

	useEffect(() => {
		axiosHttp
			.get(`/polls/csrf/`, { withCredentials: true })
			.then(response => {
				const cookie = getCookie('csrftoken')
				if (cookie !== undefined && cookie !== null) {
					// eslint-disable-next-line no-console
					console.log(response.data)
					setcsrf(cookie)
				}
			})
	}, [])

	return <input type='hidden' name='csrfmiddlewaretoken' value={csrf} />
}

export default CsrfTotenTag
