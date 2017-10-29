<template>
	<div class="project_use_contract-component">
		<h4 class="text-center">Vill du använda avtal?</h4>
		<p class="gray-sub-text mb30">
			Vi har automatiskt lagt in detaljerna från det accepterade budet. Detta kan du själv ändra innan vi startar projektet men tänk på att den andra parten kommer behöva acceptera ändringarna.
		</p>
		<p class="text-center">
			<button 
				type="submit" 
				class="btn btn-success" 
				:class="{processing}" 
				:disabled="processing"
				v-text="`Jag vill använda avtal`"
				@click.prevent="useContract">
			</button>
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

						this.processing = false;
					})
					.catch(error => {
						console.log('error');
						this.processing = false;
					})
			}
		}
	}
</script>