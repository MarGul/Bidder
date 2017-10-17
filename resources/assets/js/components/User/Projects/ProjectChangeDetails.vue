<template>
	<div class="project_change_details-component">
		<h4 class="text-center">Ändra projektets detaljer</h4>
		<p class="gray-sub-text mb30">
			Vi har automatiskt lagt in detaljerna från det accepterade budet. Detta kan du själv ändra innan vi startar igång projektet men tänk på att den andra parten kommer behöva acceptera ändringarna.
		</p>
		<form class="is-flex-sm wrap is-row">
			<div class="control-container is-half">
				<label class="control-label">Kan påbörja</label>
				<input type="text" class="form-control" v-model="form.service_start">
			</div>
			<div class="control-container is-half">
				<label class="control-label">Är klart</label>
				<input type="text" class="form-control" v-model="form.service_end">
			</div>
			<div class="control-container is-half">
				<label class="control-label">Antal timmar</label>
				<input type="text" class="form-control" v-model="form.service_hours">
			</div>
			<div class="control-container is-half">
				<label class="control-label">Pris</label>
				<input type="text" class="form-control" v-model="form.service_price">
			</div>
		</form>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Form from '../../../includes/classes/Form';

	export default {
		data() {
			return {
				form: new Form({
					service_start: '',
					service_end: '',
					service_hours: '',
					service_price: ''
				})
			}
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails'
			})
		},
		created() {
			this.form.service_start = this.project.service_start;
			this.form.service_end = this.project.service_end;
			this.form.service_hours = this.project.service_hours;
			this.form.service_price = this.project.service_price;
		}
	}
</script>