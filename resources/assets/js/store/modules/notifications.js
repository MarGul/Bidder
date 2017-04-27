const notifications = {
	state: {
		showing: false,
		type: '',
		notification: '',
		link: '',
		linkText: ''
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
		},
		'SET_LINK'(state, link) {
			state.link = link;
		},
		'SET_LINK_TEXT'(state, linkText) {
			state.linkText = linkText;
		}
	},
	actions: {
		showNotification({commit}, payload) {
			commit('SET_SHOWING', true);
			commit('SET_TYPE', payload.type);
			commit('SET_NOTIFICATION', payload.msg);
			if ( payload.link ) commit('SET_LINK', payload.link);
			if ( payload.linkText ) commit('SET_LINK_TEXT', payload.linkText);
		},
		closeNotification({commit}) {
			commit('SET_SHOWING', false);
			commit('SET_TYPE', '');
			commit('SET_NOTIFICATION', '');
			commit('SET_LINK', '');
			commit('SET_LINK_TEXT', '');
		}
	},
	getters: {
		showingNotification: state => state.showing,
		notificationType: state => state.type,
		notificationMessage: state => state.notification,
		notificationLink: state => state.link,
		notificationLinkText: state => state.linkText,
	}
}

export default notifications;