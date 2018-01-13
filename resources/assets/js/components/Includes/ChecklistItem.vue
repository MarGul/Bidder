<template>
	<div class="checklist-item">
		<div class="checklist-header">
			<div class="checklist-checkbox">
				<span class="checkbox-icon" :class="[checkboxIcon]" @click="checkChange"></span>
			</div>
			<div class="checklist-title" v-text="item.title"></div>
			<div class="checklist-read-more-container" v-if="item.description" @click="descriptionOpen = !descriptionOpen">
				<i class="icon wh20 light-gray" :class="[descriptionIcon]"></i>
			</div>
		</div>
		<div class="checklist-description" v-text="item.description" v-if="descriptionOpen"></div>
	</div>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				validator: (value) => value.hasOwnProperty('id') && value.hasOwnProperty('title')
			}
		},
		data() {
			return {
				descriptionOpen: false,
				checked: false
			}
		},
		computed: {
			checkboxIcon() {
				return this.checked ? 'checked' : 'unchecked';
			},
			descriptionIcon() {
				return this.descriptionOpen ? 'h_cheveron_up' : 'h_cheveron_down';
			}
		},
		methods: {
			checkChange() {
				this.checked = !this.checked;
				this.$emit('checkChange', this.checked);
			}
		}
	}
</script>