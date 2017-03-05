<template>
	<div class="modal-mask">
		<div class="modal-container">
			<span class="close" @click="close">
				<i class="fa fa-times fa-lg" aria-hidden="true"></i>
			</span>

			<slot></slot>

		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			close() {
				this.$store.dispatch('closeModal');
			}
		}
	}
</script>