<template>
	<div class="comments-component">
		<app-add-comment></app-add-comment>

		<app-comment v-for="comment in comments" :comment="comment"></app-comment>
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
						time: '',
						replies: [
							{
								avatar: 'https://lh3.googleusercontent.com/lviuiKeKp3sfoMWnVyxkkM6WFvetT7XOMwH0qoZMDRmLChh_skg',
								author: 'Elon Musk',
								comment: 'I need you to build a space rocket in 5 days. Can you handle it?',
								time: '',
								replies: []
							}
						]
					},
					{
						avatar: 'https://avatars0.githubusercontent.com/u/11759765?v=3&s=460',
						author: 'Marcus Gullberg',
						comment: 'Hello there this is a comment because I want to know what is going on with this service.',
						time: '',
						replies: [
							{
								avatar: 'https://lh3.googleusercontent.com/lviuiKeKp3sfoMWnVyxkkM6WFvetT7XOMwH0qoZMDRmLChh_skg',
								author: 'Elon Musk',
								comment: 'I need you to build a space rocket in 5 days. Can you handle it?',
								time: '',
								replies: []
							}
						]
					}
				]
			}
		}
	}
</script>