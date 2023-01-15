<template>
  <div class="">
    <div v-if="Title" class="flex h-16 items-center justify-center mt-8">
      <h2 class="text-2xl font-bold mb-10" style="transform: translateX(-20px)">
        {{ Title }}
      </h2>
    </div>
    <div
      class="flex justify-between "
      style="min-width: 1200px;margin-left:auto;margin-right:auto;max-width: 1300px;transform: translateX(5px);"
    >
      <div v-for="(item, index) in detailArr" :key="item.id" style="width: 20%">
        <div class="overflow-hidden w-52 h-52">
          <div class="w-52 h-52">
            <el-image
              class="scale-50 duration-500"
              :style="{
                transform: selectedIndex === index ? 'scale(1.10)' : 'scale(1)',
              }"
              style="width: 208px; height: 208px"
              :src="item.picUrl"
              fit="fill"
            >
            </el-image>
            <img
              @click="pushToPage(index)"
              @mouseleave="mouseLeave"
              @mouseenter="mouseEnter(index)"
              class="w-52 bg-black relative duration-500 cursor-pointer"
              :style="{
                height: '210px',
                top: '-101%',
                opacity: selectedIndex === index ? '0.15' : '0',
              }"
            />
            <img
              @click="pushToPage(index)"
              @mouseenter="mouseEnter(index)"
              :style="{
                transform: selectedIndex === index ? 'scale(1.35)' : 'scale(1)',
                opacity: selectedIndex === index ? '1' : '0',
              }"
              class="icon-play cursor-pointer"
              src="../assets/playCircle2.png"
            />
          </div>
        </div>
        <div class="leading-4 mt-3">
          <h1
            @click="pushToPage(index)"
            class="duration-150 text-sm font-semibold leading-5 w-52 title"
          >
            {{ item.name }}
          </h1>
          <div class="flex justify-between w-52">
            <p
            @click="pushToSingerPage(itemm.id)"
              v-for="(itemm, indexx) in item.artists"
              :key="indexx"
              class="text-xs font-thin mt-2 title"
            >
              {{ itemm.name }}
            </p>
            <p v-if="item.playCount" class="text-xs font-thin mt-2">
              播放量:{{ item.playCount }}
            </p>
          </div>
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
  inject:["reload"],
  props: {
        "detailArr":{required:true},
        "Title":{required:false},
    },
  methods: {
    mouseEnter(index) {
      this.selectedIndex = index;
    },
    mouseLeave() {
      this.selectedIndex = null;
    },
    pushToPage(i) {
      switch (this.detailArr[0].type) {
        case 0:
          this.$router.push({
            path: `/songdetail`,
            query: {
              id: this.detailArr[i].id,
            },
          });
          break;
        case 1:
          this.$router.push({
            path: `/playlist/list`,
            query: {
              id: this.detailArr[i].id,
            },
          });
          break;
      }
    },
    pushToSingerPage(id){
      this.$router.push({
            path: `/singerdetail/choiceness`,
            query: {
              id: id,
            },
          });
          this.reload()
    }
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