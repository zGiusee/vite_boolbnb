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
            beds: 0,
            rooms: 0,
            radius: 20,
            bathrooms: 0,
            apartments: null,
        }
    },
    created() {
        this.getApartments();
    },
    methods: {
        getApartments() {
            axios.get(`${this.store.endpoint}/api/search/?query=${this.$route.params.query}&radius=20`).then((response) => {
                this.apartments = response.data.results;
            })

        },
        getApartmentsRefresh(query, beds, rooms, radius, bathrooms) {

            if (beds != 0) {
                beds = `&beds=${beds}`;
            } else {
                beds = '&beds=0';
            }
            if (rooms != 0) {
                rooms = `&rooms=${rooms}`;
            } else {
                rooms = '&rooms=0';
            }
            if (bathrooms != 0) {
                bathrooms = `&bathrooms=${bathrooms}`;
            } else {
                bathrooms = '&bathrooms=0';
            }
            if (radius != 20) {
                radius = `&radius=${radius}`;
            } else {
                radius = '&radius=20';
            }

            axios.get(`${this.store.endpoint}/api/search/?query=${query}${radius}${beds}${rooms}${bathrooms}`).then((response) => {
                this.apartments = null;
                this.apartments = response.data.results;

                window.history.pushState({}, '', query + radius + beds + rooms + bathrooms)
            }).catch((error) => {
                console.log('error');
            })
        },
        // COUNTERS
        bathroomsIncrement() {
            if (this.bathrooms < 99) {
                this.bathrooms++;
            }
        },
        bathroomsDecrement() {
            if (this.bathrooms > 0) {
                this.bathrooms--;
            }
        },
        bedsIncrement() {
            if (this.beds < 99) {
                this.beds++;
            }
        },
        bedsDecrement() {
            if (this.beds > 0) {
                this.beds--;
            }
        },
        roomsIncrement() {
            if (this.rooms < 99) {
                this.rooms++;
            }
        },
        roomsDecrement() {
            if (this.rooms > 0) {
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
                                :class="beds == 0 ? 'my-disabled' : ''">-</span></button>
                        <input type="text" min="0" max="99" size="1" maxlength="2" v-model="beds" name="beds" id="beds">
                        <button type="button" @click="bedsIncrement"><span
                                :class="beds == 99 ? 'my-disabled' : ''">+</span></button>
                    </div>
                </div>
            </div>

            <!-- ROOMS INPUT -->
            <div class="col-6 col-md-3 mt-4 d-flex justify-content-center  ">
                <div class="counter">
                    <label for="rooms" class=" d-block d-lg-inline-block ">Rooms</label>
                    <div class="d-inline-block input-container">
                        <button type="button" @click="roomsDecrement"><span
                                :class="rooms == 0 ? 'my-disabled' : ''">-</span></button>
                        <input type="text" min="0" max="99" size="1" maxlength="2" v-model="rooms" name="rooms"
                            id="rooms">
                        <button type="button" @click="roomsIncrement"><span
                                :class="rooms == 99 ? 'my-disabled' : ''">+</span></button>
                    </div>
                </div>
            </div>

            <!-- BATHROOMS INPUT -->
            <div class="col-6 col-md-3 mt-4 d-flex justify-content-center ">
                <div class="counter">
                    <label for="bathrooms" class=" d-block d-lg-inline-block ">Bathrooms</label>
                    <div class="d-inline-block input-container">
                        <button type="button" @click="bathroomsDecrement"><span
                                :class="bathrooms == 0 ? 'my-disabled' : ''">-</span></button>
                        <input type="text" min="0" max="99" size="1" maxlength="2" v-model="bathrooms" name="bathrooms"
                            id="bathrooms">
                        <button type="button" @click="bathroomsIncrement"><span
                                :class="bathrooms == 99 ? 'my-disabled' : ''">+</span></button>
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
        <div class="row column-gap-1 justify-content-around mt-5 justify-content-center">
            <ApartmentCard v-for="apartment in apartments" :apartment="apartment" />
        </div>
    </div>

    <AppFooter />
</template>
<style scoped lang="scss">
@use '../styles/generals.scss' as *;

.popular-title {
    font-size: 50px;

    .popular-subtitle {
        font-size: 20px;
    }
}

.my-disabled {
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