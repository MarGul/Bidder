<template>
	<div class="items-block" v-if="items.length > 0">
		<div class="root-container">
			<nav class="root-nav">
				<template v-for="(item, index) in items">
					<div class="nav-head"
							:class="{active: index == active}"
							@click="changeActive(index)">
						{{ item.name }}
					</div>
					<div class="sub-container" v-if="breakpoints.mobile && (index == active)">
						<router-link :to="generateLink(activeItem, true)" class="btn btn-primary">Visa Alla</router-link>

						<ul class="sub-nav list-unstyled">
							<li v-for="subItem in subCats">
								<router-link :to="generateLink(subItem)"><span>&raquo;</span>{{ subItem.name }}</router-link>
							</li>
						</ul>
					</div>
				</template>
			</nav>
		</div>
		<div class="sub-container" v-if="!breakpoints.mobile">
			<h1>{{ activeItem.name }}</h1>
			<router-link :to="generateLink(activeItem, true)" class="btn btn-primary">Visa Alla</router-link>

			<ul class="sub-nav list-unstyled">
				<li v-for="subItem in subCats">
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
				active: 0,
				breakpoints: window.breakpoints
			}
		},
		computed: {
			subCats() {
				return (this.items.length > 0) ? this.items[this.active][this.subItemsKey] : [];
			},
			activeItem() {
				return (this.items.length > 0) ? this.items[this.active] : null;
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