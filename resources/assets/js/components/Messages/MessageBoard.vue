<template>
	<div class="message_board-component">
		
		<send-message></send-message>

	</div>
</template>

<script>
	import sendMessage from './SendMessage.vue';

	export default {
		components: {
			sendMessage
		}
	}
</script>