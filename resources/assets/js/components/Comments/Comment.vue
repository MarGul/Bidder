<template>
	<div class="comment-component">
		<div class="comment-avatar" :style="{'background-image': avatar}"></div>
		<div class="comment-content">
			<div class="comment-head">
				<span class="comment-author" v-text="comment.author"></span>
				<small class="comment-time" v-text="comment.time"></small>
				<i class="fa fa-reply" aria-hidden="true" v-if="comment.canReply"></i>
			</div>
			<div class="comment-body" v-text="comment.comment"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['comment'],
		computed: {
			avatar() {
				return `url('${this.comment.avatar}')`;
			}
		}
	}
</script>