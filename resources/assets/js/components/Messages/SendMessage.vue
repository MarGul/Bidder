<template>
	<div class="send_message-component clearfix">
		<textarea rows="4" class="form-control" v-model="message"
					placeholder="Skriv ditt meddelande här..."></textarea>
		<button class="btn btn-flat btn-primary" @click.prevent="send" :disabled="!message || processing">
			Skicka
			<span class="processing" v-if="processing">
				<i class="fa fa-spinner fa-pulse fa-fw"></i>
				<span class="sr-only">Loading...</span>
			</span>
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: '',
				processing: false
			}
		},
		methods: {
			send() {
				this.processing = true;
				axios.post(`projects/${this.$route.params.id}/messages`, {message: this.message})
					.then(response => {
						console.log(response);
						this.message = '';
						this.processing = false;
					})
					.catch(error => {
						console.log(error);
						this.processing = false;
					});
			}
		}
	}
</script>