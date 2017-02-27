<template>
	<h4>Service</h4>
</template>

<script>
	export default {
		props: ['service'],
		mounted() {
			console.log(this.service);
		}
	}
</script>