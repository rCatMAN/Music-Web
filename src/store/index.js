import Vue from 'vue'
import Vuex from 'vuex'
import { Howl } from "howler";
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: {
            IsLogged: false,
            userName: "未登录",
        },
        nowPlayingID: "1",
        isPlaying: false,
        PlayingList: [],
        howl: null,
        IsLoaded: false,
        Volume: 0.5,
        PlayTime: 0,
    },
    mutations: {
        ChangePlayTime(state, payload) {
            state.PlayTime = payload.PlayTime
        },
        ChangeVolume(state, payload) {
            state.Volume = payload.Volume
        },
        ChangePlaySongId(state, payload) {
            state.nowPlayingID = payload.id
            console.log("x的PlayingId改变,", state.nowPlayingID)
        },
        ChangePlayState(state, payload) {
            state.isPlaying = payload.isPlaying
        },
        NewHowler(state, payload) {

            const _howl = new Howl({
                format: "mp3",
                src: payload.url,
                volume: state.Volume,
                html5: true,
                loop: false,
                preload: true,
                autoplay: false,
                mute: false,
                onend() {
                    state.isPlaying = false
                },
                onload() {
                    state.IsLoaded = true
                }
            });
            console.log("new的src和HOWL", payload.url, _howl)
            state.IsLoaded = false
            state.howl = _howl
        },
    }
})
export default store
