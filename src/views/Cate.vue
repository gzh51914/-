<template>
  <div id="search">
    <!-- <van-nav-bar title="搜索商品" left-text="返回" left-arrow @click-left="onClickLeft" /> -->

    <div id="topSearch">
      <div class="returnUp" @click="revet()">
        <i class="iconfont icon-sidebar_back_hov"></i>
      </div>
      <div class="titleBox">{{cateName}}</div>
      <div class="textBox">功能</div>
    </div>

    <div id="searchTabs">
      <van-tabs v-model="tabsActive" sticky @click="tabClick">
        <van-tab v-for="(item,index) in tabsArr" :key="index" :title="item.tabsTitle">
          <div class="toggleBox">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <router-link
                v-for="items in cateData"
                tag="div"
                :key="items.goods_id"
                class="shopBox"
                :to="{name:'detail',params:{shopid:items.goods_id}}"
              >
                <div class="imgBox">
                  <img :src="items.pic_url" alt />
                </div>

                <div class="textBox">
                  <div class="price" style="display:flex; align-items:center;">
                    <div class="cprice" style="font-size:0.38rem;color:red;">￥{{items.cprice}}</div>
                    <div
                      class="oprice"
                      style="margin-left:0.3rem;color:#ccc;text-decoration:line-through;"
                    >{{items.oprice}}</div>
                  </div>
                  <div class="content">
                    <div class="title">{{items.title}}</div>
                    <div class="timer">{{items.residue}}</div>
                  </div>
                </div>
              </router-link>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Tab, Tabs, List } from "vant";
import { instance2 } from "@/utils/axios.js";
import $ from "jquery";
Vue.use(NavBar);

Vue.use(List);

Vue.use(Tab);
Vue.use(Tabs);
export default {
  beforeRouteLeave(to, from, next) {
    this.cateData = []; //离开清除数据
    next();
  },
  data() {
    return {
      inpKeyword: "",
      tabsActive: 0,
      pageNum: 1,
      finished: false,
      loading: false,
      cateData: [],
      keys: {},
      cateName: "",
      id: 0,
      tabsArr: [
        { tabsTitle: "推荐", params: { order: "", sort: "" } },
        {
          tabsTitle: "价格",
          params: { order: "cprice", sort: "desc" }
        },
        { tabsTitle: "销量", params: { order: "sales", sort: "" } },
        { tabsTitle: "上新", params: { order: "addtime", sort: "" } }
      ]
    };
  },

  methods: {
    revet() {
      this.$router.go(-1);
    },
    tabClick(index, title) {
      let obj = JSON.parse(this.keys);

      if (index == 1) {
        obj.order =
          '{"cprice":"asc","show_stime":"desc","fav":"desc","sort":"desc"}';
      } else if (index == 2) {
        obj.order =
          '{"sales":"desc","show_stime":"desc","fav":"desc","sort":"desc"}';
      } else if (index == 3) {
        obj.order =
          '{"start_time":"desc","show_stime":"desc","fav":"desc","sort":"desc"}';
      }
      let objStr = JSON.stringify(obj);
      $.ajax({
        type: "get",
        url: "https://shop.juanpi.com/gsort",
        data: {
          key: objStr,
          page: 1,
          rows: 10,
          type: 50,
          zhouyi_ids: "p8_c4_l4",
          machining: "danpin",
          dtype: "JSONP"
        },
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "gsort_callback",
        success: response => {
          this.cateData = response.list;
          this.loading = false;
          //   this.finished = false;
          //   console.log(this.cateData);
        }
      });
    },
    onLoad() {
      this.pageNum++;
      $.ajax({
        type: "get",
        url: "https://shop.juanpi.com/gsort",
        data: {
          key: this.keys,
          page: this.pageNum,
          rows: 10,
          type: 50,
          zhouyi_ids: "p8_c4_l4",
          machining: "danpin",
          dtype: "JSONP"
        },
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "gsort_callback",
        success: response => {
          this.cateData.push(...response.list);
          this.loading = false;
          //   this.finished = false;
          //   console.log(this.cateData);
        }
      });
      //   console.log("load");
    }
  },

  created() {
    this.finished = true;
    let idFlag = this.$route.params.cate_id;
    if (idFlag) {
      this.id = this.$route.params.cate_id;
      sessionStorage.setItem("cateid", this.id);
    } else {
      this.id = sessionStorage.getItem("cateid");
    }
    instance2
      .get("/cate/subcatelist", {
        params: {
          cate_id: this.id,
          pf: 8,
          area: 4,
          bi: 222,
          source: null,
          front_cid: null
        }
      })
      .then(res => {
        this.cateName = res.data.name;
        this.keys = res.data.key;
        // let id = res.data.id;
        $.ajax({
          type: "get",
          url: "https://shop.juanpi.com/gsort",
          data: {
            key: this.keys,
            page: 1,
            rows: 10,
            type: 50,
            zhouyi_ids: "p8_c4_l4",
            machining: "danpin",
            dtype: "JSONP"
          },
          dataType: "jsonp",
          jsonp: "callback",
          jsonpCallback: "gsort_callback",
          success: response => {
            this.cateData = response.list;
            this.finished = false;
          }
        });
      });
  }
};
</script>


<style lang="scss" scoped>
#topSearch {
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .returnUp {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.7rem;
    height: 0.88rem;
    i {
      font-size: 0.28rem;
      color: blue;
    }
  }
  .titleBox {
    font-size: 0.4rem;
    white-space: nowrap; //不换行
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .textBox {
    width: 1.2rem;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.88rem;
  }
}
.toggleBox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .shopBox {
    width: 3.72rem;
    height: 4.85rem;
    .imgBox {
      width: 3.72rem;
      height: 3.72rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .logoBox {
        position: absolute;
        bottom: 0rem;
        right: 0;
        width: 1.8rem;
        height: 0.9rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .textBox {
      height: 1.12rem;
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;
      .tips {
        font-size: 0.34rem;
        color: red;
      }
      .content {
        margin-top: 0.06rem;
        display: flex;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.26rem;
          flex: 5;
        }
        .timer {
          text-align: right;
          color: #ccc;
          font-size: 0.22rem;
          align-self: flex-end;
          flex: 2;
        }
      }
    }
  }
}
</style>

<style lang="scss" >
#searchTabs {
  .van-tabs__wrap,
  .van-hairline--top-bottom {
    height: 0.88rem !important;

    .van-tab__text {
      font-size: 0.34rem !important;
      color: black;
      font-weight: bold;
      line-height: 0.88rem;
    }
  }
}
</style>