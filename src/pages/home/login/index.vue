<template>
  <div>
    <p>手机号</p>
    <el-input v-model="phone" placeholder="请输入手机号"></el-input>
    <div>
      <el-button @click="SentCaptcha" type="success">点我发送验证码</el-button>
    </div>
    <p>输入验证码</p>
    <el-input v-model="captcha" placeholder="请输入验证码"></el-input>
    <div><el-button @click="verify" type="success">验证验证码</el-button></div>
    <div><el-button @click="phonLogin" type="success">登录</el-button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      captcha: "",
    };
  },
  methods: {
    SentCaptcha() {
      this.$axios({
        method: "post",
        url: `http://localhost:3000/captcha/sent?phone=${this.phone}`,
      }).then((response) => {
        console.log("发送验证码", response);
      });
    },
    phonLogin() {
      this.$axios({
        method: "post",
        url: `http://localhost:3000/login/cellphone`,
        data: {
          phone: this.phone,
          captcha: this.captcha,
        },
      }).then((response) => {
        console.log("登录", response);
      });
    },
    verify() {
      this.$axios({
        method: "post",
        url: `http://localhost:3000/captcha/verify?phone=${this.phone}&captcha=${this.captcha}`,
      }).then((response) => {
        console.log("验证验证码", response);
      });
    },
  },
};
</script>

<style scoped>
</style>        