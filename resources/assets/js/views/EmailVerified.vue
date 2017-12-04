<template>
  
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                isAuth: 'isAuthenticated'
            })
        },
        created() {
            this.$store.dispatch('showNotification', {
                type: 'success', 
                msg: 'Din email har blivit verifierad. Du kan nu använda systemet till fullo!'
            });

            if ( this.isAuth ) {
                this.$router.push('/user/profile');
            } else {
                this.$router.push('/');
            }
        }
    }
</script>