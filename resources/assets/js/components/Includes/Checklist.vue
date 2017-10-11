<template>
	<div class="checklist-component">
		<checklist-item 
			v-for="item in items" 
			:item="item" 
			:key="item.id"
		/>
		<div class="checklist-error mtb10" v-if="error">
			Var vänlig och klicka i alla kryssrutorna för att visa att du tagit del av informationen.
		</div>
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
			},
			error: {
				type: Boolean,
				required: true
			}
		}
	}
</script>