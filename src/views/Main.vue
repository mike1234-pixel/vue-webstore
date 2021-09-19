<template>
  <div>
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList.vue";
import Form from "@/components/Form.vue";

export default {
  name: "Main",
  components: {
    ProductList,
    Form,
  },
  beforeCreate: function() {
    this.$store.dispatch('initStore');
  },
};
</script>