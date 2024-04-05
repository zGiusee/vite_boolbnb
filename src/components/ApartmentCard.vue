<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            data: null,
            apartment_id: null,
        }
    },
    props: {
        apartment: Object,
    },
    mounted() {
        const config = { headers: { 'Access-Control-Allow-Origin': '*' } };
    },
    methods: {
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
        getView(id) {

            let ip = '';

            // Prima chiamata per recuperare l'ip dell'utente e creare l'oggetto che passeremo al BE
            axios.get(`${this.store.endpoint}/api/getIP`).then((response) => {
                // Utilizza la risposta ottenuta dal server
                ip = response.data.result;

                if (ip != null) {
                    // Definisco i dati che verranno passati al BE
                    this.data = {
                        ip: ip,
                        apartment_id: id,
                        date: new Date().toISOString().substring(0, 10),
                    }

                    // Faccio la chiamata passando i dati al BE e salvando il record nel Database
                    axios.post(`${this.store.endpoint}/api/view`, this.data).then((response) => {

                        if (response.data.success) {
                            this.data = null;

                        } else {
                            this.errors = response.data.errors
                        }

                    }).catch(error => {
                        console.error(error);
                    })
                }


            }).catch(error => {
                console.error(error);
            })


        }

    },
}
</script>

<template>
    <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xxl-3 mb-5 p-3">
        <form @submit.prevent="getView(apartment.id)" method="post">
            <div class="mc-card">
                <router-link :to="{ name: 'apartment_detail', params: { slug: apartment.slug } }">
                    <div class="p-0">
                        <img :src="getImage()">
                    </div>
                    <div class="label">
                        <i class="bi bi-house-check-fill"></i> Avaible
                    </div>
                    <div class="card-tit px-2 pt-3">
                        <router-link :to="{ name: 'apartment_detail', params: { slug: apartment.slug } }">{{
                            apartment.title
                        }}</router-link>
                    </div>
                    <div class="address px-2 pb-3">
                        <i class="bi bi-geo-alt-fill pe-2"></i> {{ apartment.address }}
                    </div>
                </router-link>
            </div>
            <button type="submit"> ssss</button>
        </form>
    </div>

</template>

<style scoped lang="scss">
@use '../styles/generals.scss' as *;

.mc-card {
    border-radius: 8px;
    box-shadow: 0px 2px 10px 2px #c2c2c2;
    position: relative;
    overflow: hidden;
    height: 100%;

    img {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: 50% 0%;
        border-radius: 8px;
        box-shadow: 0px 2px 10px 2px #c2c2c2;
        transition: all .2s ease-in-out;
        -webkit-transition: all .2s ease-in-out;

        &:hover {
            transform: scale(1.05);
            -webkit-transform: scale(1.05);
        }
    }

    a {
        color: black;
    }

    .card-tit {
        font-size: 20px;
    }

    .address {
        font-size: 13px;
        color: grey;
    }

    .label {
        position: absolute;
        top: 20px;
        left: 10px;
        background-color: rgba(145, 145, 145, 0.5);
        color: white;
        font-size: 12px;
        padding: 3px 15px;
        border-radius: 10px;
    }
}
</style>