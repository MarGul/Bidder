<template>
	<div class="info_accept-component">
		<div class="alert alert-info">
			<h4 class="text-center">Som en sista sak behöver du godkänna projektet.</h4>
			<div class="text">
				<p>Efter att ett projekt har skapats så är det sista du behöver göra att godkänna att vi ska starta projektet.
				Detta görs för er bådas säkerhet och ni får chansen att disskutera lite mer genom meddelanden som du finner här nere innan projektet räknas som godkänt.</p>
				<p>Ifall där är något som du inte gillar med detta projektet så kan du välja att inte godkänna projektet. Du som la ut tjänsten kan snabbt och enkelt starta budgivningen för tjänsten igen
				och du som la det accepterade budet kommer inte att behöva betala.</p>
				<p>Direkt när båda parterna har godkänt projektet så kan ni starta och kommer inte att höra av er ifrån oss förän projektet är klart och det är dags att lämna omdömmen om varandra.</p>

				<div class="project-users">
					<div class="me">
						<div class="avatar" :style="myAvatar"></div>
					</div>
					<div class="time-left">
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
	export default {
		props: ['project', 'me', 'other'],
		computed: {
			myAvatar() {
				return {backgroundImage: `url('${this.me.avatar}')`};
			},
			otherAvatar() {
				return {backgroundImage: `url('${this.other.avatar}')`};
			}
		}

	}
</script>