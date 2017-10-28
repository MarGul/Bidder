<template>
	<div class="leave_review-component">
		<div class="stars-container">
			<div class="communication">
				<div class="review-heading">Kommunikation</div>
				<app-pick-stars 
					:enabled="!submitted" 
					@changed="communication = $event.stars" />
			</div>
			<div class="as-described">
				<div class="review-heading">Som avtalat</div>
				<app-pick-stars 
					:enabled="!submitted" 
					@changed="as_described = $event.stars" />
			</div>
			<div class="would-recommend">
				<div class="review-heading">Skulle rekommendera</div>
				<app-pick-stars 
					:enabled="!submitted" 
					@changed="would_recommend = $event.stars" />
			</div>
		</div>
		<div class="comment-container">
			<textarea rows="3" class="form-control mtb20" :disabled="submitted" v-model="review"></textarea>
		</div>
		<div class="action-container text-center">
			<template v-if="!submitted">
				<small class="action-text mb10" :class="{'alert alert-danger': error}">Klicka i stjärnorna och skriv en liten text för att beskriva din upplevelse</small>
				<button 
					class="btn btn-primary" 
					:class="{'processing': processing}" 
					:disabled="processing"
					@click.prevent="send"
					v-text="`Lämna omdömme`">
				</button>
			</template>
			<div class="alert alert-info mb0" v-else>
				Du har redan lämnat ett omdöme.
			</div>
		</div>
	</div>
</template>

<script>
	import appPickStars from "./PickStars";
	import Model from "../../includes/Model";

	export default {
		props: {
			forUser: {
				type: Number,
				required: true
			},
			forProject: {
				type: Number,
				required: true
			},
			submitted: {
				type: Boolean,
				required: true
			}
		},
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
				new Model('reviews').post({
					user_id: this.forUser,
					project_id: this.forProject,
					communication: this.communication,
					as_described: this.as_described,
					would_recommend: this.would_recommend,
					review: this.review
				}).then(response => {
					this.$emit('submitted', {review: response.review, history: response.history});
					this.processing = false;
				}).catch(error => {
					this.error = true;
					this.processing = false;
				});
			}
		}
	}
</script>