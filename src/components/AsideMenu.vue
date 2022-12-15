<template>
  <div class="Aside">
    <Logo/>
    <AsideMenuList 
    :asideOnlineMusic="asideOnlineMusic"
    :asideMyMusic="asideMyMusic"
    />
  </div>
</template>

<script>
import AsideMenuList from './AsideMenuList.vue';
import Logo from './Logo.vue';
import {nanoid} from 'nanoid'

export default {
    name: "AsideMenu",
    props: {},
    components: { AsideMenuList, Logo,  },
    data(){
      return{
        asideOnlineMusic:[
          {id:'/recommend',title:'推荐'},
          {id:'/musichall/choiceness',title:'音乐馆'},
          {id:'3',title:'视频'},
          {id:'4',title:'电台'},
        ],
        asideMyMusic:[
          {id:'5',title:'我喜欢'},
          {id:'6',title:'本地和下载'},
          {id:'7',title:'最近播放'},
          {id:'8',title:'试听列表'},
          {id:'9',title:'已购音乐'}
        ],
      }
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
