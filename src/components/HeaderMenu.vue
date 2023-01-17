<template>
  <div style="hieght: 60px; min-width: 840px">
    <div class="relative flex items-center" style="height: 60px">
      <i
        @click="back"
        class="absolute cursor-pointer icon"
        style="width: 30px; height: 30px; left: 1vw"
        ><svg-icon
          icon-class="back"
          style="width: 100%; height: 100%"
        ></svg-icon
      ></i>
      <i
        @click="back"
        class="absolute cursor-pointer icon"
        style="width: 30px; height: 30px; left: 5vw"
        ><svg-icon
          icon-class="next"
          style="width: 100%; height: 100%"
        ></svg-icon
      ></i>
      <div class="absolute" style="left: 15vw">
        <el-input
          placeholder="搜索音乐"
          suffix-icon="el-icon-search"
          v-model="keywords"
          title="输入关键字搜索"
          @keyup.enter.native="PushTo(keywords)"
        >
        </el-input>
      </div>
      <el-popover
        trigger="hover"
        placement="top"
        width="250"
        v-model="popoverShow"
      >
        <div class="flex">
          <el-avatar
            class="cursor-pointer"
            size="medium"
            :src="circleUrl"
          ></el-avatar>
          <div class="ml-5">
            <p @click="toLogin" class="cursor-pointer">{{ this.userName }}</p>
          </div>
        </div>
        <el-avatar
          slot="reference"
          class="absolute cursor-pointer"
          style="right: 20vw; top: 12px"
          size="medium"
          :src="circleUrl"
        ></el-avatar>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderMenu',
  props: {},
  data () {
    return {
      popoverShow: false,
      circleUrl:
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      keywords: ''
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.userName
    }
  },
  methods: {
    toLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    forward () {
      this.$router.forward()
    },
    back () {
      this.$router.back()
    },
    PushTo (keywords) {
      this.$router.replace({
        path: '/search/song',
        query: {
          keywords
        }
      })
      this.keywords = null
    }
  }
}
</script>
<style scoped>
.icon:hover {
  color: var(--primary-color);
}
</style>
