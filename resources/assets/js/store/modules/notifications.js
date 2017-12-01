import { 
	SET_NOTIFICATION_SHOWING, 
	SET_NOTIFICATION_TYPE, 
	SET_NOTIFICATION
} from '../mutation-types';

const state = {
	showing: false,
	type: '',
	notification: ''
}

const mutations = {
	[SET_NOTIFICATION_SHOWING](state, showing) {
		state.showing = showing;
	},
	[SET_NOTIFICATION_TYPE](state, type) {
		state.type = type;
	},
	[SET_NOTIFICATION](state, notification) {
		state.notification = notification;
	}
}

const actions = {
	showNotification({commit}, payload) {
		commit('SET_NOTIFICATION_SHOWING', true);
		commit('SET_NOTIFICATION_TYPE', payload.type);
		commit('SET_NOTIFICATION', payload.msg);
	},
	closeNotification({commit}) {
		commit('SET_NOTIFICATION_SHOWING', false);
		commit('SET_NOTIFICATION_TYPE', '');
		commit('SET_NOTIFICATION', '');
	}
}

const getters = {
	notificationShowing: state => state.showing,
	notificationType: state => state.type,
	notificationMessage: state => state.notification
}

export default {
	state,
	mutations,
	actions,
	getters
}