<template>
	<div class="project_completed-component">
		<div class="panel panel-success">
			<div class="panel-heading">
				<i class="fa fa-star" aria-hidden="true"></i> Projektet är avslutat. Dags att lämna omdömme.
			</div>
			<div class="panel-body">
				<app-leave-review :forUser="other"></app-leave-review>
			</div>
		</div>
	</div>
</template>

<script>
	import appLeaveReview from "../../Reviews/LeaveReview";

	export default {
		components: {
			appLeaveReview
		},
		computed: {
			other() {
				return this.$store.getters.userProjectFocus.other.id;
			}
		}
	}
</script>