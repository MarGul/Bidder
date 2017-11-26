<template>
	<div class="project_bid-component">
		<one-bid :bid="bid" />
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
				project: 'userProjectDetails'
			}),
			bid() {
				return this.project.bid;
			}
		}
	}
</script>