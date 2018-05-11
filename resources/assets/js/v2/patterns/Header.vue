<template>
    <header class="site-header fixed w-full z-10 bg-grey-darkest shadow-md border-t-2 border-gobid py-2">
        <div class="container mx-auto px-4 lg:px-0 flex">
            <div class="mobile-menu-toggle lg:hidden" @click="toggleMobileMenu">
                <span></span>
            </div>
            <div class="flex-1 text-center lg:w-1/5 lg:flex lg:flex-none lg:items-center">
                <img src="/images/logo.png" class="w-24" alt="">
            </div>
            <nav class="hidden lg:block lg:flex-1">
                <ul class="list-reset flex h-full">
                    <li>
                        <a href="" class="block h-full flex items-center px-6 no-underline text-grey-lighter">
                            Hitta Tjänster
                        </a>
                    </li>
                    <li>
                        <a href="" class="block h-full flex items-center px-6 no-underline text-grey-lighter">
                            Skapa Tjänst
                        </a>
                    </li>
                    <li>
                        <a href="" class="block h-full flex items-center px-6 no-underline text-grey-lighter">
                            Om GoBid
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="hidden lg:block lg:flex lg:items-center">
                <a href="" class="btn-link mr-2">Logga in</a>
                <a href="" class="btn-primary">Registrera</a>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  
    name: 'Header',

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
