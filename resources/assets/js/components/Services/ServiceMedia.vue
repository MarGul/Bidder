<template>
	<div class="service_media-component">
		
		<template v-if="images.length > 0">
			<ul class="images-list hide-overflow-images clearfix" ref="imagesList">
				<li v-for="image in images">
					<a :href="image.media_url" target="_blank">
						<div class="image-container" :style="{backgroundImage: `url('${image.thumb_url}')`}"></div>
					</a>
				</li>
			</ul>

			<div class="show-more-container mt15 text-center" v-if="hasMoreImages">
				<button class="btn btn-default show-all" @click="toggleOverflowImages">
					Visa alla bilder <i class="fa" :class="{'fa-chevron-down': !showingAllImages, 'fa-chevron-up': showingAllImages}" aria-hidden="true"></i>
				</button>
			</div>
		</template>

		<div class="media-spacer" v-if="!hasMoreImages"></div>

		<template v-if="files.length > 0">
			<ul class="files-list" :class="{mt30: images.length > 0 && hasMoreImages, mt15: images.length > 0 && !hasMoreImages}">
				<li v-for="file in files">
					<i class="fa fa-file-text-o" aria-hidden="true"></i> 
					<a :href="file.media_url" target="_blank">{{ file.original_filename }}</a>
				</li>
			</ul>
		</template>
	</div>
</template>

<script>
	export default {
		props: ['media'],
		data() {
			return {
				showingAllImages: false,
				hasMoreImages: false
			}
		},
		computed: {
			images() {
				return this.media.filter(media => media.mime_type.includes('image/'));
			},
			files() {
				return this.media.filter(media => !media.mime_type.includes('image/'));
			}
		},
		methods: {
			hasImagesOverflow() {
				this.hasMoreImages = this.$refs.imagesList.offsetHeight < this.$refs.imagesList.scrollHeight;
			},
			toggleOverflowImages() {
				if ( this.showingAllImages ) {
					this.showingAllImages = false;
					this.$refs.imagesList.classList.add('hide-overflow-images');
				} else {
					this.showingAllImages = true;
					this.$refs.imagesList.classList.remove('hide-overflow-images');
				}
			}
		},
		mounted() {
			if ( this.images.length > 0 ) {
				this.hasImagesOverflow();
				window.onresize = this.hasImagesOverflow;
			}
		}
	}
</script>