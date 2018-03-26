<template>
    <nav class="mobile-menu">
        <ul class="mobile-navigation">
            <li class="nav-item">
                <router-link to="/services" @click.native="closeMenu">Hitta tjänster</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/user/create-service" @click.native="closeMenu" v-if="authenticated">Skapa Tjänst</router-link>
                <router-link to="/how-to-create-service" @click.native="closeMenu" v-else>Skapa Tjänst</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/about" @click.native="closeMenu">Om GoBid</router-link>
            </li>
            <li v-if="authenticated" class="user-mobile-nav">
                <router-link to="/user/profile" tag="div" @click.native="closeMenu" class="mobile-nav-highlight">
                    <div class="auth-avatar" :style="avatar"></div>
                    <div class="auth-name">{{ user.username }}</div>
                </router-link>
                <ul class="user-mobile-sub-nav">
                    <li><router-link to="/user/profile" @click.native="closeMenu">Profil</router-link></li>
                    <li><router-link to="/user/notifications" @click.native="closeMenu">Notifikationer</router-link></li>
                    <li><router-link to="/user/create-service" @click.native="closeMenu">Skapa ny tjänst</router-link></li>
                    <li><router-link to="/user/services" @click.native="closeMenu">Mina tjänster</router-link></li>
                    <li><router-link to="/user/bids" @click.native="closeMenu">Mina bud</router-link></li>
                    <li><router-link to="/user/projects" @click.native="closeMenu">Mina projekt</router-link></li>
                    <li><router-link to="/user/subscruptions" @click.native="closeMenu">Prenumerationer</router-link></li>
                    <li><router-link to="/user/invoices" @click.native="closeMenu">Betalningar</router-link></li>
                    <li><a @click="logout">Logga ut</a></li>
                </ul>
            </li>
            <li class="mobile-nav-highlight is-flex c_c py-15" v-else>
                <a 
                    @click.prevent="openModal('login')" 
                    class="is-link is-weight-500 mr15"
                    v-text="`Logga in`"
                />
                <a 
                    v-ga="$ga.commands.registerOpened.bind(this, 'Mobile Nav Button')"
                    @click.prevent="openModal('register')" 
                    class="btn btn-primary"
                    v-text="`Registrera`"
                />
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            authenticated: 'isAuthenticated',
            user: 'authUser'
        }),
        avatar() {
            return !!this.user.avatar ? { backgroundImage: `url(${this.user.avatar}` } : {};
        }
    },
    methods: {
        closeMenu() {
            document.body.classList.remove('mobile-menu-open');
        },
        openModal(component) {
            this.closeMenu();
            this.$store.dispatch('openModal', {component: component, data: {closeClass: 'white'}})
        },
        logout() {
            this.closeMenu();
        }
    }
}
</script>
