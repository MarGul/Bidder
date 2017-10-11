<template>
	<div class="checklist-component">
		<div class="checklist-items">
			<checklist-item 
				v-for="item in items" 
				:item="item" 
				:key="item.id"
				@checkChange="itemCheckChange"
			/>
		</div>
		<div class="checklist-error mtb10" v-if="error">
			Var vänlig och kryssa i alla rutorna för att visa att du tagit del av informationen.
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
		},
		data() {
			return {
				checkCount: 0
			}
		},
		methods: {
			itemCheckChange(value) {
				if ( value ) {
					this.checkCount++;
				} else {
					this.checkCount--;
				}

				// If the number of checkboxes checked is the same as the amount of checkboxes (have checked them all) then it's accepted.
				let accepted = this.checkCount === this.items.length ? true : false;

				this.$emit('accepted', accepted);
			}
		}
	}
</script>