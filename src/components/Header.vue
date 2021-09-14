<template>
    <header>
        <div class="navbar navbar-default">
            <div class="navbar-header">
                <h1>
                    <router-link :to="{name:'iMain'}">{{sitename}}</router-link>
                </h1>
                <h1>
                    <router-link :to="{name:'iForm'}">form</router-link>
                </h1>
            </div>
            <div class="nav navbar-nav navbar-right cart">
                <router-link
                    tag="button"
                    active-class="checkout-btn__active"
                    :to="{name: 'iForm'}"
                    class='checkout-btn'>
                    <span class="checkout-btn__item-total">{{ cartItemCount }}</span>
                    <i class="bi checkout-btn__bag" :class="{ 'bi-bag-check-fill' : cartItemCount > 0, 'bi-bag' : cartItemCount <= 0 }"></i>
                </router-link>
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
