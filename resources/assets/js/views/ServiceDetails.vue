<template>
	<div class="service-details-view">
		<div class="container">
			<div class="content">
				<template v-if="$store.getters.getServiceLoaded">
					<div class="main-area-with-sidebar">
						<div class="main-area large-sidebar">
							<service-details :service="service" />
							<section class="transparent-contentSection service-comments mt50" v-if="!breakpoints.isSmallDevices()">
								<app-add-comment></app-add-comment>
								<ul class="top-comments">
									<transition-group name="slide-in-left">
										<li v-for="comment in service.comments" :key="comment.id">
											<app-comment :comment="comment"></app-comment>
										</li>
									</transition-group>
								</ul>
							</section>
						</div>
						<div class="main-area-sidebar">
							<section class="white-contentSection">
								<div class="white-contentSection-content service-bids pb10">
									<div class="time-left text-center">
										<div class="gray-sub-text">Avslutas om</div>
										<app-timer :ends="service.bid_stop"></app-timer>
										<div class="ends" v-text="`den ${filters.time(service.bid_stop)}`"></div>
									</div>
									<div class="active-bids text-center">
										<i class="icon icon_bid wh15 cursor-default mr5"></i>
										<span>{{ bids }}</span> bud. <a class="is-link" @click.prevent="showBids">Visa alla bud</a>
									</div>
								</div>
								<footer class="white-contentSection-footer">
									<button class="btn btn-primary full-width" @click.prevent="createBid">
										Lägg ett bud
									</button>
								</footer>
							</section>
							<section class="transparent-contentSection">
								<header class="transparent-contentSection-header">
									<h3>Upplagd av</h3>
								</header>
								<div class="transparent-contentSection-content">
									<div class="service-user">
										<div class="user-avatar-container">
											<img :src="service.user.avatar" :alt="avatarAlt">
										</div>
										<div class="user-details-container">
											<div class="user-username">
												<router-link class="is-link" :to="`/profile/${service.user.username}`">{{ service.user.username }}</router-link>
											</div>
											<div class="user-ratings">
												<app-ratings :rating="ratingAvg" :total="ratingCount"></app-ratings>
											</div>
											<div class="gray-sub-text mt3">Skapades den {{ filters.time(service.created_at) }}</div>
										</div>
									</div>
								</div>
							</section>
						</div>
						<section class="transparent-contentSection service-comments mt50" v-if="breakpoints.isSmallDevices()">
							<app-add-comment></app-add-comment>
							<ul class="top-comments">
								<transition-group name="slide-in-left">
									<li v-for="comment in service.comments" :key="comment.id">
										<app-comment :comment="comment"></app-comment>
									</li>
								</transition-group>
							</ul>
						</section>
					</div>
				</template>

				<app-loading bg="gray" v-else></app-loading>
			</div>
		</div>
	</div>
</template>

<script>
	import appAddComment from '../components/Comments/AddComment';
	import appComment from '../components/Comments/Comment';
	import appServiceDetails from '../components/Services/ServiceDetails';
	import appRatings from '../components/Includes/Ratings';
	import appTimer from '../components/Includes/Timer';

	export default {
		components: {
			appComment,
			appAddComment,
			appServiceDetails,
			appRatings,
			appTimer
		},
		computed: {
			service() {
				return this.$store.getters.getService;
			},
			bids() {
				return this.service.bid_count ? this.service.bid_count.count : 0;
			},
			breakpoints() {
				return window.breakpoints;
			},
			avatarAlt() {
				return `Avatar bild för användare ${this.service.user.username}`;
			},
			ratingCount() {
				return this.service.user.rating ? this.service.user.rating.count : 0;
			},
			ratingAvg() {
				return this.service.user.rating ? this.service.user.rating.avg : 0;
			}
		},
		methods: {
			createBid() {
				this.$store.dispatch('openModal', { component: 'createBid', size: 'size-large'});
			},
			showBids() {
				this.$store.dispatch('openModal', {component: 'showBids', size: 'size-large'});
			}
		},
		created() {
			this.$store.dispatch('getService', {id: this.$route.params.id});

			Echo.channel('service.' + this.$route.params.id)
				.listen('CommentCreated', (e) => {
					this.$store.commit('ADD_COMMENT', {comment: e.comment});
				})
				.listen('NewBid', (e) => {
					this.$store.dispatch('addBid', {bid: e.bid});
					this.$store.dispatch('showNotification', {type: 'info', msg: 'Det kom precis in ett bud för denna tjänsten!'})
				});
		}
	}
</script>