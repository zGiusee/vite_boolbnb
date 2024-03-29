<script>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
export default {
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {

        };
    },
    created() {

    },
    methods: {

    },
}
</script>

<template>
    <AppHeader />
    <div class="container vh-100">
        <h1>ERROR-404 This page does not exists</h1>
    </div>
    <AppFooter />
</template>

<style scoped lang="scss">
@use '../styles/generals.scss' as *;
</style>