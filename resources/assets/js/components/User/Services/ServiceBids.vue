<template>
	<div class="service_bids-component">
		<section class="transparent-contentSection">
			<header class="transparent-contentSection-header">
				<h3>Budhistorik</h3>
				<a class="is-link" @click.prevent="showAll">Visa alla</a>
			</header>
			<div class="transparent-contentSection-content">
				<ul class="items-list-icon">
					<li class="clickable has-go-to" v-for="bid in bids">
						<div class="item-list-icon">
							<div class="bid-user-avatar" :style="{backgroundImage: `url(${bid.user.avatar})`}"></div>
						</div>
						<div class="item-list-icon-content">
							<div class="bid-user" v-text="bid.user.username"></div>
							<div class="bid-created-at" v-text="time(bid.created_at)"></div>
						</div>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
	import Model from "../../../includes/Model";

	export default {
		data() {
			return {
				fetched: false,
				bids: []
			}
		},
		methods: {
			time(date) {
				return moment(date).format('D MMM YYYY HH:mm');
			},
			showAll() {
				if ( this.fetched ) {
					this.$emit('showAllBids', {bids: this.bids});
				}
			}
		},
		created() {
			new Model(`services/${this.$route.params.id}/bids`).get()
				.then(response => {
					this.bids = response.bids;
					this.fetched = true;
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
</script>

<style lang="scss">

	.transparent-contentSection-header {
		display: flex;
		align-items: center;

		h3 {
			flex: 2;
		}

		a {
			flex: 1;
			text-align: right;
			font-size: 13px;
		}
	}
	
	.bid-user-avatar {
		width: 27px;
		height: 27px;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: 50%;
		opacity: 0.9;
		box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);
	}

	.bid-user {
		font-weight: 500;
	}

	.bid-created-at {
		color: #97A9B5;
		font-size: 13px;
	}

</style>