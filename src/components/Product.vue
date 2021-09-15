<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <figure>
                        <img :src="product.image" class="product" style="width: 100%;">
                    </figure>
                </div>
                <div class="col-md-6">
                    <h1>{{ product.title }}</h1>
                    <p v-html="product.description"></p>
                    <p>{{ product.price }}</p>
                    <p v-html="product.productInformation"></p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                product: ''
            }
        },
        created: function() {
            axios.get('./products.json').then((response) => {
                this.product = response.data.products.filter(product => product.id == this.$route.params.id)[0]
            })
        }
    }
</script>
