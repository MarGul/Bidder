<template>
	<div class="services-component">
		<div class="service-filter-container">
			<div class="row">
				<div class="col-xs-12 col-md-4 column">
					<div class="">
						<label>Fritext</label>
						<input type="text" id="filter_text" class="form-control">
					</div>
				</div>
				<div class="col-xs-12 col-md-4 column">
					<div class="">
						<label>Kategorier</label>
						<input type="text" id="filter_text" class="form-control">
					</div>
				</div>
				<div class="col-xs-12 col-md-4 column">
					<div class="">
						<label>Platser</label>
						<input type="text" id="filter_text" class="form-control">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-primary full-width">Hitta Tjänster</button>
				</div>
			</div>
		</div>

		<div class="services">
			<!-- v-for loop through the services with a component -->
		</div>
	</div>
</template>

<script>
	export default {
		props: ['categories', 'locations']
	}
</script>