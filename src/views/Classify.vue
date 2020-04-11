<template>
  <div id="classify">
    <div id="topSearch">
      <div class="inputBox" @click="toSearch()">
        <div class="iconBox">
          <i class="iconfont icon-search"></i>
        </div>
        <input type="text" placeholder="搜索商品" />
      </div>
      <div class="textBox">搜索</div>
    </div>
    <!-- sidebar -->
    <div id="sidebar">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
    </div>
    <!-- sidebar -->
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import { Sidebar, SidebarItem } from "vant";

Vue.use(Sidebar);
Vue.use(SidebarItem);

export default {
  data() {
    return {
      activeKey: 0
    };
  },
  methods: {
    toSearch() {
      this.$router.push("/search");
    }
  },
  created() {
    //jsonp请求数据
    $.ajax({
      type: "get",
      url: "https://m.juanpi.com/cate/catelist",
      data: {
        pf: 8,
        area: 4,
        bi: 222,
        dtype: "jsonp"
      },
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: "jsonp1",
      success: function(res) {
        console.log(res); //
      }
    });
  },
  mounted() {}
};
</script>

<style lang="scss">
#classify {
  #sidebar {
    .van-sidebar {
      width: 1.8rem;
      .van-sidebar-item {
        width: 1.8rem;
        height: 0.93rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.3rem;
        padding: 0;
      }
    }
  }
}
</style>


<style lang="scss" scoped>
#classify {
  #topSearch {
    height: 0.88rem;
    display: flex;
    justify-content: space-between;
    .inputBox {
      padding-left: 0.3rem;
      box-sizing: border-box;
      // width: 6rem;
      display: flex;
      align-items: center;
      flex: 1;

      .iconBox {
        width: 0.56rem;
        height: 0.56rem;
        background: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 0.38rem;
        }
      }

      input {
        font-size: 0.26rem;
        height: 0.56rem;
        width: 100%;
        background: #f2f2f2;
      }
    }
    .textBox {
      width: 1.2rem;
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.88rem;
    }
  }
}
</style>