<template>
  <div>
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList.vue";
import Form from "@/components/Form.vue";
import axios from 'axios';
import store from '../store/index'


export default {
  name: "Main",
  components: {
    ProductList,
    Form,
  },
  created: function() {
    axios.get('./products.json')
        .then((response) => {
            const products = response.data.products;
            store.commit('loadProductsToStore', products);
      })
  },
};
</script>