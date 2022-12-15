import { Howl } from "howler";


export default {
  data() {
    return {
      _howl: null,
      audioSource: null,
      vol: 1,
      loop: false,
      autoplay: false,
      html5: true,
      preload: true,
      muted: false
    };
  },

  computed: {
    playingId() {
      return this.$store.state.nowPlayingID;
    },
    isPlaying() {
      console.log('this.$store.state.isPlaying: ', this.$store.state.isPlaying);
      return this.$store.state.isPlaying;

    },
    // audioSource() {
    //   return this.$store.state.url;
    // },
  },

  watch: {
    audioSource: {
      handler(newsrc, oldsrc) {
        this.ReInitialize()
        console.log('更新audioSource: ', this.audioSource);
      }
    }

  },
  created() {

  },

  methods: {
    ReInitialize() {
      this.cleanup();
      this.Initialize();
    },


    Initialize() {
      this._howl = new Howl({

        format: "mp3",
        src: this.audioSource,
        volume: this.vol,
        html5: this.html5,
        loop: this.loop,
        preload: this.preload,
        autoplay: this.autoplay,
        mute: this.muted,
      });
      console.log('初始化howl: ', this._howl);
    },

    cleanup() {
      if (this._howl)
        this._howl.pause()
      this._howl = null
      console.log("清除howl")
    },

    TogglePlayStatus() {
      if (this.isPlaying) {
        this._pause()
        this.$store.commit("ChangePlayState", { isPlaying: false });

      } else {
        this._play()
        this.$store.commit("ChangePlayState", { isPlaying: true });
      }
    },

    _play() {
      console.log("播放")
      console.log("howl", this._howl)
      this._howl.play();
    },
    _pause() {
      console.log("暂停")
      this._howl.pause()
    },
  }
};
