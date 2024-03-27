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
            apartments: null,
        }
    },
    created() {
        this.getApartments();
    },
    methods: {
        getApartments(query) {
            axios.get(`${this.store.endpoint}/api/apartments/${this.$route.params.query}`).then((response) => {
                this.apartments = response.data.results;
            })
        },
        getApartments2(query) {
            axios.get(`${this.store.endpoint}/api/apartments/${query}`).then((response) => {
                this.apartments = null;
                this.apartments = response.data.results;

            })
        }
    },

}
</script>
<template>
    <AppHeader />
    <AppJumbotron />
    <div class="container">
        <div class="row align-items-end  my-3">
            <div class="col-6">
                <label for="query" class="d-block mb-2">Search a destination</label>
                <input type="text" v-model="query" class="form-control" name="query" id="query">
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-primary mx-2" @click="getApartments2(query)">Cerca</button>
            </div>
            <div class="row column-gap-1 justify-content-around mt-5 justify-content-center">

                <ApartmentCard v-for="apartment in apartments" :apartment="apartment" />
            </div>
        </div>
    </div>
    <AppFooter />
</template>
<style scoped lang="scss"></style>