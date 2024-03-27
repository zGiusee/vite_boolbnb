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
    <!-- CARD DA CICLARE  -->
    <div class="container">
        <div class="row align-items-end  my-3">
            <div class="col-6">
                <label for="query" class="d-block mb-2">Search a destination</label>
                <input type="text" v-model="query" class="form-control" name="query" id="query">
            </div>
            <div class="col-6">
                <router-link class="btn btn-primary"
                    :to="{ name: 'search', params: { query: query } }">Cerca</router-link>
            </div>
            <div class="row column-gap-1 justify-content-around mt-5 justify-content-center">

                <ApartmentCard v-for="apartment in apartments" :apartment="apartment" />
            </div>
        </div>
    </div>
    <AppFooter />

</template>
<style scoped lang="scss">
@use '../styles/generals.scss';
</style>