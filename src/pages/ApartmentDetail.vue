<script>
import { store } from '../store.js';
import axios from 'axios';
export default {
    data() {
        return {
            store,
            apartment: null,
            name: '',
            email: '',
            apartment_id: '',
            description: '',
            errors: '',
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
        },
        sendMessage() {
            // Definisco i dati che verranno passati al BE
            const data = {
                apartment_id: this.apartment.id,
                name: this.name,
                email: this.email,
                description: this.description,
                date: new Date().toISOString().substring(0, 10),
            }

            // Faccio la chiamata passando i dati
            axios.post(`${this.store.endpoint}/api/contact`, data).then((response) => {

                if (response.data.succes) {
                    this.name = '';
                    this.email = '';
                    this.description = '';

                    // this.$router.push({
                    //     name: 'thank-you',
                    // })

                } else {
                    this.errors = response.data.errors
                }

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

        <form @submit.prevent="sendMessage()" method="post">
            <div class="row justify-content-center py-5">
                <div class="col-6">
                    <div class="row">
                        <div class="col py-3">
                            <input v-model="name" type="text" name="name" id="name" class="form-control"
                                placeholder="First name" required>
                            <p v-for="(error, index) in errors.name" :key="`message-error-${index}`"
                                class="text-danger">
                                {{ error }} </p>

                        </div>
                        <div class="col py-3">
                            <input type="text" v-model="email" class="form-control" placeholder="Email" name="email"
                                id="email" required>
                            <p v-for="(error, index) in errors.email" :key="`message-error-${index}`"
                                class="text-danger">
                                {{ error }}</p>
                        </div>
                        <div class="py-3">

                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" v-model="description" name="description" id="description"
                                rows="3"></textarea>
                            <p v-for="(error, index) in errors.description" :key="`message-error-${index}`"
                                class="text-danger">{{ error }}</p>
                        </div>

                        <button type="submit" class="btn btn-primary"> Invia</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped lang="scss">
.error {
    font-size: 26px;
    padding: 70px 0px;
    text-align: center;
}
</style>