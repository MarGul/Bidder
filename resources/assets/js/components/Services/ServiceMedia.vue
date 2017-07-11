<template>
	<div class="service_media-component">
		
	</div>
</template>

<script>
	export default {
		props: ['media'],
		computed: {
			images() {
				return this.media.filter(media => media.mime_type.includes('image/'));
			},
			files() {
				return this.media.filter(media => !media.mime_type.includes('image/'));
			}
		}
	}
</script>