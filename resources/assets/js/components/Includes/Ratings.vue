<template>
	<div class="ratings-component">
		<i class="icon icon_star_full wh15 cursor-default" v-for="n in fullStars"></i><!--
	 --><i class="icon icon_star_half wh15 cursor-default" v-if="halfStar"></i><!--
	 --><i class="icon icon_star_empty wh15 cursor-default" v-for="n in emptyStars"></i>
	 <span class="rating-avg" v-if="showAvg">{{ rating.toFixed(1) }} </span><span class="rating-count" v-if="showCount">({{ total }})</span>
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
			total: {
				type: Number,
				default: 0
			},
			showAvg: {
				type: Boolean,
				default: false
			},
			showCount: {
				type: Boolean,
				default: true
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
		i {
			margin: 0 1.5px;
		}
	}
</style>