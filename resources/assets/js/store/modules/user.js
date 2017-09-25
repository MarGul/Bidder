import Model from '../../includes/Model';

const user = {
	state: {
		notificationSettings: [],
		notificationSettingsFetched: false,
		projects: [],
		projectsFetched: false,
		projectFocus: null
	},
	mutations: {
		'SET_NOTIFICATIONSETTINGS'(state, payload) {
			state.notificationSettings = payload.notificationSettings;
		},
		'SET_NOTIFICATIONSETTINGS_FETCHED'(state, payload) {
			state.notificationSettingsFetched = payload.fetched;
		},
		'SET_PROJECTS'(state, payload) {
			state.projects = payload.projects;
		},
		'SET_PROJECTS_FETCHED'(state, payload) {
			state.projectsFetched = payload.fetched;
		},
		'SET_PROJECT_FOCUS'(state, payload) {
			state.projectFocus = payload.project;
		}
	},
	actions: {
		clearUserState({commit}) {
			commit('SET_NOTIFICATIONSETTINGS', {notificationSettings: []});
			commit('SET_NOTIFICATIONSETTINGS_FETCHED', {fetched: false});
			commit('SET_BIDS', {bids: []});
			commit('SET_BIDS_FETCHED', {fetched: false});
			commit('SET_PROJECTS', {projects: []});
			commit('SET_PROJECTS_FETCHED', {fetched: false});
			commit('SET_PROJECT_FOCUS', {project: null});
		},
		fetchUserNotificationSettings({commit, rootState}) {
			return new Promise((resolve, reject) => {
				new Model(`users/${rootState.auth.user.id}/notification-settings`).get()
					.then(response => {
						commit('SET_NOTIFICATIONSETTINGS_FETCHED', {fetched: true});
						commit('SET_NOTIFICATIONSETTINGS', {notificationSettings: response.notificationSettings});
						resolve(true);
					});
			});
		},
		fetchUserProjects({commit, rootState}, payload = {}) {
			new Model('user/{id}/projects').setId(rootState.auth.user.id).get()
				.then(response => {
					commit('SET_PROJECTS', {projects: response.projects});
					commit('SET_PROJECTS_FETCHED', {fetched: true});
					// If we have passed in a focusId then set the project with that Id as focus.
					if ( payload.focusId ) {
						let focus = response.projects.find(project => project.id == payload.focusId);
						commit('SET_PROJECT_FOCUS', {project: focus});
					}
				});
		}
	},
	getters: {
		userNotificationSettings: state => state.notificationSettings,
		userNotificationSettingsFetched: state => state.notificationSettingsFetched,
		userProjects: state => state.projects,
		userProjectsFetched: state => state.projectsFetched,
		userProjectFocus: state => state.projectFocus
	}
}

export default user;
