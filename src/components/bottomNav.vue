<template>
  <div id="bottomNav">
    <ul>
      <router-link to="/home" tag="li">
        <i class="iconfont icon-home-fill"></i>
        <span>首页</span>
      </router-link>
      <router-link to="/classify" tag="li">
        <i class="iconfont icon-all-fill"></i>
        <span>分类</span>
      </router-link>
      <router-link to="/cart" tag="li">
        <i class="iconfont icon-cart-Empty-fill"></i>
        <span>购物车</span>
      </router-link>
      <router-link to="/personal" tag="li">
        <i class="iconfont icon-account-fill"></i>
        <span>我的卷皮</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import instance from "@/utils/axios.js";

export default {
  data() {
    return {
      menulist: []
    };
  },

  mounted() {
    instance
      .get("/api/getIndexFirstPaintInfo", {
        params: {
          page: 1,
          zy_ids: "p8_c4_l4",
          app_name: "zhe",
          catname: "tab_hpzc",
          flag: "tab_hpzc"
        }
      })
      .then(res => {
        let menulistData = res.data.menuInfo.app_menu.menulist;
        this.menulist = menulistData;
        console.log(res.data.menuInfo.app_menu.menulist);
      });
  }
};
</script>

<style lang="scss" scoped>
.router-link-active {
  background: rgb(223, 223, 223);
}

#bottomNav {
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid black;
  ul {
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
      height: 100%;

      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i {
        font-size: 0.48rem;
      }
    }
  }
}
</style>