<template>
	<div class="view_all_bids-component">
		<div class="content-link-section mb15">
			<a @click.prevent="$emit('changeView', {view: 'appEditServiceForm'})">
				<i class="icon_go_back mr5"></i>Redigera
			</a>
		</div>
		<app-one-bid :bid="bid" v-for="bid in bids" :key="bid.id"></app-one-bid>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import appOneBid from './OneBid';

	export default {
		components: {
			appOneBid
		},
		computed: {
			...mapGetters({
				bids: 'serviceDetailsBids',
				bidAccepted: 'serviceDetailsBidAccepted'
			})
		}
	}
</script>