<template>
    <header class="header">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="navbar navbar-default">
                        <div class="navbar-header">
                            <h1 class="header__brand">techpad</h1>
                            <router-link tag="a" :to="{name:'iMain'}" class="header__link" active-class="header__link--active">products</router-link>
                            <router-link tag="a" :to="{name:'iForm'}" class="header__link" active-class="header__link--active">checkout</router-link>
                        </div>
                        <div class="nav navbar-nav navbar-right cart">
                            <router-link
                                tag="button"
                                active-class="checkout-btn__active"
                                :to="{name: 'iForm'}"
                                class='checkout-btn'>
                                <span class="checkout-btn__item-total" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
                                <i class="bi checkout-btn__bag" :class="{ 'bi-bag-check-fill' : cartItemCount > 0, 'bi-bag' : cartItemCount <= 0 }"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import store from '../store/index'

    export default {
        name: 'my-header',
        data() {
            return {
                sitename: 'Laptop Shop',
            }
        },
        computed: {
            cartItemCount() {
                return store.state.cart.length || '';
            }
        }
    }
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Codystar&display=swap');

    .header {
        background: white;
        border-bottom: 1px solid skyblue;
        &__link {
            margin-right: 15px;
            text-decoration: none;
            color: skyblue;
            transition: all 0.2s;
            &:hover {
                color: white;
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
            }
            &--active {
                color: white;
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
            }
        }
        &__brand {
            margin-right: 30px;
            display: inline;
            font-size: 24px;
            color: skyblue;
            font-family: Codystar;
            font-weight: bold;
        }
    }
</style>
