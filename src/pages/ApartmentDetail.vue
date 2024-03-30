<script>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import { store } from '../store.js';
import axios from 'axios';

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            store,
            apartment: null,
            name: '',
            email: '',
            apartment_id: '',
            description: '',
            errors: {},
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
                console.log(this.apartment);
                if (this.apartment == null) {
                    this.$router.push({
                        name: 'not-found',
                    })
                }
            }).catch((error) => {
                this.error = 'There are no apartments matching the entered parameters...'
            })
        },
        getImage() {
            let image;
            if (this.apartment.cover_img != null) {
                if (this.apartment.cover_img.includes('https')) {
                    return `${this.apartment.cover_img}`
                } else {
                    image = `/storage/${this.apartment.cover_img} `
                }
            } else {
                image = 'No images associated with this Apartment.';
            }
            return `${this.store.endpoint}${image} `
        },
        sendMessage() {
            if (!this.validateForm()) {
                return;
            }
            const data = {
                apartment_id: this.apartment.id,
                name: this.name,
                email: this.email,
                description: this.description,
                date: new Date().toISOString().substring(0, 10),
            }
            axios.post(`${this.store.endpoint}/api/contact`, data).then((response) => {
                console.log(data)
                if (response.data.success) {
                    this.name = '';
                    this.email = '';
                    this.description = '';
                    // this.$router.push({
                    //     name: 'thank-you',
                    // })
                } else {
                    this.errors = response.data.errors
                }
            });
        },
        validateForm() {
            this.errors = {};
            if (this.name.length > 50) {
                this.errors.name = 'The name must be a maximum of 50 characters long!';
            }
            if (!this.email) {
                this.errors.email = 'The email is required!';
            }
            if (!this.description) {
                this.errors.description = 'The message is required!';
            }
            return Object.keys(this.errors).length === 0;
        },
    }
}
</script>

<template>
    <AppHeader />
    <div v-if="apartment === null || apartment.length == 0">
        <div class="error">
            {{ error }}
        </div>
    </div>
    <div v-else>
        <div class="container">
            <div class="row">
                <div class="col-12 py-4">
                    <h2>
                        {{ apartment.title }}
                    </h2>
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-6">
                            <img :src="getImage()" class="img-size">
                        </div>
                        <div class="col-6">
                            <!-- <img :src="getImage()" class="img-size"> -->
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-4 mb-4 d-flex">
                    <h5>
                        <i class="bi bi-geo-alt-fill pe-2"></i>
                    </h5>
                    <p>{{ apartment.address }}</p>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="col-12">
                            <p><strong><i>Characteristics</i></strong></p>
                        </div>
                        <hr class="w-50">
                        <div class="col-12 d-flex">
                            <p><i class="fa-regular fa-square px-3"></i></p>
                            <p>{{ apartment.square_meters }}</p> <i class="px-2">square meters</i>
                        </div>
                        <div class="col-12 d-flex">
                            <p><i class="fa-solid fa-bath px-3"></i></p>
                            <p>{{ apartment.bathrooms }}</p> <i class="px-2">bathrooms</i>
                        </div>
                        <div class="col-12 d-flex">
                            <p><i class="fa-solid fa-person-booth px-3"></i></p>
                            <p>{{ apartment.rooms }}</p> <i class="px-2">rooms</i>
                        </div>
                        <div class="col-12 d-flex">
                            <p><i class="fa-solid fa-bed px-3"></i></p>
                            <p>{{ apartment.beds }}</p> <i class="px-2">beds</i>
                        </div>
                    </div>
                    <div class="col-12 mt-5">
                        <div class="col-12">
                            <p><strong><i>What will you find</i></strong></p>
                        </div>
                        <hr class="w-75">
                        <div v-if="apartment.services.length > 0">
                            <div v-for="service in apartment.services">
                                <div class="col-12 d-flex">
                                    <p><i :class="service.icon" class="px-3"></i></p>
                                    <p><i>{{ service.name }}</i></p>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="col-12 d-flex">
                                <p><i class="fa-solid fa-square-xmark px-3" style="color: #000000;"></i></p>
                                <p><i>no service here</i></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="col-12 mt-5 mb-3">
                            <h4><i>Where will you be</i></h4>
                            <hr class="w-100">
                        </div>
                        <div class="col-12 mb-4">
                            <p>{{ apartment.address }}</p>
                        </div>
                        <div class="map mb-5"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- INVIA UN MESSAGGIO SECTION  -->
        <div class="container">
            <div class="popular-title text-center my-5">
                Send a message for this apartment
                <div class="popular-subtitle">
                    fill the form and you will be reached out by the apartment owner
                </div>
            </div>

            <!-- FORM DEI MESSAGGI  -->
            <form @submit.prevent="sendMessage" method="post">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-10 col-lg-8">
                        <div class="row">
                            <!-- NOME -->
                            <div class="col-6 mb-3">
                                <label for="name" class="form-label"><i>Name</i></label>
                                <input v-model="name" type="text" name="name" id="name" class="form-control"
                                    placeholder="Name" max="50">
                                <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>
                            </div>
                            <!-- EMAIL  -->
                            <div class="col-6 mb-3">
                                <label for="name" class="form-label"><i>Email</i></label>
                                <input type="text" v-model="email" class="form-control" placeholder="Email" name="email"
                                    id="email" required>
                                <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>
                            </div>
                            <!-- MESSAGE  -->
                            <div class="col-12 mb-3">
                                <label for="description" class="form-label"><i>Message</i></label>
                                <textarea class="form-control" v-model="description" name="description" id="description"
                                    rows="3" placeholder="Type your message here" required></textarea>
                                <p v-if="errors.description" class="text-danger">{{ errors.description }}</p>
                            </div>
                        </div>
                        <!-- BUTTON  -->
                        <div class="text-center mb-5">
                            <button type="submit" class="search-button"> Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    </div>

    <AppFooter />
</template>

<style scoped lang="scss">
.popular-title {
    font-size: 50px;

    .popular-subtitle {
        font-size: 20px;
    }
}

.error {
    font-size: 26px;
    padding: 70px 0px;
    text-align: center;
}

.img-size {
    width: 630px;
    max-width: 100%;
    border-radius: 10px;
}

.w-75 {
    width: 75%;
}

.map {
    height: 500px;
    background-color: #4ec0ff;
}
</style>