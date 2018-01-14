<template>
	<div class="project_phase_running-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Projektet är i full gång!</h3>
			</header>
			<div class="white-contentSection-content">
				<p>Projektet kommer automatiskt att avslutas enligt tiden som ni har kommit överens om.</p>
				<p>
					Är projektet slutfört innan den överenskomna tiden? Då kan du välja att slutföra projektet i förtid genom att klicka på Ja knappen.<br>
				</p>
				<p>Båda parterna behöver klicka på knappen för att projektet ska avslutas tidigare än överenskommet.</p>
			</div>
			<div class="gray-contentSection-content">
				<app-project-user-actions :me="me" :other="other">
					
					<template slot="action-type-container">
						<div class="gray-sub-text">Slutförs om</div>
						<app-timer :ends="project.service_end" />
						<div class="gray-sub-text">den {{ filters.date(project.service_end) }}</div>
					</template>
					
					<template slot="me-status">
						<div class="gray-sub-text mb5">Slutfört?</div>
						<template v-if="me.pivot.completed">
							<div class="is-flex c_c">
								<i class="icon icon_confirmed wh15 mr5 cursor-default"></i> <span>Ja</span>
							</div>
						</template>
						<template v-else>
							<button type="button" class="btn btn-primary" @click="complete">
								<div class="is-flex c_c">
									<i class="icon icon_checkbox_checked white wh12 mr10"></i> <span>Ja</span>
								</div>
							</button>
						</template>
					</template>

					<template slot="other-status">
						<div class="gray-sub-text mb5">Slutfört?</div>
						<template v-if="other.pivot.completed">
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
		</section>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import appProjectUserActions from './ProjectUserActions';
    import appTimer from '../../Includes/Timer';
    import Model from '../../../includes/Model';

	export default {
		components: {
			appProjectUserActions,
			appTimer
		},
		computed: {
			...mapGetters({
                auth: 'authUser',
                project: 'userProjectDetails'
            }),
            me() {
				return this.project.users.find(u => u.id === this.auth.id);
			},
			other() {
				return this.project.users.find(u => u.id !== this.auth.id);
            },
		},
		methods: {
			complete() {
				this.$store.dispatch('openModal', {
					component: 'confirm',
					data: {
						confirmText: `Är du säker på att du vill markera projketet som slutfört?
									Annars slutförs det per automatik den ${this.filters.date(this.project.service_end)}.`,
						onConfirm: () => {
							new Model(`projects/${this.project.id}/complete`).put()
								.then(response => {
									this.$store.dispatch('showNotification', {
										type: 'success', 
										msg: 'Du har nu markerat projektet som slutfört.'
									});
									// Set the projects fetched to false so we break the cache.
									this.$store.commit('SET_USER_PROJECTS_FETCHED', false);
									// Update the state of the project
									this.$store.dispatch('completeProject', {
										completed: response.data.completed,
										userCompletedId: response.data.userCompletedId,
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