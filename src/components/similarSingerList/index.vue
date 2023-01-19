<template>
  <div>
    <div class="flex items-center justify-between relative" style="width: 950px">
      <div v-for="(item, index) in singerList" :key="index">
        <el-image style="width: 150px; height: 150px; border-radius: 100px" :src="item.picUrl" fit="cover"></el-image>
        <div @click="toSingerPage(item.id)" @mouseenter="selected(index)" @mouseleave="notSelected"
          class=" absolute bg-black duration-300 cursor-pointer"
          style="width: 150px; height: 150px; border-radius: 100px;top:0px" :style="{
            opacity: selectIndex === index ? '0.3' : '0'
          }">
        </div>
        <div class="flex items-center justify-center mt-4">
          <span @click="toSingerPage(item.id)" class="
              cursor-pointer
              duration-150
              text-sm
              font-semibold
              primary-color__hover">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'similarSingerList',
  props: {
    singerList: {
      required: true,
    },
  },
  data() {
    return {
      selectIndex: null,
    }
  },
  inject: ['reload'],
  methods: {
    selected(index) {
      this.selectIndex = index
    },
    notSelected() {
      this.selectIndex = null
    },
    toSingerPage(id){
      this.$router.push({
        path:`/singerdetail/choiceness?id=${id}`
      })
      this.reload()
    }

  }
}
</script>

<style scoped>

</style>
