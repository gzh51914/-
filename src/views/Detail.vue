<template>
  <div id="detail">
    <!-- deatailSwipe -->
    <div id="deatailSwipe">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="item in 4" :key="item">
          <img :src="detailInfo.goods_origin_url" alt />
        </van-swipe-item>

        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/4</div>
        </template>
      </van-swipe>

      <div class="revertBox" @click="revert()">返回</div>
    </div>
    <!-- deatailSwipe -->
    <!-- shopInfo -->
    <div id="shopInfo">
      <div class="priceBox">
        <div class="price">
          <div class="cprice">￥{{detailInfo.cprice}}</div>
          <div class="oprice">￥{{detailInfo.oprice}}</div>
        </div>
        <div class="buyNum">{{detailInfo.join_number}}</div>
      </div>
      <div class="contextBox">{{detailInfo.goods_title}}</div>
    </div>
    <!-- shopInfo -->
    <!-- Promotion -->
    <div id="Promotion">
      <dir class="sectionBox" @click="popup()">
        <div class="topBox">
          <div class="tip">{{detailCoupon.title}}</div>
          <div class="text">{{detailCoupon.content}}</div>
          <div class="iconBox">
            <i class="iconfont icon-sidebar_back_hov"></i>
          </div>
        </div>
        <div class="bottomBox">
          <div class="text">
            <div class="textBox">
              <div class="dot"></div>
              <span>24小时发货</span>
            </div>
            <div class="textBox">
              <div class="dot"></div>
              <span>7天包退</span>
            </div>
            <div class="textBox">
              <div class="dot"></div>
              <span>售后补贴</span>
            </div>
          </div>
          <div class="iconBox">
            <i class="iconfont icon-sidebar_back_hov"></i>
          </div>
        </div>
      </dir>
    </div>
    <!-- Promotion -->

    <div id="selectBox">
      <dir class="sectionBox" @click="popup()">
        <div class="topBox">
          <div class="text">请选择颜色、尺码</div>
          <div class="iconBox">
            <i class="iconfont icon-sidebar_back_hov"></i>
          </div>
        </div>
      </dir>
    </div>

    <!-- 弹出层 -->
    <div id="popup">
      <van-popup
        v-model="show"
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <div class="contextBox">
          <div class="title">促销</div>

          <div class="topBox">
            <div class="tip">{{detailCoupon.title}}</div>
            <div class="text">{{detailCoupon.content}}</div>
            <div class="iconBox">
              <i class="iconfont icon-sidebar_back_hov"></i>
            </div>
          </div>
        </div>
      </van-popup>
    </div>

    <!-- 弹出层 -->
    <!-- detailBottomNav -->
    <div id="detailBottomNav">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="tocart" />
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
        <van-goods-action-button type="danger" text="立即购买" @click="tocart" />
      </van-goods-action>
    </div>
    <!-- detailBottomNav -->
  </div>
</template>

<script>
import { instance } from "@/utils/axios.js";

import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Toast,
  Popup
} from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Toast);
Vue.use(Popup);
export default {
  data() {
    return {
      current: 0,
      show: false,
      detailInfo: [],
      detailSku: [],
      detailCoupon: []
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    onClickIcon() {
      Toast("点击按钮");
    },
    tocart() {
      this.$router.push("/cart");
    },
    onClickButton() {
      Toast({
        message: "加入购物车成功",
        className: "buttonToast",
        icon: "https://img.yzcdn.cn/vant/logo.png"
      });
    },
    revert() {
      this.$router.go(-1);
    },
    popup() {
      this.show = true;
    }
  },

  mounted() {
    //接口测试，，，给goods_id
    // https://webservice.juanpi.com/api/getMemberAboutInfo?goods_id=149939809&req_coupons_id=149939809

    let goodsId = this.$route.params.shopid;

    instance
      .get("api/getMemberAboutInfo", {
        params: {
          goods_id: goodsId,
          req_coupons_id: goodsId
        }
      })
      .then(res => {
        this.detailInfo = res.data.skudata.info;
        this.detailSku = res.data.skudata.info;
        this.detailCoupon = res.data.discount.coupon[0];
        // console.log(this.detailCoupon);
      });
  }
};
</script>



<style lang="scss">
// 覆盖组件样式
#deatailSwipe {
  .van-swipe {
    height: 7.5rem;
    .van-swipe-item {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
      width: 0.8rem;
      height: 0.5rem;
      font-size: 0.34rem;
      text-align: center;
      line-height: 0.5rem;
    }
  }
}

