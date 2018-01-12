<template>
	<div class="service_bids-component">
		<section class="transparent-contentSection">
			<header class="transparent-contentSection-header has-link">
				<h3>Budhistorik</h3>
				<a class="is-link" @click.prevent="$emit('changeView', {view: 'appViewAllBids'})">Visa alla</a>
			</header>
			<div class="transparent-contentSection-content">
				<ul class="items-list-icon">
					<li class="clickable has-go-to" v-for="bid in bids" :key="bid.id" @click="showBid(bid)">
						<div class="item-list-icon">
							<div class="bid-user-avatar" :style="{backgroundImage: `url(${bid.user.avatar})`}"></div>
						</div>
						<div class="item-list-icon-content">
							<div class="bid-user">
								 {{ bid.user.username }}
								 <span class="bid-accepted" v-if="bid.accepted"></span>
							</div>
							<div class="bid-created-at" v-text="filters.time(bid.created_at)"></div>
						</div>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
	import Model from "../../../includes/Model";
	import { mapGetters } from 'vuex';

	export default {
		props: {
			bids: {
				type: Array,
				required: true
			}
		},
		computed: {
			...mapGetters({
				fetched: 'serviceDetailsBidsFetched',
			})
		},
		methods: {
			showBid(bid) {
				this.$store.dispatch('openModal', {
					component: 'showUserBid',
					size: 'size-large',
					data: { bid }
				});
			}
		}
	}
</script>