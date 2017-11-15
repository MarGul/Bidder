<template>
	<div class="project_use_contract-component">
		<h4 class="text-center">Vill du använda avtal?</h4>
		<p class="gray-sub-text mb30">
			Vi har automatiskt lagt in detaljerna från det accepterade budet. Detta kan du själv ändra innan vi startar projektet men tänk på att den andra parten kommer behöva acceptera ändringarna.
		</p>
		<p>
			<div class="is-flex c_c" v-if="!project.use_contract">
				<button 
					type="submit" 
					class="btn btn-success" 
					:class="{processing}" 
					:disabled="processing"
					v-text="`Jag vill använda avtal`"
					@click.prevent="useContract">
				</button>
			</div>
			<template v-else>
				<div class="is-flex c_c">
					<i class="icon icon_confirmed wh15 mr5"></i> <span>Projektet använder ett avtal</span>
				</div>
				<div class="is-flex c_c">
					<button 
						type="button" 
						class="btn btn-info mt10"
						:class="{processing}"
						:disabled="processing"
						v-text="`Ta bort avtalet`"
						@click.prevent="removeContract">
					</button>
				</div>
			</template>
			
		</p>
	</div>
</template>

<script>
	import Model from '../../../includes/Model';
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				processing: false
			}
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails',
				auth: 'authUser'
			}),
			me() {
				return this.project.users.find( u => u.id === this.auth.id );
			}
		},
		methods: {
			useContract() {
				this.processing = true;
				new Model(`projects/${this.project.id}/use-contract`).put()
					.then(response => {
						this.$store.dispatch('useContract', {
							history: response.data.history,
							usersNotAccepted: response.data.usersNotAccepted
						});
						this.$store.dispatch('showNotification', {
							type: 'success', 
							msg: 'Vi har uppdaterat projektet till att nu använda ett avtal.'
						});
						this.processing = false;
					})
					.catch(error => {
						this.processing = false;
					});
			},
			removeContract() {
				this.$store.dispatch('openModal', {
					component: 'confirm',
					data: {
						confirmText: 'Är du säker på att du vill ta bort användningen av avtal för projektet? Den andra parten kommer att behöva acceptera projektets start igen?',
						onConfirm: () => {
							new Model(`projects/${this.project.id}/use-contract`).delete()
								.then(response => {
									this.$store.dispatch('showNotification', {
										type: 'success', 
										msg: 'Vi har tagit bort användningen av avtal för projektet.'
									});
									// Set the projects fetched to false so we break the cache.
									this.$store.commit('SET_USER_PROJECTS_FETCHED', false);
									// Update the project details in the store.
									this.$store.dispatch('removeContract', {history: response.data.history});

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