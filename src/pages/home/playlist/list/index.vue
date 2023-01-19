<template>
  <div>
    <table v-if="playListSong" class="songTable mb-32">
      <tr class="h-10 text-xs text-gray-500 font-thin">
        <th class="songList">歌曲</th>
        <th class="otherList">歌手</th>
        <th class="otherList">专辑</th>
        <th class="timeList">时长</th>
      </tr>
      <tr
        v-for="(item, index) in playListSong"
        :key="index"
        class="h-14 text-sm songTr"
      >
        <td class="min-w-max songList">
          <span
            @click="toSongPage(item.id)"
            class="textList inline whitespace-nowrap"
            >{{ item.name }}</span
          >
        </td>
        <td class="otherList truncate">
          <span
            @click="toSingerPage(itemm.id)"
            v-for="(itemm, indexx) in item.ar"
            :key="indexx"
            class="textList"
            >{{ itemm.name }}</span
          >
        </td>
        <td class="timeList truncate">
          <span class="textList">{{ item.al.name }}</span>
        </td>
        <td><span>3:29</span></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      playListSong: null
    }
  },
  methods: {

    toSongPage(id) {
      this.$router.push({
        path: '/songdetail',
        query: {
          id
        }
      })
    },
    toSingerPage(id) {
      this.$router.push({
        path: '/singerdetail/choiceness',
        query: {
          id
        }
      })
    }
  },
  mounted() {
    // 获取歌单中歌曲信息
    this.$axios({
      method: 'GET',
      url: `https://service-miegmo5o-1314215170.gz.apigw.tencentcs.com/release/playlist/track/all?id=${this.id}`
    }).then((response) => {
      console.log('response: ', response)
      this.playListSong = response.data.songs
    })
  }
}
</script>

<style lang="scss" scoped>
.songTable {
  width: 95%;
}
.songList {
  width: 50%;
  min-width: max-content;
}
.otherList {
  width: 250px;
  min-width: 85px;
  max-width: 250px;
}
.timeList{
  width: 80px;
  min-width: 80px;
  max-width: 80px;
}
.songTr:hover {
  background: rgba(107, 114, 128, 0.06);
}
.textList:hover {
  cursor: pointer;
  color: var(--primary-color);
}
</style>
