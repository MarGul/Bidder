<template>
	<div class="confirm_modal-component">
		
		<div class="modal-body mt15">
			<div class="confirm-icon big-icon"></div>

			<div class="confirm-text" v-text="$store.getters.modalData.confirmText"></div>
		</div>

		<div class="modal-footer">
			<button class="btn btn-success" @click.prevent="$store.getters.modalData.onConfirm">Ja</button>
			<button class="btn btn-danger" @click.prevent="$store.dispatch('closeModal')">Avbryt</button>
		</div>

	</div>
</template>

<script>
	export default {
		
	}
</script>