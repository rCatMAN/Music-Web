<template>
  <div>
    <div class="bg-black h-64 w-full">
      <el-image
        class="scale-50 duration-500"
        style="width: 100%px; height: 256px"
        :src="TopImgSrc"
        fit="fill"
      >
      </el-image>
      <el-input
        class="ml-auto mr-auto"
        style="top: -150px; left: 29%; max-width: 500px"
        placeholder="搜索音乐"
        suffix-icon="el-icon-search"
        v-model="keywords"
        title=""
        @keyup.enter.native="PushTo()"
      >
      </el-input>
    </div>
    <el-menu
      default-active="/search/song"
      class="mt-5"
      style="
        margin-top: 28px;
        margin-left: auto;
        margin-right: 37%;
        max-width: 405px;
      "
      mode="horizontal"
      background-color="#E9EEF3"
      text-color="#000000"
      active-text-color="#00FA9A"
      router
    >
      <el-menu-item v-for="item in menu" :key="item.path" :index="item.path">
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TopImgSrc:
        'https://y.qq.com/mediastyle/yqq/img/bg_search.jpg?max_age=2592000',
      keywords: this.$route.query.keywords,
      menu: [
        { path: '/search/song', title: '单曲' },
        { path: '/search/album', title: '专辑' },
        { path: '/search/mv', title: 'MV' },
        { path: '/search/playlist', title: '歌单' },
        { path: '/search/user', title: '用户' },
        { path: '/search/lyrics', title: '歌词' }
      ],
      isRouterAlive: true
    }
  },
  watch: {
    '$router.query.keywords': function(n, o) {
      console.log('fuck')
    }
  },
  methods: {
    reloadRouterView() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    PushTo() {
      this.$router.push({
        path: '/search/song',
        query: {
          keywords: this.keywords
        }
      })
      this.reloadRouterView()
    }
  }
}
</script>

<style scoped>
</style>
