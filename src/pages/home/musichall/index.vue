<template>
  <div class="" style="margin-left: 3%; margin-top: 3%">
    <h2 class="text-3xl font-bold">音乐馆</h2>
    <div class="flex items-center justify-around relative" style="width: 700px">
      <div
        class="relative mt-7 mb-7"
        v-for="(item, index) in musicHallMenu"
        :key="index"
      >
        <p @click="changeSelected(index, item.id)" class="cursor-pointer Menu">
          {{ item.title }}
        </p>
      </div>
      <div class="selectedMenu absolute" :style="{ left: selectLeft }"></div>
    </div>
    <transition name="el-zoom-in-center">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'musichall',
  data () {
    return {
      musicHallMenu: [
        { id: '/musichall/choiceness', title: '精选' },
        { id: '/musichall/voiceradio', title: '有声电台' },
        { id: '/musichall/leaderboard', title: '排行' },
        { id: '/musichall/singer', title: '歌手' },
        { id: '/musichall/songclassify', title: '分类歌单' },
        { id: '/musichall/digitalalbum', title: '数字专辑' },
        { id: '/musichall/phoneexclusive', title: '手机专享' }
      ],
      selectIndex: 0,
      selectLeft: '25px'
    }
  },
  watch: {
    selectIndex (n) {
      switch (n) {
        case 0:
          this.selectLeft = '25px'
          break
        case 1:
          this.selectLeft = '125px'
          break
        case 2:
          this.selectLeft = '221px'
          break
        case 3:
          this.selectLeft = '303px'
          break
        case 4:
          this.selectLeft = '400px'
          break
        case 5:
          this.selectLeft = '515px'
          break
        case 6:
          this.selectLeft = '629px'
          break
      }
    }
  },
  methods: {
    changeSelected (index, id) {
      this.selectIndex = index
      this.$router.push({
        path: id
      })
    }
  }
}
</script>

<style scoped>
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
