import { 
	SET_EVENT_NOTIFICATION_SHOWING,
    SET_EVENT_NOTIFICATION_TYPE,
    SET_EVENT_NOTIFICATION_HEADING,
    SET_EVENT_NOTIFICATION_TEXT
} from '../mutation-types';

const state = {
	showing: false,
	type: '',
    heading: '',
    text: ''
}

const mutations = {
	[SET_EVENT_NOTIFICATION_SHOWING](state, showing) {
		state.showing = showing;
	},
	[SET_EVENT_NOTIFICATION_TYPE](state, type) {
		state.type = type;
	},
	[SET_EVENT_NOTIFICATION_HEADING](state, heading) {
		state.heading = heading;
    },
    [SET_EVENT_NOTIFICATION_TEXT](state, text) {
		state.text = text;
	}
}

const actions = {
	eventNotification({commit}, payload) {
		commit('SET_EVENT_NOTIFICATION_SHOWING', true);
		commit('SET_EVENT_NOTIFICATION_TYPE', payload.type);
		commit('SET_EVENT_NOTIFICATION_HEADING', payload.heading);
		commit('SET_EVENT_NOTIFICATION_TEXT', payload.text);
    },
    closeEventNotification({commit}) {
        commit('SET_EVENT_NOTIFICATION_SHOWING', false);
		commit('SET_EVENT_NOTIFICATION_TYPE', '');
		commit('SET_EVENT_NOTIFICATION_HEADING', '');
		commit('SET_EVENT_NOTIFICATION_TEXT', '');
    }
}

const getters = {    
    eventNotificationShowing: state => state.showing,
    eventNotificationType: state => state.type,
    eventNotificationHeading: state => state.heading,
    eventNotificationText: state => state.text
}

export default {
	state,
	mutations,
	actions,
	getters
}