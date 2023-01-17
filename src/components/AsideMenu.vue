<template>
  <div class="Aside">
    <Logo />
    <div class="flex flex-col items-center">
      <AsMenuList
        :content="item.title"
        :iconClass="item.iconClass"
        v-for="(item, index) in asideOnlineMusic"
        :key="index"
        class="mt-3"
        :class="{ SvgIconBoxDown: selectIndex === index }"
        @click.native="changeSelectIndex(index, item.id)"
      />
    </div>
  </div>
</template>
<script>
import AsMenuList from './AsMenuList.vue'
import Logo from './Logo.vue'
export default {
  name: 'AsideMenu',
  props: {},
  components: { Logo, AsMenuList },
  data() {
    return {
      asideOnlineMusic: [
        { id: '/recommend', title: '推荐', iconClass: 'star' },
        { id: '/musichall/choiceness', title: '音乐馆', iconClass: 'music' },
        { id: '3', title: '视频', iconClass: 'video' },
        { id: '4', title: '电台', iconClass: 'radio' }
      ],
      asideMyMusic: [
        { id: '5', title: '我喜欢' },
        { id: '6', title: '本地和下载' },
        { id: '7', title: '最近播放' },
        { id: '8', title: '试听列表' },
        { id: '9', title: '已购音乐' }
      ],
      selectIndex: 1
    }
  },
  methods: {
    changeSelectIndex(index, id) {
      this.selectIndex = index
      this.$router.push({
        path: id
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SvgIconBoxDown {
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 150ms;
  color: white;
  box-shadow: #84fab0 0px 0px 15px 0px;
  background-color: #84fab0;
}
</style>
