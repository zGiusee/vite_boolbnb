<script>
import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppFooter from '../components/AppFooter.vue';


export default {
    components: {
        AppHeader,
        AppJumbotron,
        AppFooter
    }
}
</script>
<template>
    <AppHeader />
    <AppJumbotron />
    <div>
        <h1>ciao</h1>
    </div>
    <AppFooter />
</template>
<style scoped lang="scss"></style>