<template>
	<div class="project_accept-component">
		<h4 class="text-center">Acceptera startandet av projektet</h4>
		<div class="gray-sub-text mb30">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, fuga, aliquam ipsam cupiditate asperiores doloribus repellat.</div>
		<div class="project-acceptance-container">
			<div class="acceptance-box project-user user__me">
				<div class="user-username" v-text="me.username"></div>
				<div class="user-avatar" :style="{'background-image': `url(${me.avatar})`}"></div>
				<div class="acceptance-status-container">
					<div class="gray-sub-text">Accepterar du projektet?</div>
					<div class="acceptance-buttons-container">
						<template v-if="me.pivot.accepted">
							<div class="is-flex c_c">
								<i class="icon icon_confirmed wh15 mr5"></i> <span>Du har accepterat</span>
							</div>
						</template>
						<template v-else>
							<button type="button" class="btn btn-primary" @click.prevent="accept">Ja</button>
							<button type="button" class="btn btn-danger" @click.prevent="cancel">Nej</button>
						</template>
					</div>
				</div>
			</div>
			<div class="acceptance-box acceptance__time">
				<div class="time-items-container">
					<app-timer :ends="project.accept_ends" />
					<div class="gray-sub-text" v-text="filters.time(project.accept_ends)"></div>
				</div>
			</div>
			<div class="acceptance-box project-user user__other">
				<div class="user-username" v-text="other.username"></div>
				<div class="user-avatar" :style="{'background-image': `url(${other.avatar})`}"></div>
				<div class="acceptance-status-container">
					<div class="gray-sub-text">Har {{ other.username }} accepterat?</div>
					<div class="acceptance-buttons-container">
						<button type="button" class="btn btn-default" disabled>
							{{ other.pivot.accepted ? 'Ja' : 'Nej' }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import appTimer from '../../Includes/Timer';
	import Model from '../../../includes/Model';

	export default {
		components: {
			appTimer
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
			}
		},
		methods: {
			accept() {
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