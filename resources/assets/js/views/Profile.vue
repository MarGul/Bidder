<template>
	<div class="profile-component">
		
		<div class="container">
			<div class="content">
				<template v-if="fetched">
					<div class="main-area-with-sidebar">
						<div class="main-area-sidebar left">
							<div class="profile-info-container">
								<div class="profile-picture-container">
									<img class="profile-picture" :src="user.avatar" :alt="`Profilbild för ${user.name}`">
								</div>
								<div class="profile-info">
									<h3 class="profile-username" v-text="user.username"></h3>
									<ul class="list-unstyled">
										<li class="is-flex v-align">
											<i class="icon h_profile wh20 light-gray mr10"></i> <span>Medlem sedan {{ member_since }}</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="main-area">
							<section class="white-contentSection mb30">
								<header class="white-contentSection-header" :class="{'has-link': myProfile}">
									<h3 v-text="user.name || user.username"></h3>
									<router-link :to="'/user/profile'" class="is-link is-flex v-center justify-end" v-if="myProfile">
										Redigera<i class="icon h_edit wh20 primary ml10"></i>
									</router-link>
								</header>
								<div class="white-contentSection-content">
									<div class="user-bio" v-if="user.bio">
										<pre class="no-pre-style" v-text="user.bio"></pre>
									</div>
									<div class="alert alert-warning text-center" v-else>
										{{ user.name }} har ingen beskrivning än.
									</div>
								</div>
							</section>

							<app-show-reviews 
								:username="user.username" 
								:rating="user.rating || {}" 
								:reviews="user.reviews" 
							/>
						</div>
					</div>
				</template>

				<app-loading bg="gray" v-else></app-loading>
			</div>
		</div>

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
				user: {}
			}
		},
		computed: {
			avatar() {
				return {backgroundImage: `url("${this.user.avatar}")`};
			},
			member_since() {
				return moment(this.user.created_at).format('D MMM, YYYY');
			},
			myProfile() {
				return this.$store.getters.authUser.id === this.user.id;
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
						this.user = response.data.user;
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