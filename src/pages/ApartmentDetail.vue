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
        }
    },
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

                        <div class="map mb-5">
                            
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
    <AppFooter />
</template>
<style scoped lang="scss">

.error {
    font-size: 26px;
    padding: 70px 0px;
    text-align: center;
}

.img-size{
    width: 630px;
    border-radius: 10px;
}

.w-75{
    width: 75%;
}

.map{
    height: 500px;
    background-color: #4ec0ff;
}
</style>