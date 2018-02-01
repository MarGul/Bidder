<template>
    <section class="transparent-contentSection">
        <header class="transparent-contentSection-header has-link">
            <h3>Mail-inställningar</h3>
        </header>
        <div class="transparent-contentSection-content">
            <ul class="notification-settings-list">
                <li>
                    <div class="notification-setting-header">
                        <div class="notification-setting-title">
                            För mina tjänster
                        </div>
                        <div class="notification-setting-control">
                            <app-checkbox />
                        </div>
                    </div>
                    <div class="notification-setting-content">
                        Få ett email så fort något händer på dina tjänster. Exempelvis en ny
                        kommentar, nytt bud eller när din tjänst håller på att gå ut.
                    </div>
                </li>
                <li>
                    <div class="notification-setting-header">
                        <div class="notification-setting-title">
                            För mina projekt
                        </div>
                        <div class="notification-setting-control">
                            <app-checkbox />
                        </div>
                    </div>
                    <div class="notification-setting-content">
                        Få ett email så fort något händer på dina projekt. Exempelvis när 
                        detaljerna uppdateras eller den andra parten godkänner projektet.
                    </div>
                </li>
            </ul>
            <button type="button" class="btn btn-primary full-width c_c">
                Uppdatera inställningarna
            </button>
        </div>
    </section>
</template>

<script>
    import appCheckbox from '../../InputControls/Checkbox';

    export default {
        components: {
            appCheckbox
        }
    }
</script>
