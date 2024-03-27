<script>
import { store } from '../store.js';
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
    components: {
        AppHeader,
        AppJumbotron,
        AppFooter
    },
    data() {
        return {
            store,
        }
    },

}
</script>
<template>
</template>
<style scoped lang="scss"></style>