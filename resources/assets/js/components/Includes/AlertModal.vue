<template>
    <div class="alert_modal-component">
		
		<div class="modal-body mt15">
			<div class="confirm_modal_icon"></div>

			<div class="confirm-text" v-text="$store.getters.modalData.alertText"></div>
		</div>

		<div class="modal-footer">
			<button class="btn btn-danger" @click.prevent="$store.dispatch('closeModal')">Stäng</button>
		</div>

	</div>
</template>

<script>
export default {
  
}
</script>

