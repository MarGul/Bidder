<template>
	<span class="timer-component" :class="{critical: critical}">
		{{ left }}
	</span>
</template>

<script>
	export default {
		props: ['ends'],
		data() {
			return {
				timer: null,
				now: Math.trunc((new Date()).getTime() / 1000),
				critical: false
			}
		},
		computed: {
			seconds() {
				return (this.ending - this.now) % 60;
			},
			minutes() {
				return Math.trunc((this.ending - this.now) / 60) % 60;
			},
			hours() {
				return Math.trunc((this.ending - this.now) / 60 / 60) % 24;
			},
			days() {
				return Math.trunc((this.ending - this.now) / 60 / 60 / 24);
			},
			ending() {
				return Math.trunc(Date.parse(this.ends) / 1000)
			},
			left() {
				this.critical = false;

				if ( this.days > 5 ) return this.days + ' dagar';
				if ( this.days >= 1 ) return this.days + ' d ' + this.hours + ' tim';

				this.critical = true;

				if ( this.hours > 0 ) return this.hours + ' tim ' + this.minutes + ' min';
				if ( this.minutes > 0 ) return this.minutes + ' min ' + this.seconds + ' s';
				return this.seconds + ' s'; 
			}
		},
		mounted() {
			this.timer = setInterval(() => {
				this.now = Math.trunc((new Date()).getTime() / 1000);

				if ( this.now == this.ending ) {
					this.$emit('ended');
				}
			}, 1000);
		}
	}
</script>

<style lang="scss" scoped>
	.critical {
		color: #cc0000;
	}
</style>