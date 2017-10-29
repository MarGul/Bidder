<template>
	<div class="project_contract-component">
		
		<form class="form-with-sections">
			<section class="white-contentSection">
				<header class="white-contentSection-header">
					<h3>Projektets avtal</h3>
				</header>
				<div class="white-contentSection-content">

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Beställare</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<label class="control-label">Namn</label>
								<input type="text" class="form-control">
							</div>
							<div class="control-container">
								<label class="control-label">Organisations/-personnummer</label>
								<input type="text" class="form-control">
							</div>
							<div class="control-container">
								<label class="control-label">Telefonnummer</label>
								<input type="text" class="form-control">
							</div>
							<div class="control-container">
								<label class="control-label">E-mail</label>
								<input type="text" class="form-control">
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Utförare</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<label class="control-label">Namn</label>
								<input type="text" class="form-control">
							</div>
							<div class="control-container">
								<label class="control-label">Organisations/-personnummer</label>
								<input type="text" class="form-control">
							</div>
							<div class="control-container">
								<label class="control-label">Telefonnummer</label>
								<input type="text" class="form-control">
							</div>
							<div class="control-container">
								<label class="control-label">E-mail</label>
								<input type="text" class="form-control">
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Projektets beskrivning</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<label class="control-label">Beskrivning</label>
								<textarea rows="6" class="form-control"></textarea>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Utförarens avårdande</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<label class="control-label">Avrådande</label>
								<textarea rows="4" class="form-control"></textarea>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Tider</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<label class="control-label">Arbetet ska påbörjas</label>
								<input type="text" class="form-control">
							</div>
							<div class="control-container">
								<label class="control-label">Arbetet ska vara slutfört</label>
								<input type="text" class="form-control">
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Pris</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<div class="control-container">
									<label class="control-label">Totalsumma</label>
									<input type="text" class="form-control">
								</div>
								<div class="control-container">
									<label class="control-label">Specificerat</label>
									<textarea rows="4" class="form-control"></textarea>
								</div>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Betalning</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<label class="control-label">Avrådande</label>
								<textarea rows="4" class="form-control"></textarea>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Övrigt</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<label class="control-label">Övrigt</label>
								<textarea rows="4" class="form-control"></textarea>
							</div>
						</div>
					</div>

				</div>
			</section>
		</form>

	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';

	export default {
		data() {
			return {
				form: new Form({

				})
			}
		}
	}
</script>