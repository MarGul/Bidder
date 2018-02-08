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
	page: 1
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
		new Model('user/notifications').get({page: state.page})
			.then(response => {
				// Fetching the first ones or loading more?
				let notifications = state.page === 1 ? response.data.notifications.data : state.notifications.concat(response.data.notifications.data);
				commit('SET_USER_NOTIFICATIONS', notifications);

				commit('SET_USER_NOTIFICATIONS_CAN_LOAD_MORE', response.data.hasMore);
				commit('SET_USER_NOTIFICATIONS_FETCHED', true);
			});
	}
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