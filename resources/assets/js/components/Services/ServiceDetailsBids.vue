<template>
    <div class="service_details_bids-component">
        <div class="main-area-with-sidebar">
            <div class="main-area">
                <router-link :to="`/services/${service.id}`" class="btn btn-primary full-width mb30" v-if="breakpoints.isMobile()">
                    Tillbaka till tjänsten
                </router-link>
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
                                <div class="item-content" v-text="bids.length"></div>
                            </li>
                            <li>
                                <div class="gray-text">Senaste budet lagt</div> 
                                <div class="item-content" v-text="latestBid"></div>
                            </li>
                            <li>
                                <div class="gray-text">Första budet lagt</div>
                                <div class="item-content" v-text="firstBid"></div>    
                            </li>
                        </ul>
                        <router-link :to="`/services/${service.id}`" class="btn btn-primary full-width">
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
            breakpoints() {
				return window.breakpoints;
			},
            bids() {
                return this.service.bids;
            },
            firstBid() {
                if ( this.bids.length === 0 ) return 'Inget bud lagt än.';

                return this.filters.time(this.bids[this.bids.length - 1].created_at);
            },
            latestBid() {
                if ( this.bids.length === 0 ) return 'Inget bud lagt än.';

                return this.filters.time(this.bids[0].created_at);
            }
        }
    }
</script>