#detailBottomNav {
  .van-goods-action {
    height: 1rem;

    .van-goods-action-icon {
      font-size: 0.3rem;
      width: 1.2rem;
      .van-goods-action-icon__icon {
        font-size: 0.5rem;
      }
    }

    .van-goods-action-button {
      flex: 1;
      width: 2rem;
      height: 0.8rem;

      .van-button__text {
        font-size: 0.3rem;
      }
    }
    .van-goods-action-button--last {
      border-top-right-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    }

    .van-goods-action-button--first {
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
    }
  }
}

.buttonToast {
  width: 3.7rem;
  height: 1.8rem;
  background: red;
  font-size: 0.5rem;
  i {
    img {
      width: 1rem;
      height: 1rem;
    }
  }
}

#popup {
  .van-popup__close-icon--top-right {
    top: 0.18rem;
    right: 0.18rem;
  }
  .van-icon {
    font-size: 0.4rem;
  }
}
// .van-toast {
//   height: 0.6rem;
//   .van-toast__text {
//     font-size: 0.5rem;
//   }
// }
</style>


<style lang="scss" scoped>
#detail {
  height: calc(100vh - 1rem);
  overflow: auto;

  #deatailSwipe {
    position: relative;
    .revertBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 1rem;
      height: 1rem;
      background: rgba(196, 196, 196, 0.514);
      border-radius: 50%;
      line-height: 1rem;
      text-align: center;
      font-size: 0.3rem;
      font-weight: bold;
      color: #ff464e;
    }
  }

  #shopInfo {
    padding: 0.2rem;
    box-sizing: border-box;
    .priceBox {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 0.6rem;
      .price {
        display: flex;
        align-items: center;
        .cprice {
          font-size: 0.4rem;
          color: red;
        }
        .oprice {
          margin-left: 0.2rem;
          align-self: flex-end;
          text-decoration: line-through;
          color: #ccc;
        }
      }
    }
    .contextBox {
      padding: 0.1rem;
      font-size: 0.4rem;

      word-wrap: break-word;
    }
  }
  #Promotion {
    padding: 0.15rem 0;
    background: rgb(230, 230, 230);
    .sectionBox {
      margin: 0;
      padding: 0;
      background: white;
      .topBox,
      .bottomBox {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        border-bottom: 0.01rem solid #ccc;
        .tip {
          background: red;
          color: white;
        }
        .text {
          width: 5.5rem;
          font-size: 0.25rem;
          color: rgb(63, 63, 63);
          display: flex;
          .textBox {
            margin-right: 0.2rem;
            display: flex;
            align-items: center;
            .dot {
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 50%;
              background: red;
              margin: 0 0.1rem;
            }
          }
        }
        .iconBox {
          i {
            color: blue;
          }
        }
      }
    }
  }

  #selectBox {
    padding: 0 0 0.2rem 0;
    background: rgb(230, 230, 230);
    .sectionBox {
      margin: 0;
      padding: 0;
      background: white;
      .topBox {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        border-bottom: 0.01rem solid #ccc;

        .text {
          width: 5.5rem;
          font-size: 0.28rem;
          color: rgb(63, 63, 63);
        }
        .iconBox {
          i {
            color: blue;
          }
        }
      }
    }
  }
  #popup {
    .contextBox {
      .van-popup__close-icon {
        font-size: 0.4rem;
      }
      .title {
        height: 1rem;
        text-align: center;
        font-size: 0.38rem;
        line-height: 1rem;
        border-bottom: 0.01rem solid #ccc;
      }

      .topBox {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        border-bottom: 0.01rem solid #ccc;
        .tip {
          background: red;
          color: white;
        }
        .text {
          width: 5.5rem;
          font-size: 0.28rem;
          color: rgb(63, 63, 63);
        }
        .iconBox {
          i {
            color: blue;
          }
        }
      }
    }
  }
}
</style>