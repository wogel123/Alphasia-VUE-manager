import AuthService from '../services/auth.service'

export const auth = {
	namespaced: true,
	state: {
		status: {
			logged: false
		},
		user: null
	},
	actions: {
		checkLogin ({ commit }, token) {
			return AuthService.checkLogin(token)
				.then(data => {
					commit('checkLogin', data)
					return Promise.resolve(data)
				})
		},
		logout({commit}, token) {
			AuthService.logout(token)
				.then(data => {
					commit('logout');
					return Promise.resolve(data)
				})
		},
	},
	mutations: {
		checkLogin(state, data) {
			state.status.logged = data.logged
			state.user = data.user
		},
		logout(state) {
			state.status.logged = false;
			state.user = null;
		}
	}
}