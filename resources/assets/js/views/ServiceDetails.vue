<template>
	<div class="service-details-view no-hero-view">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-8">
					<div class="service-description white-container" v-if="!breakpoints.small">
						Description
					</div>
				</div>
				<div class="col-xs-12 col-md-4">
					<div class="service-bids white-container">
						<div class="margin-bottom-10">
							0 Aktiva bud. Visa alla bud.
						</div>
						<button 
							class="btn btn-primary full-width"
							@click.prevent="openCreateBid"
						>Lägg ett bud</button>
					</div>
					<div class="service-description white-container" v-if="breakpoints.small">
						Description
					</div>
					<div class="service-about white-container">
						About
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

	export default {
		components: {
			appComment: Comment,
			appAddComment: AddComment
		},
		data() {
			return {
				service: {}
			}
		},
		computed: {
			breakpoints() {
				return window.breakpoints;
			}
		},
		methods: {
			addComment({comment}) {
				this.service.comments.unshift(comment);
			},
			openCreateBid() {
				this.$store.dispatch('openModal', {
					component: 'createBid',
					data: {id: this.$route.params.id},
					size: 'large'
				});
			}
		},
		created() {
			Service.find(this.$route.params.id)
			.then(response => {
				this.service = response.service;
			})
			.catch(error => {

			});
		}
	}
</script>