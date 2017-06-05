<template>
	<div class="project_accept-component">
		<div class="panel panel-success">
			<div class="panel-heading">
				<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> Är du redo att starta projektet?
			</div>
			<div class="panel-body">
				<p>Efter att ett projekt har skapats så är det sista du behöver göra att godkänna att vi ska starta projektet.
				Detta görs för er bådas säkerhet och ni får chansen att disskutera lite mer genom meddelanden som du finner här nere innan projektet räknas som godkänt.</p>
				<p>Ifall där är något som du inte gillar med detta projektet så kan du välja att inte godkänna projektet. Du som la ut tjänsten kan snabbt och enkelt starta budgivningen för tjänsten igen
				och du som la det accepterade budet kommer inte att behöva betala.</p>
				<p>Direkt när båda parterna har godkänt projektet så kan ni starta och kommer inte att höra av er ifrån oss förän projektet är klart och det är dags att lämna omdömmen om varandra.</p>

				<div class="project-users">
					<div class="me">
						<div class="user-name" v-text="project.me.username"></div>
						<div class="avatar-container"><div class="avatar" :style="myAvatar"></div></div>
						<div class="user-actions">
							<template v-if="project.me.accepted">
								<button class="btn btn-default" disabled>Du är redo!</button>
							</template>
							<template v-else>
								<div class="action-text mt10 pb5">Starta projektet?</div>
								<button class="btn btn-primary" :class="{'processing': accepting}" @click.prevent="accept">
									<i class="fa fa-check mr5" aria-hidden="true"></i> Ja
								</button>
								<button class="btn btn-danger" :class="{'processing': canceling}" @click.prevent="cancel">
									<i class="fa fa-exclamation-triangle mr5" aria-hidden="true"></i> Nej
								</button>
							</template>
						</div>
					</div>
					<div class="details">
						<template v-if="!change">
							<div class="timer">
								<app-timer :ends="project.accept_end" @ended="start"></app-timer>
								<div class="timer-text">Till automatisk start av projektet</div>
							</div>
							<div class="project-details">
								<div class="finish">
									<span class="heading"><i class="fa fa-clock-o"></i> Ska avslutas:</span>
									<span class="value" v-text="project.finish"></span>
								</div>
								<div class="price">
									<span class="heading"><i class="fa fa-money"></i> Pris: </span>
									<span class="value" v-text="filters.currency(project.price)"></span>
								</div>
								<div class="change">
									<span class="is-link ptb5" @click="change = !change">Ändra uppgifterna</span>
								</div>
							</div>
						</template>
						<app-change-project-details @updated="change = false" @close="change = false" v-else></app-change-project-details>
					</div>
					<div class="other">
						<div class="user-name" v-text="project.other.username"></div>
						<div class="avatar-container"><div class="avatar" :style="otherAvatar"></div></div>
						<div class="user-actions">
							<div class="action-text mt10 pb5">Har godkänt?</div>
							<button class="btn btn-default" disabled v-if="project.other.accepted">Godkänt</button>
							<button class="btn btn-default" disabled v-else>Ej godkänt</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Model from "../../../includes/Model";
	import appTimer from "../../Includes/Timer";
	import appChangeProjectDetails from "./ChangeProjectDetails";

	export default {
		props: ['project'],
		components: {
			appTimer,
			appChangeProjectDetails
		},
		data() {
			return {
				change: false,
				accepting: false,
				canceling: false
			}
		},
		computed: {
			myAvatar() {
				return {backgroundImage: `url('${this.project.me.avatar}')`};
			},
			otherAvatar() {
				return {backgroundImage: `url('${this.project.other.avatar}')`};
			}
		},
		methods: {
			accept() {
				this.accepting = true;
				new Model(`projects/${this.project.id}/accept`).post()
					.then(response => {
						// Update the acceptance in store for project in focus
						let project = this.$store.getters.userProjectFocus;
						project.started = response.start;
						project.me.accepted = true;
						this.$store.commit('SET_PROJECT_FOCUS', {project});
						// Update the acceptance in store for the projects
						let projects = this.$store.getters.userProjects;
						for (let i = 0; i < projects.length; i++) {
							if ( projects[i].id === project.id ) {
								projects[i] = project;
								break;
							}
						}
						this.$store.commit('SET_PROJECTS', {projects});
						this.accepting = false;
					})
					.catch(error => { console.log(error); });
			},
			cancel() {
				this.canceling = true;
				new Model(`projects/${this.project.id}/cancel`).post()
					.then(response => {
						// Update the acceptance in store for the projects
						let projects = this.$store.getters.userProjects;
						for (let i = 0; i < projects.length; i++) {
							if ( projects[i].id === this.project.id ) {
								projects.splice(i, 1);
								break;
							}
						}
						this.$store.commit('SET_PROJECTS', {projects});
						// Remove the project focus
						this.$store.commit('SET_PROJECT_FOCUS', {project: null});
						this.$router.push('/user/my-projects');
						// Show a notification and redirect back to project listings.
						this.$store.dispatch('showNotification', { type: 'success', msg: 'Projektet blev avbrutet.'});
						this.canceling = false;
					})
					.catch(error => { console.log(error); });
			},
			start() {
				new Model(`projects/${this.project.id}/start`).put()
					.then(response => {
						// Update the acceptance in store for project in focus
						let project = this.$store.getters.userProjectFocus;
						project.started = true;
						this.$store.commit('SET_PROJECT_FOCUS', {project});
						// Update the acceptance in store for the projects
						let projects = this.$store.getters.userProjects;
						for (let i = 0; i < projects.length; i++) {
							if ( projects[i].id === project.id ) {
								projects[i] = project;
								break;
							}
						}
						this.$store.commit('SET_PROJECTS', {projects});
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>