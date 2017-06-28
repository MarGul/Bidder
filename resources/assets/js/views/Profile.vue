<template>
	<div class="profile-component">
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				fetched: false,
				user: {}
			}
		},
		created() {
			console.log(this.$route.params.username)
		}
	}
</script>