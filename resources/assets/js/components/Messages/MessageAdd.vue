<template>
	<div class="add_message-component clearfix">
		<textarea 
			rows="3" 
			class="form-control" 
			placeholder="Skriv ditt meddelande här..."
			v-model="message">
		</textarea>
		<button class="btn btn-primary mt5" @click.prevent="send" :disabled="!message">
			Skicka
		</button>
	</div>
</template>

<script>
	import Model from '../../includes/Model';

	export default {
		props: {
			resource: {
				type: Number,
				required: true
			}
		},
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
				
				new Model(`projects/${this.resource}/messages`).post({message: message})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>