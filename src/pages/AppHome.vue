<script>
import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppFooter from '../components/AppFooter.vue';


export default {
    components: {
        AppHeader,
        AppJumbotron
    },
    data() {
        return {
            query: ' ',
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

</template>
<style scoped lang="scss"></style>