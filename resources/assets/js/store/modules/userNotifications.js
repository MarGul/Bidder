import { 
	SET_USER_NOTIFICATIONS_FETCHED,
	SET_USER_NOTIFICATIONS,
	SET_USER_NOTIFICATIONS_CAN_LOAD_MORE,
	SET_USER_NOTIFICATIONS_PAGE
} from '../mutation-types';

import Model from '../../includes/Model';

const state = {
	fetched: false,
	notifications: [],
	canLoadMore: false,
	page: 0
}

const mutations = {
	[SET_USER_NOTIFICATIONS_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_USER_NOTIFICATIONS](state, notifications) {
		state.notifications = notifications;
	},
	[SET_USER_NOTIFICATIONS_CAN_LOAD_MORE](state, canLoadMore) {
		state.canLoadMore = canLoadMore;
	},
	[SET_USER_NOTIFICATIONS_PAGE](state, page) {
		state.page = page;
	}
}

const actions = {
	getNotifications({commit, state}) {
		commit('SET_USER_NOTIFICATIONS_PAGE', state.page + 1);
		
		new Model('user/notifications').get({page: state.page})
			.then(response => {
				// Fetching the first ones or loading more?
				let notifications = state.page === 1 ? response.data.notifications.data : state.notifications.concat(response.data.notifications.data);
				commit('SET_USER_NOTIFICATIONS', notifications);

				commit('SET_USER_NOTIFICATIONS_CAN_LOAD_MORE', response.data.hasMore);
				commit('SET_USER_NOTIFICATIONS_FETCHED', true);
			});
	},
	markNotificationsAsRead({commit, state}) {
		let notifications = state.notifications;
		notifications.forEach(notification => notification.read_at = 'read');
		commit('SET_USER_NOTIFICATIONS', notifications);

		new Model('user/notifications/mark-all-read').patch();
	}
}

const getters = {
	userNotificationsFetched: state => state.fetched,
	userNotifications: state => state.notifications,
	userUnreadNotifications: state => state.notifications.filter(notification => !notification.read_at).length
}

export default {
	state,
	mutations,
	actions,
	getters
}