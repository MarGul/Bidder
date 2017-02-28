<template>
	<div class="tags-input-container">
		<div class="tooltip-error" v-if="error">Ej giltigt val</div>
		<div class="tags-input" :class="{hasError: error}" @click="inputFocus">
			<div class="tag" v-for="(item, index) in items">
				{{ item.text }}<i class="fa fa-times" aria-hidden="true" @click="$emit('remove', {item, index})"></i>
			</div>
			<input type="text" @keydown="error = false" @keydown.enter="addItem(input)" v-model.trim="input" :style="inputWidth">
		</div>
		<div class="tags-help" v-if="matched.length > 0">
			<ul class="list-unstyled">
				<li v-for="match in matched"
					@click="addItem(match.name)"
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
				error: false
			}
		},
		computed: {
			matched() {
				if ( !this.input ) return [];

				return this.options.filter(opt => opt.name.toLowerCase().indexOf(this.input.toLowerCase()) !== -1);
			},
			inputWidth() {
				return {width: 20 + (this.input.length * 8) + 'px'};
			}
		},
		methods: {
			inputFocus(event) {
				$(event.target).find('input').focus();
			},
			addItem(text) {
				let current = $.grep(this.options, e => e.name.toLowerCase() == text.toLowerCase())[0];

				if ( current ) {
					this.$emit('add', {
						text: current.name,
						value: current.id,
						type: current.type
					});
					return this.input = '';
				}

				return !(this.error = true);
			}
		}
	}
</script>