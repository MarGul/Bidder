<template>
	<span class="timer-component">
		{{ timeNow }} {{ timeEnd }}
	</span>
</template>

<script>
	export default {
		props: ['timeEnd', 'timeNow']
	}
</script>