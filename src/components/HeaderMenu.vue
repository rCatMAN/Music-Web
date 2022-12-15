<template>
  <div>
    <div class="content">
      <div class="space"></div>
      <i class="icon">
        <img @click="back" class="icon" src="../assets/back.png" alt="back" />
      </i>
      <div class="space"></div>
      <i class="icon" href="">
        <img
          @click="forward"
          class="icon"
          src="../assets/next.png"
          alt="next"
        />
      </i>
      <div class="space1"></div>
      <div class="demo-input-suffix">
        <el-input
          placeholder="搜索音乐"
          suffix-icon="el-icon-search"
          v-model="keywords"
          title="输入关键字搜索"
          @keyup.enter.native="PushTo(keywords)"
        >
        </el-input>
      </div>
      <div class="space"></div>
      <a href="">
        <img
          class="icon_readsong"
          title="听歌识曲"
          src="../assets/readsong.png"
          alt="readsong"
        />
      </a>
      <div class="space2"></div>
      <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="30" fit="cover" :src="circleUrl"></el-avatar>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-link href="" type="success" :underline="false">{{
        userName
      }}</el-link>
      <a href="">
        <img class="vip" src="../assets/VIP.png" alt="vip" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
  props: {},
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      userName: "rCatMan",
      keywords: "",
    };
  },
  methods: {
    forward() {
      this.$router.forward();
    },
    back() {
      this.$router.back();
    },
    PushTo(keywords) {
      this.$router.replace({
        path: `/search/song`,
        query: {
          keywords,
        },
      });
      this.keywords = null;
    },

    // searchGet() {
    //   this.$axios({
    //     method: "GET",
    //     url: `http://localhost:3000/search?offset=0&limit=20&keywords=${this.searchTitle}&type=1`,
    //   }).then((response) => {
    //     console.log(response.data.result.songs);
    //     this.$router.push({
    //       path: `/search/song`,
    //       query: {
    //         response: response.data.result.songs,
    //       },
    //     });
    //     this.searchTitle = "";
    //   });
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
}
.icon:hover {
  cursor: pointer;
  transition: all 0.3s;
  opacity: 65%;
}

.icon {
  transition: all 0.3s;

  width: 30px;
  height: 30px;
}
.icon_readsong {
  width: 30px;
  height: 30px;
}
.space {
  width: 20px;
}
.space1 {
  width: 120px;
}
.space2 {
  width: 520px;
}
.demo-input-suffix {
  opacity: 0.5;
  border-radius: 30px;
}
.vip {
  width: 30px;
}
</style>
