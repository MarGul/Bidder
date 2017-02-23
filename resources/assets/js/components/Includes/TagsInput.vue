<template>
	<div class="tags-input-container">
		<div class="tags-input">
			<div class="tag" v-for="(item, index) in items">
				{{ item.text }}<i class="fa fa-times" aria-hidden="true" @click="removeItem(index)"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['items'],
		methods: {
			removeItem(index) {
				this.$emit('remove', index);
			}
		}
	}
</script>