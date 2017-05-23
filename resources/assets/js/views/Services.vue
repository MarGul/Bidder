<template>
	<div class="services-view">
		<app-hero>
			<h1 slot="title">Tjänster</h1>
			<p slot="left">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.
			</p>
			<img slot="right" src="mechanic.png" alt="">
		</app-hero>

		<div class="container">
			<div class="content">
				<app-services></app-services>
			</div>
		</div>
	</div>
</template>

<script>
	import appServices from '../components/Services/Services';

	export default {
		components: {
			appServices
		}
	}
</script>