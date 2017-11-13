<template>
  <div class="project_contract-component">
	  <component :is="template" />
  </div>
</template>

<script>
	import contractForm from './ProjectContractForm';
	import contractDisplay from './ProjectContractDisplay';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			contractForm,
			contractDisplay
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails'
			}),
			template() {
				return this.project.started ? 'contractDisplay' : 'contractForm';
			}
		}
	}
</script>
