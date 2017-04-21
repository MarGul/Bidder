const notifications = {
	state: {
		showing: false,
		type: '',
		notification: ''
	},
	mutations: {
		'SET_SHOWING'(state, showing) {
			state.showing = showing;
		},
		'SET_TYPE'(state, type) {
			state.type = type;
		},
		'SET_NOTIFICATION'(state, notification) {
			state.notification = notification;
		}
	},
	actions: {
		showNotification({commit}, payload) {
			commit('SET_SHOWING', true);
			commit('SET_TYPE', payload.type);
			commit('SET_NOTIFICATION', payload.msg);
		},
		closeNotification({commit}) {
			commit('SET_SHOWING', false);
			commit('SET_TYPE', '');
			commit('SET_NOTIFICATION', '');
		}
	},
	getters: {
		showingNotification: state => state.showing,
		notificationType: state => state.type,
		notificationMessage: state => state.notification
	}
}

export default notifications;