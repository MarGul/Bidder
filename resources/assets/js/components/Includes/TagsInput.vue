<template>
	<div class="tags-input-container">
		<div class="tags-input" @click="inputFocus">
			<div class="tag" v-for="(item, index) in items">
				{{ item.text }}<i class="fa fa-times" aria-hidden="true" @click="removeItem(index)"></i>
			</div>
			<input type="text" @keydown="input">
		</div>
	</div>
</template>

<script>
	export default {
		props: ['items'],
		methods: {
			inputFocus() {
				$('.tags-input input').focus();
			},
			removeItem(index) {
				this.$emit('remove', index);
			},
			input(event) {
				if ( event.which === 13 ) {
					let item = event.target.value.trim();
					event.target.value = '';
					this.$emit('add', item);
				}
			}
		}
	}
</script>