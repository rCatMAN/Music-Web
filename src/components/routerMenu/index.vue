<template>
  <div
    class="flex items-center justify-between"
    style="width: 30%; min-width: 360px"
  >
    <div
      v-for="(item, index) in content"
      :key="index"
      @click="toPage(item.path, index)"
      class="SvgIconBox cursor-pointer flex items-center"
      :class="{ SvgIconBoxDown: selectIndex === index }"
      style="width: max-content; height: 35px"
    >
      <p class="text-sm ml-5 mr-5" style="">{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'routerMenu',
  props: {
    content: { required: true },
    id: { required: false }
  },
  data() {
    return {
      selectIndex: 0
    }
  },
  methods: {
    toPage(path, index) {
      this.$router.push({
        path,
        query: {
          id: this.id
        }
      })
      this.selectIndex = index
    }
  }
}
</script>
<style scoped >
.SvgIconBox {
  user-select: none;
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  border-radius: 10px;
  background-color: #fff;
}

.SvgIconBox:hover {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  color: white;
  box-shadow: none;
  background-color: #84fab0;
}

.SvgIconBox:active {
  transform: scale(0.86);
}

.SvgIconBoxDown {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  color: white;
  box-shadow: #84fab0 0px 0px 15px 0px;
  background-color: #84fab0;
}
</style>
