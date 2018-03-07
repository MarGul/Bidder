<template>
    <div class="how_to_create_service-view">
        <app-hero>
			<h1 slot="title">Skapa en tjänst</h1>
			<p slot="left">
				Skapa en tjänst på GoBid och låt företag buda för att få utföra din tjänst. Det är helt kostnadsfritt att lägga
                ut en tjänst. Du bestämmer sen vilket bud du vill acceptera.
			</p>
			<img slot="right" src="/images/mechanic.png" alt="">
		</app-hero>
        <div class="container">
            <div class="content smaller-content mb30">

                <section class="white-contentSection">
                    <header class="white-contentSection-header">
                        <h3>Vill du lägga ut din tjänst på GoBid?</h3>
                    </header>
                    <div class="white-contentSection-content">
                        <p>
                            Att lägga ut din tjänst på GoBid är ett utmärkt sätt för att slippa kontakta en massa olika företag och få in offerter.
                            Du lägger ut din tjänst och sen låter du företag lägga bud på att få utföra tjänsten.
                        </p>
                        <p class="mt30 mb30">
                            Innan du kan skapa en tjänst så behöver du registrera dig. Det är helt kostnadsfritt och tar inte mer än 60 sekunder.
                        </p>
                        <p class="text-center">
                            <button type="button" class="btn btn-primary is-large-text" @click="register">
                                Skapa ett konto
                            </button>
                        </p>
                    </div>
                </section>

            </div>
        </div>
        <app-create-service-steps />
    </div>
</template>

<script>
import appCreateServiceSteps from '../components/Home/CreateServiceSteps';

export default {
    components: {
        appCreateServiceSteps
    },
    methods: {
        register() {
            this.$store.dispatch('openModal', {component: 'register', data: { closeClass: 'white' }});
        }
    }
}
</script>
