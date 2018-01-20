<template>
	<div class="tags-input-container">
		<div class="tooltip-error" v-if="error">Ej giltigt val</div>
		<div class="tags-input" :class="{hasError: error}" @click="$refs.input.focus()">
			<div class="tag" v-for="(item, index) in items" :key="item.slug">
				<div class="is-flex c_c">
					<span>{{ item.name }}</span><i class="icon h_delete wh15 danger" @click="$emit('remove', {item, index})"></i>
				</div>
			</div>
			<input type="text" ref="input" @keydown="error = false" @keydown.enter="addItem(input)" v-model.trim="input" :style="inputWidth">
		</div>
		<div class="tags-help" v-if="matched.length > 0">
			<ul class="list-unstyled">
				<li v-for="match in matched" :key="match.slug" @click="addItem(match.name)">
					{{ match.name }}
				</li>
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
			addItem(item) {
				let current = this.options.find(opt => opt.name.toLowerCase() == item.toLowerCase());

				if ( current ) {
					this.$emit('add', {item: current});
					this.error = false;
					return this.input = '';
				}

				return !(this.error = true);
			}
		}
	}
</script>