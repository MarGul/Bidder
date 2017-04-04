<template>
	<div class="service-details-view no-hero-view">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-8">
					<div class="service-description white-container" v-if="!breakpoints.small">
						<app-service-description></app-service-description>
					</div>
				</div>
				<div class="col-xs-12 col-md-4">
					<div class="service-bids white-container">
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
							<div class="user-displayname" v-text="service.user.displayname"></div>
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
					<app-add-comment @added="addComment"></app-add-comment>
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
		</div>
	</div>
</template>

<script>
	import Service from '../includes/models/Service';
	import AddComment from '../components/Comments/AddComment.vue';
	import Comment from '../components/Comments/Comment.vue';
	import ServiceDescription from '../components/Services/ServiceDescription.vue';
	import Ratings from '../components/Includes/Ratings.vue';

	export default {
		components: {
			appComment: Comment,
			appAddComment: AddComment,
			appServiceDescription: ServiceDescription,
			appRatings: Ratings
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
			avatarAlt() {
				return `Avatar bild för användare ${this.service.user.displayname}`;
			}
		},
		methods: {
			addComment({comment}) {
				this.service.comments.unshift(comment);
			},
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