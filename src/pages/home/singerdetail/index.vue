<template>
  <div class="ml-10 mt-10 mr-10 relative">
    <div v-if="singerDetailList" class="flex ml-5">
      <div>
        <el-image style="
          min-width: 250px;
          width: 250px;
          height: 250px;
          border-radius: 1500px;
          box-shadow: rgb(107 114 128) 0 10px 40px -5px;" :src="singerDetailList.cover" fit="cover">
        </el-image>
      </div>
      <div class="singerDetailBox ml-10 mt-5" style="width:70%">
        <p class="text-3xl font-bold">{{ singerDetailList.name }}</p>
        <div class="mt-8 grayText truncate w-11/12">
          <span>{{
            singerDetailList.briefDesc
          }}</span>
        </div>
        <div class="mt-8 grayText flex items-center ">
          <span>粉丝数:</span>
          <h1 class="ml-2">{{ singerFans }}</h1>
        </div>
        <div class="flex mt-8">
          <customButton iconClass="like" content="关注" />
          <customButton class="ml-8" iconClass="radio" content="歌手电台" />
        </div>
      </div>
    </div>
    <routerMenu class="mt-10" :content="listMenu" :id="id" />
    <transition name="el-zoom-in-center">
      <router-view class="mt-8"></router-view>
    </transition>
  </div>
</template>

<script>
import routerMenu from '@/components/routerMenu'
export default {
  components: { routerMenu },
  data() {
    return {
      id: this.$route.query.id,
      singerDetailList: null,
      singerFans: null,
      listMenu: [
        { path: '/singerdetail/choiceness', title: '精选' },
        { path: '/singerdetail/songs', title: '歌曲' },
        { path: '/singerdetail/album', title: '专辑' },
        { path: '/singerdetail/videos', title: '视频' },
        { path: '/singerdetail/detail', title: '详情' }
      ]
    }
  },
  methods: {
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
    // 获取歌手详情
    this.$axios({
      method: 'GET',
      url: `https://service-miegmo5o-1314215170.gz.apigw.tencentcs.com/release/artist/detail?id=${this.id}`
    }).then((response) => {
      this.singerDetailList = response.data.data.artist
    })
    // 获取歌手粉丝
    this.$axios({
      method: 'GET',
      url: `https://service-miegmo5o-1314215170.gz.apigw.tencentcs.com/release/artist/follow/count?id=${this.id}`
    }).then((response) => {
      this.singerFans = response.data.data.fansCnt
    })
  }
}
</script>

<style scoped>
.Menu:hover {
  color: var(--primary-color);
}
</style>
