<template>
    <header>
        <div class="navbar navbar-default">
            <div class="navbar-header">
                <h1>
                    <router-link :to="{name:'iMain'}">{{sitename}}</router-link>
                </h1>
            </div>
            <div class="nav navbar-nav navbar-right cart">
                <button class='checkout-btn' @click='showCheckout();'>
                    <span class="checkout-btn__item-total">{{ cartItemCount }}</span>
                    <i class="bi checkout-btn__bag" :class="{ 'bi-bag-check-fill' : cartItemCount > 0, 'bi-bag' : cartItemCount <= 0 }"></i>
                </button>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'my-header',
        data() {
            return {
                sitename: 'Laptop Shop',
            }
        },
        props: ['cartItemCount'],
        methods: {
            showCheckout() {
                this.$router.push({name: 'Form'})
            }
        }
    }
</script>
