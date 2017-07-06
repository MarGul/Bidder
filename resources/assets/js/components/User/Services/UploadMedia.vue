<template>
	<div class="upload_media-component">
		<h4>Ladda upp media</h4>
		<div class="help-text mb15">Har du bilder, ritningar eller annan media som du vill lägga till?</div>

		<div class="row">
			<div class="col-sm-6 col-sm-push-3">
				<ul class="media">
					<li v-for="file in media">
						<i class="fa fa-picture-o icon" aria-hidden="true"></i> 
						<span class="file-name">{{ file.name }}</span>
						<span class="file-size">7.5mb</span>
						<i class="fa fa-times clickable remove" aria-hidden="true"></i>
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
			}
		}
	}
</script>