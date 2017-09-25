import { SET_USER_INVOICES_FETCHED, SET_USER_INVOICES, SET_USER_INVOICES_FOCUS } from '../mutation-types';

const state = {
	fetched: false,
	invoices: [],
	focusId: null
}

const mutations = {
	[SET_USER_INVOICES_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_USER_INVOICES](state, invoices) {
		state.invoices = invoices;
	},
	[SET_USER_INVOICES_FOCUS](state, focusId) {
		state.focusId = parseInt(focusId);
	}
}

const actions = {
	
}

const getters = {
	userInvoicesFetched: state => state.fetched,
	userInvoices: state => state.invoices,
	userInvoicesFocus: state => {
		return state.invoices.find(invoice => invoice.id === state.focusId);
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}