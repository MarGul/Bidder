<template>
	<div class="service-container">
		<div class="service-img"></div>
		<div class="service-content">
			<div class="service-title">
				{{ service.title }}
			</div>
			<div class="service-bottom">
				<ul class="list-unstyled bottom-info">
					<li class="category">
						<i class="fa fa-list-ul" aria-hidden="true"></i> {{ service.category.name }}
					</li>
					<li class="location">
						<i class="fa fa-map-marker" aria-hidden="true"></i> {{ service.city.name }}, {{ service.region.name }}
					</li>
				</ul>
				<ul class="list-unstyled bottom-meta">
					<li class="bid"><i class="fa fa-gavel" aria-hidden="true"></i> {{ service.bids.length }} bud</li>
					<li class="comments"><i class="fa fa-commenting" aria-hidden="true"></i> {{ service.comments.length }}</li>
					<li class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> Time</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['service']
	}
</script>