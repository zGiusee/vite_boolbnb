<script>
export default {

}
</script>

<template lang="">
    <div class="my-jumbotron">
        <div class="container">
            <div class="row">

                <!-- JUMBOTRON PER >SM  -->
                <div class="col-12 position-relative d-none d-sm-block">
                    <div class="home-title">
                        Find your next stay
                        <div class="home-subtitle my-3">
                            Discover the Advantages of Low-prices on Houses, B&B and much more...
                        </div>
                    </div>
                </div>

                <!-- JUMBOTRON PER MOBILE  -->
                <div class="col-12 d-sm-none">
                    <div class="home-title-mobile">
                        Find your next stay
                        <div class="home-subtitle-mobile my-3">
                            Discover the Advantages of Low-prices on Houses, B&B and much more...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/generals.scss' as *;

.my-jumbotron {
    width: 100%;
    height: 300px;
    background: linear-gradient(to bottom, #4ec0ff, white);
    position: relative;

    .home-title {
        color: white;
        font-size: 55px;
        font-weight: bold;
        position: absolute;
        top: 70px;
        left: 100px;

        .home-subtitle {
            font-size: 20px;
            font-weight: normal;
            margin-left: 100px;
        }
    }

    .home-title-mobile {
        color: white;
        font-size: 55px;
        font-weight: bold;
        position: absolute;
        line-height: 55px;

        .home-subtitle-mobile {
            font-size: 20px;
            font-weight: normal;
            margin-left: 20px;
            line-height: 20px;
        }
    }
}
</style>