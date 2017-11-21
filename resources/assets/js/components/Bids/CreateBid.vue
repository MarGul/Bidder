<template>
	<div class="create_bid-component">

		<div class="modal-header">
			<h3>Lägg ett bud</h3>
			<div class="header-text">Berätta varför just du ska få utföra tjänsten.</div>
		</div>
			
        <template v-if="authCheck">
            <form class="form-with-sections" @submit.prevent="create">
                <div class="modal-body">
                    <div class="form-section">
                        <div class="form-section-description">
                            <div class="description-header">Tider</div>
                            <div class="description-details">
                                Berätta när du kan påbörja utförandet av tjänsten och när det kan vara klart.
                            </div>
                        </div>
                        <div class="form-section-controls is-flex-sm">
                            <div class="control-container flex-1-sm mr15-sm" :class="{'has-errors': form.errors.has('start')}">
                                <label class="control-label">Starta utförandet <span class="req">*</span></label>
                                <datepicker
                                    input-class="form-control"  
                                    language="sv"
                                    :monday-first="true"
                                    :disabled="{to: new Date()}"
                                    v-model="form.start"
                                ></datepicker>
                                <span class="help-block" v-if="form.errors.has('start')" v-text="form.errors.get('start')"></span>
                            </div>

                            <div class="control-container flex-1-sm ml10-sm" :class="{'has-errors': form.errors.has('end')}">
                                <label class="control-label">avsluta utförandet <span class="req">*</span></label>
                                <datepicker
                                    input-class="form-control"  
                                    language="sv"
                                    :monday-first="true"
                                    :disabled="{to: new Date()}"
                                    v-model="form.end"
                                ></datepicker>
                                <span class="help-block" v-if="form.errors.has('end')" v-text="form.errors.get('end')"></span>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="form-section-description">
                            <div class="description-header">Detaljer</div>
                            <div class="description-details">
                                Fyll i hur många timmar utförandet av tjänsten kommer att ta och ditt slutgiltiga pris.
                            </div>
                        </div>
                        <div class="form-section-controls is-flex-sm">
                            <div class="control-container flex-1-sm mr15-sm" :class="{'has-errors': form.errors.has('hours')}">
                                <label class="control-label">Antal timmar</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    @keypress="filters.isNumber($event)" 
                                    v-model="form.hours"
                                >
                                <span class="help-block" v-if="form.errors.has('hours')" v-text="form.errors.get('hours')"></span>
                            </div>

                            <div class="control-container flex-1-sm ml10-sm" :class="{'has-errors': form.errors.has('price')}">
                                <label class="control-label">Pris <span class="req">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    @keypress="filters.isNumber($event)"
                                    v-model="form.price"
                                >
                                <span class="help-block" v-if="form.errors.has('price')" v-text="form.errors.get('price')"></span>
                            </div>
                        </div>
                    </div>

                    <div class="form-section no-border">
                        <div class="form-section-description">
                            <div class="description-header">Beskrivning</div>
                            <div class="description-details">
                                Skriv en beskrivning av hur du kommer att utföra tjänsten. Vilka material kommer att användas?
                                Har du en mer detaljerad beskrivning på priset?
                            </div>
                        </div>
                        <div class="form-section-controls">
                            <div class="control-container" :class="{'has-errors': form.errors.has('description')}">
                                <label class="control-label">beskrivning <span class="req">*</span></label>
                                <textarea rows="8" class="form-control" v-model="form.description"></textarea>
                                <span class="help-block" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="text-right">
                        <button type="submit" class="btn btn-primary" :class="{processing}">
                            Lägg ditt bud
                        </button>
                    </div>
                </div>
            </form>
        </template>

        <template v-else>
            <div class="modal-body text-center">
                <div class="icon icon_gate_closed warning-color wh100 cursor-default"></div>
                <h5 class="warning-color">Du måste vara inloggad för att lägga ett bud.</h5>
            </div>
            <div class="modal-footer">
                <span class="is-link" @click="$store.dispatch('openModal', {component: 'login'})">Logga in</span> eller 
                <span class="is-link" @click="$store.dispatch('openModal', {component: 'register'})">Registrera</span>
            </div>
        </template>  
	</div> 
</template>

<script>
	import Model from '../../includes/Model';
	import Form from '../../includes/classes/Form';
	import Datepicker from 'vuejs-datepicker';
    import { mapGetters } from 'vuex';

	export default {
		components: {
			datepicker: Datepicker
		},
		data() {
			return {
				processing: false,
				form: new Form({
					start: '',
					end: '',
					hours: '',
					price: '',
					description: ''
				})
			}
		},
		computed: {
            ...mapGetters({
                service: 'getService',
                authCheck: 'isAuthenticated'
            })
		},
		methods: {
			create() {
				this.processing = true;
                let data = this.form.asDate(['start', 'end']).asFloats(['hours', 'price']).data();

				new Model(`services/${this.service.id}/bids`).post(data)
					.then(response => {
						// Add the new bid to the store.
						this.$store.dispatch('addBid', {bid: response.data.bid});
						this.form.reset();
						this.processing = false;
						// Show a success notification for bid created
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Snyggt! Vi skapade ditt bud.'});
						// Close the modal
						this.$store.dispatch('closeModal');
					})
					.catch(error => {
						this.form.errors.record(error);
						this.processing = false;
					});
            }
		}
	}
</script>
