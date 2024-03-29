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
    <div class="container-fluid h d-flex justify-content-center align-items-center bg-blue">
        <div>
            <h1>ERROR-404 This page does not exists</h1>
        </div>
    </div>
    <AppFooter />
</template>

<style scoped lang="scss">
@use '../styles/generals.scss' as *;

.h{
    height: calc(100vh - 100px);
}

.bg-blue{
    color: #4ec0ff;
}
</style>