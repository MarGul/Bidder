<template>
	<div class="checklist-item">
		<div class="checklist-header">
			<span class="checklist-checkbox">
				<span class="checkbox-icon" :class="[checkboxIcon]" @click="checkChange"></span>
			</span>
			<span class="checklist-title" v-text="item.title"></span>
			<span class="checklist-read-more-container" v-if="item.description" @click="descriptionOpen = !descriptionOpen">
				<i class="icon wh15 light-gray" :class="[descriptionIcon]"></i>
			</span>
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
				return this.descriptionOpen ? 'icon_up_chevron' : 'icon_down_chevron';
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