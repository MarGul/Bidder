<template>
    <div class="service_details_bids-component">
        <div class="main-area-with-sidebar">
            <div class="main-area">
                <one-bid :bid="bid" v-for="bid in bids" :key="bid.id" />
            </div>
            <div class="main-area-sidebar">
                 <section class="transparent-contentSection">
                    <header class="transparent-contentSection-header">
                        <h3>Detaljer</h3>
                    </header>
                    <div class="transparent-contentSection-content">
                        <ul class="items-list-default">
                            <li>
                                <div class="gray-text">Antal bud</div>
                                <div class="item-content">3</div>
                            </li>
                            <li>
                                <div class="gray-text">Senaste budet lagt</div> 
                                <div class="item-content">18 nov 2017 11:03</div>
                            </li>
                            <li>
                                <div class="gray-text">Första budet lagt</div>
                                <div class="item-content">18 nov 2017 11:03</div>    
                            </li>
                        </ul>
                        <router-link :to="{name: 'serviceDetails', params: {id: $route.params.id}}" class="btn btn-primary full-width">
                            Tillbaka till tjänsten
                        </router-link>
                    </div>
                 </section>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import oneBid from '../Bids/OneBid.vue'
    
    export default {
        components: {
            oneBid
        },
        computed: {
            ...mapGetters({
                service: 'service'
            }),
            bids() {
                return this.service.bids;
            }
        }
    }
</script>