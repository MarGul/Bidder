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
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			setTimeout(() => {
				this.$store.dispatch('closeNotification');
			}, 4000)
		}
	}
</script>

<style lang="scss" scoped>
	.notifications-component {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1000;
		padding: 16px;
		border: 1px solid rgba(27,31,35,0.15);
		text-align: center;

		&.success {
			background-color: rgba(81,163,81,0.95);
			color: #fff;

			a {
				color: #008B00;
			}
		}

		&.error {
			// Implement the error color
		}

		&.info {
			background-color: rgba(219, 237, 255, 0.95);
			color: #032f62;
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