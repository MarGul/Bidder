<template>
    <div id="site">
        
        <app-mobile-header v-if="breakpoints.mobile"></app-mobile-header>
        <app-desktop-header v-else></app-desktop-header>

        <transition name="slide-down-up">
            <app-modal v-if="$store.getters.modalOpen">
                <component :is="$store.getters.modalComponent"></component>
            </app-modal>
        </transition>
        
        <div id="site-wrap">
            <div class="overlay" @click="hideMobileNav" v-if="breakpoints.mobile"></div>

            <!-- Show the search component here if we're on mobile -->
            <div class="mobile-search-header" v-if="breakpoints.mobile">
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
    import Modal from './components/Includes/Modal.vue';
    import Register from './components/Register/Register.vue';
    import Login from './components/Auth/Login.vue';
    import Search from './components/Includes/Search.vue';
    import Footer from './components/Layout/Footer/Footer.vue';

    export default {
        data() {
            return {
                breakpoints: window.breakpoints,
            }
        },
        methods: {
            hideMobileNav() {
                $('body').removeClass('mobile-nav-open');
            }
        },
        components: {
            appMobileHeader: MobileHeader,
            appDesktopHeader: DesktopHeader,
            appModal: Modal,
            register: Register,
            login: Login,
            appSearch: Search,
            appFooter: Footer
        },
        created() {
            // Initialize Data
            //this.$store.dispatch('fetchCategories');
            //this.$store.dispatch('fetchRegions');
        }
    }
</script>
