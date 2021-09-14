<template>
  <div class="home">
    <img alt="software shop logo" src="../assets/software-development.svg" class="home__icon" />
    <WebStore />
  </div>
</template>

<script>
// @ is an alias to /src
import WebStore from "@/components/WebStore.vue";

export default {
  name: "Home",
  components: {
    WebStore,
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