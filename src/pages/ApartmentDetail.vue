<script>
import { store } from '../store.js';
import axios from 'axios';
export default {
    data() {
        return {
            store,
            apartment: null,
            error: '',
        }
    },
    created() {
        this.getApartment();
    },
    methods: {
        getApartment() {
            axios.get(`${this.store.endpoint}/api/apartment/${this.$route.params.slug}`).then((response) => {
                this.apartment = response.data.apartment;
                if (this.apartment == null) {
                    this.$router.push({
                        name: 'not-found',
                    })
                }
            }).catch((error) => {
                this.error = 'There are no apartments matching the entered parameters...'
            })
        }
    },
}
</script>
<template>
    <div v-if="apartment === null || apartment.length == 0">
        <div class="error">
            {{ error }}
        </div>
    </div>
    <div v-else>
        {{ apartment.title }}
    </div>
</template>
<style scoped lang="scss">
.error {
    font-size: 26px;
    padding: 70px 0px;
    text-align: center;
}
</style>