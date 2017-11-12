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
			<div class="is-flex c_c" v-else>
				<i class="icon icon_confirmed wh15 mr5"></i> <span>Projektet använder ett avtal</span>
			</div>
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
				project: 'userProjectDetails'
			})
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
					})
			}
		}
	}
</script>