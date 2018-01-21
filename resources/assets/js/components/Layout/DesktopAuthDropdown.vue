<template>
    <div class="desktop-auth-dropdown">
        <div class="auth-dropdown-top">

            <div class="left-section">
                <ul class="auth-nav-section">
                    <li>
                        <router-link to="/user/services">
                            <div class="link-section-container">
                                <i class="icon h_briefcase wh20 light-gray mr15"></i>
                                <div class="link-container">
                                    <div class="link-text">Mina tjänster</div>
                                    <div class="gray-sub-text">Behöver du redigera din tjänst?</div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/bids">
                            <div class="link-section-container">
                                <i class="icon h_megafon wh20 light-gray mr15"></i>
                                <div class="link-container">
                                    <div class="link-text">Mina bud</div>
                                    <div class="gray-sub-text">Har du vunnit någon budgivning?</div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/projects">
                            <div class="link-section-container">
                                <i class="icon h_users wh20 light-gray mr15"></i>
                                <div class="link-container">
                                    <div class="link-text">Mina projekt</div>
                                    <div class="gray-sub-text">Se hur det går i dina projekt.</div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="right-section">
                <ul class="auth-nav-section">
                    <li>
                        <router-link to="/user/profile">
                            <div class="link-section-container">
                                <i class="icon h_profile wh20 light-gray mr15"></i>
                                <div class="link-container">
                                    <div class="link-text">Min profil</div>
                                    <div class="gray-sub-text">Redigera din profil.</div> 
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/subscriptions">
                            <div class="link-section-container">
                                <i class="icon h_repeat wh20 light-gray mr15"></i>
                                <div class="link-container">
                                    <div class="link-text">Mina prenumerationer</div>
                                    <div class="gray-sub-text">Håll koll på nya tjänster i ditt område.</div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/invoices">
                            <div class="link-section-container">
                                <i class="icon h_payment wh20 light-gray mr15"></i>
                                <div class="link-container">
                                    <div class="link-text">Mina betalningar</div>
                                    <div class="gray-sub-text">Hantera dina betalningar.</div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>


        </div>
        <div class="auth-dropdown-bottom">
            <ul class="auth-nav-section">
                <li>
                    <router-link to="/help">
                        <div class="link-section-container">
                            <i class="icon h_help wh20 light-gray mr15"></i>
                            <div class="link-container">
                                <div class="link-text">Hjälp</div>
                                <div class="gray-sub-text">Vi hjälper gärna dig med alla frågor du har.</div>
                            </div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <a class="is-clickable" @click="logout">
                        <div class="link-section-container">
                            <i class="icon h_lock_open wh20 light-gray mr15"></i>
                            <div class="link-container">
                                <div class="link-text">Logga ut</div>
                                <div class="gray-sub-text">Vi ses nästa gång!</div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Model from '../../includes/Model';

    export default {
        computed: {
            ...mapGetters({
                auth: 'authUser'
            })
        },
        methods: {
            logout() {
				this.$store.dispatch('clearAuthState');
				this.$router.push('/');
				new Model('logout').new().post().catch(error => { location.reload(); });
			}
        }
    }
</script>

