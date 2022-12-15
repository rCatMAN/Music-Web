<template>
  <div>
    <div class="top_box">
      <div style="width: 25px"></div>
      <div class="demo-image">
        <el-image
          style="width: 200px; height: 200px; border-radius: 15px"
          :src="url"
          fit="fill"
        ></el-image>
      </div>
      <div class="top_menu">
        <h1>{{ title }}</h1>
        <div class="user_box">
          <el-avatar size="small" :src="circleUrl"></el-avatar>
          <h2>{{ username }}</h2>
        </div>
        <h3>{{ subtitle }}</h3>
        <div class="top_button_box">
          <el-button size="small" type="success" round>播放全部</el-button>
          <el-button size="small" type="success" round>收藏</el-button>
          <el-button size="small" type="success" round>...</el-button>
        </div>
      </div>
    </div>
    <div style="height: 10px"></div>
    <el-menu
      default-active="/playlist/list"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#E9EEF3"
      text-color="#000000"
      active-text-color="#00FA9A"
      router
    >
      <el-menu-item v-for="m in menu" :key="m.id" :index="m.id">
        <span slot="title">{{ m.title }}</span>
      </el-menu-item>
    </el-menu>

    <transition name="el-zoom-in-center">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: this.$route.query.topInfo.src,
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      title: this.$route.query.topInfo.title,
      username: "猫猫音乐官方歌单",
      subtitle: this.$route.query.topInfo.subtitle,
      menu: [
        { id: "/playlist/list", title: "歌曲" },
        { id: "/playlist/comments", title: "评论" },
      ],
    };
  },
  props: [],
  methods: {},
  mounted() {
    console.log("钩子获取到的路由参数", this.$route.query.topInfo);
  },
};
</script>

<style scoped>
.top_box {
  display: flex;
  width: 100%;
  height: 200px;
}
.top_menu {
  display: flex;
  width: 800px;
  height: 200px;
  flex-direction: column;
  align-items: flex-start;
}
h1 {
  font-size: 30px;
  margin-bottom: 20px;
  margin-left: 16px;
  margin-top: 20px;
}
h2 {
  font-size: 10px;
  font-weight: 600;
  margin-left: 10px;
}
.user_box {
  display: flex;
  flex-direction: row;
  height: 30px;
  align-items: center;
  margin-bottom: 10px;
}
.el-avatar {
  margin-left: 16px;
}
h3 {
  font-size: 10px;
  font-weight: lighter;
  line-height: 20px;
  margin-left: 16px;
  margin-bottom: 15px;
}
.top_button_box {
  display: flex;
  margin-left: 16px;
}
.el-menu-demo {
  left: 25px;
}
</style>