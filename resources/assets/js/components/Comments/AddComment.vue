<template>
	<div class="add-comment-component mb50">
		
		<h3>Lägg till en kommentar</h3>
		<div class="form-group mb10">
			<textarea class="form-control" v-model="comment"></textarea>
		</div>

		<div class="form-group text-right">
			<span class="comments-as" v-if="authenticated">
				Du kommenterar som <a class="is-link cursor-default">@{{ user.username }}</a>
			</span>
			<span class="comments-as" v-else>
				Du måste <a class="is-link" @click="$store.dispatch('openModal', {component: 'login'})">logga in</a> innan du kan kommentera
			</span>
			<button 
				class="btn btn-primary"
				:class="{'processing': processing}"
				:disabled="!comment || !authenticated || processing"
				@click="add"
				v-text="'Kommentera'" />
		</div>
	</div>
</template>

<script>
	import Model from '../../includes/Model';
	import { mapGetters } from 'vuex'; 

	export default {
		data() {
			return {
				comment: '',
				processing: false
			}
		},
		computed: {
			...mapGetters({
				authenticated: 'isAuthenticated',
				user: 'authUser',
				service: 'service'
			})
		},
		methods: {
			add() {
				this.processing = true;

				new Model(`services/${this.service.id}/comments`).post({body: this.comment})
					.then(response => {
						this.$store.dispatch('addComment', {comment: response.data.comment});

						// Clear input and stop processing
						this.comment = '';
						this.processing = false;
					})
					.catch(error => {
						this.processing = false;
					});
			}
		}
	}
</script>