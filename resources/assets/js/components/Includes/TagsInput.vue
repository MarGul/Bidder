<template>
	<div class="tags-input-container">
		<div class="tooltip-error" v-if="error">Ej giltigt val</div>
		<div class="tags-input" :class="{hasError: error}" @click="inputFocus">
			<div class="tag" v-for="(item, index) in items">
				{{ item.text }}<i class="fa fa-times" aria-hidden="true" @click="removeItem(index)"></i>
			</div>
			<input type="text" @keydown="inputHandler" v-model="input">
		</div>
		<div class="tags-help" v-if="matched.length > 0">
			<ul class="list-unstyled">
				<li v-for="match in matched"
					@click="matchHandler(match.name)"
				>{{ match.name }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['items', 'options'],
		data() {
			return {
				input: '',
				matched: [],
				error: false
			}
		},
		watch: {
			input() {
				if ( !this.input ) { return this.matched = []; }

				this.matched = this.options.filter(function(option) {
					return option.name.toLowerCase().indexOf(this.input.toLowerCase()) !== -1
				}.bind(this));
			}
		},
		methods: {
			inputFocus(event) {
				$(event.target).find('input').focus();
			},
			removeItem(index) {
				this.$emit('remove', index);
			},
			inputHandler(event) {
				this.error = false;
				if ( event.which === 13 ) {
					if ( this.validItem(this.input) ) {
						this.addItem(this.input, 3, 'category');
					}
				}
			},
			matchHandler(match) {
				if ( this.validItem(match) ) {
					this.addItem(match, 3, 'category');
				}
			},
			addItem(text, value, type) {
				let item = {
					text: text,
					value: value,
					type: type
				}
				this.$emit('add', item);
				this.input = '';
			},
			validItem(item) {
				let result = $.grep(this.options, function(e) { return e.name.toLowerCase() == item.toLowerCase() });
				
				if ( result.length > 0 ) {
					return true;
				} else {
					this.error = true;
					return false;
				}
			}
		}
	}
</script>