<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            ip: null,
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
        async getPublicIP() {
            try {
                const response = await axios.get('https://ipinfo.io/json?token=00bf33d0a6bd49');
                this.ip = response.data.ip;
            } catch (error) {
                console.error(error);
            }
        },
        // getView(id) {

        //     // Utilizza la risposta ottenuta dal server
        //     this.ip = this.getPublicIP();

        //     // Definisco i dati che verranno passati al BE
        //     const data = {
        //         ip: this.ip,
        //         apartment_id: id,
        //         date: new Date().toISOString().substring(0, 10),
        //     }

        //     // Faccio la chiamata passando i dati
        //     axios.post(`${this.store.endpoint}/api/view`, data).then((response) => {

        //         if (response.data.success) {
        //             this.ip = '';
        //             this.apartment_id = '';
        //             this.date = '';

        //         } else {
        //             this.errors = response.data.errors
        //         }

        //     })


        // }

    },
}
</script>

<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xxl-3 mb-5 p-0 mc-card">
        <form @submit.prevent="getView(apartment.id)" method="post">
            <router-link :to="{ name: 'apartment_detail', params: { slug: apartment.slug } }">
                <div class="p-0">
                    <img :src="getImage()">
                </div>
                <div class="label">
                    <i class="bi bi-house-check-fill"></i> Avaible
                </div>
                <div class="card-tit px-2 pt-3">
                    <router-link :to="{ name: 'apartment_detail', params: { slug: apartment.slug } }">{{ apartment.title
                        }}</router-link>
                </div>
                <div class="address px-2 pb-3">
                    <i class="bi bi-geo-alt-fill pe-2"></i> {{ apartment.address }}
                </div>
            </router-link>
            <!-- <button type="submit">dettaglio</button> -->
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