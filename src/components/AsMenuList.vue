<template>
  <div
    class="SvgIconBox cursor-pointer flex items-center"
    style="width: 160px; height: 35px"
  >
    <svg-icon
      :icon-class="iconClass"
      class="ml-5"
      style="width: 20px; height: 20px"
    ></svg-icon>
    <p class="text-sm" style="margin-left: 10px">{{ content }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['content', 'iconClass']
}
</script>

<style scoped>
.SvgIconBox {
  user-select: none;
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  border-radius: 10px;
  background-color: #f5f5f5;
}
.SvgIconBox:hover {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  color: white;
  box-shadow: none;
  background-color: #84fab0;
}
.SvgIconBox:active{
  transform: scale(0.86);
}
</style>
