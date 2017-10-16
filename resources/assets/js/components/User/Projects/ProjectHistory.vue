<template>
	<div class="project_history-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Projekthistorik</h3>
			</header>
			<div class="white-contentSection-content">
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
		computed: {
			projectHistory() {
				return this.$store.getters.userProjectDetails.history;
			}
		}
	}
</script>