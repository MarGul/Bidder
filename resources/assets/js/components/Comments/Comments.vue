<template>
	<div class="comments-component">
		<app-add-comment></app-add-comment>

		<div class="margin-50">
			<ul class="top-comments">
				<li v-for="comment in comments">
					<app-comment :comment="comment"></app-comment>
					<ul class="comment-replies" v-if="comment.replies.length > 0">
						<li v-for="reply in comment.replies">
							<app-comment :comment="reply"></app-comment>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import AddComment from "./AddComment.vue";
	import Comment from "./Comment.vue";

	export default {
		components: {
			appAddComment: AddComment,
			appComment: Comment,
		},
		data() {
			return {
				comments: [
					{
						avatar: 'https://avatars0.githubusercontent.com/u/11759765?v=3&s=460',
						author: 'Marcus Gullberg',
						comment: 'Hello there this is a comment because I want to know what is going on with this service.',
						time: '1 hour ago',
						canReply: true,
						replies: [
							{
								avatar: 'https://lh3.googleusercontent.com/lviuiKeKp3sfoMWnVyxkkM6WFvetT7XOMwH0qoZMDRmLChh_skg',
								author: 'Elon Musk',
								comment: 'I need you to build a space rocket in 5 days. Can you handle it?',
								time: '12 minutes ago',
								canReply: false,
								replies: []
							}
						]
					},
					{
						avatar: 'https://avatars0.githubusercontent.com/u/11759765?v=3&s=460',
						author: 'Marcus Gullberg',
						comment: 'Hello there this is a comment because I want to know what is going on with this service.',
						time: '1 hour ago',
						canReply: true,
						replies: [
							{
								avatar: 'https://lh3.googleusercontent.com/lviuiKeKp3sfoMWnVyxkkM6WFvetT7XOMwH0qoZMDRmLChh_skg',
								author: 'Elon Musk',
								comment: 'I need you to build a space rocket in 5 days. Can you handle it?',
								time: '15 minutes ago',
								canReply: false,
								replies: []
							}
						]
					}
				]
			}
		}
	}
</script>