<template>
    <div id="site">
        
        <app-mobile-header v-if="breakpoints.is('xs')"></app-mobile-header>
        <app-desktop-header v-else></app-desktop-header>
        
        <div id="site-wrap">
            <div class="overlay" v-if="breakpoints.is('xs')"></div>

            <!-- Show the search component here if we're on mobile -->
            <div class="mobile-search-header" v-if="breakpoints.is('xs')">
                <app-search></app-search>
            </div>

            <!-- This is where the router view component will be loaded -->
            <router-view></router-view>

            <app-footer></app-footer>
        </div>

    </div>
</template>

<script>
    import MobileHeader from './components/Layout/Header/MobileHeader.vue';
    import DesktopHeader from './components/Layout/Header/DesktopHeader.vue';
    import Search from './components/Includes/Search.vue';
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
            appSearch: Search,
            appFooter: Footer
        }
    }
</script>
