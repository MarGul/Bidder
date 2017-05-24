<template>
	<div class="project_accept-component">
		<div class="panel panel-info">
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
						<div class="avatar" :style="myAvatar"></div>
						<div v-if="project.me.accepted">Accepterat</div>
						<button @click.prevent="accept" v-else>
							Starta projektet
						</button>
					</div>
					<div class="details">
						Time left is:
					</div>
					<div class="other">
						<div class="avatar" :style="otherAvatar"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Model from "../../../includes/Model";

	export default {
		props: ['project'],
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
				new Model(`projects/${this.project.id}/accept`).post()
					.then(response => {
						console.log(response);
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}
</script>