<template>
    <div id="site">
        
        <app-mobile-header v-if="breakpoints.isMobile()"></app-mobile-header>
        <app-desktop-header v-else></app-desktop-header>
        
        <!-- This is where the router view component will be loaded -->
        <router-view></router-view>

        <app-footer></app-footer>

    </div>
</template>

<script>
    import MobileHeader from './components/Layout/Header/MobileHeader.vue';
    import DesktopHeader from './components/Layout/Header/DesktopHeader.vue';
    import Footer from './components/Layout/Footer/Footer.vue';

    export default {
        data() {
            return {
                breakpoints: window.breakpoints
            }
        },
        components: {
            appMobileHeader: MobileHeader,
            appDesktopHeader: DesktopHeader,
            appFooter: Footer
        }
    }
</script>
