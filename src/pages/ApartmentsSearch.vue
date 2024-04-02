<script>
import { store } from '../store.js';
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppFooter from '../components/AppFooter.vue';
import ApartmentCard from '../components/ApartmentCard.vue';

export default {
    components: {
        AppHeader,
        AppJumbotron,
        AppFooter,
        ApartmentCard
    },
    data() {
        return {
            store,
            query: ' ',
            beds: 1,
            rooms: 1,
            radius: 20,
            bathrooms: 1,
            apartments: null,
            error: '',
        }
    },
    created() {
        this.getApartments();
    },
    methods: {
        getApartments() {
            axios.get(`${this.store.endpoint}/api/search/?query=${this.$route.params.query}&radius=20`).then((response) => {

                this.apartments = response.data.results;

            }).catch((error) => {
                this.apartments = null;
                this.error = 'There are no apartments matching the entered parameters.'
            })

        },
        getApartmentsRefresh(query, beds, rooms, radius, bathrooms) {

            // Definisco i valori e gli applico la sintassi per la chiamata API
            beds = `&beds=${beds}`;
            rooms = `&rooms=${rooms}`;
            bathrooms = `&bathrooms=${bathrooms}`;
            radius = `&radius=${radius}`;

            axios.get(`${this.store.endpoint}/api/search/?query=${query}${radius}${beds}${rooms}${bathrooms}`).then((response) => {
                // Rimuovo i vecchi appartamenti
                this.apartments = null;

                // Recupero quelli nuovi
                this.apartments = response.data.results;

                // Aggiorno la url della pagina
                window.history.pushState({}, '', query + radius + beds + rooms + bathrooms)

                if (this.apartments.length == 0) {
                    this.apartments = null;
                    this.error = 'There are no apartments matching the entered parameters...'
                }

            }).catch((error) => {
                this.apartments = null;
                this.error = 'There are no apartments matching the entered parameters...'
            })
        },
        // COUNTERS
        bathroomsIncrement() {
            if (this.bathrooms < 99) {
                this.bathrooms++;
            }
        },
        bathroomsDecrement() {
            if (this.bathrooms > 1) {
                this.bathrooms--;
            }
        },
        bedsIncrement() {
            if (this.beds < 99) {
                this.beds++;
            }
        },
        bedsDecrement() {
            if (this.beds > 1) {
                this.beds--;
            }
        },
        roomsIncrement() {
            if (this.rooms < 99) {
                this.rooms++;
            }
        },
        roomsDecrement() {
            if (this.rooms > 1) {
                this.rooms--;
            }
        }
    },

}
</script>
<template>
    <AppHeader />
    <AppJumbotron />

    <!-- SEARCH AND CARD SECTION  -->
    <div class="container my-5">

        <!-- SEARCHBAR  -->
        <div class="row search-container justify-content-center">
            <div class="popular-title mb-3 text-center">
                Search your destination
                <div class="popular-subtitle">
                    find the perfect avaible apartment for your trip
                </div>
            </div>

            <!-- ADRESS INPUT -->
            <div class="col-12 d-flex justify-content-center mt-4 search-container">
                <label for=" query">Address</label>
                <input type="text" class="w-50" v-model="query" name="query" id="query">
            </div>

            <!-- RADIUS SLECET INPUT -->
            <div class="col-6 col-md-3 mt-4 d-flex justify-content-center align-items-end">
                <div>
                    <label for="radius" class=" d-block d-lg-inline-block ">Radius</label>
                    <select name="radius" v-model="radius" id="radius">
                        <option value="1">1 km</option>
                        <option value="2">2 km</option>
                        <option value="3">3 km</option>
                        <option value="4">4 km</option>
                        <option value="5">5 km</option>
                        <option value="10">10 km</option>
                        <option value="20" selected>20 km</option>
                    </select>
                </div>
            </div>

            <!-- BEDS INPUT -->
            <div class="col-6 col-md-3 mt-4 d-flex justify-content-center ">
                <div class="counter">
                    <label for="Beds" class=" d-block d-lg-inline-block ">Beds</label>
                    <div class="d-inline-block input-container">
                        <button type="button" @click="bedsDecrement"><span
                                :class="beds == 1 ? 'my-counter-disabled' : ''">-</span></button>
                        <input type="text" min="0" max="99" size="1" maxlength="2" v-model="beds" name="beds" id="beds">
                        <button type="button" @click="bedsIncrement"><span
                                :class="beds == 99 ? 'my-counter-disabled' : ''">+</span></button>
                    </div>
                </div>
            </div>

            <!-- ROOMS INPUT -->
            <div class="col-6 col-md-3 mt-4 d-flex justify-content-center  ">
                <div class="counter">
                    <label for="rooms" class=" d-block d-lg-inline-block ">Rooms</label>
                    <div class="d-inline-block input-container">
                        <button type="button" @click="roomsDecrement"><span
                                :class="rooms == 1 ? 'my-counter-disabled' : ''">-</span></button>
                        <input type="text" min="0" max="99" size="1" maxlength="2" v-model="rooms" name="rooms"
                            id="rooms">
                        <button type="button" @click="roomsIncrement"><span
                                :class="rooms == 99 ? 'my-counter-disabled' : ''">+</span></button>
                    </div>
                </div>
            </div>

            <!-- BATHROOMS INPUT -->
            <div class="col-6 col-md-3 mt-4 d-flex justify-content-center ">
                <div class="counter">
                    <label for="bathrooms" class=" d-block d-lg-inline-block ">Bathrooms</label>
                    <div class="d-inline-block input-container">
                        <button type="button" @click="bathroomsDecrement"><span
                                :class="bathrooms == 1 ? 'my-counter-disabled' : ''">-</span></button>
                        <input type="text" min="0" max="99" size="1" maxlength="2" v-model="bathrooms" name="bathrooms"
                            id="bathrooms">
                        <button type="button" @click="bathroomsIncrement"><span
                                :class="bathrooms == 99 ? 'my-counter-disabled' : ''">+</span></button>
                    </div>
                </div>
            </div>

            <!-- ADRESS BUTTON -->
            <div class="col-12 d-flex justify-content-center mt-4">
                <div>
                    <button type="button" class="search-button"
                        @click="getApartmentsRefresh(query, beds, rooms, radius, bathrooms)">Search
                    </button>
                </div>
            </div>

        </div>


        <!-- CARD CICLATE  -->
        <div v-if="apartments == null || apartments.length === 0">
            <div class="error">
                {{ error }}
            </div>
        </div>
        <div v-else class="row column-gap-5 mt-5">
            <ApartmentCard v-for="apartment in apartments" :apartment="apartment" />
        </div>
    </div>

    <AppFooter />
