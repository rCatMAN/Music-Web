<template>
  <div
    class="w-full h-16 z-10 fixed bottom-0"
    :style="{
      left: !isPlayerPage ? '200px' : '0',
      'background-color': !isPlayerPage
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(255, 255, 255, 0)',
    }"
  >
    <el-drawer title="我是标题" :with-header="false" :visible.sync="drawer">
      <span>我来啦!</span>
    </el-drawer>
    <div
      class="flex relative"
      style="min-width: 840px"
      :style="{
        width: !isPlayerPage ? 'calc(100vw - 200px)' : `100vw`,
      }"
    >
      <!-- 进度条 -->
      <span
        ref="Progress"
        class="absolute cursor-pointer slider z-10"
        :style="{
          width: !isPlayerPage
            ? `calc((100vw - 200px)* ${Progress})`
            : `calc(100vw * ${Progress})`,
          'background-color': !isPlayerPage
            ? `rgba(0,250,154,1)`
            : `rgba(49,194,124,1)`,
        }"
      ></span>
      <!-- 进度条背景 -->
      <span
        class="absolute transition-all cursor-pointer slider"
        :style="{
          width: !isPlayerPage ? `calc(100vw - 200px)` : `100vw`,
          'background-color': !isPlayerPage
            ? `rgba(49,194,124,1)`
            : `rgba(255,255,255,1)`,
        }"
      >
      </span>
      <!-- 进度按钮 -->
      <span
        class="rounded-full absolute z-10 bg-gray-50"
        style="
          width: 8px;
          height: 8px;
          top: -5.5px;
          background-color: rgba(49, 194, 124, 1);
        "
        :style="{
          left: !isPlayerPage
            ? `calc(((100vw - 200px)* ${Progress}) - 4px)`
            : `calc((100vw * ${Progress}) - 4px)`,
          opacity: selectedIndex === 2 || IsDragging ? '1' : '0',
        }"
      >
      </span>
      <!-- 鼠标点击遮罩 -->
      <span
        ref="Pbar"
        class="absolute cursor-pointer z-20"
        style="height: 7px; top: -5px"
        :style="{
          width: !isPlayerPage ? `calc(100vw - 200px)` : `100vw`,
        }"
        @mouseenter="mouseEnter(2)"
        @mouseleave="mouseLeave"
        @mousedown="ChangeSeekAction"
      >
      </span>
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
              v-if="!isPlayerPage"
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
              v-if="!isPlayerPage"
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
          title="循环方式"
        ></svg-icon>
        <svg-icon
          icon-class="lastsong"
          class="cursor-pointer"
          :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
          style="width: 1.6em; height: 1.6em"
          title="上一首"
        ></svg-icon>
        <i @click="ChangePlayStatus()">
          <svg-icon
            :icon-class="isPlaying ? 'pauseCircle' : 'playCircle'"
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
          title="下一首"
        ></svg-icon>

        <el-popover
          placement="bottom"
          width="150"
          trigger="click"
          class="popover_box"
        >
          <div class="block align-middle w-auto">
            <el-slider v-model="ValueVolume" vertical height="100px">
            </el-slider>
            <div style="height: 20px"></div>
            <i @click="ChangeMute()"
              ><svg-icon
                icon-class="mute"
                class="cursor-pointer"
                :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
                title="静音"
              ></svg-icon
            ></i>
          </div>
          <i slot="reference"
            ><svg-icon
              icon-class="vol"
              class="cursor-pointer"
              :class="!isPlayerPage ? 'foot_icon' : 'foot_player_icon'"
              title="音量"
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
        <h1 class="font_time">{{ NowTime }}</h1>
        <h1 class="font_time ml-3">/</h1>
        <h1 class="font_time ml-3">{{ TotalTime.DetailTime }}</h1>
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
export default {
  name: 'FooterMenu',
  props: [],
  mixins: [],
  data () {
    return {
      songDetail: null,
      loading: true,
      drawer: false,
      playStatu: false,
      muteStatu: false,
      TotalTime: {
        DetailTime: '00:00',
        CalcTime: 0
      },
      IsDragging: false,
      ValueVolume: 50,
      isLike: false,
      selectedIndex: null,
      level: 'standard',
      NowTime: '00:00',
      Seek: 0,
      // 计算播放时间
      CalcSeek: {
        Seek: {
          Id: null,
          Interval: 1000 / 10, // 每秒十次
          Hook: () => {
            if (!this.IsDragging) {
              this.Seek = this.howl.seek()
              this.$store.commit('ChangePlayTime', { PlayTime: this.Seek })
            }
            const s = parseInt(this.howl.seek())
            const m = parseInt(this.howl.seek() / 60)
            let ts = 0
            let tm = 0
            if (s < 10) {
              ts = '0' + s
            } else if (s >= 10 && s < 60) {
              ts = s
            } else {
              if (s % 60 < 10) {
                ts = '0' + (s % 60)
              } else {
                ts = s % 60
              }
            }
            if (m < 10) {
              tm = '0' + m
            } else {
              tm = m
            }
            this.NowTime = tm + ':' + ts
          }
        }
      }
    }
  },
  computed: {
    howl () {
      return this.$store.state.howl
    },
    playingId () {
      return this.$store.state.nowPlayingID
    },
    isPlaying () {
      return this.$store.state.isPlaying
    },
    isPlayerPage () {
      if (this.$route.path === '/player') {
        return true
      } else {
        return false
      }
    },
    IsLoaded () {
      return this.$store.state.IsLoaded
    },
    Progress () {
      if (this.TotalTime.CalcTime === 0) return 0
      return this.Seek / this.TotalTime.CalcTime
    }
  },
  watch: {
    playingId: {
      handler (newId, oldId) {
        // 播放新音乐时将旧howler清除
        if (this.howl) {
          this.howl.unload()
          this.Seek = 0
          console.log('暂停')
          this.$store.commit('ChangePlayState', { isPlaying: false })
        }
        this.$axios({
          method: 'GET',
          url: `http://localhost:3000/song/detail?ids=${newId}`
        }).then((response) => {
          this.songDetail = response.data.songs[0]
          this.TotalTime.DetailTime =
            (parseInt((this.songDetail.dt * 0.001) / 60) < 10
              ? '0' + parseInt((this.songDetail.dt * 0.001) / 60)
              : parseInt((this.songDetail.dt * 0.001) / 60)) +
            ':' +
            (parseInt((this.songDetail.dt * 0.001) % 60) < 10
              ? '0' + parseInt((this.songDetail.dt * 0.001) % 60)
              : parseInt((this.songDetail.dt * 0.001) % 60))
        })
        // 取得音乐链接
        this.$axios({
          method: 'GET',
          url: `http://localhost:3000/song/url/v1?id=${newId}&level=${this.level}`,
          withCredentials: true
        }).then((response) => {
          this.$store.commit('NewHowler', { url: response.data.data[0].url })
        })
      }
    },
    howl: {
      handler (n) {
        this.ChangePlayStatus()
      }
    },
    IsLoaded () {
      this.TotalTime.CalcTime = this.howl.duration()
    },
    isPlaying (playing) {
      // 播放时进度条调整
      if (playing) {
        this.CalcSeek.Seek.Id = setInterval(
          this.CalcSeek.Seek.Hook,
          this.CalcSeek.Seek.Interval
        )
      } else {
        clearInterval(this.CalcSeek.Seek.Id)
      }
    },
    ValueVolume (n) {
      if (this.howl) {
        this.$store.commit('ChangeVolume', { Volume: n * 0.01 })
        if (n) {
          this.howl.mute(false)
        }
        this.howl.volume(this.$store.state.Volume)
      }
    },
    songDetail (newValue, oldValue) {
      if (newValue) this.loading = false
    }
  },
  methods: {
    ChangePlayStatus () {
      if (this.howl) {
        if (this.isPlaying) {
          this.howl.pause()
          console.log('暂停')
          this.$store.commit('ChangePlayState', { isPlaying: false })
        } else {
          this.howl.play()
          console.log('播放')
          this.$store.commit('ChangePlayState', { isPlaying: true })
        }
      }
    },
    cleanHowler () {
      this.howl.stop()
      this.$store.commit('CleanHowler')
    },
    ToPlayerPage () {
      this.$router.push({
        path: '/player'
      })
    },
    mouseEnter (index) {
      this.selectedIndex = index
    },
    mouseLeave () {
      this.selectedIndex = null
    },
    Tolike () {
      this.isLike = !this.isLike
    },
    ChangeMute () {
      if (this.howl != null) {
        if (!this.muteStatu) {
          this.muteStatu = true
          this.howl.mute(true)
        } else {
          this.muteStatu = false
          this.howl.mute(false)
        }
      }
    },
    // 拖动进度条功能
    MouseListenerEvent (event) {
      document.body.style['user-select'] = 'none'
      const PbarObj = this.$refs.Pbar.getBoundingClientRect()
      this.IsDragging = true
      if (this.isPlayerPage) {
        this.Seek = (event.clientX / PbarObj.width) * this.TotalTime.CalcTime
      } else {
        this.Seek =
          ((event.clientX - 200) / PbarObj.width) * this.TotalTime.CalcTime
      }
    },
    ChangeSeekAction () {
      if (this.howl != null) {
        document.body.addEventListener('mousemove', this.MouseListenerEvent)
      }
    }
  },
  mounted () {
    const _this = this
    document.body.addEventListener('mouseup', function (e) {
      // 点击进度条后放开鼠标跳转进度功能
      if (_this.IsDragging) {
        const PbarObj = _this.$refs.Pbar.getBoundingClientRect()
        const PbarX = e.clientX
        if (_this.isPlayerPage) {
          _this.howl.seek((PbarX / PbarObj.width) * _this.TotalTime.CalcTime)
        } else {
          _this.howl.seek(
            ((PbarX - 200) / PbarObj.width) * _this.TotalTime.CalcTime
          )
        }
        document.body.style['user-select'] = 'text'
        document.body.removeEventListener(
          'mousemove',
          _this.MouseListenerEvent
        )
        _this.IsDragging = false
      }
    })
  },
  updated () {}
}
</script>

<style scoped>
.slider {
  top: -3px;
  left: 0px;
  height: 3px;
}
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
