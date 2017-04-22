<template>
	<button @click="test">Test</button>
</template>

<script>
	export default {
		methods: {
			test() {
				this.$store.dispatch('showNotification', {type: 'success', msg: 'My notification', link: '/service/28', linkText: 'visa service'});
			}
		}
	}
</script>