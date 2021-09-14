<template>
  <div class="home">
    <img alt="software shop logo" src="../assets/software-development.svg" class="home__icon" />
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList.vue";

export default {
  name: "Main",
  components: {
    ProductList,
  },
};
</script>

<style scoped lang="scss">
  .home {
    &__icon {
      width: 100px;
    }
  }
</style>