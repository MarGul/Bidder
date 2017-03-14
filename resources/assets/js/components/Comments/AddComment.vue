<template>
	<div class="add-comment-component">
		<h4>Lägg till en kommentar</h4>

		<div class="form-group margin-bottom-7" :class="{'has-error': error}">
			<textarea 
				class="form-control" 
				v-model="comment"
				@input="error = false"
			></textarea>
		</div>

		<div class="form-group text-right">
			<span class="comments-as">Kommenterar som Marcus Gullberg</span>
			<button 
				class="btn btn-primary" 
				:disabled="error"
				@click="add"
			>Kommentera</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				comment: '',
				error: false,
			}
		},
		methods: {
			add() {
				// Validation
				if ( !this.comment ) return this.error = true;


			}
		}
	}
</script>