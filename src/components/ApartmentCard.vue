<script>
export default {

}
</script>

<template lang="">
        <div class="col-12 col-sm-6 col-lg-3 mc-card">
            <img src="https://hips.hearstapps.com/hmg-prod/images/napoli-1653914862.png">
            <div class="label">
                <i class="bi bi-house-check-fill"></i> avaible
            </div>
            <div class="card-tit px-2 pt-3">
                titolo appartamento
            </div>
            <div class="address px-2 pb-3">
                <i class="bi bi-geo-alt-fill pe-2"></i> indirizzo appartamento
            </div>
        </div>
</template>

<style scoped lang="scss">
@use '../styles/generals.scss' as *;

.container-card {
    .mc-card {
        border-radius: 8px;
        box-shadow: 0px 2px 10px 2px #c2c2c2;
        position: relative;
        overflow: hidden;

        img {
            max-width: 100%;
            height: 300px;
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
}
</style>