<template>
    <div class="relative SvgIconBox cursor-pointer " style="width: 110px; height: 32px">
        <div class="flex items-center justify-center w-full h-full">
            <svg-icon :icon-class="iconClass" class="left-1/2 top-1/2" style="
                width: 20px;
                height: 20px;"
                >
            </svg-icon>
            <span v-if="content" class=" left-1/2 top-1/2 text text-sm">{{ content }}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'customButton',
  props: { content: { type: String, rerquired: false }, iconClass: { type: String, rerquired: false } },
  data() {
    return {}
  }
}
</script>

<style scoped >
.SvgIconBox {
    user-select: none;
    background-color: #84fab0;
    color: white;
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: 150ms;
    border-radius: 50px;
    box-shadow: rgb(107, 114, 128) 0 10px 20px -10px;
}

.SvgIconBox:hover {
    transition-property: all;
    transition-timing-function: ease-out;
    transition-duration: 150ms;
    color: #ff9a9e;
    box-shadow: none;
    background-color: #84fab0;
}

.SvgIconBox:active {
    transform: scale(0.86);
}

.text {}
</style>
