<template>
  <div>
    <div class="flex h-16 items-center">
      <h2 class="text-2xl font-bold mr-auto ml-auto">{{ Title }}</h2>
    </div>
    <div
      class="flex justify-between max-w-7xl mt-0 mr-auto ml-auto"
      style="min-width: 1000px"
    >
      <div v-for="(item, index) in HL" :key="item.src" style="width: 20%">
        <div class="overflow-hidden w-52 h-52">
          <div class="w-52 h-52">
            <router-link
              class="
                no-underline
                link:no-underline link:text-black
                visited:no-underline visited:text-black
              "
              :to="{
                path: '/playlist/list',
                query: {
                  topInfo: item,
                },
              }"
            >
              <el-image
                class="scale-50 duration-500"
                :style="{
                  transform:
                    selectedIndex === index ? 'scale(1.10)' : 'scale(1)',
                }"
                style="width: 208px; height: 208px"
                :src="item.src"
                fit="fill"
              >
              </el-image>
              <img
                @mouseleave="mouseLeave"
                @mouseenter="mouseEnter(index)"
                class="w-52 bg-black relative duration-500"
                :style="{
                  height: '210px',
                  top: '-101%',
                  opacity: selectedIndex === index ? '0.15' : '0',
                }"
              />
              <img
                @mouseenter="mouseEnter(index)"
                :style="{
                  transform:
                    selectedIndex === index ? 'scale(1.35)' : 'scale(1)',
                  opacity: selectedIndex === index ? '1' : '0',
                }"
                class="icon-play"
                src="../assets/playCircle2.png"
              />
            </router-link>
          </div>
        </div>
        <div class="leading-4 mt-3">
          <router-link
            class="alink"
            :to="{
              path: '/playlist/list',
              query: {
                topInfo: item,
              },
            }"
          >
            <h1 class="duration-150 text-sm font-semibold leading-5 w-52 title">
              {{ item.title }}
            </h1>
          </router-link>
          <h6 class="text-xs font-thin mt-2">{{ item.singer }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon_PlaySrc: "../assets/playCircle.png",
      selectedIndex: null,
    };
  },
  props: ["Title", "SubTitle", "HL"],
  methods: {
    mouseEnter(index) {
      this.selectedIndex = index;
    },
    mouseLeave() {
      this.selectedIndex = null;
    },
  },
};
</script>

<style scoped>
.title:hover {
  cursor: pointer;
  transition: all 0.15s;
  color: var(--primary-color);
}

.icon-play {
  transition: all 0.3s ease-out;
  width: 45px;
  height: 45px;
  position: relative;
  opacity: 0;
  top: -160%;
  left: 41%;
}
</style>