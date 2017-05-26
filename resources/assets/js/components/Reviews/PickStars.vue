<template>
	<div class="pick_stars-component">
		<template v-for="(type, n) in types">
			<i class="fa fa-star plr3" aria-hidden="true" 
				@click="update(n + 1)" @mouseover="highlight(n + 1)" @mouseout="normal"
				v-if="type === 1"></i><!--
		 --><i class="fa fa-star-o plr3" aria-hidden="true" 
				@click="update(n + 1)" @mouseover="highlight(n + 1)" @mouseout="normal"
				v-if="type === 0"></i>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				stars: 0,
				hover: false,
				hoverStars: 0
			}
		},
		computed: {
			full() {
				return this.hover ? this.hoverStars : this.stars;
			},
			blank() {
				return this.hover ? 5 - this.hoverStars : 5 - this.full;
			},
			types() {
				let types = [];
				for (let i = 0; i < this.full; i++) {
					types.push(1);
				}
				for (let j = 0; j < this.blank; j++) {
					types.push(0);
				}

				return types;
			}
		},
		methods: {
			update(stars) {
				this.stars = stars;
				this.$emit('changed', {stars});
			},
			highlight(stars) {
				this.hover = true;
				this.hoverStars = stars;
			},
			normal() {
				this.hover = false;
				this.hoverStars = 0;
			}
		}
	}
</script>

<style lang="scss" scroped>
	.pick_stars-component {
		font-size: 18px;

		i {
			color: #FFC100;
			cursor: pointer;
		}
	}
</style>