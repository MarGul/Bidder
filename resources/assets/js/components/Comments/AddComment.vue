<template>
	<div class="add-comment-component">
		<h4>Lägg till en kommentar</h4>

		<div class="form-group margin-bottom-7" :class="{'has-error': error}">
			<textarea 
				class="form-control" 
				v-model="comment"
				@input="error = false"></textarea>
		</div>

		<div class="form-group text-right">
			<span class="comments-as" v-if="$store.getters.isAuthenticated">
				Du kommenterar som <a class="link">@{{ $store.getters.authUser.displayname }}</a>
			</span>
			<span class="comments-as" v-else>Du måste <a class="link" @click="$store.dispatch('openModal', {component: 'login'})">logga in</a> innan du kan kommentera</span>
			<button 
				class="btn btn-primary" 
				:disabled="error || !$store.getters.isAuthenticated || processing"
				@click="add">
					Kommentera
					<span class="processing" v-if="processing">
						<i class="fa fa-spinner fa-pulse fa-fw"></i>
						<span class="sr-only">Loading...</span>
					</span>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				comment: '',
				error: false,
				processing: false
			}
		},
		methods: {
			add() {
				// Validation
				if ( !this.comment ) return this.error = true;
				this.processing = true;


			}
		}
	}
</script>