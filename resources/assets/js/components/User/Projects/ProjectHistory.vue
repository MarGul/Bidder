<template>
	<div class="project_history-component">
		<section class="transparent-contentSection">
			<header class="transparent-contentSection-header has-link">
				<h3>Projekthistorik</h3>
				<a class="is-link">Visa alla</a>
			</header>
			<div class="transparent-contentSection-content">
				<ul class="items-list-default">
					<li v-for="history in projectHistory" class="has-left-border" :class="[history.type]">
						<div class="gray-sub-text" v-text="filters.time(history.created_at)"></div>
						<div class="item-content" v-text="history.action"></div>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		props: {
			history: {
				type: Array,
				required: true
			}
		},
		computed: {
			projectHistory() {
				return this.history.slice(0, 5);
			}
		}
	}
</script>