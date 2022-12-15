<template>
  <div class="" style="margin-left: 3%; margin-top: 3%">
    <h2 class="text-2xl font-bold">音乐馆</h2>
    <el-menu
      default-active="/musichall/choiceness"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      text-color="#000000"
      active-text-color="#00FA9A"
      router
    >
      <el-menu-item v-for="mhm in musicHallMenu" :key="mhm.id" :index="mhm.id">
        <span slot="title">{{ mhm.title }}</span>
      </el-menu-item>
    </el-menu>
    <transition name="el-zoom-in-center">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "musichall",
  data() {
    return {
      musicHallMenu: [
        { id: "/musichall/choiceness", title: "精选" },
        { id: "/musichall/voiceradio", title: "有声电台" },
        { id: "/musichall/leaderboard", title: "排行" },
        { id: "/musichall/singer", title: "歌手" },
        { id: "/musichall/songclassify", title: "分类歌单" },
        { id: "/musichall/digitalalbum", title: "数字专辑" },
        { id: "/musichall/phoneexclusive", title: "手机专享" },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
</style>