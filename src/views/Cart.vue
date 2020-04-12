<template>
  <div id="cart">
    <!-- navBarBox -->
    <div id="navBarBox">
      <van-nav-bar
        :title="'购物车'"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <!-- navBarBox -->
    <!-- shopCard -->
    <div id="shopCard">
      <div class="storeShop">
        <div class="storeInfo">
          <div class="storeFlex">
            <van-checkbox v-model="checked"></van-checkbox>
          </div>
          <div class="storeName">
            <i class="iconfont icon-store-fill"></i>
            <span>店铺名</span>
          </div>
        </div>
        <div class="cardBox">
          <van-checkbox v-model="checked"></van-checkbox>
          <div class="flexBox">
            <van-card
              num="2"
              price="2.00"
              desc="描述信息"
              title="商品标题"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            >
              <template #footer>
                <van-button type="warning">-</van-button>
                <van-button type="warning">+</van-button>
              </template>
            </van-card>
          </div>
        </div>
      </div>
    </div>
    <!-- shopCard -->

    <!-- cartBottomNav -->
    <div id="cartBottomNav">
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送,
          <!-- <span @click="onClickEditAddress">修改地址</span> -->
        </template>
      </van-submit-bar>
    </div>
    <!-- cartBottomNav -->
  </div>
</template>

<script>
import Vue from "vue";
import { Card, Button, Tag, NavBar, Checkbox, SubmitBar } from "vant";

Vue.use(Card)
  .use(Button)
  .use(Tag)
  .use(NavBar)
  .use(Checkbox);
Vue.use(SubmitBar);

export default {
  data() {
    return {
      checked: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
    onSubmit() {}
  }
};
</script>

<style lang="scss">
#navBarBox {
  .van-nav-bar {
    height: 0.88rem;
  }
  .van-nav-bar__title,
  .van-nav-bar__left,
  .van-nav-bar__right {
    height: 0.88rem;
    font-size: 0.36rem;
    line-height: 0.88rem;
  }
  .van-nav-bar__left {
    .van-nav-bar__arrow {
      font-size: 0.28rem;
    }
    .van-icon {
      vertical-align: baseline;
    }
  }
  .van-nav-bar__text {
    vertical-align: baseline;
  }
}

#cartBottomNav {
  .van-submit-bar__tip {
    height: 0.5rem;
    font-size: 0.32rem;
  }
  .van-submit-bar__bar {
    height: 1rem;
    .van-checkbox {
      height: 1rem;
      font-size: 0.4rem;
      .van-checkbox__icon {
        font-size: 0.3rem;
        .van-icon-success {
          width: 0.3rem;
          height: 0.3rem;
          line-height: 0.3rem;
        }
      }
    }
    .van-submit-bar__button {
      width: 2.1rem;
      height: 0.9rem;
      font-size: 0.3rem;
    }
    .van-submit-bar__text {
      font-size: 0.5rem;
      .van-submit-bar__price {
        font-size: 0.4rem;
      }
    }
  }
}

#shopCard,
.cardBox {
  .van-card {
    padding: 0;
    height: 2rem;
    background: white;
    .van-card__thumb {
      width: 1.8rem;
      height: 1.8rem;
    }
    .van-card__content {
      font-size: 0.4rem;
      .van-card__title,
      .van-card__desc {
        height: 0.6rem;
        line-height: 0.6rem;
        max-height: 0.8rem;
      }
      .van-card__desc {
        font-size: 0.3rem;
        color: rgb(155, 155, 155);
      }
      .van-card__bottom {
        line-height: normal;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .van-card__price {
          font-size: 0.3rem;
          .van-card__price-currency {
            font-size: 0.5rem;
            color: orangered;
            margin-right: 0.1rem;
          }
          .van-card__price-integer {
            font-size: 0.4rem;
          }
        }
      }
    }
    .van-card__footer {
      display: flex;
      justify-content: flex-end;
      .van-button {
        width: 0.5rem;
        height: 0.5rem;
        font-size: 0.3rem;
        line-height: 0.5rem;
        padding: 0;
        margin-left: 0.2rem;
      }
    }
  }
  .van-checkbox {
    width: 1rem;
    height: 1rem;
    font-size: 0.4rem;
    justify-content: center;
    .van-checkbox__icon {
      font-size: 0.3rem;
      .van-icon-success {
        width: 0.3rem;
        height: 0.3rem;
        line-height: 0.3rem;
      }
    }
  }
}
</style>



<style lang="scss" scoped>
#shopCard {
  .storeShop {
    .storeInfo {
      height: 0.8rem;
      font-size: 0.3rem;
      display: flex;
      border-bottom: 0.01rem solid rgb(136, 136, 136);
      border-top: 0.01rem solid rgb(136, 136, 136);
      .storeFlex {
        width: 1rem;
      }
      .storeName {
        flex: 1;
        display: flex;
        align-items: center;
        i {
          font-size: 0.6rem;
        }
        span {
          font-size: 0.35rem;
          padding-left: 0.1rem;
        }
      }
    }
    .cardBox {
      padding: 0.1rem;
      border-bottom: 0.01rem solid rgb(136, 136, 136);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      // background: rgb(224, 224, 224);
      height: 2.9rem;
      .flexBox {
        flex: 1;
        height: 2rem;
      }
    }
  }
}
</style>