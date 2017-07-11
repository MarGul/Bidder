<template>
	<div class="service_media-component">
		
		<template v-if="files.length > 0">
			<ul class="files-list">
				<li v-for="file in files">
					<i class="fa fa-file-text-o" aria-hidden="true"></i> 
					<a :href="file.media_url" target="_blank">{{ file.mime_type }}</a>
				</li>
			</ul>
		</template>
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