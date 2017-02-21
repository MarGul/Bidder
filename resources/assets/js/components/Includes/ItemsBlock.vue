<template>
	<div class="items-block" v-if="items.length > 0">
		<div class="left">
			<ul class="main-nav list-unstyled" >
				<li v-for="(item, index) in items" 
					:class="{active: index == active}"
					@click="changeActive(index)"
				>
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div class="right">
			<h1>{{ items[active].name }}</h1>
			<router-link :to="generateLink(items[active], true)" class="btn btn-primary">Visa Alla</router-link>

			<ul class="sub-nav list-unstyled">
				<li v-for="subItem in items[active][subItemsKey]">
					<router-link :to="generateLink(subItem)"><span>&raquo;</span>{{ subItem.name }}</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['items', 'subItemsKey', 'link', 'allLink'],
		data() {
			return {
				active: 0
			}
		},
		methods: {
			changeActive(index) {
				this.active = index;
			},
			generateLink(item, all = false) {
				let link = (all && this.allLink) ? this.allLink : this.link;
				return link.replace('{slug}', item.slug);
			}
		}
	}
</script>