<template>
  <div>
    <div>
      <h1 class="w-24 ml-auto mr-auto mb-8 mt-6 text-2xl font-semibold">
        排 行 榜
      </h1>
    </div>
    <ul class="toplist_list">
      <li
        v-for="(item, index) in TopList"
        :key="item.title"
        class="toplist_item"
      >
        <div @mouseleave="mouseLeave" class="toplist_box">
          <div
            @mouseenter="mouseEnter(index)"
            :style="{
              transform: SelectedIndex === index ? 'scale(1.2)' : 'scale(1.1)',
              transition: SelectedIndex === index ? 'all 0.3s' : 'all 0.45s',
              backgroundPositionX:
                index === 0
                  ? '0'
                  : index === 1
                  ? '-216px'
                  : index === 2
                  ? '-438px'
                  : index === 3
                  ? '-662px'
                  : index === 4
                  ? '-890px'
                  : '0',
            }"
            class="toplist_bg"
          ></div>
          <div>
            <h2
              @mouseenter="mouseEnter(index)"
              class="
                cursor-default
                absolute
                top-8
                text-2xl
                font-light
                text-white
              "
              style="left: 35%"
            >
              巅峰榜
            </h2>
            <div
              @mouseenter="mouseEnter(index)"
              class="flex justify-center items-center absolute top-16 h-10"
              style="width: 224px"
            >
              <h1
                class="cursor-default absolute text-3xl font-medium text-white"
              >
                {{ item.title }}
              </h1>
            </div>
          </div>
          <i
            @mouseenter="mouseEnter(index)"
            @click="$router.push({ path: '/player' })"
            :style="{
              cursor: 'pointer',
              opacity: SelectedIndex === index ? '1' : '0',
              transform:
                SelectedIndex === index ? 'scale(0.38)' : 'scale(0.28)',
            }"
            class="mod_cover_icon_play"
          ></i>
          <i
            @mouseenter="mouseEnter(index)"
            :style="{
              opacity: SelectedIndex === index ? '0' : '1',
            }"
            class="toplist_line"
          ></i>
          <ul @mouseenter="mouseEnter(index)" class="absolute top-48">
            <li v-for="itemm in item.song" :key="itemm.SongName">
              <div class="flex h-14 ml-6 mb-5" style="width: 200px">
                <span class="w-8 text-sm font-normal text-white text-center">
                  {{ itemm.Number }}
                </span>
                <div class="h-14" style="width: 168px">
                  <div class="mb-2" style="max-height: 20px">
                    <div
                      @click="$router.push({ path: '/songdetail' })"
                      class="
                        truncate
                        cursor-pointer
                        text-sm
                        font-normal
                        text-white
                        inline-block
                      "
                      style="max-width: 140px"
                    >
                      {{ itemm.SongName }}
                    </div>
                  </div>
                  <div>
                    <div
                      @click="$router.push({ path: '/singerdetail' })"
                      class="
                        truncate
                        inline-block
                        cursor-pointer
                        text-sm
                        font-normal
                        text-white
                      "
                      style="max-width: 140px"
                    >
                      {{ itemm.Singer }}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["arr", "arrtitle"],
  data() {
    return {
      TopList: [
        {
          title: "热歌",
          song: [
            { Number: "1", SongName: "Letting", Singer: "蔡健雅" },
            { Number: "2", SongName: "木偶戏", Singer: "玥夏" },
            { Number: "3", SongName: "晚风告白", Singer: "星野" },
          ],
        },
        {
          title: "新歌",
          song: [
            { Number: "1", SongName: "晚风告白", Singer: "星野" },
            { Number: "2", SongName: "木偶戏", Singer: "玥夏" },
            { Number: "3", SongName: "ANTIFRAGILE", Singer: "LE SSERAFIM" },
          ],
        },
        {
          title: "流行指数",
          song: [
            { Number: "1", SongName: "木偶戏", Singer: "玥夏" },
            { Number: "2", SongName: "晚风告白", Singer: "星野" },
            { Number: "3", SongName: "她说", Singer: "林俊杰" },
          ],
        },
        {
          title: "欧美",
          song: [
            {
              Number: "1",
              SongName: "Anti-Hero (Feat. Bleachers) (Explicit)",
              Singer: "Taylor Swift/Bleachers",
            },
            {
              Number: "2",
              SongName: "I'm a Mess (with YUNGBLUD)",
              Singer: "Avril Lavigne/YUNGBLUD",
            },
            {
              Number: "3",
              SongName:
                "Lift Me Up (From Black Panther: Wakanda Forever - Music From and Inspired By)",
              Singer: "Rihanna",
            },
          ],
        },
        {
          title: "韩国",
          song: [
            { Number: "1", SongName: "ANTIFRAGILE", Singer: "LE SSERAFIM" },
            { Number: "2", SongName: "DREAM", Singer: "SEVENTEEN (세븐틴)" },
            { Number: "3", SongName: "Pink Venom", Singer: "BLACKPINK" },
          ],
        },
      ],
      SelectedIndex: null,
    };
  },
  methods: {
    mouseEnter(index) {
      this.SelectedIndex = index;
    },
    mouseLeave() {
      this.SelectedIndex = null;
    },
  },
};
</script>

<style scoped>
.toplist_list {
  display: flex;
  justify-content: space-between;
  max-width: 1300px;
  min-width: 1200px;
  font-size: 0;
  margin-right: auto;
  margin-left: auto;
}
.toplist_item {
  display: inline-block;
  width: 20%;
}
.toplist_box {
  position: relative;
  margin-right: 20px;
  width: 224px;
  height: 500px;
  overflow: hidden;
}
.toplist_bg {
  transition: all 0.45s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 500px;
  background-image: url(https://y.qq.com/ryqq/static/media/bg_index_top.5314c494.jpg?max_age=2592000);
  background-position-x: 283px;
}
.mod_cover_icon_play {
  background: 72%;
  background-repeat: no-repeat;
  background-position: 50%;
  margin-top: 0;
  margin-bottom: 0;
  background: url(https://y.qq.com/ryqq/static/media/cover_play@2x.53a26efb.png?max_age=2592000);
  position: absolute;
  top: 114px;
  left: 35%;
  margin: -35px;
  width: 135px;
  height: 135px;
  opacity: 0;
  transform: scale(0.28);
  transition-duration: 0.5s;
  zoom: 1;
}
.toplist_line {
  position: absolute;
  left: 42%;
  top: 146px;
  width: 36px;
  height: 2px;
  background: #fff;
}
.toplist_line:hover {
  opacity: 0;
}
</style>