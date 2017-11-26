<template>
	<div class="view_all_bids-component">
		<div class="content-link-section mb15">
			<a @click.prevent="$emit('changeView', {view: 'appEditServiceForm'})">
				<i class="icon_go_back mr5"></i>Redigera
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