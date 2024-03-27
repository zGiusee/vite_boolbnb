<script>
export default {
    data() {
        return {
            navigationLinks: [
                {
                    label: 'Company',
                },
                {
                    label: 'Home',
                },
                {
                    label: 'Contact Us',
                },
                {
                    label: 'Blog',
                },
                {
                    label: 'Properties',
                },
            ],

            companyLinks: [
                {
                    label: 'About Us',
                },
                {
                    label: 'Our mission and vision',
                },
                {
                    label: 'Our team',
                },
            ],

            supportLinks: [
                {
                    label: 'Contact Us',
                },
                {
                    label: 'Login',
                },
            ]
        }
    }
}
</script>

<template lang="">
    <footer class="my-footer">
        <div class="container">
            <div class="row justify-content-between">

                <!-- LOGO + ICONE + CONTACT US  -->
                <div class="col-12 col-sm-4 text-center text-sm-start mt-5 my-sm-5">
                    <!-- LOGO  -->
                    <div class="d-none d-sm-block logo">
                        <img src="../img/logo_1.png" alt="">
                    </div>
                    <!-- ICONE  -->
                    <div class="icons my-4">
                        <i class="bi bi-facebook single-icon"></i>
                        <i class="bi bi-linkedin single-icon"></i>
                        <i class="bi bi-twitter single-icon"></i>
                        <i class="bi bi-instagram single-icon"></i>
                    </div>
                    <!-- BOTTONE  -->
                    <div class="mt-4">
                        <button class="footer-button">Contact Us</button>
                    </div>
                </div>


                <!-- LISTE  -->
                <div class="col-12 col-sm-8 d-flex flex-wrap my-5">

                    <!-- NAVIGATION  -->
                    <div class="col-12 col-sm-4">
                        <div class="footer-title">
                            Navigation
                        </div>
                        <ul class="list-unstyled">
                            <li v-for="(link, index) in navigationLinks" class="footer-list">{{ link.label }}</li>
                        </ul>
                    </div>

                    <!-- COMPANY  -->
                    <div class="col-12 col-sm-4">
                        <div class="footer-title">
                            Company
                        </div>
                        <ul class="list-unstyled">
                            <li v-for="(link, index) in companyLinks" class="footer-list">{{ link.label }}</li>
                        </ul>
                    </div>

                    <!-- SUPPORT  -->
                    <div class="col-12 col-sm-4">
                        <div class="footer-title">
                            Support
                        </div>
                        <ul class="list-unstyled">
                            <li v-for="(link, index) in supportLinks" class="footer-list">{{ link.label }}</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@use '../styles/generals.scss' as *;

.my-footer {
    width: 100%;
    background: linear-gradient(to top, $my_lightblue, $my_lightbluetwo);
    font-size: 15px;
    color: white;

    .logo img {
        filter: brightness(0) invert(1);
        width: 150px;
    }

    .icons {
        .single-icon {
            color: black;
            font-size: 20px;
            background-color: white;
            padding: 8px 12px;
            border-radius: 100%;
            margin-right: 10px;
            line-height: 50px;

            &:hover {
                color: $my_bluetwo;
            }
        }
    }

    .footer-title {
        color: $my_bluetwo;
        font-size: 20px;
        padding-bottom: 10px;
    }

    .footer-list {
        margin: 15px 0px;
    }

}
</style>