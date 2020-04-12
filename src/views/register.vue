<template>
  <div class="home">
    <van-nav-bar title="注册页" left-text="返回" left-arrow>
      <template #right></template>
    </van-nav-bar>
    <p class="reg-notice">请确保你的手机畅通，用于接收验证码短信</p>
    <form id="mobileFrom" method="post" action="/muser/password">
      <div class="login-info">
        <ul class="info-input clear">
          <li>
            <!--<i><img  src="//jp.juancdn.com/jpwebapp/images/login/phone.png?ts=20181022174388-1&sv=449ce9ee" /></i>-->
            <input
              type="tel"
              pattern="[0-9]*"
              placeholder="请输入手机号码"
              id="mobile"
              name="mobile"
              class="txt normalInput"
            />
            <em class="reg-close" style="display: none;" id="reg-mobile-close">
              <img
                src="//jp.juancdn.com/jpwebapp_v1/images_v1/user/x.png?2dc3a154-1&amp;sv=449ce9ee"
              />
            </em>
          </li>
          <li class="clear">
            <!--<i><img  src="//jp.juancdn.com/jpwebapp_v1/images/login/code.png?ts=20181022174388-1&sv=449ce9ee" /></i>-->
            <input
              type="tel"
              class="txt normalInput code-txt fl"
              id="code"
              placeholder="请输入验证码"
              name="code"
            />
            <i style="display: none;" class="reg-close fl" id="reg-code-close">
              <img
                src="//jp.juancdn.com/jpwebapp_v1/images_v1/user/x.png?2dc3a154-1&amp;sv=449ce9ee"
              />
            </i>
            <a class="btn_get get-code disable-code fr" id="code_btn" href="javascript:;">获取验证码</a>
          </li>
        </ul>
        <input type="hidden" name="hidMobile" id="hidMobile" value />
        <input type="hidden" name="mtoken" id="mtoken" value="4c9c7fad8e91df574580e5c2b7ee3811" />
        <a href="./Login.vue" id="btn-code" class="codeBtn disable-btn">下一步</a>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";

Vue.use(NavBar);
export default {};
</script>


<style lang="scss" scoped>
.reg-notice {
  width: 100%;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.24rem;
  color: #999;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.normalInput {
  width: 100%;
  height: 0.96rem;
  font-size: 0.28;
  line-height: 0.96rem;
  color: #999;
  text-align: center;
  margin: 0.05rem;
  border: 0.01rem #000 solid;
}
.codeBtn {
  background: #dbdbdb;
  width: 100%;
  margin-top: 1.5rem;
  font-size: 0.36rem;
  line-height: 0.96rem;
  height: 0.96rem;
  color: #ffffff;
  text-align: center;
  display: block;
}
.btn_get {
  color: #999;
  margin: 0.05rem;
}
</style>