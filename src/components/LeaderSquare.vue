<template>
  <div
    class="flex flex-row justify-between mr-auto ml-auto mt-6 mb-14"
    style="max-width: 90%; min-width: 90%; max-height: 125px"
  >
    <div
      class="flex cursor-pointer relative"
      v-for="(item, index) in menulist"
      :key="item.number"
      @mouseleave="mouseLeave"
      @mouseenter="mouseEnter(index)"
      :style="{
        transition:
          selectedIndex === index
            ? 'all 0.3s cubic-bezier(.0,-0.0,.22,2.55)'
            : 'all 0.2.5s cubic-bezier(.0,-0.0,.22,2.55)',
        top: selectedIndex === index ? '-10px' : '0',
        width: '296px',
      }"
    >
      <div
        class="bg-black opacity-5 rounded-2xl"
        style="height: 125px; width: 280px; position: absolute; left: 16px"
      ></div>
      <div class="demo-image">
        <el-image
          class="rounded-2xl"
          style="width: 125px; height: 125px"
          :src="imgUrl"
          fit="fill"
        ></el-image>
      </div>
      <i
        @mouseenter="mouseEnter(index)"
        class="mod_cover_icon_play"
        :style="{
          transition: selectedIndex === index ? 'all 0.3s' : 'all 0.1s',
          opacity: selectedIndex === index ? '1' : '0',
        }"
      ></i>
      <div>
        <h1 class="text-base font-semibold mb-2 mt-2 ml-5">飙升榜</h1>
        <span class="text-xs ml-5 mr-3">1</span>
        <span class="text-xs">songname</span>
        -
        <span class="text-xs">singer</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl:
        'http://y.qq.com/music/photo_new/T002R300x300M0000008IAML0V6eAM_3.jpg?max_age=2592000',
      menulist: [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }],
      selectedIndex: null
    }
  },
  methods: {
    mouseEnter(index) {
      this.selectedIndex = index
    },
    mouseLeave() {
      this.selectedIndex = null
    }
  }
}
</script>

<style scoped>
.demo-image {
  height: 125px;
  width: 125px;
}
.mod_cover_icon_play {
  position: absolute;
  width: 140px;
  height: 140px;
  background: url("https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000");
  transform: scale(0.35);
  top: -8px;
  left: -6px;
  opacity: 0;
}
</style>
