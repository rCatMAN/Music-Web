import { Howl } from "howler";


export default {
  data() {
    return {
      _howl: null,
      audioSource: null,
      vol: 1,
      loop: false,
      autoplay: true,
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
      return this.$store.state.isPlaying;
    },

  },

  watch: {
    audioSource: {
      handler(newsrc, oldsrc) {
        if (newsrc != oldsrc) {
          console.log('n,o ', newsrc, oldsrc);

          this.Initialize()
          console.log('更新audioSource: ', audioSource);
        }

      }
    }

  },
  created() {
    this.Initialize();
  },

  methods: {

    Initialize() {
      this._howl = new Howl({
        src: this.audioSource,
        volume: this.vol,
        html5: this.html5,
        loop: this.loop,
        preload: this.preload,
        autoplay: this.autoplay,
        mute: this.muted,
      });

    },


    play() {
      this._howl.play();
    },
    pause() {
      this._howl.pause()
    },
  }
};
