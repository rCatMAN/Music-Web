<template>
  <div>
    <div class="flex items-center justify-between">
      <div v-for="(item, index) in videoList" :key="index" class="relative">
        <el-image
          @mouseleave="mouseLeave"
          @mouseenter="mouseEnter(index)"
          class="duration-300 z-10 cursor-pointer"
          style="width: 230px; height: 140px"
          :style="{
            transform:
              selectedIndex === index
                ? 'translate(10px, -10px)'
                : 'translate(0px, 0px)',
          }"
          :src="item.mlogBaseData.coverUrl"
          fit="cover"
        ></el-image>

        <div
          class="blackCover absolute cursor-pointer duration-500 primary-bg"
          style="width: 230px; height: 140px; left: 0px; top: 0px"
        ></div>
        <div class="mt-4">
          <span
            class="
              cursor-pointer
              duration-150
              text-sm
              font-semibold
              primary-color__hover
            "
          >
            {{ item.mlogBaseData.text }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoList: { required: true }
  },
  data () {
    return {
      selectedIndex: null
    }
  },
  methods: {
    mouseLeave () {
      this.selectedIndex = null
    },
    mouseEnter (index) {
      this.selectedIndex = index
    }
  }
}
</script>

<style scoped>
</style>
