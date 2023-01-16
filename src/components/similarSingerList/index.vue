<template>
  <div>
    <div class="flex items-center justify-between" style="width: 1000px">
      <div v-for="(item, index) in singerList" :key="index">
        <el-image
          style="width: 150px; height: 150px; border-radius: 100px"
          :src="item.picUrl"
          fit="cover"
        ></el-image>
        <div class="flex items-center justify-center mt-4">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "similarSingerList",
  props: {
    singerList: {
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>