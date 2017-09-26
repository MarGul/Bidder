<template>
	<div class="upload_media-component">
		<h4>Ladda upp media</h4>
		<div class="help-text mb15">Har du bilder, ritningar eller annan media som du vill lägga till?</div>

		<div class="row">
			<div class="col-sm-6 col-sm-push-3">
				<ul class="media">
					<li v-for="(file, index) in media">
						<i class="fa icon" :class="[type(file.type)]" aria-hidden="true"></i> 
						<span class="file-name" :class="{'has-error': errors[index]}">{{ file.name }}</span>
						<span class="file-size">{{ size(file.size) }}</span>
						<i class="icon icon_delete wh12 ml10" @click="remove(index)"></i>
						<div class="error-block" v-if="errors[index]" v-text="errors[index][0]"></div>
					</li>
				</ul>
			</div>
		</div>
		<label class="btn btn-default">
			<i class="icon icon_image wh15 mr10"></i> Välj media
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
				return type.includes('image/') ? 'fa-file-image-o' : 'fa-file-text-o';
			},
			size(size) {
				if ( size < 1000) {
					return `${size} b`;
				} else if ( size >  1000000) {
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