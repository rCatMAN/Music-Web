<template>
  <div id="app">
    <transition :name="transitionName" :mode="mode">
      <keep-alive include="player">
        <router-view v-if="isReload" class="child-view"></router-view>
      </keep-alive>
    </transition>
    <FooterMenu v-if="!isLoginPage" />
  </div>
</template>

<script>
import FooterMenu from './components/FooterMenu.vue'
export default {
  name: 'App',
  components: {
    FooterMenu
  },
  data() {
    return {
      transitionName: 'down-up',
      mode: 'in-out',
      isReload: true,
      userInfo: null
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isReload = false
      this.$nextTick(() => {
        this.isReload = true
      })
    }
  },
  computed: {
    isLoginPage() {
      if (this.$route.path === '/login') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index === 1) {
        this.transitionName = 'slide-left'
        this.mode = ''
      } else {
        this.transitionName = 'slide-right'
        this.mode = ''
      }
    }
  }
}
</script>

<style>
.primary-color {
  color: var(--primary-color);
}
.primary-bg {
  background-color: var(--primary-color);
}
.primary-color__hover:hover {
  color: var(--primary-color);
}

.grayText {
  color: var(--gary-text);
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
}

.contentText {
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
}

.primary-pic-scale > img {
  transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
  transform: scale(1);
}

.primary-pic-scale > img:hover {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform: scale(1.1);
}

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(0, 100%);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(0, -100%);
}
</style>
