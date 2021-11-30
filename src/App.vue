<template>
  <div>
    <!-- <Map /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import demo1 from './views/demo1.vue'

import * as echarts from 'echarts'
import {provide} from 'vue'

export default {
  name: 'App',
  components: {
    //Demo1:demo1
  },
  setup() {
    provide('ec',echarts)
  }
}
</script>

<style scoped>

</style>
