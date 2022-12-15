<template>
  <div>
    <el-container>
      <el-aside class="space" width="200px">
        <AsideMenu />
      </el-aside>
      <el-aside width="200px">
        <div></div>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderMenu />
        </el-header>
        <el-main>
          <transition name="el-fade-in-linear">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer height="65px">
          <FooterMenu />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from "@/components/AsideMenu.vue";
import HeaderMenu from "@/components/HeaderMenu.vue";
import FooterMenu from "@/components/FooterMenu.vue";
export default {
  components: { AsideMenu, HeaderMenu, FooterMenu },
};
</script>

<style scoped>
.el-header {
  background-color: #9ca3af08;
  color: #333;
  text-align: center;
}
.el-footer {
  background-color: #fff;
  color: #fff;
  position: fixed;
  bottom: 0px;
  padding: 0;
}

.space {
  position: fixed;
}

.el-aside {
  background-color: #f5f5f5;
  color: rgb(72, 71, 71);
  text-align: left;
  line-height: 0px;
  height: 900px;
}

.el-main {
  background-color: #fff;
  padding: 0px;
  color: #333;
  text-align: left;
  line-height: 15px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>