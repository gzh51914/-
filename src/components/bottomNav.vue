<template>
  <div id="bottomNav">
    <!-- <ul>
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
    </ul>-->
    <van-tabbar
      class="van-tabbar"
      v-model="bottomNavActive"
      active-color="#FF464E"
      @change="changeActive()"
    >
      <van-tabbar-item v-for="(item,index) in icon" :key="index" :to="item.to">
        <span>{{item.name}}</span>
        <img
          class="imgSize"
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.active : item.inactive"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);

import instance from "@/utils/axios.js";

export default {
  data() {
    return {
      menulist: [],
      bottomNavActive: 0, //底部导航默认选中
      icon: [
        {
          badge: "3",
          name: "首页",
          to: "home",
          active:
            "https://goods4.juancdn.com/bao/171127/7/0/5a1bce9f8150a16b8658e657_72x72.png",
          inactive:
            "https://goods4.juancdn.com/bao/171127/6/0/5a1bce9a8150a16b4e766a8d_72x72.png"
        },
        {
          badge: "5",
          name: "分类",
          to: "classify",
          active:
            "https://goods7.juancdn.com/bao/171127/c/3/5a1bcef5a9fcf842f140cb1d_72x72.png",
          inactive:
            "https://goods5.juancdn.com/bao/171127/9/6/5a1bcef08150a176c87f92be_72x72.png"
        },
        {
          badge: "3",
          name: "购物车",
          to: "cart",
          active:
            "https://goods4.juancdn.com/bao/170411/7/3/58ecaebba43d1f5e6b2f0d02_72x72.png",
          inactive:
            "https://goods2.juancdn.com/bao/170411/3/a/58ecaebaa43d1f6f166e6882_72x72.png"
        },
        {
          badge: "5",
          name: "我的卷皮",
          to: "personal",
          active:
            "https://goods1.juancdn.com/bao/170411/0/d/58ecaec6a43d1f5e7a188a96_72x72.png",
          inactive:
            "https://goods5.juancdn.com/bao/170411/9/7/58ecaec4a43d1f5e7c6dc860_72x72.png"
        }
      ]
    };
  },
  methods: {
    //点击tabbar触发事件
    changeActive() {
      // console.log(1);
    }
  },
  created() {
    //通过路由跳转判断选中的样式
    if (this.$route.name == "home") {
      this.bottomNavActive = 0;
    } else if (this.$route.name == "classify") {
      this.bottomNavActive = 1;
    } else if (this.$route.name == "cart") {
      this.bottomNavActive = 2;
    } else if (this.$route.name == "personal") {
      this.bottomNavActive = 3;
    }
  },
  mounted() {
    //测试接口  首页数据
    instance
      .get("/api/getGoods", {
        params: {
          page: 1,
          zy_ids: "p8_c4_l4",
          app_name: "zhe",
          catname: "tab_hpzc",
          flag: "tab_hpzc"
        }
      })
      .then(res => {
        console.log(res);
      });
  }
};
</script>

<style lang="scss" scoped>
#bottomNav {
  .van-tabbar {
    height: 1rem;
    span {
      font-size: 0.2rem !important;
    }
    .imgSize {
      width: 0.48rem;
      height: 0.48rem !important;
    }
  }
}

/*  不用组件时的css样式 */

// .router-link-active {
//   background: rgb(223, 223, 223);
// }

// #bottomNav {
//   width: 100%;
//   position: fixed;
//   bottom: 0;
//   border-top: 1px solid black;
//   ul {
//     height: 1rem;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     li {
//       height: 100%;

//       flex: 1;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       i {
//         font-size: 0.48rem;
//       }
//     }
//   }
// }
</style>