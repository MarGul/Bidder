<template>
	<div class="my_subscriptions-component">
		
		<h1 class="user-component-title">Prenumerationer</h1>

		<app-add-subscription></app-add-subscription>
	</div>
</template>

<script>
	import appAddSubscription from "./AddSubscription";

	export default {
		components: {
			appAddSubscription
		}
	}
</script>