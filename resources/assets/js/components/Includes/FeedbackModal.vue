<template>
	<div class="feedback-component">
		
		<div class="modal-header">
			<h3>Hör av dig</h3>
			<div class="header-text">Vi uppskattar all återkoppling.</div>
		</div>

        <div class="feedback-question-answer-container">
            <strong class="mb15 is-small-text" v-text="question.question" />
            <div class="gray-sub-text" v-text="question.answer" />
        </div>

		<div class="modal-body">
			<form @keydown="form.errors.clear()">

				<div class="form-group" :class="{'has-error': form.errors.has('subject')}">
					<label for="subject" class="control-label">Ämne</label>
					<select class="form-control" v-model="form.subject">
                        <option value="categoryDontExist">Min kategori finns inte</option>
                        <option value="locationDontExist">Mitt område finns inte</option>
                        <option value="bugg">Har du hittat en bugg?</option>
                        <option value="help">Hjälp</option>
                        <option value="other">Övrigt</option>
                    </select>

					<span class="help-block" v-if="form.errors.has('subject')" v-text="form.errors.get('subject')"></span>
				</div>
                
                <div class="form-group" :class="{'has-error': form.errors.has('email')}" v-if="!authenticated">
					<label for="email" class="control-label">Email</label>
					<input type="email" class="form-control" v-model="form.email">

					<span class="help-block" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
				</div>

				<div class="form-group" :class="{'has-error': form.errors.has('feedback')}">
					<label for="feedback" class="control-label">Feedback</label>
                    <textarea class="form-control" rows="4" v-model="form.feedback" />

					<span class="help-block" v-if="form.errors.has('feedback')" v-text="form.errors.get('feedback')"></span>
				</div>

			</form>
		</div>

		<div class="modal-footer">
			<button 
                type="submit"
                class="btn btn-primary"
                v-text="'Skicka feedback'"
            />
		</div>

	</div>
</template>

<script>
	import Form from '../../includes/classes/Form';
    import Model from '../../includes/Model';
    import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				processing: false,
				form: new Form({
                    subject: '',
                    email: '',
					feedback: '',
                }),
                questions: {
                    categoryDontExist: {
                        question: 'Min kategori finns inte?',
                        answer: `Vi lägger hela tiden till nya kategorier. Vi vill se till att där finns företag som kan buda på en kategori 
                                innan vi lägger till den. Skicka gärna förslag på kategorier som du vill att ska lägga till.`
                    },
                    locationDontExist: {
                        question: 'Mitt område finns inte?',
                        answer: `Vi är en nystartad plattform. Tanken är att vi inom kort ska täcka ett mycket större område. Skicka gärna förslag
                                på områden som du vill att vi ska lägga till.`
                    },
                    bugg: {
                        question: 'Har du hittat en bugg?',
                        answer: `Först och främst: vi ber så mycket om ursäkt :). Vi jobbar hela tiden på att förbättra GoBid. Vi skulle verkligen
                                uppskatta om du kunde berätta för oss var du har hittat en bugg så vi kan fixa den. Tack!`
                    },
                    help: {
                        question: 'Behöver du hjälp?',
                        answer: `Vi finns här för dig om du behöver hjälp. Skicka till oss vad du behöver hjälp med så återkommer vi så fort vi kan.`
                    },
                    other: {
                        question: 'Vad har du på hjärtat?',
                        answer: `Har du något som du vill berätta för oss? Tveka inte! Vi uppskatar att få återkoppling och kommer återkomma så fort vi kan.`
                    }
                }
			}
        },
        computed: {
            ...mapGetters({
                authenticated: 'isAuthenticated',
                data: 'modalData'
            }),
            question() {
                return this.questions[this.form.subject];
            }
        },
		methods: {
			
        },
        created() {
            this.form.subject = this.data.subject;
        }
	}
</script>