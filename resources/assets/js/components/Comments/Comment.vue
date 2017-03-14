<template>
	<div class="comment-component">
		{{ comment.author }}
	</div>
</template>

<script>
	export default {
		props: ['comment']
	}
</script>