<script>
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppFooter from '../components/AppFooter.vue';
import ApartmentCard from '../components/ApartmentCard.vue';
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

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
            ttSearchBox: null,
            apartment_id: null,
            query: ' ',
            ip: null,
            currentPage: 1,
            lastPage: null,
        }
    },
    mounted() {
        var options = {
            searchOptions: {
                key: this.store.apiKey,

                language: "it-IT",

                limit: 5,
            },

            autocompleteOptions: {
                key: this.store.apiKey,

                language: "it-IT",
            },
        };
        let myInput = document.getElementById("myInput");

        // Creazione della search box
        this.ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
        // Applico lo stile
        let searchBoxHTML = this.ttSearchBox.getSearchBoxHTML();
        // Appendo la searchbox
        myInput.appendChild(searchBoxHTML);
    },
    created() {
        this.getApartment();
    },
    methods: {
        getApartment(page_number) {
            axios.get(`${this.store.endpoint}/api/sponsorized/apartments`, {
                params: {
                    page: page_number
                }
            }).then((response) => {
                this.apartments = response.data.results.data;
                this.currentPage = response.data.results.current_page;
                this.lastPage = response.data.results.last_page;
            })
        },
        valueAndSearch() {
            if (this.ttSearchBox) {
                // Recupero il valore della searchbox di TomTom
                let value = this.ttSearchBox.getValue();

                // Applico il valore alla nostra input
                this.query = value;


                this.$router.push({ name: 'search', params: { query: this.query } });
            }
        },
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

                <div class="row justify-content-center text-center mb-5">
                    <div class="popular-title mb-3">
                        Search your destination
                        <div class="popular-subtitle">
                            Find the perfect available apartment for your trip
                        </div>
                    </div>
                    <div class="col-12 d-flex d-flex justify-content-center">

                        <!-- Input di TomTom -->
                        <div id="myInput"></div>
                    </div>
                    <div class="col-12 d-flex d-flex justify-content-center mt-3">
                        <button type="button" @click="valueAndSearch" class="search-button">Search</button>
                    </div>

                </div>
                <!-- SEARCHBAR  -->

                <div class="popular-title">
                    <h2>Most popular houses</h2>
                    <div class="popular-subtitle">
                        <p><i>choose the right apartment, house or B&B to satisfy your person</i></p>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <ApartmentCard v-for="apartment in apartments" :apartment="apartment" />
            </div>
        </div>
    </div>

    <!-- TASTI NAVIGAZIONE PAGINE  -->
    <div class="container text-center mb-5">
        <button :class="currentPage == 1 ? 'my-disabled' : ''" @click=" getApartment(currentPage - 1)"
            class="nav-button me-2"><i class="bi bi-chevron-left" :disabled="currentPage == 1"></i></button>
        <button :class="currentPage == lastPage ? 'my-disabled' : ''" @click="getApartment(currentPage + 1)"
            class="nav-button" :disabled="currentPage == lastPage"><i class="bi bi-chevron-right"></i></button>
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

.prova {
    background-color: red;
    height: 100px;
}
</style>