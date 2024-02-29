import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/api'

class AuthService {
	checkLogin (token) {
		return axios
			.post(API_URL + '/user/checkLogin', {
				token: token
			})
			.then(response => {
				return response.data
			})
	}

	logout(token) {
		return axios
			.post(API_URL + '/user/logout', {
				token: token
			})
			.then(response => {
				let d = new Date();
				let expires = "expires=" + d.toUTCString();
				document.cookie =
					"SessionCookie=bye;" + expires + ";path=/";
				window.location.href = import.meta.env.VITE_MAIN_URL

				return response.data;
			})
	}
}

export default new AuthService()