<template>
	<div class="notification_settings_item-component">
		<div class="setting-text">
			{{ settingText }}
		</div>
		<div class="setting-value">
			<i class="fa fa-2x" :class="toggle" aria-hidden="true" @click="$emit('updated', {setting})"></i>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['setting', 'value'],
		data() {
			return {
				settingTexts: {
					bid_on_service: 'När någon lägger ett bud på en av mina tjänster.',
					comment_on_service: 'När någon lägger en kommentar på en av mina tjänster.',
					comment_reply: 'När någon lägger en kommentar på en tjänst som jag också har kommenterat på.',
					competing_bid: 'När någon lägger ett bud på en tjänst som jag också har lagt ett bud på.',
					leave_review: 'När ett av dina projekt är avslutat och det är dags att lägga omdöme på den andra parten.',
					message_in_project: 'När jag får ett nytt meddelande i ett av mina projekt.',
					other_party_accepted: 'När den andra parten har accepterat ett projekt och är redo att starta.',
					project_details_changed: 'När specifikationerna för ett projekt blir ändrat.',
					project_started: 'När ett projekt startar.'
				}
			}
		},
		computed: {
			settingText() {
				return this.settingTexts[this.setting];
			},
			toggle() {
				return this.value ? ['fa-toggle-on'] : ['fa-toggle-off'];
			}
		}
	}
</script>