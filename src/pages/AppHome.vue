<script>
import axios from 'axios';

import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppFooter from '../components/AppFooter.vue';

import { store } from '../store'


export default {
    components: {
        AppHeader,
        AppJumbotron,
        AppFooter
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
                console.log(response.data.results.data);

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
    <div>
        <input type="text" v-model="query" name="query" id="query">
        <router-link class="btn btn-primary" :to="{ name: 'search', params: { query: query } }">Cerca</router-link>
    </div>
    <div v-for="apartment in apartments">
        <ul>
            <li>{{ apartment.title }}</li>
        </ul>
    </div>
    <div class="col-12">
        <div class="page_button_container">
            <div>
                <button :class="currentPage == 1 ? 'disabled' : ''" @click=" getApartment(currentPage - 1)"
                    class="btn btn-secondary"><i class="bi bi-chevron-left"></i></button>
            </div>
            <div>
                <button :class="currentPage == lastPage ? 'disabled' : ''" @click="getApartment(currentPage + 1)"
                    class="btn btn-secondary"><i class="bi bi-chevron-right"></i></button>
            </div>
        </div>
    </div>
    <AppFooter />

</template>
<style scoped lang="scss"></style>