<template>
	<div class="service-details-view">
        <div class="main-area-with-sidebar">
            <div class="main-area large-sidebar">
                <service-details :service="service" />
                <section class="transparent-contentSection service-comments mt50" v-if="!breakpoints.isSmallDevices()">
                    <app-add-comment></app-add-comment>
                    <transition-group name="slide-in-left">
                        <app-comment v-for="comment in service.comments" :comment="comment" :key="comment.id" />
                    </transition-group>
                </section>
            </div>
            <div class="main-area-sidebar">
                <section class="white-contentSection">
                    <div class="white-contentSection-content service-bids pb10">
                        <div class="time-left text-center">
                            <div class="gray-sub-text">Avslutas om</div>
                            <app-timer :ends="service.bid_stop"></app-timer>
                            <div class="ends" v-text="`den ${filters.time(service.bid_stop)}`"></div>
                        </div>
                        <div class="active-bids text-center is-flex c_c">
                            <i class="icon h_megafon wh20 light-gray cursor-default mr15"></i>
                            <span class="mr5">{{ service.bids.length }}</span> bud. 
                            <router-link :to="{ name: 'serviceBids' }" class="is-link">Visa alla bud</router-link>
                        </div>
                    </div>
                    <footer class="white-contentSection-footer">
                        <button class="btn btn-primary full-width" @click.prevent="createBid">
                            Lägg ett bud
                        </button>
                    </footer>
                </section>
                <section class="transparent-contentSection">
                    <header class="transparent-contentSection-header" :class="{'has-link': myService}">
                        <h3>Upplagd av</h3>
                        <router-link :to="`/user/services/${service.id}`" class="is-link" v-if="myService">Redigera</router-link>
                    </header>
                    <div class="transparent-contentSection-content">
                        <div class="service-user">
                            <div class="user-avatar-container">
                                <img :src="service.user.avatar" :alt="avatarAlt">
                            </div>
                            <div class="user-details-container">
                                <div class="user-username">
                                    <router-link class="is-link" :to="`/profile/${service.user.username}`">{{ service.user.username }}</router-link>
                                </div>
                                <div class="user-ratings">
                                    <app-ratings :rating="ratingAvg" :total="ratingCount"></app-ratings>
                                </div>
                                <div class="gray-sub-text mt3">Skapades den {{ filters.time(service.created_at) }}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section class="transparent-contentSection service-comments mt50" v-if="breakpoints.isSmallDevices()">
                <app-add-comment></app-add-comment>
                <transition-group name="slide-in-left">
                    <app-comment v-for="comment in service.comments" :comment="comment" :key="comment.id" />
                </transition-group>
            </section>
        </div>
    </div>
</template>

<script>
	import appAddComment from '../Comments/AddComment';
	import appComment from '../Comments/Comment';
	import serviceDetails from '../Services/ServiceDetails';
	import appRatings from '../Includes/Ratings';
	import appTimer from '../Includes/Timer';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			appComment,
			appAddComment,
			serviceDetails,
			appRatings,
			appTimer
		},
		computed: {
			...mapGetters({
				fetched: 'serviceFetched',
                service: 'service',
                auth: 'authUser'
			}),
			breakpoints() {
				return window.breakpoints;
			},
			avatarAlt() {
				return `Avatar bild för användare ${this.service.user.username}`;
			},
			ratingCount() {
				return this.service.user.rating ? this.service.user.rating.count : 0;
			},
			ratingAvg() {
				return this.service.user.rating ? this.service.user.rating.avg : 0;
            },
            myService() {
                return this.auth.id === this.service.user.id;
            }
		},
		methods: {
			createBid() {
				this.$store.dispatch('openModal', { component: 'createBid', size: 'size-large', data: {closeClass: 'white'}});
			}
		}
	}
</script>