</template>
<style scoped lang="scss">
@use '../styles/generals.scss' as *;

.error {
    font-size: 26px;
    padding: 70px 0px;
    text-align: center;
}

.popular-title {
    font-size: 50px;

    .popular-subtitle {
        font-size: 20px;
    }
}

.my-counter-disabled {
    color: rgb(202, 202, 202);
    cursor: default;
}

.search-container {
    font-size: 18px;

    label {
        margin-right: 10px;
    }

    //STILE PER LA SEARCHBOX
    .search-container {
        input {
            padding: 5px 0px;
            border: 1px solid $my_lightblue;

            &:focus {
                outline: none;
            }
        }

    }

    // STILE PER LA SELECT 
    select {
        padding: 7px 20px;
        background-color: white;
        border: 1px solid $my_lightblue;
    }

    // STILE PER I COUNTER
    .counter {
        .input-container {
            border: 1px solid $my_lightblue;
            padding: 7px 14px;

            button {
                border: none;
                background-color: transparent;
                color: $my_lightblue;
                cursor: pointer;
                font-size: 20px;
            }
        }

        input {
            width: 23px;
            border: 0;
            margin-left: 10px;
            margin-right: 4px;

            &:focus {
                outline: none;
            }
        }
    }

    // STILE BOTTONE
}
</style>