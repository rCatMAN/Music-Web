<template>
  <div class="" style="width: 95%">
    <div class="relative">
      <el-input
        id="comments"
        class="mt-5"
        type="textarea"
        :rows="4"
        placeholder="期待你的神评论"
        maxlength="300"
        v-model="textarea"
      >
      </el-input>
      <div
        class="absolute SvgIconBox cursor-pointer mt-8"
        style="width: 110px; height: 32px; right: 5%"
      >
        <div class="relative w-full h-full">
          <span
            style="
              top: 50%;
              left: 50%;
              position: absolute;
              transform: translate3d(-50%, -50%, 0);
              width: max-content;
            "
            >发表评论</span
          >
        </div>
      </div>

      <div v-if="hotCommentList" class="w-full mt-20">
        <p class="text-xl">精彩评论</p>
        <div
          v-for="(item, index) in hotCommentList"
          :key="index"
          class="flex mt-8"
          style="padding: 20px; border-radius: 40px"
          :style="{
            'background-color':
              index % 2 === 0 ? 'rgba(107, 114, 128,0.07)' : '',
          }"
        >
          <el-avatar size="large" :src="item.user.avatarUrl"></el-avatar>
          <div class="ml-6">
            <p class="grayText">{{ item.user.nickname }}</p>
            <p class="grayText">{{ item.timeStr }}</p>
            <div class="mt-4 mb-4">
              <span class="contentText">{{ item.content }}</span>
            </div>
            <div class="flex items-center">
              <svg-icon
                icon-class="like"
                class=""
                style="
                width: 20px;
                height: 20px;
                t
              "
              ></svg-icon>
              <span class="ml-1 grayText">{{ item.likedCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="allCommentList" class="w-full mt-20"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      hotCommentList: null,
      allCommentList: null,
      textarea: ''
    }
  },
  mounted() {
    // 获取歌单中评论信息
    this.$axios({
      method: 'GET',
      url: `https://service-miegmo5o-1314215170.gz.apigw.tencentcs.com/release/comment/playlist?id=${this.id}`
    }).then((response) => {
      console.log('歌单评论信息: ', response)
      this.hotCommentList = response.data.hotComments
      this.allCommentList = response.data.comments
    })
  }
}
</script>

<style lang="scss" scoped>
.SvgIconBox {
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
  color: black;
  box-shadow: none;
  background-color: #84fab0;
}
</style>
