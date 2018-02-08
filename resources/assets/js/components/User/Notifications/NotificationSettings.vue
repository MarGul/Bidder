<template>
    <section class="transparent-contentSection">
        <header class="transparent-contentSection-header has-link">
            <h3>Mail-inställningar</h3>
        </header>
        <div class="transparent-contentSection-content loading">
            <ul class="notification-settings-list">
                <li>
                    <div class="notification-setting-header">
                        <div class="notification-setting-title" v-text="`För mina tjänster`" />
                        <div class="notification-setting-control">
                            <app-checkbox v-model="settings.for_my_services" />
                        </div>
                    </div>
                    <div class="notification-setting-content">
                        Få ett email så fort något händer på dina tjänster. Exempelvis en ny
                        kommentar, nytt bud eller när din tjänst håller på att gå ut.
                    </div>
                </li>
                <li>
                    <div class="notification-setting-header">
                        <div class="notification-setting-title" v-text="`För mina bud`" />
                        <div class="notification-setting-control">
                            <app-checkbox v-model="settings.for_my_bids" />
                        </div>
                    </div>
                    <div class="notification-setting-content">
                        Få ett email när någon annan skapar ett tävlande bud på en tjänst du
                        också lagt ett bud på eller när ditt bud blir accepterat/nekat.
                    </div>
                </li>
                <li>
                    <div class="notification-setting-header">
                        <div class="notification-setting-title" v-text="`För mina projekt`" />
                        <div class="notification-setting-control">
                            <app-checkbox v-model="settings.for_my_projects" />
                        </div>
                    </div>
                    <div class="notification-setting-content">
                        Få ett email så fort något händer på dina projekt. Exempelvis när 
                        detaljerna uppdateras eller den andra parten godkänner projektet.
                    </div>
                </li>
            </ul>
            <button 
                type="submit" 
                class="btn btn-primary full-width c_c" 
                :class="{processing}"
                @click.prevent="update"
                v-text="`Uppdatera inställningarna`"
                :disabled="!fetched"
            />
        </div>
    </section>
</template>

<script>
    import appCheckbox from '../../InputControls/Checkbox';
    import Model from '../../../includes/Model';

    export default {
        components: {
            appCheckbox
        },
        data() {
            return {
                fetched: false,
                processing: false,
                settings: {}
            }
        },
        methods: {
            update() {
                this.processing = true;
                new Model(`user/notification-settings`).patch(this.settings)
                    .then(response => {
                        this.$store.dispatch('showNotification', {type: 'success', msg: 'Dina mail-inställningar är uppdaterade.'});
                    })
                    .catch(error => { 
                        this.$store.dispatch('showNotification', {type: 'error', msg: 'Något gick fel :('});
                    })
                    .finally(() => this.processing = false);
            }
        },
        created() {
            if ( !this.fetched ) {
                new Model(`user/notification-settings`).get()
                    .then(response => {
                        this.settings = response.data.settings;
                        this.fetched = true;
                    })
                    .catch(error => { console.log(error); });
            }
        }
    }
</script>
