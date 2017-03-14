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
						Bids
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
					<app-comments></app-comments>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Comments from '../components/Comments/Comments.vue';

	export default {
		components: {
			appComments: Comments
		},
		computed: {
			breakpoints() {
				return window.breakpoints;
			}
		}
	}
</script>