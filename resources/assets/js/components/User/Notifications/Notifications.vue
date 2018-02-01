<template>
    <div class="notifications_component">
        <div class="main-area-with-sidebar">
            <div class="main-area">
                <section class="white-contentSection">
                    <header class="white-contentSection-header">
                        <h3>Notifikationer</h3>
                    </header>
                    <div class="white-contentSection-content">
                        
                    </div>
                </section>
            </div>
            <div class="main-area-sidebar">
                <app-notification-settings />
            </div>
        </div>
    </div>
</template>

<script>
    import appNotificationSettings from './NotificationSettings';

    export default {
        components: {
            appNotificationSettings
        }
    }
</script>

