<script>
export default {
    props: {
        apartment: Object,
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
                image = 'no images';
            }

            return `${this.store.endpoint}${image} `
        }
    },
}
</script>

<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xxl-3 mb-5 p-0 mc-card">
        <div class="p-0">
            <img :src="getImage()">
        </div>
        <div class="label">
            <i class="bi bi-house-check-fill"></i> Avaible
        </div>
        <div class="card-tit px-2 pt-3">
            {{ apartment.title }}
        </div>
        <div class="address px-2 pb-3">
            <i class="bi bi-geo-alt-fill pe-2"></i> {{ apartment.address }}
        </div>
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
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0px 2px 10px 2px #c2c2c2;
        transition: all .2s ease-in-out;
        -webkit-transition: all .2s ease-in-out;

        &:hover {
            transform: scale(1.05);
            -webkit-transform: scale(1.05);
        }
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