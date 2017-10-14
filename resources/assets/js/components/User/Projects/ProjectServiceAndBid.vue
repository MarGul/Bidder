<template>
	<div class="project_service_and_bid-component">
		<section class="transparent-contentSection">
			<header class="transparent-contentSection-header">
				<h3>Visa tjänst &amp; bud</h3>
			</header>
			<div class="transparent-contentSection-content">
				<ul class="items-list-icon">
					<li class="has-go-to clickable" @click="goToService">
						<div class="item-list-icon">
							<i class="icon icon_two_users wh15 light-gray"></i>
						</div>
						<div class="item-list-icon-content">
							Visa tjänsten
						</div>
					</li>
					<li class="has-go-to clickable" @click="goToBid">
						<div class="item-list-icon">
							<i class="icon icon_bid wh15 light-gray"></i>
						</div>
						<div class="item-list-icon-content">
							Visa budet
						</div>
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
			})
		},
		methods: {
			goToService() {
				this.$router.push(`/user/projects/${this.project.id}/service`);
			},
			goToBid() {
				this.$router.push(`/user/projects/${this.project.id}/bid`);
			}
		}
	}
</script>