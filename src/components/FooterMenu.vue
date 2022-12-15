<template>
  <div class="w-ful relative">
    <el-drawer title="我是标题" :with-header="false" :visible.sync="drawer">
      <span>我来啦!</span>
    </el-drawer>
    <div
      class="flex relative"
      style="min-width: 840px; border-top: 3px solid white"
      :style="{
        width: !isPlayerPage ? 'calc(100vw - 200px)' : '100vw',
        'border-top': !isPlayerPage ? '3px solid #31c27c' : '3px solid white',
      }"
    >
      <div
        class="menu_footer absolute"
        :style="{
          left: !isPlayerPage ? '2vw' : '2vw',
        }"
      >
        <el-skeleton
          style="width: 40px; height: 40px"
          :loading="!songDetail"
          animated
        >
          <template slot="template">
            <el-skeleton-item
              variant="image"
              style="width: 40px; height: 40px"
            />
          </template>
          <template>
            <el-image
              v-if="songDetail"
              style="width: 40px; height: 40px"
              :src="songDetail.al.picUrl"
              fit="fill"
            ></el-image>
            <div
              @mouseenter="mouseEnter(1)"
              @mouseleave="mouseLeave"
              @click="ToPlayerPage"
              class="relative bg-black opacity-50 cursor-pointer"
              style="
                width: 40px;
                height: 40px;
                top: -46px;
                transition: all 0.3s;
              "
              :style="{
                opacity: selectedIndex === 1 ? '0.5' : '0',
              }"
            ></div>
            <i
              @mouseenter="mouseEnter(1)"
              class="cursor-pointer"
              @click="ToPlayerPage"
              ><svg-icon
                icon-class="up"
                class="absolute text-white"
                style="top: 24px; left: 11px; transition: all 0.3s"
                :style="{ opacity: selectedIndex === 1 ? '1' : '0' }"
              ></svg-icon
            ></i>
          </template>
        </el-skeleton>

        <div class="row ml-4">
          <el-skeleton :loading="!songDetail" animated>
            <template slot="template">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-items: space-between;
                  margin-top: 10px;
                  margin-bottom: 10px;
                  height: 17px;
                "
              >
                <el-skeleton-item
                  variant="text"
                  style="width: 60px; height: 17px"
                />
                <el-skeleton-item
                  variant="text"
                  class="ml-4"
                  style="width: 60px; height: 13px"
                />
              </div>
            </template>
            <template>
              <div
                v-if="songDetail"
                class="music_font_footer mt-2"
                :class="!isPlayerPage ? 'text-black' : 'text-gray-400'"
              >
                <span class="music_song cursor-pointer truncate">{{
                  songDetail.name
                }}</span>
                <span
                  class="max-w-max"
                  style="
                    max-height: max-content;
                    font-size: small;
                    font-weight: normal;
                  "
                  >&nbsp;&nbsp;-&nbsp;&nbsp;</span
                >
                <span
                  v-for="item in songDetail.ar"
                  :key="item.id"
                  class="music_singer cursor-pointer truncate"
                  >{{ item.name }}</span
                >
              </div>
            </template>
          </el-skeleton>

          <div class="icon_music_footer relative">
            <i @click="Tolike()">
              <svg-icon
                :icon-class="!isLike ? 'like' : 'liked'"
                class="cursor-pointer w-30 h-30"
                :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
              ></svg-icon
            ></i>

            <svg-icon
              icon-class="download"
              class="cursor-pointer"
              :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
            ></svg-icon>
            <svg-icon
              icon-class="more"
              class="cursor-pointer"
              :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
            ></svg-icon>
            <svg-icon
              icon-class="comments"
              class="cursor-pointer"
              :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
            ></svg-icon>
          </div>
        </div>
      </div>

      <div
        class="icon_contrl_footer absolute"
        :style="{
          right: !isPlayerPage ? '40vw' : '44vw',
        }"
      >
        <svg-icon
          icon-class="onesong"
          class="cursor-pointer"
          :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
          style="width: 1.6em; height: 1.6em"
          title="上一首"
        ></svg-icon>
        <svg-icon
          icon-class="lastsong"
          class="cursor-pointer"
          :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
          style="width: 1.6em; height: 1.6em"
          title="上一首"
        ></svg-icon>
        <i @click="ChangePlayState(), TogglePlayStatus()">
          <svg-icon
            :icon-class="isPlaying === true ? 'pauseCircle' : 'playCircle'"
            style="width: 3em; height: 3em"
            class="cursor-pointer"
            :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
            title="播放"
          ></svg-icon>
        </i>
        <svg-icon
          icon-class="nextsong"
          class="cursor-pointer"
          :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
          style="width: 1.6em; height: 1.6em"
          title="上一首"
        ></svg-icon>

        <el-popover
          placement="bottom"
          width="150"
          trigger="click"
          class="popover_box"
        >
          <div class="block">
            <el-slider v-model="valueVolume" vertical height="100px">
            </el-slider>
            <div style="height: 20px"></div>
            <i @click="ChangeMute()"
              ><svg-icon
                icon-class="mute"
                class="cursor-pointer"
                :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
                title="上一首"
              ></svg-icon
            ></i>
          </div>
          <i slot="reference"
            ><svg-icon
              icon-class="vol"
              class="cursor-pointer"
              :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
              title="上一首"
            ></svg-icon
          ></i>
        </el-popover>
      </div>

      <div
        class="font_time_box absolute"
        :class="!isPlayerPage ? 'text-black' : 'text-gray-400'"
        :style="{
          right: !isPlayerPage ? '5vw' : '5vw',
        }"
      >
        <h1 class="font_time">{{ time_playnow }}</h1>
        <h1 class="font_time">{{ time_total }}</h1>
        <i @click="drawer = true" class="icon_songlist ml-4">
          <svg-icon
            icon-class="songlist"
            class="cursor-pointer"
            :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
            title="音乐列表"
          ></svg-icon>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import Audio from "@/components/vue-audio-better/audio";
