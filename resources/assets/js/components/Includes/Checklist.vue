<template>
	<div class="checklist-component">
		<checklist-item 
			v-for="item in items" 
			:item="item" 
			:key="item.id"
		/>
	</div>
</template>

<script>
	import ChecklistItem from "./ChecklistItem";

	export default {
		components: {
			ChecklistItem
		},
		props: {
			description: {
				type: String
			},
			items: {
				type: Array,
				required: true
			}
		}
	}
</script>