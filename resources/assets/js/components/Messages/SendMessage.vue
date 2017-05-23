<template>
	<div class="send_message-component clearfix">
		<textarea rows="4" class="form-control" v-model="message"
					placeholder="Skriv ditt meddelande här..."></textarea>
		<button class="btn btn-flat btn-primary" @click.prevent="send" :disabled="!message">
			Skicka
		</button>
	</div>
</template>

<script>
	import Model from '../../includes/Model';

	export default {
		data() {
			return {
				message: ''
			}
		},
		methods: {
			send() {
				// Instantly add the new message to the messages array
				let message = this.message;
				this.$emit('added', {message});
				this.message = '';
				
				new Model('projects/{id}/messages').setId(this.$route.params.id).post({message: message})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}
</script>