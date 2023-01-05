<template>
  <div>
    <el-carousel
      v-if="bannerDetails"
      trigger="click"
      :interval="6000"
      type="card"
      height="225px"
    >
      <el-carousel-item v-for="(item, index) in bannerDetails" :key="index">
        <h3 class="medium">
          <div class="demo-image">
            <el-image
              style="width: 620px; height: 225px"
              :src="item.imageUrl"
              fit="fill"
            >
            </el-image>
          </div>
        </h3>
      </el-carousel-item>
    </el-carousel>
    <HorizontalList v-if="playList" :playList="playList" Title="精选歌单" />

    <div class="space1"></div>
  </div>
</template>

<script>
import HorizontalList from "@/components/HorizontalList.vue";

export default {
  data() {
    return {
      playList: [],
      bannerDetails: null,
    };
  },
  components: { HorizontalList },
  mounted() {
    this.$axios({
      method: "GET",
      url: `http://localhost:3000/top/playlist/highquality&limit=5`,
    }).then((response) => {
      for (var i = 0; i < 5; i++) {
        this.playList.push(response.data.playlists[i]);
      }
    });
    this.$axios({
      method: "GET",
      url: `http://localhost:3000/banner?type=0`,
    }).then((response) => {
      this.bannerDetails = response.data.banners;
      console.log("this.bannerDetails: ", this.bannerDetails);
    });
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.space1 {
  height: 100px;
}
</style>