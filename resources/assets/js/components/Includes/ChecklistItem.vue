<template>
	<div class="checklist-item">
		{{ item.title }}
	</div>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				validator: (value) => value.hasOwnProperty('title')
			}
		}
	}
</script>