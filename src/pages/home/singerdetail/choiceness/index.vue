<template>
    <div class="mb-40">
        <div>
            <div class="flex">
                <p class="text-2xl">热门歌曲</p>
            </div>
            <div>
                <table v-if="hotSongsList" class="songTable mb-32 mt-2">
                    <tr class="h-10 text-xs text-gray-500 font-thin">
                        <th class="songList">歌曲</th>
                        <th class="otherList">歌手</th>
                        <th class="otherList">专辑</th>
                        <th class="timeList">时长</th>
                    </tr>
                    <tr v-for="(item, index) in hotSongsList" :key="index" class="h-14 text-sm songTr">
                        <td class="min-w-max songList flex items-center" style="height: 56px;">
                            <svg-icon icon-class="like" class="mr-4" style="
                                width: 20px;
                                height: 20px;">
                            </svg-icon>
                            <span @click="toSongPage(item.id)" class="textList inline whitespace-nowrap">{{
                                item.name
                            }}</span>
                        </td>
                        <td class="otherList truncate">
                            <span @click="toSingerPage(itemm.id)" v-for="(itemm, indexx) in item.ar" :key="indexx"
                                class="textList">{{ itemm.name }}</span>
                        </td>
                        <td class="timeList truncate">
                            <span class="textList">{{ item.al.name }}</span>
                        </td>
                        <td><span>3:29</span></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="-mt-24">
            <div class="flex mb-8">
                <p class="text-2xl">热门专辑</p>
            </div>
            <HorizontalList class="" v-if="hotAlbumList" :detailArr="hotAlbumList" />
        </div>
        <div class="mt-10">
            <div class="flex">
                <p class="text-2xl">推荐视频</p>
            </div>
        </div>
    </div>

</template>

<script>
import HorizontalList from '@/components/HorizontalList.vue'

export default {
    data() {
        return {
            id: this.$route.query.id,
            hotSongsList: [],
            hotAlbumList: [],
        };
    },
    inject: ["reload"],
    methods: {
        toSongPage(id) {
            this.$router.push({
                path: `/songdetail`,
                query: {
                    id: id
                }
            });
        },
        toSingerPage(id) {
            this.$router.push({
                path: `/singerdetail/choiceness`,
                query: {
                    id: id
                }
            });
            this.reload();
        },
    },
    mounted() {
        //获取歌手热门歌曲
        this.$axios({
            method: "GET",
            url: `http://localhost:3000/artist/top/song?id=${this.id}`,
        }).then((response) => {
            for (let index = 0; index < 10; index++) {
                this.hotSongsList.push(response.data.songs[index]);
            }
        });
        //获取歌手热门专辑
        this.$axios({
            method: "GET",
            url: `http://localhost:3000/artist/album?id=${this.id}&limit=5`,
        }).then((response) => {
            for (let i = 0; i < response.data.hotAlbums.length; i++) {
                var arr = {
                name: response.data.hotAlbums[i].name,
                artists: response.data.hotAlbums[i].artists,
                picUrl: response.data.hotAlbums[i].picUrl,
                id: response.data.hotAlbums[i].id,
                type: 2,
            }
            this.hotAlbumList.push(arr)
            }
        });
    },
    components: { HorizontalList }
}
</script>

<style lang="scss" scoped>
.songTable {
    width: 95%;
}

.songList {
    width: 50%;
    min-width: max-content;
}

.otherList {
    width: 250px;
    min-width: 85px;
    max-width: 250px;
}

.timeList {
    width: 80px;
    min-width: 80px;
    max-width: 80px;
}

.songTr:hover {
    background: rgba(107, 114, 128, 0.06);
}

.textList:hover {
    cursor: pointer;
    color: var(--primary-color);
}
</style>