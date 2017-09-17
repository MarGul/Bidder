import Model from '../../includes/Model';

const user = {
	state: {
		notificationSettings: [],
		notificationSettingsFetched: false,
		services: [],
		servicesFetched: false,
		bids: [],
		bidsFetched: false,
		projects: [],
		projectsFetched: false,
		projectFocus: null,
		invoices: [],
		invoicesFetched: false,
		invoiceFocus: null
	},
	mutations: {
		'SET_NOTIFICATIONSETTINGS'(state, payload) {
			state.notificationSettings = payload.notificationSettings;
		},
		'SET_NOTIFICATIONSETTINGS_FETCHED'(state, payload) {
			state.notificationSettingsFetched = payload.fetched;
		},
		'SET_SERVICES'(state, payload) {
			state.services = payload.services;
		},
		'SET_SERVICES_FETCHED'(state, payload) {
			state.servicesFetched = payload.fetched;
		},
		'SET_BIDS'(state, payload) {
			state.bids = payload.bids;
		},
		'SET_BIDS_FETCHED'(state, payload) {
			state.bidsFetched = payload.fetched;
		},
		'SET_PROJECTS'(state, payload) {
			state.projects = payload.projects;
		},
		'SET_PROJECTS_FETCHED'(state, payload) {
			state.projectsFetched = payload.fetched;
		},
		'SET_PROJECT_FOCUS'(state, payload) {
			state.projectFocus = payload.project;
		},
		'SET_INVOICES'(state, payload) {
			state.invoices = payload.invoices;
		},
		'SET_INVOICES_FETCHED'(state, payload) {
			state.invoicesFetched = payload.fetched;
		},
		'SET_INVOICE_FOCUS'(state, payload) {
			state.invoiceFocus = payload.invoice;
		}
	},
	actions: {
		clearUserState({commit}) {
			commit('SET_NOTIFICATIONSETTINGS', {notificationSettings: []});
			commit('SET_NOTIFICATIONSETTINGS_FETCHED', {fetched: false});
			commit('SET_SERVICES', {services: []});
			commit('SET_SERVICES_FETCHED', {fetched: false});
			commit('SET_BIDS', {bids: []});
			commit('SET_BIDS_FETCHED', {fetched: false});
			commit('SET_PROJECTS', {projects: []});
			commit('SET_PROJECTS_FETCHED', {fetched: false});
			commit('SET_PROJECT_FOCUS', {project: null});
			commit('SET_INVOICES', {invoices: []});
			commit('SET_INVOICES_FETCHED', {fetched: false});
			commit('SET_INVOICE_FOCUS', {invoice: null});
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
		fetchUserServices({commit}) {
			new Model('user/services').get()
				.then(response => {
					commit('SET_SERVICES', {services: response.services});
					commit('SET_SERVICES_FETCHED', {fetched: true});
				});
		},
		fetchUserBids({commit}) {
			new Model('user/bids').get()
				.then(response => {
					commit('SET_BIDS', {bids: response.bids});
					commit('SET_BIDS_FETCHED', {fetched: true});
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
		},
		fetchUserInvoices({commit, rootState}, payload = {}) {
			new Model('users/{id}/invoices').setId(rootState.auth.user.id).get()
				.then(response => {
					commit('SET_INVOICES', {invoices: response.invoices});
					commit('SET_INVOICES_FETCHED', {fetched: true});

					// If we have passed in a focusId then set the invoice with that Id as focus.
					if ( payload.focusId ) {
						let focus = response.invoices.find(invoice => invoice.id == payload.focusId);
						commit('SET_INVOICE_FOCUS', {invoice: focus});
					}
				});
		}
	},
	getters: {
		userNotificationSettings: state => state.notificationSettings,
		userNotificationSettingsFetched: state => state.notificationSettingsFetched,
		userServices: state => state.services,
		userServicesFetched: state => state.servicesFetched,
		userBids: state => state.bids,
		userBidsFetched: state => state.bidsFetched,
		userProjects: state => state.projects,
		userProjectsFetched: state => state.projectsFetched,
		userProjectFocus: state => state.projectFocus,
		userInvoices: state => state.invoices,
		userInvoicesFetched: state => state.invoicesFetched,
		userInvoiceFocus: state => state.invoiceFocus
	}
}

export default user;
