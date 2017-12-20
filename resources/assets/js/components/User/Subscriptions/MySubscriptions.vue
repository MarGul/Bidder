<template>
	<div class="my_subscriptions-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Prenumerationer</h3>
			</header>
			<div class="gray-contentSection-content">
				<app-add-subscription />
			</div>
			<div class="white-contentSection-content">
				<app-list-subscriptions />		
			</div>
		</section>

	</div>
</template>

<script>
	import appAddSubscription from "./AddSubscription";
	import appListSubscriptions from './ListSubscriptions';

	export default {
		components: {
			appAddSubscription,
			appListSubscriptions
		}
	}
</script>