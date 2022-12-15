<template>
  <div>
    <el-carousel trigger="click" :interval="6000" type="card" height="200px">
      <el-carousel-item v-for="em in elimage" :key="em.title">
        <h3 class="medium">
          <div class="demo-image">
            <router-link
              :to="{
                path: '/playlist/list',
                query: {
                  topInfo: em,
                },
              }"
            >
              <el-image
                style="width: 620px; height: 200px"
                :src="em.src"
                fit="fill"
              >
              </el-image>
            </router-link>
          </div>
        </h3>
      </el-carousel-item>
    </el-carousel>
    <HorizontalList
      :Title="OfficialSongTtitle"
      :SubTitle="OfficialSongSubtitle"
      :HL="HL"
    />
    <HorizontalList :Title="recommendRadio" :HL="mvsrc" />
    <HorizontalList :Title="newdisc" :HL="ndsrc" />
    <div class="space1"></div>
  </div>
</template>

<script>
import HorizontalList from "@/components/HorizontalList.vue";

export default {
  data() {
    return {
      elimage: [
        {
          title: "米津玄师动画电锯人片头曲",
          src: "http://y.qq.com/music/common/upload/MUSIC_FOCUS/4468419.jpg?max_age=2592000",
          subtitle: "",
        },
        {
          tilte: "micon全新数字专辑",
          src: "//y.qq.com/music/common/upload/MUSIC_FOCUS/4469500.jpg?max_age=2592000",
          subtitle: "",
        },
        {
          title: "陈学冬全新专辑《溯·光》正式上线",
          src: "//y.qq.com/music/common/upload/MUSIC_FOCUS/4467702.jpg?max_age=2592000",
          subtitle: "",
        },
        {
          title: "ikon君的声",
          src: "//y.qq.com/music/common/upload/MUSIC_FOCUS/4469288.jpg?max_age=2592000",
          subtitle: "",
        },
      ],
      OfficialSongTtitle: "官方歌单",
      OfficialSongSubtitle: "官方精选歌单",
      HL: [
        {
          src: "//qpic.y.qq.com/music_cover/UROl51JnIAk9Ipxmv4b86p2XypfBWg9b4Iye05cvocqqRGerh6nhyA/300?n=1",
          title: "「中国风纯音」倚栏听风，如梦如醉",
          singer: "播放量:294.8万",
          subtitle:
            "当国风大行其道，火遍全网的今天，你是否，能够真真正正的品味到那些充满中国的韵味曲调？今天让我们一起来鉴赏品味，那些优美的国风纯音，如痴如醉，大梦初醒的美感。",
        },
        {
          src: "//qpic.y.qq.com/music_cover/Z7haT1p6eeic63oTvdlNb7xoHMYjBDlQict0ccSicdRpgLTicqoLHqtf9g/300?n=1",
          title: "全民K歌翻唱热歌榜盘点",
          singer: "播放量:3.9亿",
          subtitle:
            "本歌单精选一年来全民K歌上过榜的百首热门翻唱歌曲，带你了解近日流行趋势，回忆往昔旋律，细数乐坛上激起的层层巨浪，邀你来听那些循环了无数遍的声音",
        },
        {
          src: "//qpic.y.qq.com/music_cover/BpSXicibROAqDTsNP7wS16cr3dS8qsWRDEV3mXP3eib4nQun1mZXiafahg/300?n=1",
          title: "优质翻唱♪心动久了自然会沦陷",
          singer: "播放量:221.8万",
          subtitle: "此歌曲为没有填词的纯音乐，请您欣赏",
        },
        {
          src: "//qpic.y.qq.com/music_cover/FZN9m5MCZXiaJfw00k0CyQmmibo80oNRCHrOPbYibTjYw9rHHy4lqk86A/300?n=1",
          title: "脸红警告·宝藏rapper的撩人情话",
          singer: "播放量:1255.5万",
          subtitle:
            "夏目漱石说的:  今晚月色真美 风也温柔   意思是:  我喜欢你 我也是. 超甜的情话你学会了吗（*˘︶˘*）.。.:*♡",
        },
        {
          src: "//qpic.y.qq.com/music_cover/cpM9UGMv7jGHdOR7vCoMEQWcw4KH7f0pMuVhqibKC5Bwiabh3ialTNwfg/300?n=1",
          title: "『翻唱片段』藏进我的温柔乡",
          singer: "播放量:1286.5万",
          subtitle:
            "喜欢一个人呆着 呆在没人找得到的地方 静静地做自己喜欢的事情 比如听几首歌 等时间一到，就回家",
        },
      ],
      recommendRadio: "精选MV",
      mvsrc: [
        {
          src: "//y.qq.com/music/photo_new/T015R640x360M102001VmAzy1z8o0n.jpg?max_age=2592000",
          title: "《时之奇旅（妲己-时之奇旅合作推广曲）》",
          singer: "花澤香菜",
          subtitle: "",
        },
        {
          src: "//y.qq.com/music/photo_new/T015R640x360M101002zVMnC3OgUIh.jpg?max_age=2592000",
          title: "《归途有风（《万里归途》电影主题曲）》",
          singer: "王菲",
          subtitle: "",
        },
        {
          src: "//y.qq.com/music/photo_new/T015R640x360M102002tjb6J2vndD2.jpg?max_age=2592000",
          title: "《불이나》",
          singer: "EXID",
          subtitle: "",
        },
        {
          src: "//y.qq.com/music/photo_new/T015R640x360M000002q6UbE2G72Ij.jpg?max_age=2592000",
          title: "《Celestial》",
          singer: "Ed Sheeran",
          subtitle: "",
        },
        {
          src: "//y.qq.com/music/photo_new/T015R640x360M101001EnV4z1OpVS8.jpg?max_age=2592000",
          title: "《美美（中国动画百年纪念曲MV）》",
          singer: "周深",
          subtitle: "",
        },
      ],
      newdisc: "新碟首发",
      ndsrc: [
        {
          src: "//y.qq.com/music/photo_new/T002R300x300M000002DmQ384WPmHR.jpg?max_age=2592000",
          title: "我听见我的___里刮起一阵狂风",
          singer: "田洪杰",
        },
        {
          src: "//y.qq.com/music/photo_new/T002R300x300M000003whDdw0ROBvX.jpg?max_age=2592000",
          title: "路过年华",
          singer: "一颗小葱/小丝",
        },
        {
          src: "//y.qq.com/music/photo_new/T002R300x300M00000312e2x3iQfJa.jpg?max_age=2592000",
          title: "浮游",
          singer: "San塔/汐音社",
        },
        {
          src: "//y.qq.com/music/photo_new/T002R300x300M000000uaf6X2sBmEY.jpg?max_age=2592000",
          title: "Nobody Calling",
          singer: "江映蓉",
        },
        {
          src: "//y.qq.com/music/photo_new/T002R300x300M0000009JXBS3sOeR3.jpg?max_age=2592000",
          title: "求饶",
          singer: "袁小葳",
        },
      ],
    };
  },
  components: { HorizontalList },
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