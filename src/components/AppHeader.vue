<script>
import { ref, onMounted } from 'vue';
import { Dropdown } from 'bootstrap';

export default {

    setup() {
        const dropdownButton = ref(null);

        onMounted(() => {
            // Inizializza il dropdown utilizzando l'API JavaScript di Bootstrap
            /* new Dropdown(dropdownButton.value); */
        });

        return { dropdownButton };
    },
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
                <div class="col-10 col-sm-4 d-flex align-items-center justify-content-center">
                    <ul class="menu p-0">
                        <li v-for="(link, index) in navLinks" class="menu">
                            <router-link :to="{ name:link.name }"> {{ link.label }}</router-link>
                        </li>
                    </ul>
                </div>

                <!-- BOTTONI (COMPUTER) -->
                <div class="d-none col-lg-4 d-lg-flex align-items-center justify-content-lg-end">
                    <button class="light-button me-3">
                        <a href="http://127.0.0.1:8000/">Login</a>
                    </button>
                    <button class="dark-button">
                        <a href="http://127.0.0.1:8000/register">Create an account</a>
                    </button>
                </div>

                <!-- BOTTONI (MOBILE & TABLET) -->
                <div class="col-2 col-sm-4 text-end align-self-center d-lg-none">

                    <div class="btn-group my-dropdown">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-list"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end text-end">
                            <li><a class="dropdown-item" href="#">Login</a></li>
                            <li><a class="dropdown-item" href="#">Create an account</a></li>
                        </ul>
                    </div>

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

    a {
        color: #fff;
        text-decoration: none;
        transition: all 0.6s;

        &:hover {
            color: $my_bluetwo;
        }
    }

    ul.menu {
        list-style: none;
        font-size: 17px;
        margin: 0px;
        display: flex;

        li.menu {
            padding: 0px 15px;
        }
    }

    .logo {
        filter: brightness(0) invert(1);
        width: 120px;
    }

    .my-dropdown {

        button {
            background-color: $my_lightblue;
            border: none;
            color: white;
            font-size: 20px;
        }

        a {
            color: black;
        }
    }
}
</style>