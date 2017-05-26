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
			<textarea rows="3" class="form-control mtb20"></textarea>
		</div>
		<div class="action-container text-center">
			<small class="action-text mb10">Klicka i stjärnorna och skriv en liten text för att beskriva din upplevelse</small>
			<button class="btn btn-primary" @click.prevent="send">Lämna omdömme</button>
		</div>
	</div>
</template>

<script>
	import appPickStars from "./PickStars";

	export default {
		props: ['forUser'],
		components: {
			appPickStars
		},
		data() {
			return {
				communication: 0,
				as_described: 0,
				would_recommend: 0
			}
		},
		methods: {
			send() {
				alert('sending');
			}
		}
	}
</script>