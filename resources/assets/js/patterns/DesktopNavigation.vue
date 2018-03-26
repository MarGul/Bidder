<template>
    <ul class="desktop-navigation">
        <li class="desktop-navigation__nav-item">
            <router-link to="/services">
                <span class="desktop-navigation__nav-item__nav-text">Hitta Tjänster</span>
            </router-link>
        </li>
        <li class="desktop-navigation__nav-item">
            <router-link to="/user/create-service" v-if="authenticated">
                <span class="desktop-navigation__nav-item__nav-text">Skapa Tjänst</span>
            </router-link>
            <router-link to="/how-to-create-service" v-else>
                <span class="desktop-navigation__nav-item__nav-text">Skapa Tjänst</span>
            </router-link>
        </li>
        <li class="desktop-navigation__nav-item">
            <router-link to="/about">
                <span class="desktop-navigation__nav-item__nav-text">Om GoBid</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

    name: 'DesktopNavigation',

    computed: {
        ...mapGetters({
            authenticated: 'isAuthenticated'
        })
    }

}
</script>
