<template>
  <div class="login">
    <div class="fixtop">
      <a id="t-find" href="javascript:history.go(-1);" class="btnBack">
        <img
          src="//jp.juancdn.com/jpwebapp_v1/images_v1/user/arrow_white.png?5123297e-1&amp;sv=449ce9ee"
        />
      </a>
      <span id="t-index">登录</span>
      <a
        id="t-user"
        href="//m.juanpi.com/user/register"
        class="free-reg"
        rel="nofollow"
        target="_parent"
      >注册</a>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Form } from "vant";

Vue.use(Form);
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    }
  }
};
</script>


<style lang="scss" scoped>
.fixtop {
  width: 100%;
  height: 0.88rem;
  color: #fff;
  background: linear-gradient(150deg, #ff5a61 50%, #fd631c);
  z-index: 999;
  position: absolute;
  #t-index {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.36rem;
    padding: 2.8rem;
  }
}
</style>