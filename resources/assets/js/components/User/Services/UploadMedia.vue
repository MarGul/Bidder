<template>
	<div class="upload_media-component">
		<h4>Ladda upp media</h4>
		<div class="gray-sub-text mb15">Har du bilder, ritningar eller annan media som du vill lägga till?</div>

		<div class="files-container">
			<ul class="media">
				<li v-for="(file, index) in media">
					<i class="icon wh15 light-gray mr10" :class="[type(file.type)]"></i> 
					<span class="file-name" :class="{'has-error': errors[index]}">{{ file.name }}</span>
					<span class="file-size">{{ size(file.size) }}</span>
					<i class="icon icon_delete danger wh12 ml15" @click="remove(index)"></i>
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
		props: ['media', 'errors', 'disabled'],
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
			type(type) {
				return type.includes('image/') ? 'icon_picture' : 'icon_file';
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