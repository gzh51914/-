<template>
  <div id="brand">124214</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("brand", ["brandAjax"])
  },
  mounted() {
    //截取请求的ID
    let resId = this.$route.params.urlid
      .replace(/[^0-9]/gi, " ")
      .trim()
      .split(" ");
    resId = resId[0] + "_" + resId[resId.length - 1];

    this.brandAjax(resId);
  }
};
</script>

<style>
</style>