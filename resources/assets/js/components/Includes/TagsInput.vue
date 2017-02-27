<template>
	<div class="tags-input-container">
		<div class="tooltip-error" v-if="error">Ej giltigt val</div>
		<div class="tags-input" :class="{hasError: error}" @click="inputFocus">
			<div class="tag" v-for="(item, index) in items">
				{{ item.text }}<i class="fa fa-times" aria-hidden="true" @click="removeItem(item, index)"></i>
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
				current: {},
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
			removeItem(item, index) {
				this.$emit('remove', {item, index});
			},
			inputHandler(event) {
				// Grow the width of the input depending on how many characters.
				$(event.target).width((20 + (this.input.length * 12)) + 'px');

				this.error = false;
				if ( event.which === 13 ) {
					if ( this.validateItem(this.input) ) {
						this.addItem(this.input);
						$(event.target).width('20px');
					}
				}
			},
			matchHandler(match) {
				if ( this.validateItem(match) ) {
					this.addItem(match);
				}
			},
			addItem(text) {
				this.$emit('add', {
					text: this.current.name,
					value: this.current.id,
					type: this.current.type
				});
				this.input = '';
				this.current = {};
			},
			validateItem(item) {
				let result = $.grep(this.options, function(e) { return e.name.toLowerCase() == item.toLowerCase() });
				
				if ( result.length > 0 ) {
					this.current = result[0];
					return true;
				} else {
					this.error = true;
					return false;
				}
			}
		}
	}
</script>