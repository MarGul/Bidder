<template>
	<div class="upload_media-component">
		<h4>Ladda upp media</h4>
		<div class="help-text mb15">Har du bilder, ritningar eller annan media som du vill lägga till?</div>

		<div class="row">
			<div class="col-sm-6 col-sm-push-3">
				<ul class="media">
					<li v-for="(file, index) in media">
						<i class="fa fa-picture-o icon" aria-hidden="true"></i> 
						<span class="file-name">{{ file.name }}</span>
						<span class="file-size">{{ size(file.size) }}</span>
						<i class="fa fa-times clickable remove" aria-hidden="true" @click="remove(index)"></i>
					</li>
				</ul>
			</div>
		</div>
		<label class="btn btn-primary">
			<i class="fa fa-picture-o" aria-hidden="true"></i> Välj media
			<input type="file" class="hidden" multiple @change="add($event.target.files)">
		</label>
	</div>
</template>

<script>
	export default {
		props: ['media'],
		methods: {
			add(files) {
				if ( files.length ) {
					this.$emit('added', {files});
				}
			},
			remove(index) {
				this.$emit('removed', {index});
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