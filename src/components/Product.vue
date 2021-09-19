<template>
    <section>
        <div class="container">
            <div class="product">
                <div class="row">
                    <div class="col-md-6">
                        <figure>
                            <img :src="product.image" class="product__img" style="width: 100%;">
                        </figure>
                    </div>
                    <div class="col-md-6">
                        <h1 class="product__title">{{ product.title }}</h1>
                        <p v-html="product.description" class="product__description"></p>
                        <p class="product__price">£{{ product.price }}</p>

                        <div class="accordion accordion-flush">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                <button class="accordion-button collapsed" :id="'accordionCollapseBtn' + product.id" @click="expandAccordion($event)" type="button" :data-bs-target="'#accordionCollapse' + product.id" :aria-controls="'accordionCollapse' + product.id">
                                    Product Description
                                </button>
                                </h2>
                                <div :id="'accordionCollapse' + product.id" class="accordion-collapse collapse" :aria-labelledby="'accordionCollapseBtn' + product.id">
                                <div class="accordion-body">
                                    <div v-html='product.productInformation' class="product__information"></div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <button class='default webstore-btn product__add-to-cart' @click='addToCart(product); calculateCartTotal(product); addItemToCart(product); addToCartItemsSummary(product);' v-if='canAddToCart(product)'>Add to Cart <i class="bi bi-bag-plus-fill"></i></button>
                        <button class='disabled webstore-btn product__add-to-cart' v-else>Out Of Stock <i class="bi bi-bag-x-fill"></i></button>
                        <transition name="bounce" mode="out-in">
                            <span class="product__inventory-message"
                                v-if='(product.availableInventory - cartCount(product.id)) === 0'
                                key="inventoryMessageFinal"    
                            >
                                All Out!
                            </span>
                            <span class="product__inventory-message"
                                v-else-if='(product.availableInventory - cartCount(product.id)) < 5'
                                key="inventoryMessageMid"
                            >Only {{ product.availableInventory - cartCount(product.id)}} left!</span>
                            <span class="product__inventory-message"
                                v-else
                                key="inventoryMessageInitial"
                            >
                                Buy Now!
                            </span>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import expandAccordion from '../mixins/expandAccordion.vue'
import addToCartFunctions from '../mixins/addToCartFunctions.vue';


export default {
    data() {
        return {
            product: ''
        }
    },
    beforeCreate: function() {
        axios.get('./products.json').then((response) => {
            this.product = response.data.products.filter(product => product.id == this.$route.params.id)[0]
        })

        // console.log(this.$store.getters.products)
       
        // this.product = this.$store.getters.products.filter(product => product.id == this.$route.params.id)[0]
        
    },
    mixins: [expandAccordion, addToCartFunctions],
}
</script>
