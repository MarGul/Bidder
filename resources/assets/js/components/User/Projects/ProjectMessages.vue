<template>
	<div class="project_messages-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Skicka meddelande</h3>
			</header>
			<div class="gray-contentSection-content">
				<message-add 
					:resource="project.id" 
					@added="addMessage"
				/>
			</div>
			<message 
				v-for="message in messages" 
				:key="message.id"
				:message="message"
				:me="isMe(message)" 
			/>
		</section>
	</div>
</template>

<script>
	import messageAdd from '../../Messages/MessageAdd';
	import message from '../../Messages/Message';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			messageAdd,
			message
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails',
				auth: 'authUser'
			}),
			messages() {
				return this.project.messages;
			}
		},
		methods: {
			addMessage(message) {
				if ( !message.hasOwnProperty('user') ) {
					message.project_id = this.project.id;
					message.user = this.auth;
					created_at: moment().format('YYYY-MM-DD HH:mm:ss');
				}

				this.$store.dispatch('messageAdded', {message});
			},
			isMe(message) {
				return message.user.id == this.auth.id;
			}
		}
	}
</script>