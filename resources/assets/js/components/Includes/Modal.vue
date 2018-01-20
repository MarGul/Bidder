<template>
	<div class="modal-mask">
		<transition name="slide-down-up" v-if="$store.getters.modalOpen" appear>
			<div class="modal-container" :class="[$store.getters.modalSize]" v-click-outside="close">
				<span class="close" @click="close">
					<i class="icon h_delete wh15 light-gray" :class="[closeClass]"></i>
				</span>

				<component :is="$store.getters.modalComponent"></component>

			</div>
		</transition>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import register from '../Auth/Register';
    import login from '../Auth/Login';
    import passwordReset from '../Auth/PasswordReset';
    import createBid from '../Bids/CreateBid';
    import showBids from '../Bids/ShowBids';
    import showUserBid from '../User/Services/ShowBidModal';
	import confirm from './ConfirmModal';
	import alert from './AlertModal';

	export default {
		components: {
			register,
			login,
			passwordReset,
			createBid,
			showBids,
			confirm,
			alert,
			showUserBid
		},
		computed: {
			...mapGetters({
				modalData: 'modalData'
			}),
			closeClass() {
				if ( this.modalData.hasOwnProperty('closeClass') ) {
					return this.modalData.closeClass;
				}

				return '';
			}
		},
		methods: {
			close() {
				this.$store.dispatch('closeModal');
			}
		}
	}
</script>