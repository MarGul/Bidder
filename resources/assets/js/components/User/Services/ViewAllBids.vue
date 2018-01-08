<template>
	<div class="view_all_bids-component">
		<div class="content-link-section mb15">
			<a @click.prevent="$emit('changeView', {view: 'appEditServiceForm'})" class="is-link is-flex v-center">
				<i class="icon icon_go_back wh12 primary mr10"></i> Tillbaka
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
				service: 'serviceDetailsService'
			}),
			bids() {
				if ( !this.service.has_accepted_bid ) return this.service.bids;
				
				// Sort the accepted bid first.
				return this.service.bids.sort((a,b) => {
					if ( a.accepted ) return -1;

					return b.accepted ? 1 : 0;
				});
			}
		}
	}
</script>