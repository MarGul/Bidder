<template>
	<div class="project_history-component">
		<section class="transparent-contentSection">
			<header class="transparent-contentSection-header has-link">
				<h3>Projekthistorik</h3>
				<router-link :to="`/user/projects/${project.id}/history`" class="is-link">Visa alla</router-link>
			</header>
			<div class="transparent-contentSection-content">
				<ul class="items-list-default">
					<transition-group name="fade-in">
						<li v-for="history in projectHistory" :key="history.id" class="has-left-border" :class="[history.type]">
							<div class="gray-sub-text" v-text="filters.time(history.created_at)"></div>
							<div class="item-content" v-text="history.action"></div>
						</li>
					</transition-group>
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
			project() {
				return this.$store.getters.userProjectDetails;
			},
			projectHistory() {
				return this.history.slice(0, 5);
			}
		}
	}
</script>