import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        nowPlayingID: "1",
        isPlaying: false,
        PlayingList: [],

    },
    mutations: {
        ChangePlaySongId(state, payload) {
            state.nowPlayingID = payload.id

        },
        ChangePlayState(state, payload) {
            state.isPlaying = payload.isPlaying

        },

    }
})

export default store
