<template>
	<div class="profile-component">
		
		<div class="container" v-if="fetched">
			<div class="row">
				<div class="col-sm-3" v-if="!breakpoints.isMobile()">
					<img class="profile-picture-desktop" :src="user.avatar" :alt="`Profilbild för ${user.name}`">
					<div class="profile-info">
						<h3 class="profile-username" v-text="user.username"></h3>
						<ul class="list-unstyled">
							<li><i class="fa fa-user"></i>Medlem sedan {{ member_since }}</li>
						</ul>
					</div>
				</div>
				<div class="col-sm-9">
					<div class="white-container mb30">
						<div class="user-header">
							<div class="profile-picture" :style="avatar" v-if="breakpoints.isMobile()"></div>
							<h4 class="user-name" v-text="user.name"></h4>
						</div>
						<div class="user-bio" v-if="user.bio">
							<pre class="no-pre-style" v-text="user.bio"></pre>
						</div>
						<div class="alert alert-warning text-center" v-else>
							{{ user.name }} har ingen beskrivning än.
						</div>
					</div>
					<div class="white-container">
						<app-show-reviews :username="user.username" :rating="user.rating" :reviews="user.reviews"></app-show-reviews>
					</div>
				</div>
			</div>
		</div>

		<app-loading bg="gray" v-else></app-loading>

	</div>
</template>

<script>
	import Model from '../includes/Model';
	import appShowReviews from '../components/Reviews/ShowReviews';

	export default {
		components: {
			appShowReviews
		},
		data() {
			return {
				fetched: false,
				user: {},
                breakpoints: window.breakpoints,
			}
		},
		computed: {
			avatar() {
				return {backgroundImage: `url("${this.user.avatar}")`};
			},
			member_since() {
				return moment(this.user.created_at).format('D MMM, YYYY');
			}
		},
		watch: {
			'$route': function() {
				this.fetchUser();
			}
		},
		methods: {
			fetchUser() {
				this.fetched = false;
				new Model(`users/${this.$route.params.username}`).get()
					.then(response => {
						this.user = response.user;
						this.fetched = true;
					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		created() {
			this.fetchUser();
		}
	}
</script>