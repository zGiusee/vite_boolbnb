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
            search: 0,
            query: '',
            queryVanilla: '',
            beds: 1,
            rooms: 1,
            radius: 20,
            bathrooms: 1,
            apartments: null,
            services: null,
            ttSearchBox: null,
            selectedServices: [],
            error: '',
            currentPage: 1,
            lastPage: null,
        }
    },
    mounted() {
        this.query = this.$route.params.query;
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
        getApartments(page_number) {
            axios.get(`${this.store.endpoint}/api/search/?query=${this.$route.params.query}&radius=20`, {
                params: {
                    page: page_number
                }
            }).then((response) => {

                this.queryVanilla = this.$route.params.query;
                this.apartments = response.data.results.data;

                this.currentPage = response.data.results.current_page;
                this.lastPage = response.data.results.last_page;

                if (this.apartments.length == 0) {
                    this.apartments = null;
                    this.error = 'There are no apartments matching the entered parameters...'
                }

            }).catch((error) => {
                this.apartments = null;
                this.error = 'There are no apartments matching the entered parameters.'
            })
        },
        getApartmentsRefresh(beds, rooms, radius, bathrooms, page_number) {

            // Variabile che mi permette di capire se è stata effettuata una ricerca o no
            // Che poi mi servira per cambiare i bottoni
            this.search = 1;

            let value = this.ttSearchBox.getValue();
            // Applico il valore alla nostra input
            this.query = value;
            this.queryVanilla = value;

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

            axios.get(`${this.store.endpoint}/api/search/?query=${this.query}${radius}${beds}${rooms}${bathrooms}${servicesIds}`, {
                params: {
                    page: page_number
                }
            }).then((response) => {

                // Rimuovo i vecchi appartamenti
                this.apartments = null;

                // Recupero quelli nuovi filtrando per la visibilità
                this.apartments = response.data.results.data;
                this.currentPage = response.data.results.current_page;
                this.lastPage = response.data.results.last_page;

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


            <div class="col-12 col-md-8 my-2">
                <div class="mx-3" id="myInput"></div>
            </div>

            <!-- ADRESS INPUT -->
            <div class="col-12 col-md-4 d-flex justify-content-center my-2 search-container">
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
                                    <div class="form-check-inline dropdown-item check_service"
                                        v-for="service in services" :key="service.id">
                                        <input type="checkbox" class="form-check-input my-0" :value="service.id"
                                            v-model="selectedServices">
                                        <label class="form-check-label px-2">{{ service.name }}</label>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

            </div>

            <!-- INPUT -->
            <div class="row mt-4 d-flex justify-content-center ">


                <div class="col-12 col-sm-6 col-lg-3 mt-2 d-flex justify-content-center">
                    <div class=" w-100 text-center">
                        <label for="radius" class="">Radius</label>
                        <span class="my-font-sm">({{ this.radius }}km)</span>
                        <div class="radius_container">
                            <input type="range" v-model="radius" id="radius" name="radius" min="1" max="100"
                                default="20" />

                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-3 mt-2 d-flex justify-content-center">
                    <div class="counter w-100 text-center">
                        <div>
                            <label for="Beds" class=" d-block d-lg-inline-block ">Beds</label>
                        </div>
                        <div class="d-inline-block input-container">
                            <button type="button" @click="bedsDecrement"><span
                                    :class="beds == 1 ? 'my-counter-disabled' : ''">-</span></button>
                            <input type="text" min="0" max="99" size="1" maxlength="2" v-model="beds" name="beds"
                                id="beds">
                            <button type="button" @click="bedsIncrement"><span
                                    :class="beds == 99 ? 'my-counter-disabled' : ''">+</span></button>
                        </div>
                    </div>
                </div>


                <div class="col-12 col-sm-6 col-lg-3 mt-2 d-flex justify-content-center">
                    <div class="counter w-100 text-center">
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
                </div>


                <div class="col-12 col-sm-6 col-lg-3 mt-2">
                    <div class="counter w-100 text-center">
                        <div>
                            <label for="bathrooms" class=" d-block d-lg-inline-block ">Bathrooms</label>
                        </div>
                        <div class="d-inline-block input-container">
                            <button type="button" @click="bathroomsDecrement"><span
                                    :class="bathrooms == 1 ? 'my-counter-disabled' : ''">-</span></button>
                            <input type="text" min="0" max="99" size="1" maxlength="2" v-model="bathrooms"
                                name="bathrooms" id="bathrooms">
                            <button type="button" @click="bathroomsIncrement"><span
                                    :class="bathrooms == 99 ? 'my-counter-disabled' : ''">+</span></button>
                        </div>
                    </div>
                </div>


                <div class="col-12 my-4">
                    <div class=" d-flex justify-content-center justify-content-md-center align-items-end ">
                        <button type="button" class="search-button mx-1"
                            @click="getApartmentsRefresh(beds, rooms, radius, bathrooms)">Search
                        </button>
                    </div>
                </div>


            </div>



        </div>

        <div class="col-12 mt-4 search-container">
            <p>You searched for apartments in: <span class=" fw-bold ">"{{ this.queryVanilla }}"</span></p>
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

    <!-- TASTI NAVIGAZIONE PAGINE  -->
    <div v-if="this.search == 1" class="container text-center mb-5">
        <button :class="currentPage == 1 ? 'my-disabled' : ''"
            @click=" getApartmentsRefresh(beds, rooms, radius, bathrooms, currentPage - 1)" class="nav-button me-2">
            <i class="bi bi-chevron-left" :disabled="currentPage == 1"></i>
        </button>
        <button :class="currentPage == lastPage ? 'my-disabled' : ''"
            @click="getApartmentsRefresh(beds, rooms, radius, bathrooms, currentPage + 1)" class="nav-button"
            :disabled="currentPage == lastPage">
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>
    <div v-else class="container text-center mb-5">
        <button :class="currentPage == 1 ? 'my-disabled' : ''" @click=" getApartments(currentPage - 1)"
            class="nav-button me-2">
            <i class="bi bi-chevron-left" :disabled="currentPage == 1"></i>
        </button>
        <button :class="currentPage == lastPage ? 'my-disabled' : ''" @click="getApartments(currentPage + 1)"
            class="nav-button" :disabled="currentPage == lastPage">
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>


    <AppFooter />
</template>
<style scoped lang="scss">
@use '../styles/generals.scss' as *;

.radius_container input[type="range"] {
    appearance: none;
    background-color: $my_lightblue;
    border-radius: 15px;
    height: 10px;

}

.radius_container input[type="range"]::-moz-range-track {
    background-color: rgb(202, 202, 202);
    border-radius: 15px;
    height: 10px;
}


.radius_container input[type="range"]::-moz-range-progress {
    border-radius: 15px;
    height: 10px;
    background-color: $my_lightblue;

}

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

.my-font-sm {
    font-size: 13px;
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
    .check_service {
        width: 100%;
    }

    .check_box {
        width: 300px;
    }

    .filter {
        border-radius: 10px;
        padding: 5px 13px;
        background-color: $my_lightblue;
        color: white;
        height: 41px;
    }
}
</style>