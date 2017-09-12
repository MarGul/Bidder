<template>
	<div class="edit_service-component">
		
		<div class="row">
			<div class="col-xs-12 col-md-8 col-lg-9">
				<section class="white-contentSection">
					<header class="white-contentSection-header">
						<h3>Redigera tjänst</h3>
					</header>
					<div class="white-contentSection-content">
						<app-edit-service-form :service="$route.params.id"></app-edit-service-form>
					</div>
				</section>
			</div>
			<div class="col-xs-12 col-md-4 col-lg-3">
				Sidebar
			</div>
		</div>

	</div>
</template>

<script>
	import appEditServiceForm from "./EditServiceForm";

	export default {
		components: {
			appEditServiceForm
		}
	}
</script>