<template>
	<div class="view_all_bids-component">
		<div class="content-link-section mb15">
			<a @click.prevent="$emit('changeView', {view: 'appEditServiceForm'})" class="is-link is-flex v-center">
				<i class="icon h_go_back wh20 light-gray mr10"></i>Tillbaka
			</a>
		</div>
		<one-bid 
			v-for="bid in bids" 
			:bid="bid" 
			:hasAccept="true"
			:key="bid.id" 
		/>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import oneBid from '../../Bids/OneBid';

	export default {
		components: {
			oneBid
		},
		computed: {
			...mapGetters({
				bids: 'serviceDetailsBids',
				bidAccepted: 'serviceDetailsBidAccepted'
			})
		}
	}
</script>