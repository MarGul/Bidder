<template>
	<div class="service-container">
		<div class="service-img"></div>
		<div class="service-content">
			<div class="service-title">
				{{ service.title }}
			</div>
			<ul class="list-unstyled">
				<li class="category">
					<i class="fa fa-list-ul" aria-hidden="true"></i> {{ service.category.name }}
				</li>
				<li class="location">
					<i class="fa fa-map-marker" aria-hidden="true"></i> {{ service.city.name }}, {{ service.region.name }}
				</li>
			</ul>
			<div class="service-bottom">
				test
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['service']
	}
</script>