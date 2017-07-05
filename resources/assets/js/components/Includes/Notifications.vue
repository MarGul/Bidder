<template>
	<div class="notifications-component" :class="[$store.getters.notificationType]">
		<div class="container">
			<div class="notification-area">
				<div class="notification-message">
					{{ $store.getters.notificationMessage }}
					<template v-if="$store.getters.notificationLink">
						&nbsp;&mdash;&nbsp;
						<router-link :to="$store.getters.notificationLink">{{ $store.getters.notificationLinkText }}</router-link>
					</template>
				</div>
				<div class="close-notification">
					<i class="fa fa-times" aria-hidden="true" @click="$store.dispatch('closeNotification')"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss" scoped>
	.notifications-component {
		padding: 16px;
		border: 1px solid rgba(27,31,35,0.15);

		&.success {
			background-color: #A6D785;
			color: #444;

			a {
				color: #008B00;
			}
		}

		&.error {
			// Implement the error color
		}

		.notification-area {
			display: flex;

			.notification-message {
				flex: 10;
			}

			.close-notification {
				flex: 1;
				text-align: right;

				i {
					cursor: pointer;
				}
			}
		}
	}
</style>