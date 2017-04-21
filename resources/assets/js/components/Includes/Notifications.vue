<template>
	<div class="notifications-component" :class="[$store.getters.notificationType]">
		<div class="container">
			<div class="notification-area">
				<div class="notification-message">
					{{ $store.getters.notificationMessage }}
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

		&.success {
			background-color: #A6D785;
			color: #215E21;
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