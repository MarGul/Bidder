<template>
	<transition name="fast-fade-out" v-if="maskShow">
		<div class="modal-mask" v-if="maskShow">
			<transition name="slide-down-up" v-if="open" appear>
				<div class="modal-container" :class="[$store.getters.modalSize]" v-click-outside="close">
					<span class="close" @click="close">
						<i class="icon h_delete wh15 light-gray" :class="[closeClass]"></i>
					</span>

					<component :is="component"></component>

				</div>
			</transition>
		</div>
	</transition>
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
		data() {
			return {
				maskShow: false
			}
		},
		computed: {
			...mapGetters({
				open: 'modalOpen',
				modalData: 'modalData',
				component: 'modalComponent'
			}),
			closeClass() {
				if ( this.modalData.hasOwnProperty('closeClass') ) {
					return this.modalData.closeClass;
				}

				return '';
			}
		},
		watch: {
			open(newOpen, oldOpen) {
				if ( newOpen ) {
					this.maskShow = true;
				} else {
					setTimeout(() => {
						this.maskShow = false;
					}, 200);
				}
			}
		},
		methods: {
			close() {
				this.$store.dispatch('closeModal');
			}
		}
	}
</script>