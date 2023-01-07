<template>
  <div>
    <el-carousel
      class="mt-10"
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
    <HorizontalList
      class="mt-10 mb-14"
      v-if="playList"
      :detailArr="playList"
      Title="精 选 歌 单"
    />
    <HorizontalList
      class="mb-14"
      v-if="newSongList"
      :detailArr="newSongList"
      Title="新 歌 首 发"
    />
    <LeaderBoard />
    <div class="space1"></div>
  </div>
</template>

<script>
import HorizontalList from "@/components/HorizontalList.vue";
import LeaderBoard from "@/components/LeaderBoard.vue";

export default {
  data() {
    return {
      playList: [],
      bannerDetails: null,
      newSongList: [],
    };
  },
  components: { HorizontalList, LeaderBoard },
  mounted() {
    //精选歌单
    this.$axios({
      method: "GET",
      url: `http://localhost:3000/top/playlist/highquality&limit=5`,
    }).then((response) => {
      for (var i = 0; i < 5; i++) {
        var arr = {
          name: response.data.playlists[i].name,
          artists: response.data.playlists[i].creator.nickname,
          picUrl: response.data.playlists[i].coverImgUrl,
          playCount: response.data.playlists[i].playCount,
          id: response.data.playlists[i].id,
          type: 1,
        };
        this.playList.push(arr);
      }
      console.log(" this.playList: ", this.playList);
    });
    this.$axios({
      method: "GET",
      url: `http://localhost:3000/banner?type=0`,
    }).then((response) => {
      this.bannerDetails = response.data.banners;
    });
    //新歌首发
    this.$axios({
      method: "GET",
      url: `http://localhost:3000/top/song`,
    }).then((response) => {
      for (var i = 0; i < 5; i++) {
        var arr = {
          name: response.data.data[i].name,
          artists: response.data.data[i].artists,
          picUrl: response.data.data[i].album.picUrl,
          id: response.data.data[i].id,
          type: 0,
        };
        this.newSongList.push(arr);
      }
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