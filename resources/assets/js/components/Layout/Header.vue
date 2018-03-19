<template>
    <header class="site-header">
        <div class="mobile-menu-toggle" @click="toggleMobileMenu"><span></span></div>
        <div class="logo-container">
            <img src="/images/logo.png" alt="GoBid Logo" />
        </div>
    </header>
</template>

<script>
export default {

    methods: {
        toggleMobileMenu() {
            if ( document.body.classList.contains('mobile-menu-open') ) {
                document.body.classList.remove('mobile-menu-open');
            } else {
                document.body.classList.add('mobile-menu-open');
            }
        }
    }
}
</script>

