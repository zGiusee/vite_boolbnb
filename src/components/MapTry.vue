<script>
import tt from '@tomtom-international/web-sdk-maps';
import { store } from '../store.js';

export default {
    name: 'MapTry',
    props: {
        lat: String,
        lon: String
    },
    data() {
        return {
            store,
        }
    },
    mounted() {
        this.getMap()
    },
    methods: {
        getMap() {
            let lon = this.lon;
            let lat = this.lat;
            let center = [lon, lat];

            const map = tt.map({
                key: this.store.apiKey,
                container: 'map',
                center: center,
                zoom: 16,
            });

            const marker = new tt.Marker().setLngLat(center).addTo(map);
        }
    }
};
</script>

<template>
    <div class="col-12">
        <div id="map" class="my-map"></div>

    </div>

</template>

<style scoepd lang="scss">
.my-map {
    width: 100%;
    height: 400px;
}
</style>