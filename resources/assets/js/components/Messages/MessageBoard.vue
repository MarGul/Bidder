<template>
	<div class="message_board-component">
		
		<send-message @added="add"></send-message>

	</div>
</template>

<script>
	import sendMessage from './SendMessage.vue';

	export default {
		components: {
			sendMessage
		},
		methods: {
			add(msg) {
				console.log(msg);
			}
		}
	}
</script>