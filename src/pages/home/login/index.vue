<template>
  <div class="relative">
    <div class="absolute LoginBackground"></div>
    <div
      class="flex items-center justify-around relative"
      style="height: 100vh; padding-right: 10vw; padding-left: 10vw"
    >
      <div class="relative" style="">
        <div class="text-5xl text font-bold" style="line-height: 1.3">
          <h1 class="cursor-default" style="">Sign In to</h1>
          <h1 class="cursor-default" style="">Open the World</h1>
        </div>
        <div class="absolute mt-12 text-sm left-2">
          <h1 class="mb-1">If you don't have an account</h1>
          <h1 class="inline">you can</h1>
          <h1 class="inline cursor-pointer" style="color: #84fab0">
            Register here
          </h1>
        </div>
      </div>
      <div class="w-72 h-72 form relative" style="">
        <div class="flex">
          <label
            class="
              absolute
              text-sm
              transition-all
              cursor-text
              text-gray-500
              Label
            "
            style="top: 12px; left: 20px"
            :style="{
              top: phone === '' ? '16px' : '-30px',
              color: phone === '' ? '#6B7280' : '#84fab0',
            }"
            for="phone"
            >Phone</label
          >
          <input v-model="phone" type="text" id="phone" />
          <button
            class="absolute ml-7 LoginButton"
            style="
              width: 100px;
              height: 32px;
              right: 10px;
              top: 9px;
              font-size: 10px;
              font-weight: 600;
            "
            @click="SentCaptcha"
          >
            Send Code
          </button>
        </div>
        <div class="mt-10">
          <label
            class="
              absolute
              text-sm
              transition-all
              cursor-text
              text-gray-500
              Label
            "
            style="top: 105px; left: 20px"
            :style="{
              top: captcha === '' ? '105px' : '65px',
              color: captcha === '' ? '#6B7280' : '#84fab0',
            }"
            for="captcha"
            >Captcha</label
          >
          <input v-model="captcha" type="text" id="captcha" />
          <p
            class="relative text-sm text-gray-500 cursor-pointer ChangeText"
            style="left: 10px"
          >
            or enter password
          </p>
        </div>
        <div class="mt-10">
          <button class="LoginButton" @click="phonLogin">Sign In</button>
          <div class="options">
            <div class="Separator">
              <p
                class="relative items-center text-sm text-gray-500"
                style="
                  width: max-content;
                  margin-left: 50%;
                  transform: translateX(-50%);
                "
              >
                or continue with
              </p>
            </div>
            <div class="flex justify-around items-center mt-5 w-full">
              <div
                class="bg-white relative SvgIconBox cursor-pointer"
                style="width: 50px; height: 50px"
              >
                <svg-icon
                  icon-class="vx"
                  class="absolute left-1/2 top-1/2"
                  style="
                    width: 30px;
                    height: 30px;
                    transform: translate3d(-50%, -50%, 0);
                  "
                ></svg-icon>
              </div>
              <div
                class="bg-white relative SvgIconBox cursor-pointer"
                style="width: 50px; height: 50px"
              >
                <svg-icon
                  icon-class="qq"
                  class="absolute left-1/2 top-1/2"
                  style="
                    width: 30px;
                    height: 30px;
                    transform: translate3d(-50%, -50%, 0);
                  "
                ></svg-icon>
              </div>
              <div
                class="bg-white relative SvgIconBox cursor-pointer"
                style="width: 50px; height: 50px"
              >
                <svg-icon
                  icon-class="sina"
                  class="absolute left-1/2 top-1/2"
                  style="
                    width: 30px;
                    height: 30px;
                    transform: translate3d(-50%, -50%, 0);
                  "
                ></svg-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        if (response.data.code === 200) {
          document.cookie = JSON.stringify(response.data.cookie);
          console.log("this.$cookie.keys();: ", this.$cookie.keys());
        }
      });
    },
    verify() {
      this.$axios({
        method: "post",
        url: `http://localhost:3000/captcha/verify?phone=${this.phone}&captcha=${this.captcha}`,
        Headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        console.log("验证验证码", response);
      });
    },
  },
};
</script>

<style scoped>
.LoginBackground {
  z-index: -1;
  background-image: linear-gradient(to right, #84fab0 0%, #8fd3f4 100%);
  height: 150px;
  width: 340px;
  top: 40vh;
  left: 16vw;
  filter: blur(70px);
}

.form input {
  transition: all 1s;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  font: inherit;
  font-size: 14px;
  width: 100%;
  border-radius: 10px;
  background-color: rgba(132, 250, 176, 0.1);
  outline-color: #84fab0;
}
.ChangeText:hover {
  color: #84fab0;
}
.LoginButton {
  transition: all 0.2s;
  width: 100%;
  height: 45px;
  background-color: #84fab0;
  box-shadow: #84fab0 0 20px 30px -10px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
}
.LoginButton:hover {
  transition: all 0.2s;
  box-shadow: #84fab0 0px 3px 30px 0px;
}
.Separator {
  position: relative;
  margin-top: 40px;
  width: 100%;
}
.Separator::before {
  content: "";
  position: absolute;
  top: 50%;
  height: 1px;
  width: 100%;
  background-color: rgba(107, 114, 128, 0.5);
  z-index: 1;
}
.Separator p {
  z-index: 1;
  background-color: white;
}
.SvgIconBox {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  border-radius: 10px;
  box-shadow: rgb(107, 114, 128) 0 10px 20px -10px;
}
.SvgIconBox:hover {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  color: white;
  box-shadow: none;
  background-color: #84fab0;
}
</style>        