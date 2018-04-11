<template>
    <div class="welcome-view">
        <div class="container">
            <div class="content">
                
                <div class="welcome-numbers">
                    
                    <div class="numbered-step-container">
                        <div class="step-number-container">
                            <div class="step-number"><span>1</span></div>
                        </div>
                        <div class="step-container">
                            <section class="white-contentSection">
                                <header class="white-contentSection-header">
                                    <h3>Verifiera din email</h3>
                                </header>
                                <div class="gray-contentSection-content">
                                    <p>
                                        Innan du kan börja använda GoBid till fullo så behöver du verifiera din email adress som du använde när du 
                                        registrerade dig. Detta är för din, våran och våra användares säkerhet.
                                    </p>
                                    <p>
                                        <strong>Fick du inte mailet?</strong> Kolla i ditt spamfilter om mailet finns där. Har du fortfarande inte 
                                        fått mailet så var vänlig att 
                                        <span 
                                            class="is-link" 
                                            @click="$store.dispatch('openModal', {component: 'feedback', data: {closeClass: 'white',subject: 'bugg'}})"
                                            v-text="'kontakta oss'"
                                        />.
                                    </p>
                                    
                                </div>
                                <div class="white-contentSection-content">
                                    <app-email-verified />
                                </div>

                            </section>
                        </div>
                    </div>

                    <div class="numbered-step-container">
                        <div class="step-number-container">
                            <div class="step-number">2</div>
                        </div>
                        <div class="step-container">
                            <section class="white-contentSection">
                                <header class="white-contentSection-header">
                                    <h3>Uppdatera din profil</h3>
                                </header>
                                <div class="gray-contentSection-content">
                                    <p>
                                        Gör din profil lite mer attraktiv genom att ange ditt namn och en kort presentation av dig själv eller ditt företag.
                                        Glöm inte att även ladda upp en bild för en mer personlig touch.
                                    </p> 
                                </div>
                                <div class="white-contentSection-content">      
                                    <div class="account-container">
                                        <app-account :showEmailVerified="false" :withHTMLMarkup="false" />
                                        <app-profile-picture />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div class="numbered-step-container">
                        <div class="step-number-container">
                            <div class="step-number">3</div>
                        </div>
                        <div class="step-container">
                            <section class="white-contentSection">
                                <header class="white-contentSection-header">
                                    <h3>Lägg till prenumerationer</h3>
                                </header>
                                <div class="gray-contentSection-content">
                                    <p>
                                        <strong>Obs, den här funktionen är endast till för företag.</strong> 
                                    </p>
                                    <p>
                                        Genom att prenumerera på områden eller kategorier så kommer du att bli kontaktad av oss via mail varje gång en ny tjänst läggs till.
                                    </p>
                                </div>
                                <div class="white-contentSection-content">
                                    <app-add-subscription />
                                    <div class="mt30">
                                        <app-list-subscriptions />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    
                    <div class="numbered-step-container">
                        <div class="step-number-container">
                            <div class="step-number">4</div>
                        </div>
                        <div class="step-container mb30">
                            <section class="white-contentSection">
                                <header class="white-contentSection-header">
                                    <h3>Behöver du mer information?</h3>
                                </header>
                                <div class="white-contentSection-content">
                                    <ul>
                                        <li class="mb5">Om du är intresserad av att veta lite mer om GoBid så klicka <router-link class="is-link" to="/about">här</router-link></li>
                                        <li class="mb5">Om du vill veta mer om om våra vanligaste frågor och svar så klickar du <router-link class="is-link" to="/faq">här</router-link></li>
                                        <li>
                                            För att komma i kontakt med oss så klickar du 
                                            <span class="is-link" @click="$store.dispatch('openModal', {component: 'feedback', data: {closeClass: 'white', subject: 'other'}})">här</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div class="welcome-action-buttons">

                        <router-link :to="'/user/create-service'" tag="button" class="btn btn-orange is-flex c_c">
                            <i class="icon h_browser white wh20 mr15"></i> <span>Skapa en tjänst</span>
                        </router-link>
                        <div class="btn-divider">eller</div>
                        <router-link :to="'/services'" tag="button" class="btn btn-success is-flex c_c">
                            <i class="icon h_search white wh20 mr15"></i> <span>Sök efter tjänster</span>
                        </router-link>
                        
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
    import appEmailVerified from '../components/User/Profile/EmailVerified';
    import appAccount from '../components/User/Profile/Account';
    import appProfilePicture from '../components/User/Profile/ProfilePicture';
    import appAddSubscription from '../components/User/Subscriptions/AddSubscription';
    import appListSubscriptions from '../components/User/Subscriptions/ListSubscriptions';

    export default {
        components: {
            appEmailVerified,
            appAccount,
            appProfilePicture,
            appAddSubscription,
            appListSubscriptions
        }
    }
</script>
