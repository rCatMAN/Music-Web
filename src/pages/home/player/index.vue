<template>
  <div>
    <div
      class="absolute w-full h-full"
      style="height: 100vh; width: 100vw; overflow: hidden"
    >
      <div
        class="absolute w-full h-full"
        style="filter: blur(25px) brightness(0.35)"
      >
        <el-image
          style="width: 100%; height: 100%; transform: scale(1.09)"
          :src="url"
          fit="cover"
        ></el-image>
      </div>
      <div class="flex items-center absolute w-full" style="height: 62px">
        <i @click="back" class="relative" style="left: 8%">
          <svg-icon
            icon-class="arr_down"
            class="
              text-white
              cursor-pointer
              relative
              primary-color__hover
              transition-all
            "
            style="width: 33px; height: 33px"
          ></svg-icon>
        </i>
        <i class="relative" style="left: 87%"
          ><svg-icon
            icon-class="zoomin"
            class="
              text-white
              cursor-pointer
              relative
              primary-color__hover
              transition-all
            "
            style="width: 25px; height: 25px"
          ></svg-icon
        ></i>
      </div>

      <el-skeleton
        :loading="!songDetail"
        animated
        class="relative"
        style="top: 23%; left: 16%"
      >
        <template slot="template">
          <div class="flex w-full relative" style="min-width: 1550px">
            <div
              class="songPic z-10"
              style="
                width: 400px;
                height: 400px;
                top: 30px;
                margin-right: 250px;
              "
            >
              <el-skeleton-item
                variant="image"
                style="width: 400px; height: 400px"
              />
            </div>
            <div
              class="songInfo absolute"
              style="width: 400px; height: 450px; top: -20px; right: 35%"
            >
              <el-skeleton-item
                variant="text"
                class="text-center relative"
                style="top: -25px; left: 23%; width: 200px; height: 25px"
              />

              <div class="text-center relative">
                <el-skeleton-item
                  variant="h1"
                  class="text-center relative"
                  style="top: -15px; left: 45px; width: 100px; height: 18px"
                />

                <el-skeleton-item
                  variant="h1"
                  class="text-center relative"
                  style="top: 10px; right: 55px; width: 100px; height: 18px"
                />
              </div>
              <div
                class="lyric relative w-full text-center mt-4"
                style="height: 370px"
              >
                <el-skeleton-item
                  variant="h1"
                  class="text-center relative"
                  style="top: 10px"
                /><el-skeleton-item
                  variant="h1"
                  class="text-center relative mt-5"
                  style="top: 10px"
                /><el-skeleton-item
                  variant="h1"
                  class="text-center relative mt-5"
                  style="top: 10px"
                /><el-skeleton-item
                  variant="h1"
                  class="text-center relative mt-5"
                  style="top: 10px"
                /><el-skeleton-item
                  variant="h1"
                  class="text-center relative mt-5"
                  style="top: 10px"
                /><el-skeleton-item
                  variant="h1"
                  class="text-center relative mt-5"
                  style="top: 10px"
                />
                <el-skeleton-item
                  variant="h1"
                  class="text-center relative mt-5"
                  style="top: 10px"
                />
              </div>
            </div>
          </div>
        </template>
        <template>
          <div class="flex w-full relative" style="top: 23%; min-width: 1550px">
            <div
              v-if="songDetail"
              class="songPic z-10"
              style="
                width: 400px;
                height: 400px;
                top: 30px;
                margin-right: 250px;
              "
            >
              <el-image
                style="width: 400px; height: 400px"
                :src="url"
                fit="fill"
              ></el-image>
            </div>
            <div
              v-if="songDetail"
              class="songInfo absolute"
              style="width: 400px; height: 450px; top: -20px; right: 35%"
            >
              <div>
                <h1
                  class="text-center relative text-2xl text-white"
                  style="top: -25px"
                >
                  {{ songDetail.name }}
                </h1>
              </div>
              <div class="text-center relative text-gray-400">
                <div class="">
                  <span
                    v-for="item in songDetail.ar"
                    :key="item.id"
                    class="relative"
                    style="top: -15px"
                    >??????:{{ item.name }}</span
                  >
                </div>
                <div>
                  <span class="relative" style="top: -15px"
                    >??????:{{ songDetail.al.name }}</span
                  >
                </div>
              </div>
              <div
                class="lyric relative w-full overflow-hidden text-center mt-4"
                style="height: 370px"
              >
                <ScrollPicker
                  class="truncate"
                  v-if="lyric"
                  v-model="picker"
                  :dragSensitivity="0.5"
                  :touchSensitivity="0.5"
                  :scrollSensitivity="0.3"
                  :options="lyric"
                />
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import ScrollPicker from '@/components/scroll-picker/picker/picker'
export default {
  components: { ScrollPicker },
  name: 'player',
  mixins: [],
  data() {
    return {
      picker: null,
      loading: true,
      url: '',
      songDetail: null,
      lyric: null
    }
  },
  computed: {
    id() {
      return this.$store.state.nowPlayingID
    },
    // ??????????????????????????????
    PlayTime() {
      const time = this.$store.state.PlayTime
      if (time < 10) {
        return '00:0' + time.toFixed(1)
      } else if (time < 60) {
        return '00:' + time.toFixed(1)
      } else if (time > 60) {
        const m = time.toFixed(1) / 60
        const s = time.toFixed(1) % 60
        let ss
        if (s < 10) {
          ss = '0' + s.toFixed(1)
        } else {
          ss = s.toFixed(1)
        }
        return '0' + parseInt(m) + ':' + ss
      } else if ((time === 0)) {
        return '00:00'
      }
      return ''
    }
  },
  watch: {
    id: {
      handler(newId, oldId) {
        if (newId !== oldId) {
          console.log('id?????????', newId, oldId)
          this.lyric = null
          // ??????????????????????????????
          this.$axios({
            method: 'GET',
            url: `https://service-miegmo5o-1314215170.gz.apigw.tencentcs.com/release/song/detail?ids=${newId}`
          }).then((response) => {
            this.songDetail = response.data.songs[0]
            this.url = this.songDetail.al.picUrl
          })
          // ????????????????????????
          this.$axios({
            method: 'GET',
            url: `https://service-miegmo5o-1314215170.gz.apigw.tencentcs.com/release/lyric?id=${newId}`
          }).then((response) => {
            const array = []
            this.lyric = response.data.lrc.lyric.split('\n')
            this.lyric.forEach((data) => {
              const arr2 = data.split(']')
              const str = arr2[0].slice(1, 8)
              if (arr2[1] !== '') {
                array.push({ value: str, name: arr2[1] })
              }
            })
            this.lyric = array
            console.log('array: ', array)
          })
        }
      },

      immediate: true
    },
    // ????????????----------------------------------------
    PlayTime(n) {
      this.picker = n
    },
    // -----------------------------------------------
    songDetail(newValue, oldValue) {
      if (newValue != null) this.loading = false
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
</style>
