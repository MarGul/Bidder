<template>
    <div>
        <app-mobile-menu></app-mobile-menu>
        
        <app-header></app-header>

        <div class="site flex flex-col min-h-screen">
            
            <div class="site-content flex-1">
                <router-view></router-view>
            </div>

            <app-footer></app-footer>
        </div>
    </div>
</template>

<script>
import appHeader from './patterns/Header'
import appMobileMenu from './patterns/MobileMenu'
import appFooter from './patterns/Footer'

export default {

    name: 'App',

    components: {
        appHeader,
        appMobileMenu,
        appFooter
    }

}
</script>
