<template>
	<div class="home-view">
		<div class="container">
			<h2>Home Page</h2>

			<button @click="auth">Auth</button>
			<button @click="logout">Logout</button>
			<button @click="ajax">Run Ajax</button>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			auth() {
				let credentials = {email: 'first@tester.com', password: 'tester'};

				let instance = axios.create({
					baseURL: 'http://bidder.dev'
				})

				instance.post('login', credentials).then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				})
			},
			logout() {
				let instance = axios.create({
					baseURL: 'http://bidder.dev'
				})

				instance.post('logout').then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				})
			},
			ajax() {
				axios.post('test')
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