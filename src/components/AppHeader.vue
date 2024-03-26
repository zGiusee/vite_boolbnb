<script>
export default {
    data() {
        return {
            navLinks: [
                {
                    label: 'Home',
                    name: 'home'
                }
            ]
        }
    }
}
</script>

<template lang="">
    <header class="my-header">
        <div class="container">
            <div class="row">

                <!-- LOGO  -->
                <div class="col-4 align-items-center d-none d-sm-flex ">
                    <a class="" href="">
                        <div>
                            <img class="logo" src="../img/logo_1.png" alt="">
                        </div>
                    </a>
                </div>

                <!-- NAV LINKS  -->
                <div class="col-12 col-sm-4 d-flex align-items-center justify-content-center">
                    <ul class="p-0">
                        <li v-for="(link, index) in navLinks">
                            <router-link :to="{ name:link.name }"> {{ link.label }}</router-link>
                        </li>
                    </ul>
                </div>

                <!-- BOTTONI  -->
                <div class="col-12 col-sm-4 d-flex align-items-center justify-content-center justify-content-sm-end">
                    <button class="light-button me-3">Login</button>
                    <button class="dark-button">Create an account</button>
                </div>

            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
@use '../styles/generals.scss' as *;


.my-header {
    padding: 20px;
    background-color: $my_lightblue;
    color: #fff;

    ul {
        list-style: none;
        font-size: 17px;
        margin: 0px;
        display: flex;

        li {
            padding: 0px 15px;

            a {
                color: #fff;
                text-decoration: none;
            }
        }
    }

    .logo {
        filter: brightness(0) invert(1);
        width: 120px;
    }
}
</style>