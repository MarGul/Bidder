import { SET_USER_NOTIFICATION_SETTINGS_FETCHED, SET_USER_NOTIFICATION_SETTINGS } from '../mutation-types';

const state = {
	settingsFetched: false,
	settings: []
}

const mutations = {
	[SET_USER_NOTIFICATION_SETTINGS_FETCHED](state, fetched) {
		state.settingsFetched = fetched;
	},
	[SET_USER_NOTIFICATION_SETTINGS](state, settings) {
		state.settings = settings;
	}
}

const actions = {
	
}

const getters = {
	userNotificationSettingsFetched: state => state.settingsFetched,
	userNotificationSettings: state => state.settings
}

export default {
	state,
	mutations,
	actions,
	getters
}