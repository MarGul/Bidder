<template>
	<div class="project_accept-component">
		<h4 class="text-center">Acceptera startandet av projektet</h4>
		<div class="gray-sub-text mb30">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, fuga, aliquam ipsam cupiditate asperiores doloribus repellat.</div>
		
		<app-project-user-actions :me="me" :other="other">
					
			<template slot="action-type-container">
				<div class="gray-sub-text">Avbryts om</div>
				<app-timer :ends="project.service_end" />
				<div class="gray-sub-text">den {{ filters.time(project.accept_ends) }}</div>
			</template>
			
			<template slot="me-status">
				<div class="gray-sub-text mb5">Starta projektet?</div>
				<template v-if="me.pivot.accepted">
					<div class="is-flex c_c">
						<i class="icon icon_confirmed wh15 mr5"></i> <span>Du har accepterat</span>
					</div>
				</template>
				<template v-else>
					<button type="button" class="btn btn-primary" @click.prevent="accept">
						<div class="is-flex c_c">
							<i class="icon icon_checkbox_checked white wh12 mr10"></i> <span>Ja</span>
						</div>
					</button>
					<button type="button" class="btn btn-danger" @click.prevent="cancel">
						<div class="is-flex c_c">
							<i class="icon h_delete white wh15 mr10"></i> <span>Nej</span>
						</div>
					</button>
				</template>
			</template>

			<template slot="other-status">
				<div class="gray-sub-text mb5">Har {{ other.username }} acceperat?</div>
				<template v-if="other.pivot.accepted">
					<div class="is-flex c_c">
						<i class="icon icon_confirmed wh15 mr5"></i> <span>Ja</span>
					</div>
				</template>
				<template v-else>
					<div class="is-flex c_c">
						<i class="icon icon_decline wh15 mr5"></i> <span>Nej</span>
					</div>
				</template>
			</template>

		</app-project-user-actions>
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import appTimer from '../../Includes/Timer';
	import Model from '../../../includes/Model';
	import appProjectUserActions from './ProjectUserActions';

	export default {
		components: {
			appTimer,
			appProjectUserActions
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails',
				auth: 'authUser'
			}),
			me() {
				return this.project.users.find(u => u.id === this.auth.id);
			},
			other() {
				return this.project.users.find(u => u.id !== this.auth.id);
			},
			canAccept() {
				if ( !this.project.use_contract ) return true;

				if ( this.me.pivot.contract_accepted ) return true;

				return false;
			}
		},
		methods: {
			accept() {
				// If the project is using contract and the user hasn't accepted the contract.
				if ( !this.canAccept ) {
					this.$store.dispatch('openModal', {
						component: 'alert',
						data: {
							alertText: `Projektet använder sig av ett avtal. Du måste först godkänna avtalet innan du accepterar projketes start.`
						}
					});
					return;
				}

				// Everything is good, let him accept the start.
				this.$store.dispatch('openModal', {
					component: 'confirm',
					data: {
						confirmText: 'Är du säker på att du vill acceptera? När båda två har accepterat så startar vi projektet!',
						onConfirm: () => {
							new Model(`projects/${this.project.id}/accept`).put()
								.then(response => {
									this.$store.dispatch('showNotification', {
										type: 'success', 
										msg: 'Du har nu accepterat projektet. Så fort den andra parten accepterat så startar vi projektet.'
									});
									// Set the projects fetched to false so we break the cache.
									this.$store.commit('SET_USER_PROJECTS_FETCHED', false);
									// Update the state of the project
									this.$store.dispatch('acceptProject', {
										started: response.data.started,
										userAcceptedId: response.data.userAcceptedId,
										history: response.data.history
									});

									this.$store.dispatch('closeModal');
								})
								.catch(error => {
									console.log(error);
								});
						}
					}
				});
			},
			cancel() {
				this.$store.dispatch('openModal', {
					component: 'confirm',
					data: {
						confirmText: 'Är du säker på att du inte vill acceptera? Detta kommer att avbryta projektet!',
						onConfirm: () => {
							new Model(`projects/${this.project.id}/cancel`).put()
								.then(response => {
									this.$store.dispatch('showNotification', {
										type: 'success', 
										msg: 'Du har nu avbrutit projektet :(. Bättre lycka nästa gång!'
									});
									// Set the projects fetched to false so we break the cache.
									this.$store.commit('SET_USER_PROJECTS_FETCHED', false);
									// Update the state of the project.
									this.$store.dispatch('cancelProject', {
										userCancelledId: response.data.userCancelledId,
										history: response.data.history
									});

									this.$store.dispatch('closeModal');
								})
								.catch(error => {
									console.log(error);
								});
						}
					}
				});
			}
		}
	}
</script>