import { SET_AUTHENTICATED, SET_AUTHENTICATED_USER, SET_AUTHENTICATED_INTENDED } from '../mutation-types'
import router from '../../router'

const state = {
	authenticated: window.auth.authenticated || false,
	user: window.auth.user || {},
	intended: null
}

const mutations = {
	[SET_AUTHENTICATED](state, authenticated) {
		state.authenticated = authenticated
	},
	[SET_AUTHENTICATED_USER](state, user) {
		state.user = user
	},
	[SET_AUTHENTICATED_INTENDED](state, intended) {
		state.intended = intended
	}
}

const actions = {
	logout({commit}) {
		axios.post('/logout', {}, {baseURL: window.location.origin})
			.then(response => {
				commit('SET_AUTHENTICATED', false)
				commit('SET_AUTHENTICATED_USER', {})
				commit('SET_AUTHENTICATED_INTENDED', null)

				router.push('/')
			})
			.catch(error => window.location.reload())
	}
}

const getters = {
	isAuthenticated: state => state.authenticated,
	authUser: state => state.user,
	authIntended: state => state.intended
}

export default {
	state,
	mutations,
	actions,
	getters
}