<template>
	<div class="modal-mask">
		<div class="modal-container" :class="[size]">
			<span class="close" @click="close">
				<i class="fa fa-times fa-lg" aria-hidden="true"></i>
			</span>

			<component :is="$store.getters.modalComponent"></component>

		</div>
	</div>
</template>

<script>
	import Register from '../Register/Register.vue';
    import Login from '../Auth/Login.vue';
    import CreateBid from '../Bids/CreateBid.vue';

	export default {
		components: {
			register: Register,
			login: Login,
			createBid: CreateBid
		},
		methods: {
			close() {
				this.$store.dispatch('closeModal');
			}
		},
		computed: {
			size() {
				return this.$store.getters.modalSize;
			}
		}
	}
</script>