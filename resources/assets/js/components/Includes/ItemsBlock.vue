<template>
	<div class="items-block clearfix" v-if="items.length > 0">
		<div class="left">
			<ul class="side-nav list-unstyled" >
				<li v-for="(item, index) in items" 
					:class="{active: index == active}"
					@click="changeActive(index)"
				>
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div class="right">
			<transition name="slide-in-right">
				<ul class="sub-nav list-unstyled">
					<li v-for="subItem in items[active][subItemsKey]">
						{{ subItem.name }}
					</li>
				</ul>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['items', 'subItemsKey'],
		data() {
			return {
				active: 0
			}
		},
		methods: {
			changeActive(index) {
				this.active = index;
			}
		}
	}
</script>