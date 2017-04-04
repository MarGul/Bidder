<template>
	<div class="ratings-component" :class="[size]">
		<i class="fa fa-star" aria-hidden="true" v-for="n in fullStars"></i><!--
	 --><i class="fa fa-star-half-o" aria-hidden="true" v-if="halfStar"></i><!--
	 --><i class="fa fa-star-o" aria-hidden="true" v-for="n in emptyStars"></i>
	 ({{ total }})
	</div>
</template>

<script>
	export default {
		props: {
			rating: {
				type: Number,
				required: true
			},
			max: {
				type: Number,
				default: 5
			},
			size: {
				type: String,
				default: ''
			},
			total: {
				type: Number,
				default: 0
			}
		},
		computed: {
			fullStars() {
				return Math.floor(this.rating);
			},
			halfStar() {
				return ( this.rating % 1 >= 0.5 ) ? true : false;
			},
			emptyStars() {
				let empty = this.max - this.fullStars;
				return (this.halfStar) ? empty - 1 : empty;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ratings-component {

		&.large {
			font-size: 18px;
		}

		i {
			color: #FFC100;
			margin: 0 1.5px;
		}
	}
</style>