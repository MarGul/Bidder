<template>
	<div class="change_project_details-component">
		
		<div class="close" @click="$emit('close')"><i class="fa fa-times" aria-hidden="true"></i></div>

		<form @keydown="form.errors.clear()">
			<div class="form-group" :class="{'has-error': form.errors.has('finish')}">
				<label class="control-label">Projektet avslutas</label>
				<datepicker
					input-class="form-control" 
					language="sv"
					:monday-first="true"
					:disabled="{to: new Date()}"
					v-model="form.finish"
				></datepicker>
				<span class="help-block" v-if="form.errors.has('finish')" v-text="form.errors.get('finish')"></span>
			</div>

			<div class="form-group" :class="{'has-error': form.errors.has('price')}">
				<label class="control-label">Projektets pris</label>
				<input type="text" class="form-control" @keypress="isNumber($event)" v-model="form.price">
				<span class="help-block" v-if="form.errors.has('price')" v-text="form.errors.get('price')"></span>
			</div>

			<button class="btn btn-primary full-width" :class="{'processing': processing}" @click.prevent="change" :disabled="processing ||this.form.errors.any()">
				Ändra uppgifterna
			</button> 
		</form>
	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';
	import Model from "../../../includes/Model";
	import datepicker from 'vuejs-datepicker';

	export default {
		components: {
			datepicker
		},
		data() {
			return {
				form: new Form({
					finish: null,
					price: null
				}),
				processing: false
			}
		},
		computed: {
			project() {
				return this.$store.getters.userProjectFocus;
			}
		},
		methods: {
			isNumber(event) {
				let code = event.keyCode || event.which;
				if ( (code >= 48 && code <= 57) || code == 44 ) {
					return true;
				} else {
					event.preventDefault();
				}
			},
			stripTime(date) {
				return (date instanceof Date) ? `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}` : date;
			},
			pad(number) {
				return ( number < 10 ) ? "0" + number : number;
			},
			change() {
				this.processing = true;
				let data = this.form.data();
				data.finish = this.stripTime(data.finish);

				new Model(`projects/${this.project.id}`).patch(data)
					.then(response => {
						// Update the information in store for project in focus
						let project = this.$store.getters.userProjectFocus;
						project.finish = data.finish;
						project.price = data.price;
						project.me.accepted = false;
						project.other.accepted = false;
						this.$store.commit('SET_PROJECT_FOCUS', {project});
						// Update the information in store for the projects
						let projects = this.$store.getters.userProjects;
						for (let i = 0; i < projects.length; i++) {
							if ( projects[i].id === project.id ) {
								projects[i] = project;
								break;
							}
						}
						this.$store.commit('SET_PROJECTS', {projects});
						this.$emit('updated');
						this.processing = false;
						this.$store.dispatch('showNotification', {
							type: 'success', 
							msg: 'Nice! Vi har ändrat uppgifterna för projektet. Nu måste båda parter bara godkänna projektet igen.'
						});
						$("html, body").animate({ scrollTop: 0 }, "fast");
					})
					.catch(error => { this.form.errors.record(error); });
			}
		},
		created() {
			this.form.finish = this.$store.getters.userProjectFocus.finish;
			this.form.price = this.$store.getters.userProjectFocus.price;
		}
	}
</script>

<style lang="scss" scoped>
	.change_project_details-component {
		position: relative;

		.close {
			position: absolute;
			top: -10px;
			right: 0;
		}
	}

	label {
		margin-bottom: 2px;
	}

	.form-group {
		margin-bottom: 5px;
	}

	.btn {
		margin-bottom: 0;
	}
</style>