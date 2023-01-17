<template>
  <div class="ml-1" style="margin-left: 7%; margin-top: 60px">
    <div class="flex w-full" style="min-width: 960px">
      <div class="demo-image">
        <el-image
          style="
            width: 250px;
            height: 250px;
            border-radius: 15px;
            box-shadow: rgb(107 114 128) 0 10px 40px -5px;
          "
          :src="url"
          fit="fill"
        >
          <div
            style="width: 250px; height: 250px"
            slot="placeholder"
            class="text-center image-slot"
          >
            <span style="height: 125px">加载中</span>
            <span style="height: 125px" class="dot">...</span>
          </div></el-image
        >
      </div>
      <div style="margin-left: 3%">
        <p class="mt-2 font-medium text-3xl">{{ title }}</p>
        <div
          class="mt-5 w-max flex content-center items-center"
          v-if="songDetail"
        >
          <img class="w-5 h-5 mr-2" src="../../../assets/singer.png" />
          <span
            @click="toSingerPage(item.id)"
            class="topinfo cursor-pointer"
            v-for="item in songDetail.ar"
            :key="item.id"
            >{{ item.name }}</span
          >
        </div>
        <div class="mt-5 flex flex-wrap justify-between" style="width: 450px">
          <p class="w-1/2 text-sm leading-7 truncate">
            专辑:&nbsp;&nbsp;<span class="topinfo cursor-pointer">{{
              album
            }}</span>
          </p>
          <p class="w-1/2 text-sm leading-7 truncate">
            语种:&nbsp;&nbsp;<span>22</span>
          </p>
          <p class="w-1/2 text-sm leading-7 truncate">
            流派:&nbsp;&nbsp;<span>22</span>
          </p>
          <p class="w-1/2 text-sm leading-7 truncate">
            唱片公司:&nbsp;&nbsp;<span>22</span>
          </p>
          <p class="w-1/2 text-sm leading-7 truncate">
            发行时间:&nbsp;&nbsp;<span>22</span>
          </p>
          <p class="w-1/2 text-sm leading-7 truncate">
            时长:&nbsp;&nbsp;<span>{{ min }}:{{ sec }}</span>
          </p>
        </div>
        <div class="flex w-full mt-5" style="max-height: max-content">
          <div
            @click="PlaySongTo"
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
        </div>
      </div>
    </div>
    <div class="mt-10">
      <p class="text-xl mb-5">歌词</p>
      <div class="flex w-full min-w-max">
        <div v-if="lyric" class="w-9/12 min-w-max mb-28 flex flex-col" style="">
          <span
            class="text-sm leading-8"
            v-for="(item, index) in lyric"
            :key="index"
            v-show="index <= ifShowNum ? 1 : 0"
            >{{ item.ly }}</span
          >
          <p
            @click="isShowLy"
            class="mt-4 mb-24 max-w-max cursor-pointer primary-color"
          >
            {{ ifShowWord }}
          </p>
          <div
            class="min-w-max mb-20"
            style="min-height: max-content; width: 90%"
          >
            <div class="w-full min-w-max">
              <span class="mr-5 font-medium text-2xl">评论</span>
              <span class="font-light text-sm text-gray-400"
                >共有{{ commentsTotal }}条评论</span
              >
            </div>
            <el-input
              id="comments"
              class="mt-5"
              type="textarea"
              :rows="4"
              placeholder="请说说你的看法吧"
              maxlength="300"
              v-model="textarea"
            >
            </el-input>
            <label
              class="relative font-light text-sm text-gray-400"
              style="bottom: 30%; left: 84%"
              for="comments"
              >剩余<label style="color: var(--primary-color)" for="comments">{{
                textLeft
              }}</label
              >字</label
            >
            <el-button
              class="relative"
              style="margin-top: 23px; left: 73%"
              size="small"
              type="success"
              >发表评论</el-button
            >
          </div>
          <div class="hot mb-5" style="width: 90%; min-height: max-content">
            <p class="font-medium mb-5">近期热评</p>
            <div
              v-for="item in hotComments"
              :key="item.commentId"
              style="width: 100%; min-height: max-content"
            >
              <hr />
              <div class="flex mt-5" style="width: 100%">
                <el-avatar class="mr-5" :src="item.user.avatarUrl"></el-avatar>
                <div class="" style="width: 100%; min-height: max-content">
                  <p
                    class="
                      mt-1
                      primary-color__hover
                      font-light
                      text-sm text-gray-400
                      max-w-max
                    "
                  >
                    {{ item.user.nickname }}
                  </p>
                  <p
                    class="
                      mt-1
                      primary-color__hover
                      font-light
                      text-xs text-gray-400
                      max-w-max
                    "
                  >
                    {{ item.timeStr }}
                  </p>
                  <p
                    class="mt-4"
                    style="
                      min-height: max-content;
                      width: 100%;
                      max-width: 600px;
                    "
                  >
                    <span
                      class="max-w-max text-sm"
                      style="max-height: max-content"
                      >{{ item.content }}</span
                    >
                  </p>
                  <div
                    class="
                      w-full
                      flex
                      items-center
                      mt-3
                      font-light
                      text-sm text-gray-400
                      max-w-max
                    "
                    style="min-height: max-content"
                  >
                    <i class="mr-1" style="width: 17px"
                      ><img src="../../../assets/good.png"
                    /></i>
                    <span class="primary-color__hover mr-5">{{
                      item.likedCount
                    }}</span
                    ><span class="primary-color__hover">回复</span>
                  </div>

                  <div
                    class="w-full mt-4 mb-10"
                    style="min-height: max-content"
                  >
                    <p
                      v-for="itemm in item.beReplied"
                      :key="itemm.beRepliedCommentId"
                      style="width: 100%; max-width: 600px"
                    >
                      <span
                        class="max-w-max text-sm mb-5"
                        style="
                          max-height: max-content;
                          color: var(--primary-color);
                        "
                        >{{ itemm.user.nickname }} :</span
                      >
                      <span
                        class="max-w-max text-sm"
                        style="max-height: max-content"
                      >
                        {{ itemm.content }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="new" style="width: 90%; min-height: max-content">
            <p class="font-medium mb-5">最新评论</p>
            <div
              v-for="item in comments"
              :key="item.commentId"
              style="width: 100%; min-height: max-content"
            >
              <hr />
              <div class="flex mt-5" style="width: 100%">
                <el-avatar class="mr-5" :src="item.user.avatarUrl"></el-avatar>
                <div class="" style="width: 100%; min-height: max-content">
                  <p
                    class="
                      mt-1
                      primary-color__hover
                      font-light
                      text-sm text-gray-400
                      max-w-max
                    "
                  >
                    {{ item.user.nickname }}
                  </p>
                  <p
                    class="
                      mt-1
                      primary-color__hover
                      font-light
                      text-xs text-gray-400
                      max-w-max
                    "
                  >
                    {{ item.timeStr }}
                  </p>
                  <p
                    class="mt-4"
                    style="
                      min-height: max-content;
                      width: 100%;
                      max-width: 600px;
                    "
                  >
                    <span
                      class="max-w-max text-sm"
                      style="max-height: max-content"
                      >{{ item.content }}</span
                    >
                  </p>
                  <div
                    class="
                      w-full
                      flex
                      items-center
                      mt-3
                      font-light
                      text-sm text-gray-400
                      max-w-max
                    "
                    style="min-height: max-content"
                  >
                    <i class="mr-1" style="width: 17px"
                      ><img src="@/assets/down.png"
                    /></i>
                    <span class="primary-color__hover mr-5">{{
                      item.likedCount
                    }}</span
                    ><span class="primary-color__hover">回复</span>
                  </div>

                  <div
                    class="w-full mt-4 mb-10"
                    style="min-height: max-content"
                  >
                    <div
                      v-for="itemm in item.beReplied"
                      :key="itemm.beRepliedCommentId"
                      style="
                        width: 100%;
                        max-width: 600px;
                        background-color: #d1d5db59;
                      "
                    >
                      <div
                        class=""
                        style="
                          padding-bottom: 20px;
                          padding-top: 20px;
                          padding-left: 15px;
                          padding-right: 15px;
                        "
                      >
                        <span
                          class="max-w-max text-sm"
                          style="
                            max-height: max-content;
                            color: var(--primary-color);
                          "
                          >{{ itemm.user.nickname }} :</span
                        >
                        <p
                          class="max-w-max text-sm inline mb-10"
                          style="max-height: max-content"
                        >
                          {{ itemm.content }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="min-w-max" style="height: 1000px; width: 34%">
          <p v-if="simiPlayList" class="text-black text-xl mb-3">相似歌单</p>
          <div
            v-if="simiPlayList"
            class="w-full flex mb-8"
            style="max-height: max-content"
          >
            <div
              v-for="item in simiPlayList"
              :key="item.id"
              class=""
              style="padding-right: 20px"
            >
              <el-image
                class="mb-3 primary-pic-scale"
                style="width: 80px; height: 80px"
                :src="item.coverImgUrl"
                fit="fill"
              ></el-image>
              <div class="mb-2 max-w-full" style="max-height: max-content">
                <p
                  class="
                    leading-5
                    text-sm
                    overflow-hidden
                    primary-color__hover
                    cursor-pointer
                  "
                  style="max-height: 40px; max-width: 80px"
                >
                  {{ item.name }}
                </p>
              </div>
              <div style="max-height: max-content">
                <p
                  class="
                    primary-color__hover
                    text-sm text-gray-400
                    cursor-default
                  "
                  style="max-height: max-content; max-width: 80px"
                >
                  {{ item.creator.nickname }}
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="mvDetail"
            class="w-full mb-3"
            style="max-height: max-content"
          >
            <p class="text-black text-xl mb-3">相关MV</p>
            <el-image
              class="primary-pic-scale"
              style="width: 280px; height: 165px"
              :src="mvDetail.cover"
              fit="fill"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      simiPlayList: null,
      commentsTotal: null,
      songDetail: null,
      comments: null,
      hotComments: null,
      mvDetail: null,
      url: '',
      id: this.$route.query.id,
      title: '',
      album: '',
      mvid: '',
      singer: '',
      singer2: '',
      min: '',
      sec: '',
      ifShowNum: 13,
      ifShowWord: '[展开]',
      lyric: null,
      textarea: '',
      textLeft: 300,
      circleUrl: ''
    }
  },
  mounted() {
    // 获取单曲信息
    this.$axios({
      method: 'GET',
      url: `http://localhost:3000/song/detail?ids=${this.id}`
    }).then((response) => {
      this.songDetail = response.data.songs[0]
      this.title = this.songDetail.name
      this.url = this.songDetail.al.picUrl
      this.album = this.songDetail.al.name
      this.mvid = this.songDetail.mv
      this.min = parseInt((this.songDetail.dt * 0.001) / 60)
      this.sec = parseInt((this.songDetail.dt * 0.001) % 60)
      // 相关mv
      if (this.mvid) {
        this.$axios({
          method: 'GET',
          url: `http://localhost:3000/mv/detail?mvid=${this.mvid}`
        }).then((response) => {
          this.mvDetail = response.data.data
        })
      }
    })
    // 获取单曲歌词信息
    this.$axios({
      method: 'GET',
      url: `http://localhost:3000/lyric?id=${this.id}`
    }).then((response) => {
      const array = []
      this.lyric = response.data.lrc.lyric.split('\n')
      this.lyric.forEach((data) => {
        const arr1 = data.split(']')
        array.push({ time: arr1[0] + ']', ly: arr1[1] })
      })
      this.lyric = array
    })
    // 获取单曲评论信息
    this.$axios({
      method: 'GET',
      url: `http://localhost:3000/comment/music?id=${this.id}`
    }).then((response) => {
      // console.log("评论信息", response);
      this.comments = response.data.comments
      this.hotComments = response.data.hotComments
      this.commentsTotal = response.data.total
    })
    // 获取相似歌单信息
    this.$axios({
      method: 'GET',
      url: `http://localhost:3000/simi/playlist?id=${this.id}`
    }).then((response) => {
      this.simiPlayList = response.data.playlists
    })
  },
  methods: {
    isShowLy() {
      if (this.ifShowNum === 1000) {
        this.ifShowNum = 13
        this.ifShowWord = '[展开]'
      } else {
        this.ifShowNum = 1000
        this.ifShowWord = '[收起]'
      }
    },
    PlaySongTo() {
      this.$router.push({
        path: '/player'
      })
      this.$store.commit('ChangePlaySongId', { id: this.id })
    },
    toSingerPage(id) {
      this.$router.push({
        path: '/singerdetail/choiceness',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped>
.topinfo {
  font-weight: 400;
  font-size: 14px;
}
.topinfo:hover {
  color: var(--primary-color);
}
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
