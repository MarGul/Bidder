<template>
	<div class="notification_settings-component">
		<template v-if="userNotificationSettingsFetched">

			<app-notification-settings-item v-for="(value, setting) in settings" :key="setting"
				:setting="setting"
				:value="value"
				@updated="settingChanged">		
			</app-notification-settings-item>

			<button type="button" class="btn btn-primary full-width mt15" :class="{processing}" :disabled="processing" @click.prevent="update">
				Uppdatera inställningarna
			</button>
		</template>

		<app-loading v-else></app-loading>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import appNotificationSettingsItem from "./NotificationSettingsItem";

	export default {
		components: {
			appNotificationSettingsItem
		},
		data() {
			return {
				settings: {},
				processing: false
			}
		},
		computed: {
			...mapGetters([
				'userNotificationSettings',
				'userNotificationSettingsFetched'
			])
		},
		methods: {
			settingChanged(event) {
				this.settings[event.setting] = Boolean(!this.settings[event.setting]);
			},
			update() {
				this.processing = true;
			}
		},
		created() {
			if ( !this.userNotificationSettingsFetched ) {
				this.$store.dispatch('fetchUserNotificationSettings')
					.then(response => {
						this.settings = this.userNotificationSettings;
					});
			} else {
				this.settings = this.userNotificationSettings;
			}
		}
	}
</script>