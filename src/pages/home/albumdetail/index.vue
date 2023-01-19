<template>
  <div style="margin-left: 50px; margin-top: 40px">
    <div v-if="albumDetail" class="top_box flex" style="min-width: 800px">
      <el-image
        style="
          min-width: 250px;
          width: 250px;
          height: 250px;
          border-radius: 15px;
          box-shadow: rgb(107 114 128) 0 10px 40px -5px;
        "
        :src="albumDetail.picUrl"
        fit="fill"
      >
      </el-image>
      <div class="top_menu mt-3" style="width: 700px; margin-left: 3%">
        <span class="text-4xl font-semibold">{{ albumDetail.name }}</span>
        <div class="flex items-center mt-6">
          <el-avatar
            size="small"
            :src="albumDetail.artist.img1v1Url"
          ></el-avatar>
          <span class="ml-3 text-sm">{{
            albumDetail.artist.name
          }}</span>
          <div class="ml-10">
            <span
              v-for="(item, index) in albumDetail.type"
              :key="index"
              class="ml-4 text-xs text-gray-500"
              >#{{ item }}</span
            >
          </div>
        </div>
        <div class="mt-5 text-xs text-gray-500 truncate" style="width: 650px">
          <span>{{ albumDetail.description }}</span>
        </div>
        <div class="button-box mt-10 flex" style="width: 400px">
          <div
            class="relative SvgIconBox cursor-pointer"
            style="width: 110px; height: 32px"
          >
            <svg-icon
              icon-class="playCircle"
              class="absolute left-1/2 top-1/2"
              style="
                width: 20px;
                height: 20px;
                transform: translate3d(-50%, -50%, 0);
              "
            ></svg-icon>
          </div>
          <div
            @click="toLike"
            class="relative SvgIconBox cursor-pointer ml-8"
            style="width: 110px; height: 32px"
          >
            <svg-icon
              :icon-class="this.isLiked ? 'liked' : 'like'"
              class="absolute left-1/2 top-1/2"
              style="
                width: 20px;
                height: 20px;
                transform: translate3d(-50%, -50%, 0);
              "
              :style="{
                color: this.isLiked ? '#ff9a9e' : '',
              }"
            ></svg-icon>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-around relative mt-8"
      style="width: 250px"
    >
      <div
        @click="changeSelected(index, item.path)"
        class="relative mt-7 mb-7 Menu cursor-pointer"
        v-for="(item, index) in listMenu"
        :key="index"
      >
        <span>
          {{ item.title }}
        </span>

      </div>
      <div class="selectedMenu absolute" :style="{ left: selectLeft }"></div>
    </div>
    <transition name="el-zoom-in-center">
      <router-view class=""></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  components: { },
  data() {
    return {
      isLiked: 0,
      selectLeft: '47.5px',
      id: this.$route.query.id,
      picUrl: null,
      listMenu: [
        { path: '/playlist/list', title: '歌曲' },
        { path: '/playlist/comments', title: '评论' }
      ],
      albumDetail: null
    }
  },
  computed: {
    selectIndex() {
      if (this.$route.path === '/albumdetail/comments') {
        return 1
      } else if (this.$route.path === '/albumdetail/list') {
        return 0
      }
      return null
    }
  },
  props: [],
  watch: {
    selectIndex: {
      handler(n) {
        switch (n) {
          case 0:
            this.selectLeft = '47.5px'
            break
          case 1:
            this.selectLeft = '172px'
            break
        }
      },
      immediate: true
    }
  },
  methods: {
    toLike() {
      this.isLiked = !this.isLiked
      console.log('this.isLiked: ', this.isLiked)
    },
    changeSelected(index, path) {
      this.$router.push({
        path,
        query: {
          id: this.id
        }
      })
    }
  },
  mounted() {
    // 获取歌单信息
    this.$axios({
      method: 'GET',
      url: `https://service-miegmo5o-1314215170.gz.apigw.tencentcs.com/release/album?id=${this.id}`
    }).then((response) => {
      console.log('专辑信息: ', response)
      this.albumDetail = response.data.album
    })
  }
}
</script>

<style scoped>
.SvgIconBox {
  user-select: none;
  background-color: #84fab0;
  color: white;
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  border-radius: 50px;
  box-shadow: rgb(107, 114, 128) 0 10px 20px -10px;
}
.SvgIconBox:hover {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  color: #ff9a9e;
  box-shadow: none;
  background-color: #84fab0;
}
.SvgIconBox:active{
  transform: scale(0.86);
}
.Menu:hover {
  color: var(--primary-color);
}
.selectedMenu {
  transition: all 0.3s ease-in-out;
  bottom: 10px;
  height: 3px;
  width: 30px;
  border-radius: 50px;
  background-color: var(--primary-color);
}
</style>
