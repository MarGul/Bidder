<template>
	<div class="modal-mask">
		<div class="modal-container" :class="[$store.getters.modalSize]">
			<span class="close" @click="$store.dispatch('closeModal')">
				<i class="fa fa-times fa-lg" aria-hidden="true"></i>
			</span>

			<component :is="$store.getters.modalComponent"></component>

		</div>
	</div>
</template>

<script>
	import register from '../Auth/Register';
    import login from '../Auth/Login';
    import passwordReset from '../Auth/PasswordReset';
    import createBid from '../Bids/CreateBid';
    import showBids from '../Bids/ShowBids';

	export default {
		components: {
			register,
			login,
			passwordReset,
			createBid,
			showBids
		}
	}
</script>