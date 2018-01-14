<template>
	<div class="upload_media-component" :class="{edit: editAvailable}">
		<h4>Ladda upp media</h4>
		<div class="gray-sub-text">
			Giltiga filer: jpeg, jpg, bmp, png, gif, doc, xls, odt, ppt, rtf, pdf, txt, docx, xlsx
		</div>

		<div class="files-container">
			<ul class="media">
				<li v-for="(media, index) in initialMedia" :key="media.id">
					<i class="media-type icon wh20 light-gray mr10" :class="[type(media.mime_type)]"></i> 
					<span class="file-name">{{ media.original_filename }}</span>
					<span class="file-size gray-sub-text">{{ size(media.size) }}</span>
					<i class="icon h_delete danger wh12" @click="removeInitial(media.id)"></i>
				</li>
				
				<li v-for="(file, index) in media" :key="index">
					<i class="media-type icon wh20 light-gray mr10" :class="[{'has-error': errors[index]}, type(file.type)]"></i> 
					<span class="file-name">{{ file.name }}</span>
					<span class="file-size gray-sub-text">{{ size(file.size) }}</span>
					<i class="icon h_delete danger wh12" @click="remove(index)"></i>
					<div class="error-block" v-if="errors[index]" v-text="errors[index][0]"></div>
				</li>
			</ul>
		</div>

		<label class="btn btn-default">
			Välj media
			<input type="file" class="hidden" ref="input" multiple @change="add($event.target.files)" :disabled="disabled">
		</label>
	</div>
</template>

<script>
	export default {
		props: {
			initialMedia: {
				type: Array
			},
			media: {
				type: Array
			},
			errors: {
				type: Array
			},
			disabled: {
				type: Boolean
			},
			editAvailable: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			add(files) {
				if ( files.length ) {
					this.$emit('added', {files});
				}
				this.$refs.input.value = '';
			},
			remove(index) {
				this.$emit('removed', {index});
			},
			removeInitial(id) {
				this.$emit('deleted', {id});
			},
			type(type) {
				return type.includes('image/') ? 'h_image' : 'h_file';
			},
			size(size) {
				if ( size < 1000 ) {
					return `${size} b`;
				} else if ( size >  1000000 ) {
					let s = size / 1000000;
					return `${s.toFixed(1)} mb`;
				} else {
					let s = size / 1000;
					return `${s.toFixed(1)} kb`;
				}
			}
		}
	}
</script>