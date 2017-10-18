<template>
	<div class="project_phase_cancelled-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Projektet är avbrutit!</h3>
			</header>
			<div class="white-contentSection-content">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi non dolores, facere deleniti, consequuntur sed quasi quae debitis? Officiis incidunt iusto, non quas voluptatem voluptatum! Vel, voluptate eaque. Sequi, modi.
				<ul class="items-list-default mt30">
					<li class="has-left-border" :class="[cancelHistory.type]">
						<div class="gray-sub-text" v-text="filters.time(cancelHistory.created_at)"></div>
						<div class="item-content" v-text="cancelHistory.message"></div>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				project: 'userProjectDetails'
			}),
			cancelHistory() {
				return this.project.history.find(el => el.action === 'cancelled');
			}
		}
	}
</script>