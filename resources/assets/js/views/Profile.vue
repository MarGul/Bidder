<template>
	<div class="profile-component">
		
		<div class="container" v-if="fetched">
			<div class="row">
				<div class="col-md-8 col-md-push-4">
					<div class="white-container mb30">
						<div class="user-header">
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
				user: {}
			}
		},
		created() {
			new Model(`users/${this.$route.params.username}`).get()
				.then(response => {
					this.user = response.user;
					this.fetched = true;
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
</script>