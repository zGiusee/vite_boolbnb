<script>
import { store } from '../store.js';
import axios from 'axios';
import AppHeader from '../components/AppHeader.vue';
import AppJumbotron from '../components/AppJumbotron.vue';
import AppFooter from '../components/AppFooter.vue';
import ApartmentCard from '../components/ApartmentCard.vue';
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

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
            query: '',
            beds: 1,
            rooms: 1,
            radius: 20,
            bathrooms: 1,
            apartments: null,
            services: null,
            ttSearchBox: null,
            selectedServices: [],
            error: '',
        }
    },
    mounted() {
        var options = {
            searchOptions: {
                key: this.store.apiKey,

                language: "it-IT",

                limit: 5,
            },

            autocompleteOptions: {
                key: this.store.apiKey,

                language: "it-IT",
            },
        };
        let myInput = document.getElementById("myInput");

        // Creazione della search box
        this.ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
        // Applico lo stile
        let searchBoxHTML = this.ttSearchBox.getSearchBoxHTML();
        // Appendo la searchbox
        myInput.appendChild(searchBoxHTML);

    },
    created() {
        this.getApartments();
        this.getServices();
    },
    methods: {
        getServices() {
            axios.get(`${this.store.endpoint}/api/services`).then((response) => {
                this.services = response.data.services;
            }).catch((error) => {
                this.services = null;
            })
        },
        getApartments() {
            axios.get(`${this.store.endpoint}/api/search/?query=${this.$route.params.query}&radius=20`).then((response) => {

                this.apartments = response.data.results;

            }).catch((error) => {
                this.apartments = null;
                this.error = 'There are no apartments matching the entered parameters.'
            })

        },
        getApartmentsRefresh(beds, rooms, radius, bathrooms) {


            let value = this.ttSearchBox.getValue();
            // Applico il valore alla nostra input
            this.query = value;


            // Definisco i valori e gli applico la sintassi per la chiamata API
            beds = `&beds=${beds}`;
            rooms = `&rooms=${rooms}`;
            bathrooms = `&bathrooms=${bathrooms}`;
            radius = `&radius=${radius}`;

            // Trasformo l'array dei servizi in una stringa separata da virgole in modo che possa usarla per effettuare la query
            let servicesIds = '';
            if (this.selectedServices.length > 0) {
                servicesIds = `&services=${this.selectedServices.join(',')}`;
            }

            axios.get(`${this.store.endpoint}/api/search/?query=${this.query}${radius}${beds}${rooms}${bathrooms}${servicesIds}`).then((response) => {
                // Rimuovo i vecchi appartamenti
                this.apartments = null;

                // Recupero quelli nuovi filtrando per la visibilità
                this.apartments = response.data.results.filter(apartment => apartment.visible);

                // Aggiorno la url della pagina
                window.history.pushState({}, '', this.query + radius + beds + rooms + bathrooms + servicesIds)

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

            <div class="col-12 col-md-12 d-flex justify-content-center mt-4 search-container">
               <p><i>{{ query }}</i></p>
            </div>

            <!-- ADRESS INPUT -->
            <div class="col-12 col-md-12 d-flex justify-content-center mt-1 search-container">
                
                <!-- Services INPUT -->
                <div class=" d-flex justify-content-center justify-content-md-center align-items-end ">
                    <div>
                        <div class=" dropdown-center mx-1">
                            <button type="button" class="search-button dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Services
                            </button>
                            <ul class="dropdown-menu py-1">
                                <li class="check_box">
                                    <div class="form-check-inline dropdown-item check_service" v-for="service in services"
                                        :key="service.id">
                                        <input type="checkbox" class="form-check-input my-0" :value="service.id"
                                            v-model="selectedServices">
                                        <label class="form-check-label px-2">{{ service.name }}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="myInput"></div>

                <div class=" d-flex justify-content-center justify-content-md-center align-items-end ">
                    <button type="button" class="search-button mx-1"
                        @click="getApartmentsRefresh(beds, rooms, radius, bathrooms)">Search
                    </button>
                </div>
            
                
            </div>
            


            

            <!-- INPUT -->
            <div class="col-6 col-md-12 mt-4 d-flex justify-content-center ">
                <div class="mx-4">
                    <div>
                        <label for="radius" class=" d-block d-lg-inline-block ">Radius</label>
                    </div>
                    <select name="radius" v-model="radius" id="radius" class="filter">
                        <option value="1">1 km</option>
                        <option value="2">2 km</option>
                        <option value="3">3 km</option>
                        <option value="4">4 km</option>
                        <option value="5">5 km</option>
                        <option value="10">10 km</option>
                        <option value="20" selected>20 km</option>
                    </select>
                </div>


                <div class="counter">
                    <div>
                        <label for="Beds" class=" d-block d-lg-inline-block ">Beds</label>
                    </div>
                    <div class="d-inline-block input-container">
                        <button type="button" @click="bedsDecrement"><span
                                :class="beds == 1 ? 'my-counter-disabled' : ''">-</span></button>
                        <input type="text" min="0" max="99" size="1" maxlength="2" v-model="beds" name="beds" id="beds">
                        <button type="button" @click="bedsIncrement"><span
                                :class="beds == 99 ? 'my-counter-disabled' : ''">+</span></button>
                    </div>
                </div>


                <div class="counter mx-4">
                    <div>
                        <label for="rooms" class=" d-block d-lg-inline-block ">Rooms</label>
                    </div>
                    <div class="d-inline-block input-container">
                        <button type="button" @click="roomsDecrement"><span
                                :class="rooms == 1 ? 'my-counter-disabled' : ''">-</span></button>
                        <input type="text" min="0" max="99" size="1" maxlength="2" v-model="rooms" name="rooms"
                            id="rooms">
                        <button type="button" @click="roomsIncrement"><span
                                :class="rooms == 99 ? 'my-counter-disabled' : ''">+</span></button>
                    </div>
                </div>

                
                <div class="counter">
                    <div>
                        <label for="bathrooms" class=" d-block d-lg-inline-block ">Bathrooms</label>
                    </div>
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


            
        </div>


        <!-- CARD CICLATE  -->
        <div v-if="apartments == null || apartments.length === 0">
            <div class="error">
                {{ error }}
            </div>
        </div>
        <div v-else class="row mt-5">
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
            padding: 10px 10px;
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
            padding: 5px 15px;
            border-radius: 10px;
            background-color: $my_lightblue;
            color: white;

            button {
                border: none;
                background-color: $my_lightblue;
                color: white;
                cursor: pointer;
                font-size: 20px;
            }
        }

        input {
            width: 23px;
            border: 0;
            margin: 0px 10px;
            background-color: $my_lightblue;
            color: white;
            text-align: center;

            &:focus {
                outline: none;
            }
        }
    }

    // STILE BOTTONE
    .check_service{
        width: 100%;
    }
    .check_box{
        width: 300px;
    }
    .filter{
        border-radius: 10px;
        padding: 5px 13px;
        background-color: $my_lightblue;
        color: white;
        height: 41px;
    }
}
</style>