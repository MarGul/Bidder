<template>
	<div class="tags-input-container">
		<div class="tags-input" @click="inputFocus">
			<div class="tag" v-for="(item, index) in items">
				{{ item.text }}<i class="fa fa-times" aria-hidden="true" @click="removeItem(index)"></i>
			</div>
			<input type="text" @keydown="inputHandler" v-model="input">
		</div>
		<div class="tags-help">
			<div v-for="match in matched">{{ match.name }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['items', 'options'],
		data() {
			return {
				input: '',
				matched: []
			}
		},
		watch: {
			input() {
				if ( !this.input ) { this.matched = []; return; }

				this.matched = this.options.filter(function(option) {
					return option.name.toLowerCase().indexOf(this.input.toLowerCase()) !== -1
				}.bind(this)).slice(0, 5);
			}
		},
		methods: {
			inputFocus(event) {
				$(event.target).find('input').focus();
			},
			removeItem(index) {
				this.$emit('remove', index);
			},
			addItem() {
				let item = event.target.value.trim();
				event.target.value = '';
				this.$emit('add', item);
			},
			inputHandler(event) {
				if ( event.which === 13 ) {
					this.addItem();
				}
			}
		}
	}
</script>