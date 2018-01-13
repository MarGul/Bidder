<template>
	<div class="my_bids-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Mina bud</h3>
			</header>
			<div class="white-contentSection-content">
				<template v-if="fetched">
					<ul class="items-list" v-if="bids.length > 0">
						<li class="gray-item clickable" v-for="bid in bids" @click="goTo(bid)">
							<div class="item-content">
								<div class="item-header" v-text="description(bid.description)"></div>
								<div class="item-sub-data">
									<span class="mr5">Bud lagt den {{ bidDate(bid) }}</span>&bull;
									<span class="ml5">Budet är {{ bid.accepted ? 'accepterat' : 'ej accepterat' }}</span>
								</div>
							</div>
							<div class="item-go-to">
								<i class="icon h_cheveron_right wh15 light-gray"></i>
							</div>
						</li>
					</ul>

					<div class="alert alert-info" v-else>Du inte lagt några bud än. Lägg ditt första bud på en tjänst som passar dig.</div>
				</template>


				<app-loading v-else></app-loading>
			</div>
		</section>

	</div>
</template>

<script>
	import Model from '../../../includes/Model';
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				fetched: 'userBidsFetched',
				bids: 'userBids'
			})
		},
		methods: {
			description(desc) {
				return desc.length > 75 ? `${desc.substr(0, 75)}...` : desc;
			},
			bidDate(bid) {
				return moment(bid.created_at).format('LLL');
			},
			goTo(bid) {
				this.$store.commit('SET_USER_BID_DETAILS_FETCHED', true);
				this.$store.commit('SET_USER_BID_DETAILS', bid);
				this.$router.push(`/user/bids/${bid.id}`);
			}
		},
		created() {
			if ( !this.fetched ) {
				new Model('user/bids').get()
					.then(response => {
						this.$store.commit('SET_USER_BIDS_FETCHED', true);
						this.$store.commit('SET_USER_BIDS', response.data.bids);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>