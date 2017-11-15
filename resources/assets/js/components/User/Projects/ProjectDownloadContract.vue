<template>
	<div class="project_download_contract-component">
		<a :href="downloadUrl" target="_blank" class="btn btn-success is-flex c_c">
			<i class="icon icon_download white wh15 mr10"></i> Ladda ner
		</a>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				project: 'userProjectDetails'
			}),
			downloadUrl() {
				return `/projects/${this.project.id}/download-contract`;
			}
		}
	}
</script>