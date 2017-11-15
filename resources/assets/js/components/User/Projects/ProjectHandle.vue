<template>
	<div class="project_service_and_bid-component">
		<section class="transparent-contentSection">
			<header class="transparent-contentSection-header">
				<h3>Hantera projektet</h3>
			</header>
			<div class="transparent-contentSection-content">
				<ul class="items-list-icon">
					<router-link :to="`/user/projects/${project.id}`" tag="li" class="has-go-to" exact>
						<div class="item-list-icon vertical-centered">
							<i class="icon icon_two_users wh15 light-gray"></i>
						</div>
						<div class="item-list-icon-content">
							Visa projektet
						</div>
					</router-link>
					<router-link :to="`/user/projects/${project.id}/contract`" tag="li" class="has-go-to" v-if="project.use_contract" exact>
						<div class="item-list-icon vertical-centered">
							<i class="icon icon_handshake wh15 light-gray"></i>
						</div>
						<div class="item-list-icon-content">
							Visa avtalet
						</div>
					</router-link>
					<router-link :to="`/user/projects/${project.id}/service`" tag="li" class="has-go-to" exact>
						<div class="item-list-icon vertical-centered">
							<i class="icon icon_document_check wh15 light-gray"></i>
						</div>
						<div class="item-list-icon-content">
							Visa tjänsten
						</div>
					</router-link>
					<router-link :to="`/user/projects/${project.id}/bid`" tag="li" class="has-go-to" exact>
						<div class="item-list-icon vertical-centered">
							<i class="icon icon_bid wh15 light-gray"></i>
						</div>
						<div class="item-list-icon-content">
							Visa budet
						</div>
					</router-link>
					<router-link :to="`/user/projects/${project.id}/messages`" tag="li" class="has-go-to" exact>
						<div class="item-list-icon vertical-centered">
							<i class="icon icon_messages wh15 light-gray"></i>
						</div>
						<div class="item-list-icon-content">
							Visa meddelanden
						</div>
					</router-link>
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
		}
	}
</script>