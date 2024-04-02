<script>
import { onMounted } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';
import { store } from '../store.js';

export default {
    data() {
        return {
            store,
        }
    },
    setup() {
        onMounted(() => {
            // Inizializza la mappa dinamica
            const map = tt.map({
                key: 'yGiTiJ2bxVartizBSg9Wlc6ipR2Zb3ya',
                container: 'map', // 'map' deve corrispondere all'id dell'elemento div nella tua pagina
                style: 'tomtom://vector/1/basic-main',
                center: [45.83429200, 9.51028700],
                zoom: 10,
            });

            // Aggiungi un marker
            new tt.Marker()
                .setLngLat([45.83429200, 9.51028700])
                .addTo(map);
        });

        return {};
    },
};
</script>

<template lang="">
    <div>
        <div ref="map" id="map" style="width: 100%; height: 400px;"></div>

    </div>
</template>

<style lang="">

</style>