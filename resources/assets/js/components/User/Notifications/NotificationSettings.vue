<template>
	<div class="notification_settings-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Inställningar för notifikationer</h3>
			</header>
			<div class="white-contentSection-content">
				<template v-if="fetched">

					<app-notification-settings-item v-for="(value, setting) in settings" :key="setting"
						:setting="setting"
						:value="value"
						@updated="settingChanged">		
					</app-notification-settings-item>
					
				</template>

				<app-loading v-else></app-loading>
			</div>
			<footer class="white-contentSection-footer">
				<button type="button" class="btn btn-primary" :class="{processing}" :disabled="processing" @click.prevent="update">
					Uppdatera
				</button>
			</footer>
		</section>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import appNotificationSettingsItem from "./NotificationSettingsItem";
	import Model from "../../../includes/Model";

	export default {
		components: {
			appNotificationSettingsItem
		},
		data() {
			return {
				processing: false
			}
		},
		computed: {
			...mapGetters({
				fetched: 'userNotificationSettingsFetched',
				settings: 'userNotificationSettings'
			})
		},
		methods: {
			settingChanged(event) {
				this.settings[event.setting] = Boolean(!this.settings[event.setting]);
			},
			update() {
				this.processing = true;
				new Model(`users/${this.$store.getters.authUser.id}/notification-settings`).patch(this.settings)
					.then(response => {
						this.$store.commit('SET_NOTIFICATIONSETTINGS', {notificationSettings: this.settings});
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Vi har uppdaterat dina inställningar för när du ska få notifikationer.'});
						this.processing = false;
					})
					.catch(error => console.log(error));
			}
		},
		created() {
			if ( !this.fetched ) {
				new Model('user/notification-settings').get()
					.then(response => {
						this.$store.commit('SET_USER_NOTIFICATION_SETTINGS', response.settings);
						this.$store.commit('SET_USER_NOTIFICATION_SETTINGS_FETCHED', true);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>