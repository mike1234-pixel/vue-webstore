<template>
  <div>
    <main>
        <div class="container">
                <div v-for='product in sortedProducts' :key="product.id" class="product">
                    <div class="row">
                        <div class="col-sm-6">
                            <figure>
                                <img v-bind:src='product.image' class="product__img">
                                <!-- images 1236 x 800 -->
                            </figure>
                            <router-link
                                tag="button"
                                class="webstore-btn"
                                :to="{ name: 'Id', params: { id: product.id }}"
                            >
                                See More <i class="bi bi-eye"></i>
                            </router-link>
                        </div>
                        <div class="col-sm-6">
                                    <h1 v-text='product.title' class="product__title"></h1>
                                    <p class='product__price'>
                                        £{{ product.price }}
                                    </p>
                                    <div class="product__rating">
                                        <span v-for='n in product.rating' :key='n'> 
                                            <i class="bi bi-star-fill"></i>
                                        </span>
                                    </div>
                                    <p v-html='product.description' class="product__description"></p>
                                
                                    <h4></h4>
                                    


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
            </main>
  </div>
</template>

<script>
import expandAccordion from '../mixins/expandAccordion.vue'
import addToCartFunctions from '../mixins/addToCartFunctions.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Products',
  data() {
    return {
      sitename: 'Tech Pad'
    }
  },
  computed: {
      // mapGetters maps the vuex getters to a components computed properties.
      // Each getter is listed in an array inside mapGetters
      ...mapGetters([
          'cartItemCount'
      ]),
      
      sortedProducts() { 
          const products = this.$store.getters.products;
          if (products.length > 0) {
              let productsArray = products.slice(0);
              function compare(a, b) {
                  if (a.title.toLowerCase() < b.title.toLowerCase())
                  return - 1;
                  if (a.title.toLowerCase() > b.title.toLowerCase())
                  return 1;
              return 0;
              }
              return productsArray.sort(compare);
          }
      },
  },
  methods: {
      checkRating(n, myProduct) {
          return (myProduct.rating - n) >= 0
      }, 
  },
  mixins: [expandAccordion, addToCartFunctions],
}
</script>

