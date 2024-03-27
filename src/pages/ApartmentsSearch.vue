<script>
import { store } from '../store.js';
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';

export default {
    components: {
        AppHeader,
        AppJumbotron
    },
    data() {
        return {
            store,
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
                console.log(this.apartments)
            })
        }
    },
}
</script>
<template>
    <AppHeader />
    <AppJumbotron />
    <div>
        <div v-for="apartment in apartments">
            {{ apartment.title }}
            {{ apartment.rooms }}
            {{ apartment.address }}
        </div>
    </div>
</template>
<style scoped lang="scss"></style>