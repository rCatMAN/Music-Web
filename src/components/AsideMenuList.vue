<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="/musichall"
          class="el-menu-vertical-demo"
          background-color="#f5f5f5"
          text-color="#000000"
          active-text-color="#00FA9A"
          router>       
          <el-menu-item v-for="aom in asideOnlineMusic" :key="aom.id" :index="aom.id">
            <i class="el-icon-menu"></i>
            <span slot="title">{{aom.title}}</span>
          </el-menu-item> 
          <div class="space"></div>
          <el-menu-item v-for="amm in asideMyMusic" :key="amm.id" :index="amm.id">
            <i class="el-icon-menu"></i>
            <span slot="title">{{amm.title}}</span>
          </el-menu-item>          
        </el-menu>
      </el-col>
    </el-row>
    <div class="space"></div>
  </div>
</template>

<script>
export default {
  name: 'AsideMenulist',
  props: ['asideOnlineMusic','asideMyMusic'
    
  ],
  data(){
    return{
      
    }
    
  },
  methods: {

 },

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.space{
  height: 40px;
}
  
</style>
