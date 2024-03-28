<script>
import { store } from '../store.js';
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppFooter from '../components/AppFooter.vue';
import ApartmentCard from '../components/ApartmentCard.vue';

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
            query: ' ',
            beds: ' ',
            rooms: ' ',
            radius: ' ',
            bathrooms: ' ',
            apartments: null,
        }
    },
    created() {
        this.getApartments();
    },
    methods: {
        getApartments() {
            axios.get(`${this.store.endpoint}/api/search/?query=${this.$route.params.query}&radius=20`).then((response) => {
                this.apartments = response.data.results;
            })

        },
        getApartmentsRefresh(query, beds, rooms, radius, bathrooms) {

            if (beds != 0) {
                beds = `&beds=${beds}`;
            } else {
                beds = '&beds=0';
            }
            if (rooms != 0) {
                rooms = `&rooms=${rooms}`;
            } else {
                rooms = '&rooms=0';
            }
            if (bathrooms != 0) {
                bathrooms = `&bathrooms=${bathrooms}`;
            } else {
                bathrooms = '&bathrooms=0';
            }
            if (radius != 20) {
                radius = `&radius=${radius}`;
            } else {
                radius = '&radius=20';
            }

            axios.get(`${this.store.endpoint}/api/search/?query=${query}${radius}${beds}${rooms}${bathrooms}`).then((response) => {
                this.apartments = null;
                this.apartments = response.data.results;

                window.history.pushState({}, '', query + radius + beds + rooms + bathrooms)
            }).catch((error) => {
                console.log('error');
            })
        }
    },

}
</script>
<template>
    <AppHeader />
    <AppJumbotron />

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
                <input type="text" v-model="query" class="form-control" name="query" id="query">
                beds:
                <input type="text" v-model="beds" class="form-control" name="beds" id="beds">
                rooms:
                <input type="text" v-model="rooms" class="form-control" name="rooms" id="rooms">
                radius:
                <input type="text" v-model="radius" class="form-control" name="radius" id="radius">
                bathrooms:
                <input type="text" v-model="bathrooms" class="form-control" name="bathrooms" id="bathrooms">
                <button type="button" class="search-button ms-2"
                    @click="getApartmentsRefresh(query, beds, rooms, radius, bathrooms)">Search</button>
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



    <!-- <div class="container">
        <div class="row align-items-end  my-3">
            <div class="col-6">
                <label for="query" class="d-block mb-2">Search a destination</label>
                <input type="text" v-model="query" class="form-control" name="query" id="query">
            </div>
            <div class="col-6 d-flex">
                <button type="button" class="search-button ms-2" @click="getApartments2(query)">Search</button>
            </div>
            <div class="row column-gap-1 justify-content-around mt-5 justify-content-center">

                <ApartmentCard v-for="apartment in apartments" :apartment="apartment" />
            </div>
        </div>
    </div> -->
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