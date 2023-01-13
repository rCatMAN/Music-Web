<template>
    <div>
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
                        <td class="min-w-max songList">
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
    </div>

</template>

<script>
export default {
    data() {
        return {
            id: this.$route.query.id,
            hotSongsList: [],
          
        }
    },
    inject:['reload'],
    methods: {
        toSongPage(id) {
            this.$router.push({
                path: `/songdetail`,
                query: {
                    id: id
                }
            })
        },
        toSingerPage(id) {
            this.$router.push({
                path: `/singerdetail/choiceness`,
                query: {
                    id: id
                }
            })
            this.reload()
        },
    },
    mounted() {
        //获取歌手热门歌曲
        this.$axios({
            method: "GET",
            url: `http://localhost:3000/artist/top/song?id=${this.id}`,
        }).then((response) => {
            for (let index = 0; index < 10; index++) {
                this.hotSongsList.push(response.data.songs[index])
            }
        });
    }
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