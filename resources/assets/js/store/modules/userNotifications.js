import { 
	SET_USER_NOTIFICATIONS_FETCHED,
	SET_USER_NOTIFICATIONS
} from '../mutation-types';

const state = {
	fetched: false,
	notifications: []
}

const mutations = {
	[SET_USER_NOTIFICATIONS_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_USER_NOTIFICATIONS](state, notifications) {
		state.notifications = notifications;
	}
}

const actions = {
	
}

const getters = {
	userNotificationsFetched: state => state.fetched,
	userNotifications: state => state.notifications
}

export default {
	state,
	mutations,
	actions,
	getters
}