export default {
  name: "FooterMenu",
  props: [],
  mixins: [Audio],
  data() {
    return {
      songDetail: null,
      loading: true,
      drawer: false,
      musicTitle: "BOW",
      musicSinger: "MFS",
      playStatu: false,
      i: 0,
      muteStatu: false,
      time_playnow: "00:00",
      time_total: "/05:33",
      valueVolume: 0,
      isPlayerPage: false,
      isLike: false,
      selectedIndex: null,
      level: "standard",
    };
  },
  computed: {},
  watch: {
    playingId: {
      handler(newid, oldid) {
        //这
        // console.log("底部当前歌曲id改变", newid);

        this.$axios({
          method: "GET",
          url: `http://localhost:3000/song/detail?ids=${newid}`,
        }).then((response) => {
          this.songDetail = response.data.songs[0];
        });
      },
      immediate: true,
    },
    songDetail: function (newValue, oldValue) {
      if (newValue != null) this.loading = false;
    },
  },
  methods: {
    ToPlayerPage() {
      this.$router.push({
        path: `/player`,
      });
    },
    mouseEnter(index) {
      this.selectedIndex = index;
    },
    mouseLeave() {
      this.selectedIndex = null;
    },
    Tolike() {
      this.isLike = !this.isLike;
    },
    ChangePlayState() {
      this.$store.commit("ChangePlayState", { isPlaying: !this.isPlaying });
    },
    ChangeMute() {
      if (this.valueVolume != 0) {
        this.i = this.valueVolume;
        this.muteStatu = true;
        this.valueVolume = 0;
      } else {
        this.muteStatu = false;
        this.valueVolume = this.i;
        this.i = 0;
      }
    },
  },
  mounted() {
    if (this.$route.path === "/player") {
      this.isPlayerPage = true;
    } else {
      this.isPlayerPage = false;
    }
  },

  updated() {},
};
</script>


<style scoped>
.foot_icon {
  color: rgb(0, 0, 0);
  transition: all 0.1s;
}
.foot_player_icon {
  color: rgb(156, 163, 175);
  transition: all 0.1s;
}
.foot_player_icon:hover {
  color: rgb(49, 194, 124);
  transition: all 0.1s;
}
.foot_icon:hover {
  color: rgb(49, 194, 124);
  transition: all 0.1s;
}
.flex {
  display: flex;
  height: 65px;
  width: auto;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
}
.menu_footer {
  display: flex;
  align-content: center;
  align-items: center;
  height: 65px;
}
.row {
  height: 65px;
}

.music_font_footer {
  display: flex;
  align-items: center;
  width: 100%;
  height: max-content;
}
.music_song {
  max-width: 260px;
  max-height: max-content;
  font-size: medium;
  font-weight: normal;
}
.music_song:hover {
  color: rgb(49, 194, 124);
}

.music_singer {
  max-width: 135px;
  max-height: max-content;
  font-size: small;
  font-weight: normal;
}
.music_singer:hover {
  color: rgb(49, 194, 124);
}
.icon_music_footer {
  margin-top: 5px;
  display: flex;
  height: 20px;
  width: 120px;
  justify-content: space-between;
}

.icon_contrl_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  width: 180px;
}
.icon_play_footer {
  transition: all 0.3s;
  width: 10em;
  height: 10em;
  cursor: pointer;
}
.icon_play_footer:hover {
  transition: all 0.3s;
  opacity: 80%;
}
.icon_back_footer {
  transition: all 0.3s;
  height: 25px;
  width: 25px;
  cursor: pointer;
  line-height: 0px;
}
.icon_back_footer:hover {
  transition: all 0.3s;
  opacity: 80%;
}
.icon_volume_footer {
  transition: all 0.3s;
  cursor: pointer;
  height: 20px;
  width: 20px;
  line-height: 0px;
}
.icon_volume_footer:hover {
  transition: all 0.3s;
  opacity: 80%;
}

.font_time_box {
  display: flex;
  align-items: center;
}
.font_time {
  font-size: small;
  font-weight: normal;
}
.popover_box {
  height: 20px;
  width: 20px;
  line-height: 0px;
}
.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 0;
}
.volume_box2 {
  display: flex;
  align-content: center;
  justify-content: center;
}
.el-slider__bar {
  background-color: rgb(49, 194, 124);
}
</style>
