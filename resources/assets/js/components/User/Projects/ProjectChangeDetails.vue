<template>
	<div class="project_change_details-component">
		<h4 class="text-center">Ändra projektets detaljer</h4>
		<p class="gray-sub-text mb30">
			Vi har automatiskt lagt in detaljerna från det accepterade budet. Detta kan du själv ändra innan vi startar projektet men tänk på att den andra parten kommer behöva acceptera ändringarna.
		</p>
		<form class="clearfix" @submit.prevent="update">
			<div class="is-flex-sm wrap is-row">
				<div class="control-container is-half" :class="{'has-errors': form.errors.has('service_start')}">
					<label class="control-label">Kan påbörja</label>
					<datepicker
						input-class="form-control" 
						language="sv"
						:monday-first="true"
						:disabled="{to: new Date()}"
						v-model="form.service_start"
					></datepicker>
					<span class="help-block" v-if="form.errors.has('service_start')" v-text="form.errors.get('service_start')"></span>
				</div>
				<div class="control-container is-half" :class="{'has-errors': form.errors.has('service_end')}">
					<label class="control-label">Är klart</label>
					<datepicker
						input-class="form-control" 
						language="sv"
						:monday-first="true"
						:disabled="{to: new Date()}"
						v-model="form.service_end"
					></datepicker>
					<span class="help-block" v-if="form.errors.has('service_end')" v-text="form.errors.get('service_end')"></span>
				</div>
				<div class="control-container is-half" :class="{'has-errors': form.errors.has('service_hours')}">
					<label class="control-label">Antal timmar</label>
					<input 
						type="text" 
						class="form-control" 
						@keypress="filters.isNumber($event)"
						v-model="form.service_hours"
					>
					<span class="help-block" v-if="form.errors.has('service_hours')" v-text="form.errors.get('service_hours')"></span>
				</div>
				<div class="control-container is-half" :class="{'has-errors': form.errors.has('service_price')}">
					<label class="control-label">Pris</label>
					<input 
						type="text" 
						class="form-control" 
						@keypress="filters.isNumber($event)"
						v-model="form.service_price"
					>
					<span class="help-block" v-if="form.errors.has('service_price')" v-text="form.errors.get('service_price')"></span>
				</div>
			</div>
			<button type="submit" class="btn btn-primary pull-right" :class="{processing}">
				Ändra
			</button>
		</form>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import datepicker from 'vuejs-datepicker';
	import Form from '../../../includes/classes/Form';
	import Model from '../../../includes/Model';

	export default {
		components: {
			datepicker
		},
		data() {
			return {
				form: new Form({
					service_start: '',
					service_end: '',
					service_hours: '',
					service_price: ''
				}),
				processing: false
			}
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails',
				auth: 'authUser'
			})
		},
		methods: {
			update() {
				this.processing = true;
				let data = this.form.asDate(['service_start', 'service_end']).data();
				new Model(`projects/${this.project.id}/details`).patch(data)
					.then(response => {
						window.scrollTo(0,0);
						this.$store.dispatch('showNotification', {
							type: 'success', 
							msg: 'Vi har uppdaterat projektets detailjer. Nu måste den andra parten acceptera uppdateringen innan vi kan starta.'
						});
						// Update the state.
						let project = this.project;
						project.service_start = data.service_start;
						project.service_end = data.service_end;
						project.service_hours = data.service_hours;
						project.service_price = data.service_price;
						// Set the user that should be marked with not accepted.
						project.users.forEach(user => {
							if ( response.data.usersNotAccepted.includes(user.id) ) {
								user.pivot.accepted = false;
							}
						});
						// Add all of the project history.
						response.data.history.forEach(function(history) {
							project.history.unshift(history);
						});

						this.$store.commit('SET_USER_PROJECT_DETAILS', project);
						this.processing = false;
					})
					.catch(error => {
						this.form.errors.record(error.errors);
						this.processing = false;
					});
			}
		},
		created() {
			this.form.service_start = this.project.service_start;
			this.form.service_end = this.project.service_end;
			this.form.service_hours = this.project.service_hours;
			this.form.service_price = this.project.service_price;
		}
	}
</script>