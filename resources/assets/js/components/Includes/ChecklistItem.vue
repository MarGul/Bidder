<template>
	<div class="checklist-item">
		<div class="checklist-header">
			<span class="checklist-checkbox">
				<input type="checkbox">
			</span>
			<span class="checklist-title" v-text="item.title"></span>
			<span class="checklist-read-more-container" v-if="item.description" @click="descriptionOpen = !descriptionOpen">
				<i class="icon wh15 light-gray" :class="[icon]"></i>
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
			}
		},
		computed: {
			icon() {
				return this.descriptionOpen ? 'icon_up_chevron' : 'icon_down_chevron';
			}
		}
	}
</script>