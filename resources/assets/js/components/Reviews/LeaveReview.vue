<template>
	<div class="leave_review-component">
		<div class="stars-container">
			<div class="communication">
				<div class="review-heading">Kommunikation</div>
				<app-pick-stars @changed="communication = $event.stars"></app-pick-stars>
			</div>
			<div class="as-described">
				<div class="review-heading">Som avtalat</div>
				<app-pick-stars @changed="as_described = $event.stars"></app-pick-stars>
			</div>
			<div class="would-recommend">
				<div class="review-heading">Skulle rekommendera</div>
				<app-pick-stars @changed="would_recommend = $event.stars"></app-pick-stars>
			</div>
		</div>
		<div class="comment-container">
			<textarea rows="3" class="form-control mtb20" v-model="review"></textarea>
		</div>
		<div class="action-container text-center">
			<small class="action-text mb10 alert alert-info" v-if="submitted">
				Du har redan lämnat omdömme för detta projektet.
			</small>
			<template v-else>
				<small class="action-text mb10" :class="{'alert alert-danger': error}">Klicka i stjärnorna och skriv en liten text för att beskriva din upplevelse</small>
				<button class="btn btn-primary" :class="{'processing': processing}" @click.prevent="send">Lämna omdömme</button>
			</template>
		</div>
	</div>
</template>

<script>
	import appPickStars from "./PickStars";
	import Model from "../../includes/Model";

	export default {
		props: ['forUser', 'submitted'],
		components: {
			appPickStars
		},
		data() {
			return {
				communication: null,
				as_described: null,
				would_recommend: null,
				review: '',
				processing: false,
				error: false
			}
		},
		methods: {
			send() {
				this.processing = true
				new Model(`users/${this.forUser}/review`).post({
					project_id: this.$store.getters.userProjectFocus.id,
					communication: this.communication,
					as_described: this.as_described,
					would_recommend: this.would_recommend,
					review: this.review
				}).then(response => {
					console.log(response);
				}).catch(error => {
					this.error = true;
				});
			}
		}
	}
</script>