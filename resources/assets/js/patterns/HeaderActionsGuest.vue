<template>
    <div class="header-actions__guest">
        <a 
            class="btn btn-transparent" 
            @click.prevent="$store.dispatch('openModal', {component: 'login', data: {closeClass: 'white'}})"
            v-text="'Logga In'"
        />
        <a 
            class="btn btn-primary" 
            v-ga="$ga.commands.registerOpened.bind(this, 'Desktop Nav Button')"
            @click.prevent="$store.dispatch('openModal', {component: 'register', data: {closeClass: 'white'}})"
            v-text="'Registrera'"
        />
    </div>
</template>

<script>
export default {

    name: 'HeaderActionsGuest'

}
</script>
