<template>
	<div class="service-media-container">
		<div class="service-images-container" v-if="images.length > 0">
			<div class="service-media-heading mb0">Bilder</div>
			<ul class="services-images-list">
				<li v-for="image in images" :key="image.id">
					<a :href="image.media_url" target="_blank" rel="noopener">
						<img :src="image.thumb_url" :alt="`Thumbnail for ${image.original_filename}`">
					</a>
				</li>
			</ul>
		</div>
		<div class="service-files-container" v-if="files.length > 0">
			<div class="service-media-heading">Filer</div>
			<ul class="services-files-list">
				<li v-for="file in files" :key="file.id">
					<i class="icon h_file wh20 light-gray mr5"></i>
					<a :href="file.media_url" target="_blank" class="is-link" rel="noopener" v-text="file.original_filename"></a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			media: {
				type: Array,
				required: true
			}
		},
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