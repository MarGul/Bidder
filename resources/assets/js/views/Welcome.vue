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
                                    Innan du kan börja använda GoBid till fullo så behöver du verifiera din email adress som du använde när du registrerade dig. Detta är för din, våran och våra användares säkerhet.
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
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, nesciunt eaque voluptatum, sapiente ut odio excepturi cupiditate veniam et odit repellat veritatis sit debitis corrupti. Id culpa praese
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
                                <div class="white-contentSection-content">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, nesciunt eaque voluptatum, sapiente ut odio excepturi cupiditate veniam et odit repellat veritatis sit debitis corrupti. Id culpa praesentium vel pariatur.
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
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, nesciunt eaque voluptatum, sapiente ut odio excepturi cupiditate veniam et odit repellat veritatis sit debitis corrupti. Id culpa praesentium vel pariatur.
                                </div>
                            </section>
                        </div>
                    </div>

                    <div class="welcome-action-buttons">

                        <router-link :to="'/user/create-service'" tag="button" class="btn btn-orange is-flex c_c">
                            <i class="btn-icon-create"></i> Skapa en tjänst
                        </router-link>
                        <div class="btn-divider">eller</div>
                        <router-link :to="'/services'" tag="button" class="btn btn-success is-flex c_c">
                            <i class="btn-icon-search"></i> Sök efter tjänster
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

    export default {
        components: {
            appEmailVerified,
            appAccount,
            appProfilePicture
        }
    }
</script>
