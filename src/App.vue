<template>
  <div id="app">
    <router-view></router-view>
    <bottom-nav v-show="!$route.meta.hiddenBottomNav"></bottom-nav>
  </div>
</template>


<script>
import bottomNav from "@/components/bottomNav.vue";
export default {
  components: {
    bottomNav
  },
  mounted() {
    console.log(this.$route);
  }
};
</script>


<style lang="scss">
@import "@/stylesheets/main.scss";
</style>
