<template>
	<div class="message_board-component">
		
		<template v-if="fetched">
			<template v-if="messages.length > 0">
				<message :message="message" v-for="message in messages"></message>
			</template>
			
			<div class="alert alert-warning" v-else>
				Det finns inga meddelanden än. Bli den första att säga hej genom att skicka ett meddelande nedan.
			</div>
		</template>

		<div class="load-spinner text-center margin-25" v-else>
			<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
			<span class="sr-only">Loading...</span>
		</div>

		<send-message @added="add"></send-message>

	</div>
</template>

<script>
	import sendMessage from './SendMessage';
	import message from './Message';
	import Model from '../../includes/models/Model';

	export default {
		components: {
			sendMessage,
			message
		},
		data() {
			return {
				messages: [],
				fetched: false
			}
		},
		methods: {
			add(msg) {
				let message = {
					project_id: this.$route.params.id,
					user: this.$store.getters.authUser,
					message: msg.message,
					created_at: ''
				}
				this.messages.push(message);
			}
		},
		created() {
			new Model('projects/{id}/messages').setId(this.$route.params.id).get()
				.then(response => {
					this.messages = response.messages;
					this.fetched = true;
				});
		}
	}
</script>

<style lang="scss">
	.alert {
		padding: 40px 15px;
		margin: 0;
	}
</style>