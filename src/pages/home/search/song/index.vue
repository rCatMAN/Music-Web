<template>
  <table class="mt-10 mr-auto ml-auto mb-20 max-w-4xl" style="width: 800px">
    <tr class="h-12">
      <th class="font-normal text-sm" style="color: rgb(168 162 158)">歌名</th>
      <th class="font-normal text-sm" style="color: rgb(168 162 158)">歌手</th>
      <th class="font-normal text-sm" style="color: rgb(168 162 158)">专辑</th>
      <th class="font-normal text-sm" style="color: rgb(168 162 158)">时长</th>
    </tr>
    <tr
      v-for="(item, index) in tableData"
      :key="index"
      class="h-12"
      :style="{
        width: '800px',
        background:
          index % 2 === 0 ? 'rgba(156,163,175,0.05)' : 'rgb(255,255,255)',
      }"
    >
      <td class="search_list truncate" style="max-width: 200px; width: 200px">
        <span @click="PushTo(item.id)" class="cursor-pointer">{{
          item.name
        }}</span>
      </td>
      <td class="truncate" style="max-width: 200px; width: 200px">
        <span
        @click="pushToSinerPage(itemm.id)"
          class="search_list cursor-pointer"
          v-for="(itemm, indexx) in item.artists"
          :key="indexx"
          >{{ itemm.name }}</span
        >
      </td>
      <td class="search_list truncate" style="max-width: 300px; width: 300px">
        <span class="search_list cursor-pointer">{{ item.album.name }}</span>
      </td>
      <td class="search_list" style="width: 250px">
        <span class="cursor-default"
          >{{ parseInt((item.duration * 0.001) / 60) }}:{{
            parseInt((item.duration * 0.001) % 60)
          }}</span
        >
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  data () {
    return {
      keywords: this.$route.query.keywords,
      tableData: null
    }
  },
  methods: {
    PushTo (id) {
      this.$router.push({
        path: '/songdetail',
        query: {
          id
        }
      })
    },
    pushToSinerPage (id) {
      this.$router.push({
        path: '/singerdetail/choiceness',
        query: {
          id
        }
      })
    }
  },
  mounted () {
    this.$axios({
      method: 'GET',
      url: `http://localhost:3000/search?keywords=${this.keywords}&offset=0&limit=20&type=1`
    }).then((response) => {
      console.log('搜索信息', response.data.result.songs)
      this.tableData = response.data.result.songs
    })
  }
}
</script>

<style>
.search_list {
  font-weight: 400;
  font-size: 14px;
}
.search_list:hover {
  color: var(--primary-color);
}
</style>
