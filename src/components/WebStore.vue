<template>
  <div>
<header class='nav'>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 v-text='sitename'></h1>
                <button class='checkout-btn' @click='showCheckout();'>
                    <span class="checkout-btn__item-total">{{ cartItemCount }}</span>
                    <i class="bi checkout-btn__bag" :class="{ 'bi-bag-check-fill' : cartItemCount > 0, 'bi-bag' : cartItemCount <= 0 }"></i>
                </button>
            </div>
        </div>
    </div>
</header>
<main>
    <div class="container">
        <div class="product" v-if='showProduct'>
            <div v-for='product in sortedProducts' :key="product.id">
                <div class="row">
                    <div class="col-sm-6">
                        <figure>
                            <img v-bind:src='product.image' style='width: 100%;'>
                        </figure>
                    </div>
                    <div class="col-sm-6">
                                <h1 v-text='product.title'></h1>
                                <p v-html='product.description'></p>
                                <h4>Product Description</h4>
                                    <div v-html='product.productInformation'></div>





                                <p class='price'>
                                    £{{ product.price | formatPrice }}
                                </p>
                                
                                    <button class='default webstore-btn' @click='addToCart(product); calculateCartTotal(product); addItemToCart(product); addToCartItemsSummary(product);' v-if='canAddToCart(product)'>Add to Cart <i class="bi bi-bag-plus-fill"></i></button>
                                
                                <button class='disabled webstore-btn' v-else>Out Of Stock <i class="bi bi-bag-x-fill"></i></button>
       
                                <span class="inventory-message"
                                    v-if='(product.availableInventory - cartCount(product.id)) === 0'    
                                >
                                    All Out!
                                </span>
                                <span class="inventory-message"
                                    v-else-if='(product.availableInventory - cartCount(product.id)) < 5'
                                >Only {{ product.availableInventory - cartCount(product.id)}} left!</span>
                                <span class="inventory-message"
                                    v-else
                                >
                                    Buy Now!
                                </span>
                                <div class="rating">
                                    <span v-for='n in product.rating'> 
                                        <i class="bi bi-star-fill"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- .trim modifier on v-model removes leading white space -->
                <div class="checkout" v-else>
                    <h3>Your Cart</h3>
                    <ul>
                        <li>Total: £{{ cartTotal }}</li>
                        <li>Items: {{ cartItemCount}}</li>
                        <li v-for="item in cartItemsSummary" :key="item.id">
                            <ul>
                                <li>{{item.title}}</li>
                                <li>{{item.price}}</li>
                                <li>
                                    <img v-bind:src='item.image' alt="{{item.title}}" class="checkout__product-img" />
                                </li>
                                <li>Quantity: {{item.quantity}}</li>
                            </ul>
                        </li>
                    </ul>
                    
                    
                    <label for="fname">First Name</label> 
                    <input type="text" name="fname" id="fname" class='form-control' v-model.trim='order.firstName'>
                    <label for="lname">Last Name</label>
                    <input type="text" name="lname" id="lname" class='form-control' v-model.trim='order.lastName'>
                    <label for="address">Address</label>
                    <input type="text" name='address' id='address' v-model.trim='order.address' class='form-control'>
                    <label for="city">City</label>
                    <input type="text" name='city' id='city' v-model.trim='order.city' class='form-control'>
                    <label for="state">State</label>
                    <select name="state" id="state" v-model='order.state'>
                        <option value="" disabled>State</option>
                        <option v-for='(state, key) in states' v-bind:value='state'>{{ key }}</option>
                    </select>
                    <label for="postcode">Postcode</label>
                    <input type="text" name='postcode' id='postcode' v-model='order.postcode' class='form-control'>
                    <label for="gift">Ship as gift?</label>
                    <input type="checkbox" id='gift' value='true' 
                        v-bind:true-value='order.sendGift'
                        v-bind:false-value='order.dontSendGift'
                        v-model='order.gift'>
                    <label for="home">Home</label>
                    <input type="radio" id='home' v-bind:value='order.home' v-model='order.method'>
                    <label for="business">Business</label>
                    <input type="radio" id='business' v-bind:value='order.business' v-model='order.method'>
                    <button type='submit' class='btn btn-primary submit' @click='submitForm'>Place Order</button>
                    {{ order.gift }}
                </div>
                
            </div>
        </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Laptop Shop',
  data() {
    return {
      sitename: 'Laptop Shop',
      showProduct: true,
      order: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          postcode: '',
          state: '',
          gift: false,
          method: 'Home Address',
          business: 'Business Address',
          home: 'Home Address',
          sendGift: 'Send As A Gift',
          dontSendGift: 'Do Not Send As A Gift'
      },
      products: [],
      states: {
          AL: 'Alabama',
          AR: 'Arizona',
          CA: 'California',
          NV: 'Nevada',
          NY: 'New York'
      },
      cart: [],
      cartTotal: 0,
      cartItems: [],
      cartItemsSummary: []
    }
  },
  computed: {
      cartItemCount: function() {
          return this.cart.length || '';
      },
      sortedProducts() { 
          if (this.products.length > 0) {
              let productsArray = this.products.slice(0);
              function compare(a, b) {
                  if (a.title.toLowerCase() < b.title.toLowerCase())
                  return - 1;
                  if (a.title.toLowerCase() > b.title.toLowerCase())
                  return 1;
              return 0;
              }
              return productsArray.sort(compare);
          }
      }
  },
  filters: {
      formatPrice: function (price) {
          if (!parseInt(price)) { return ''; }
          if (price > 999999) {
              const priceString = (price / 100).toFixed(2);
              const priceArray = priceString.split('').reverse('');
              let index = 3;
              while (priceArray.length > index + 3) {
                  priceArray.splice(index + 3, 0, ',');
                  index += 4;
              }
              return '$' + priceArray.reverse().join('');
          } else {
              return '$' + (price / 100).toFixed(2);
          }
      }
  },
  created: function() {
      axios.get('./products.json')
          .then((response) => {
              this.products = response.data.products;
              console.log(this.products)
          })
  },
  methods: {
      checkRating(n, myProduct) {
          return (myProduct.rating - n) >= 0
      },
      addToCart(aProduct) {
          this.cart.push( aProduct.id )
      },
      canAddToCart(aProduct) {
          return aProduct.availableInventory > this.cartCount(aProduct.id);
      },
      cartCount(id) {
          let count = 0;
          for (var i = 0; i < this.cart.length; i++) {
              if (this.cart[i] === id) {
                  count++;
              }
          }
          return count;
      },
      addItemToCart(aProduct) {
          this.cartItems.push(aProduct)
      },
      calculateCartTotal(aProduct) {
          this.cartTotal += aProduct.price;
      },
      showCheckout() {
          this.showProduct = this.showProduct ? false: true;
      },
      addToCartItemsSummary(aProduct) {
          this.cartItems.forEach((item) => {
              // add item to cartItemsSummary array
              if (!this.cartItemsSummary.includes(item)) {
                  this.cartItemsSummary.push(item)
              }
          })
          // find item added in cartItemsSummary array and increment quantity
          this.cartItemsSummary.forEach((item) => {
              if (item.id === aProduct.id) {
                  item.quantity++;
              }
          })
      },
      submitForm() {
          alert('submitted')
      }
  }
}
</script>

