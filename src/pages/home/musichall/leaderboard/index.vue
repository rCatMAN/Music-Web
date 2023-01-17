<template>
  <div>
    <LeaderBoard />
    <LeaderSquare />
    <LeaderSquare />
  </div>
</template>

<script>
import LeaderBoard from '@/components/LeaderBoard.vue'
import LeaderSquare from '@/components/LeaderSquare.vue'
export default {
  components: { LeaderBoard, LeaderSquare },
  data () {
    return {}
  }
}
</script>

<style scoped>
h1 {
  padding-bottom: 10px;
}
</style>
