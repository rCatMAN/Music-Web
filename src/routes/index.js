



//登录页面
import Login from "../pages/home/login"
//搜索页面
import Search from "../pages/home/search"
//搜索页面子页面
import SearchSong from "../pages/home/search/song"
import SearchAlbum from "../pages/home/search/album"
import SearchMv from "../pages/home/search/mv"
import SearchPlaList from "../pages/home/search/playlist"
import SearchUser from "../pages/home/search/user"
import SearchLyrics from "../pages/home/search/lyrics"
//播放器页面
import Player from "../pages/home/player"
//歌手详情页面
import SingerDetail from "../pages/home/singerdetail"
import singeralbum from "../pages/home/singerdetail/album"
import singerchoiceness from "../pages/home/singerdetail/choiceness"
import singerdetail from "../pages/home/singerdetail/detail"
import singersongs from "../pages/home/singerdetail/songs"
import singervideos from "../pages/home/singerdetail/video"
//歌曲详情页面
import Songdetail from "../pages/home/songdetail"
//歌单
import Playlist from "../pages/home/playlist"
import musiclist from "../pages/home/playlist/list"
import comments from "../pages/home/playlist/comments"
//歌单/
import Recommend from "../pages/home/recommend"
//主页面
import Musichall from "../pages/home/musichall"
//音乐馆/
import Choiceness from "../pages/home/musichall/choiceness"
import Voiceradio from "../pages/home/musichall/voiceradio"
import Leaderboard from "../pages/home/musichall/leaderboard"
import Singer from "../pages/home/musichall/singer"
import Songclassify from "../pages/home/musichall/songclassify"
import Digitalalbum from "../pages/home/musichall/digitalalbum"
import Phoneexclusive from "../pages/home/musichall/phoneexclusive"
//home
import Home from "@/pages/home"



import createRouter from "vue-router"

export default new createRouter({
    routes: [
        {
            path: '/',
            component: Home,
            meta: { index: 0 },
            children: [
                {
                    path: '/musichall',
                    component: Musichall,
                    children: [
                        {
                            path: 'choiceness',
                            component: Choiceness,
                        },
                        {
                            path: 'voiceradio',
                            component: Voiceradio,
                        },
                        {
                            path: 'leaderboard',
                            component: Leaderboard,
                        },
                        {
                            path: 'singer',
                            component: Singer,
                        },
                        {
                            path: 'songclassify',
                            component: Songclassify,
                        },
                        {
                            path: 'digitalalbum',
                            component: Digitalalbum,
                        },
                        {
                            path: 'phoneexclusive',
                            component: Phoneexclusive,
                        }

                    ]
                },
                {
                    path: '/singerdetail',
                    component: SingerDetail,
                    children:[
                        {
                            path: 'choiceness',
                            component: singerchoiceness,
                        },
                        {
                            path: 'album',
                            component: singeralbum,
                        },
                        {
                            path: 'detail',
                            component: singerdetail,
                        },
                        {
                            path: 'songs',
                            component: singersongs,
                        },
                        {
                            path: 'videos',
                            component:  singervideos,
                        },
                       
                    ]
                },
                {
                    path: '/songdetail',
                    component: Songdetail,
                    props: true,
                },
                {
                    path: '/playlist',
                    component: Playlist,
                    props: true,
                    children: [
                        {
                            path: 'list',
                            component: musiclist,

                        },
                        {
                            path: 'comments',
                            component: comments
                        }
                    ]
                },
                {
                    path: '/search',
                    component: Search,
                    children: [
                        {
                            path: 'Song',
                            component: SearchSong,
                            //props值为真 就会把该路由组件收到的所有params参数以props形式传给该组件
                            //props: true
                            //     props($route) {
                            //         return {
                            //             id: 666,
                            //             title: www
                            //         }
                            //     }
                        },
                        {
                            path: 'album',
                            component: SearchAlbum
                        },
                        {
                            path: 'mv',
                            component: SearchMv
                        },
                        {
                            path: 'playlist',
                            component: SearchPlaList
                        },
                        {
                            path: 'user',
                            component: SearchUser
                        },
                        {
                            path: 'Lyrics',
                            component: SearchLyrics
                        },
                    ]
                },
                {
                    path: '/recommend',
                    component: Recommend
                },
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/player',
            name: "player",
            component: Player,
            meta: { index: 1 }
        },
    ]
})