<style scoped lang="scss">
.nav {
    .col {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    h1 {
      color: skyblue;
    }
  }

    .webstore-btn {
        border: 2px solid skyblue;
        display: flex;
        align-items: center;
        justify-content: center;
        background: lightgoldenrodyellow;
        color: skyblue;
        transition: all 0.2s;
        height: 40px;
        width: 140px;
        border-radius: 50px;
        i {
            margin-left: 10px;
        }
        &:hover {
            background: skyblue;
            color: lightgoldenrodyellow;
            border-color: lightgoldenrodyellow;
        }
    }

    .disabled {
        color: grey;
        background: lightsteelblue;
        &:hover {
            color: grey;
            background: lightsteelblue; 
        }
    }

    .checkout-btn {
        border: none;
        background: transparent;
        position: relative;
        &__item-total {
            background: lightgoldenrodyellow;
            border-radius: 50px;
            display: block;
            width: 20px;
            height: 20px;
            position: absolute;
            right: 25px;
            border: 1px solid skyblue;
            font-size: 12px;
        }
        &__bag {
            font-size: 30px;
            color: skyblue;
        }
    }

    .bi-star-fill {
        font-size: 30px;
        color: skyblue;
    }

    .checkout {
        &__product-img {
            width: 100px;
        }
    }

</style>
