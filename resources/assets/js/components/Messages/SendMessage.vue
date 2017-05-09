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
	export default {
		data() {
			return {
				message: ''
			}
		},
		methods: {
			send() {
				// Instantly add the new message to the messages array
				let msg = this.message;
				this.$emit('added', {msg});
				this.message = '';
				axios.post(`projects/${this.$route.params.id}/messages`, {message: msg})
					.then(response => {
						console.log(response);
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}
</script>