<template>
	<div class="service-details-view no-hero-view">
		<div class="container">
			<div class="waiting" v-if="!$store.getters.getServiceLoaded">
				<span class="processing">
					<i class="fa fa-spinner fa-pulse fa-fw fa-4x"></i>
					<span class="sr-only">Loading...</span>
				</span>
			</div>
			<template v-else>
				<div class="row">
					<div class="col-xs-12 col-md-8">
						<div class="service-description white-container" v-if="!breakpoints.small">
							<app-service-description></app-service-description>
						</div>
					</div>
					<div class="col-xs-12 col-md-4">
						<div class="service-bids white-container">
							<div class="time-left text-center">
								<app-timer :ends="service.bid_stop"></app-timer>
								<div class="ends">{{ ends }}</div>
							</div>
							<div class="active-bids text-center">
								<i class="fa fa-gavel" aria-hidden="true"></i>
								<span>{{ bids }}</span> bud. <a @click.prevent="showBids">Visa alla bud</a>
							</div>
							<button 
								class="btn btn-primary full-width"
								@click.prevent="createBid"
							>Lägg ett bud</button>
						</div>
						<div class="service-description white-container" v-if="breakpoints.small">
							<app-service-description></app-service-description>
						</div>
						<div class="service-user white-container">
							<template v-if="$store.getters.getServiceLoaded">	
								<div class="user-avatar"><img :src="service.user.avatar" :alt="avatarAlt"></div>
								<div class="user-displayname" v-text="service.user.username"></div>
								<div class="user-ratings">
									<app-ratings :rating="3.7" :total="7" size="large"></app-ratings>
									<a class="link">Visa omdömmen</a>
								</div>
							</template>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-md-8">
						<app-add-comment></app-add-comment>
						<div class="margin-50">
							<ul class="top-comments">
								<transition-group name="slide-in-left">
									<li v-for="comment in service.comments" :key="comment.id">
										<app-comment :comment="comment"></app-comment>
									
										<ul class="comment-replies" v-if="comment.replies.length > 0">
											<transition-group name="slide-in-left">
												<li v-for="reply in comment.replies" :key="reply.id">
													<app-comment :comment="reply"></app-comment>
												</li>
											</transition-group>
										</ul>
									</li>
								</transition-group>
							</ul>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import appAddComment from '../components/Comments/AddComment';
	import appComment from '../components/Comments/Comment';
	import appServiceDescription from '../components/Services/ServiceDescription';
	import appRatings from '../components/Includes/Ratings';
	import appTimer from '../components/Includes/Timer';

	export default {
		components: {
			appComment,
			appAddComment,
			appServiceDescription,
			appRatings,
			appTimer
		},
		computed: {
			service() {
				return this.$store.getters.getService;
			},
			bids() {
				return this.service.bids.length;
			},
			breakpoints() {
				return window.breakpoints;
			},
			ends() {
				return moment(this.service.bid_stop).format("LLL");
			},
			avatarAlt() {
				return `Avatar bild för användare ${this.service.user.username}`;
			}
		},
		methods: {
			createBid() {
				this.$store.dispatch('openModal', { component: 'createBid', size: 'large'});
			},
			showBids() {
				this.$store.dispatch('openModal', {component: 'showBids', size: 'large'});
			}
		},
		created() {
			this.$store.dispatch('getService', {id: this.$route.params.id});
		}
	}
</script>

<style lang="scss" scoped>
	.waiting {
		text-align: center;
		margin: 40px 0;
	}
</style>