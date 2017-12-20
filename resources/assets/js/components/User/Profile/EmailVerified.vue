<template>
    <div class="email_verified-component">
        <div class="is-flex v-center ml10" v-if="user.email_verified">
            <i class="icon icon_confirmed wh15 cursor-default mr10"></i> Din email är verifierad. 
        </div>
        <div class="is-flex v-center ml10" v-else>
            <i class="icon icon_warning_color wh20 cursor-default mr10"></i> Din email ej är verifierad&nbsp;&mdash;&nbsp;  
            <span class="is-link is-small-text" @click="sendVerification">Skicka verifikationen igen</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Model from '../../../includes/Model';
    
    export default {
        computed: {
            ...mapGetters({
				user: 'authUser'
			})
        },
        methods: {
            sendVerification() {
                new Model('send-email-verification').post()
                    .then(response => {
                        this.$store.dispatch('showNotification', {
                            type: 'success', 
                            msg: 'Vi har skickat ett email till dig där du kan verifiera din email. Kolla i ditt spam filter ifall du ej fått emailet.'
                        });
                    })
                    .catch(error => {
                        this.$store.dispatch('showNotification', {
                            type: 'error', 
                            msg: 'Kunde ej skicka ditt mail. Var vänlig försök igen eller hör av dig till oss om problemet kvarstår.'
                        });
                    });
            }
        }
    }
</script>
