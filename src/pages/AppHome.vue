<script>
import axios from 'axios';

import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppFooter from '../components/AppFooter.vue';
import ApartmentCard from '../components/ApartmentCard.vue';

import { store } from '../store'


export default {
    components: {
        AppHeader,
        AppJumbotron,
        AppFooter,
        ApartmentCard
    },
    data() {
        return {
            store,
            apartments: [],
            query: ' ',
            currentPage: 1,
            lastPage: null,
        }
    },
    created() {
        this.getApartment();
    },
    methods: {
        getApartment(page_number) {
            axios.get(`${this.store.endpoint}/api/apartments`, {
                params: {
                    page: page_number
                }
            }).then((response) => {

                this.apartments = response.data.results.data;
                this.currentPage = response.data.results.current_page;
                this.lastPage = response.data.results.last_page;
            })
        }
    },
}
</script>
<template>
    <AppHeader />
    <AppJumbotron />
    <!-- MOST POPULAR SECTION  -->
    <div class="container">
        <div class="row">
            <div class="col-12 text-center my-4">
                <div class="popular-title">
                    Most popular houses
                    <div class="popular-subtitle">
                        choose the right apartment, house or B&B to satisfy your person
                    </div>
                </div>
            </div>

            <div class="col-12">
                qui verranno visualizzate le card degli appartamenti in evidenza!
            </div>
        </div>
    </div>

    <!-- SEARCH AND CARD SECTION  -->
    <div class="container my-5">

        <!-- SEARCHBAR  -->
        <div class="row justify-content-center text-center">
            <div class="popular-title mb-3">
                Search your destination
                <div class="popular-subtitle">
                    find the perfect avaible apartment for your trip
                </div>
            </div>
            <div class="col-12 col-sm-10 col-lg-6 d-flex">
                <input type="text" v-model="query" placeholder="Es. Bologna" class="form-control" name="query"
                    id="query">
                <router-link class="search-button ms-2"
                    :to="{ name: 'search', params: { query: query } }">Search</router-link>
            </div>
        </div>

        <!-- <div class="row justify-content-center align-items-end my-3">
            <div class="col-6">
                <label for="query" class="d-block mb-2">Search your destination</label>
                <input type="text" v-model="query" class="form-control" name="query" id="query">
            </div>
            <div class="col-6">
                <router-link class="dark-button" :to="{ name: 'search', params: { query: query } }">Search</router-link>
            </div>
        </div> -->

        <!-- CARD CICLATE  -->
        <div class="row column-gap-1 justify-content-around mt-5 justify-content-center">
            <ApartmentCard v-for="apartment in apartments" :apartment="apartment" />
        </div>
    </div>
    <AppFooter />

</template>
<style scoped lang="scss">
@use '../styles/generals.scss' as *;

.popular-title {
    font-size: 50px;

    .popular-subtitle {
        font-size: 20px;
    }
}
</style>