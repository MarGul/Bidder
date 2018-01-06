import store from './store/store';
import vue from 'vue';


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
     * Event for project being accepted by other user.
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
     * Event for project being cancelled by other user.
     * @param {Object} data 
     */
    cancelled(data)
    {
        if ( !this.projectDetailsActive(data.project.id) ) return;

        store.commit('SET_USER_PROJECTS_FETCHED', false);
        store.dispatch('cancelProject', {userCancelledId: data.userCancelledId, history: data.history });
        store.dispatch('eventNotification', {
            type: 'danger', heading: 'Projektet avbröts!', text: 'Den andra parten valde att avbryta projektet.'
        });
    }

    /**
     * Event for when a contract is updated
     * @param {Object} data 
     */
    contractUpdated(data)
    {
        if ( !this.projectDetailsActive(data.project.id) ) return;

        store.dispatch('projectContractUpdated', {contract: data.contract, history: data.history});
        store.dispatch('eventNotification', {
            type: 'success', heading: 'Avtalet uppdaterades!', text: 'Avtalet för projektet har uppdaterats.'
        });
    }

    /**
     * Event for when a user accept a contract
     * @param {Object} data 
     */
    contractAccepted(data)
    {
        if ( !this.projectDetailsActive(data.project.id) ) return;

        store.dispatch('projectContractAccepted', {userAcceptedId: data.userAcceptedId, history: data.history});
        store.dispatch('eventNotification', {
            type: 'success', heading: 'Avtalet godkändes!', text: 'Den andra parten har godkänt avtalet.'
        });
    }

    /**
     * Event for when a new project is created.
     * @param {Object} data 
     */
    created(data)
    {
        store.dispatch('eventNotification', {
            type: 'success', 
            heading: 'Ditt bud accepterades!', 
            text: 'Ditt bud har accepterats för en tjänst och ett projekt har skapats. Du hittar det under "Mina projekt"'
        });

        if ( store.getters.userProjectsFetched ) {
            let projects = store.getters.userProjects;
            projects.unshift(data.project);
            store.commit('SET_USER_PROJECTS', projects);
        }
    }

    /**
     * Details for a project is updated.
     * @param {Object} data 
     */
    detailsUpdated(data)
    {                
        if ( !this.projectDetailsActive(data.project.id) ) return;

        store.dispatch('projectDetailsUpdated', {
            project: data.project,
            history: data.history,
            usersNotAccepted: data.usersNotAccepted
        });

        store.dispatch('eventNotification', {
            type: 'success', 
            heading: 'Projektets detaljer uppdaterades!', 
            text: 'Den andra parten uppdaterade detaljerna för projektet.'
        });
    }

    /**
     * When a message is created for a project.
     * @param {Object} data 
     */
    messageCreated(data)
    {
        if ( !this.projectDetailsActive(data.project.id) ) return;

        store.dispatch('messageAdded', {message: data.message});
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
                        case 'App\\Notifications\\ProjectCancelled':
                            projectEvents.cancelled(notification.data);
                            break;
                        case 'App\\Notifications\\ProjectContractUpdated':
                            projectEvents.contractUpdated(notification.data);
                            break;
                        case 'App\\Notifications\\ProjectContractAccepted':
                            console.log(notification.data);
                            projectEvents.contractAccepted(notification.data);
                            break;
                        case 'App\\Notifications\\ProjectCreated':
                            projectEvents.created(notification.data);
                            break;
                        case 'App\\Notifications\\ProjectDetailsUpdated':
                            projectEvents.detailsUpdated(notification.data);
                            break;
                        case 'App\\Notifications\\ProjectMessageCreated':
                            projectEvents.messageCreated(notification.data);
                            break;
                    }
                })
        }
    }
};