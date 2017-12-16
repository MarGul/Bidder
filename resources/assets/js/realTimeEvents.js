import store from './store/store';


class ProjectEvents
{
    /**
     * Event for project using a contract
     * @param {Object} data 
     */
    usingContract(data)
    {
        if ( !this.projectDetailsActive(data.project.id) ) return;

        store.dispatch('useContract', {history: data.history, usersNotAccepted: data.usersNotAccepted });
        store.dispatch('eventNotification', {
            type: 'success', heading: 'Använda avtal!', text: 'Den andra parten vill använda ett avtal för projektet.'
        });
    }

    /**
     * Event for project removing the contract
     * @param {Object} data 
     */
    removedContract(data)
    {
        if ( !this.projectDetailsActive(data.project.id) ) return;

        store.dispatch('removeContract', {history: data.history, usersNotAccepted: data.usersNotAccepted });
        store.dispatch('eventNotification', {
            type: 'danger', heading: 'Tog bort avtal!', text: 'Den andra parten tog bort att ett avtal skulle användas för projektet.'
        });
    }

    /**
     * Event for project removing the contract
     * @param {Object} data 
     */
    accepted(data)
    {
        if ( !this.projectDetailsActive(data.project.id) ) return;

        store.commit('SET_USER_PROJECTS_FETCHED', false);
        store.dispatch('acceptProject', {started: data.started, userAcceptedId: data.userAcceptedId, history: data.history });
        store.dispatch('eventNotification', {
            type: 'success', heading: 'Projektet accepterat!', text: 'Den andra parten har accepterat projektets start.'
        });
    }

    /**
     * Is the project view active for the user that we are receiving an event for?
     */
    projectDetailsActive(projectId)
    {
        return store.getters.userProjectDetailsFetched && store.getters.userProjectDetails.id === projectId;
    }
}

export default {
    listen() {
        this.listenGuest();
        this.listenAuth();
    },
    listenGuest() {
        Echo.channel('services')
            .listen('NewService', (e) => {
                store.dispatch('addService', {service: e.service});
            })
            .listen('RemoveService', (e) => {
                store.dispatch('removeService', {id: e.id});
            });
    },
    listenAuth() {
        if ( store.getters.isAuthenticated ) {
            
            let projectEvents = new ProjectEvents;

            Echo.private(`users.${store.getters.authUser.id}`)
                .notification((notification) => {
                    switch (notification.type) {
                        case 'App\\Notifications\\ProjectUsingContract':
                            projectEvents.usingContract(notification.data);
                            break;
                        case 'App\\Notifications\\ProjectRemoveContract':
                            projectEvents.removedContract(notification.data);
                            break;
                        case 'App\\Notifications\\ProjectAccepted':
                            projectEvents.accepted(notification.data);
                            break;
                    }
                })
        }
    }
};