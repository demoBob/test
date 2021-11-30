<template>
  <div class="demo2">
    <el-button type="primary" @click="isShow = !isShow">
      <el-icon style="vertical-align: middle;">
        <arrow-right-bold v-if="!isShow" />
        <arrow-left-bold v-if="isShow" />
      </el-icon>
    </el-button>
    <Map class="map" :mapData="mapData" v-if="hasData" />
    <Line class="line" :lineData="lineData" v-if="isShow && hasData"/>
  </div>
</template>

<script>

import {reactive,toRefs,onBeforeMount,getCurrentInstance} from 'vue'
import Map from '../components/Map.vue'
import Line from '../components/Line.vue'
import Mock from 'mockjs'
export default {
  name: 'demo1',
  components:{
    Map:Map,
    Line:Line
  },
  //setup执行时机是在beforeCreate之前，this是undefined
  setup(){//定义数据、方法,返回一个对象，尽量不要与vue2.x混用
    
     const {proxy} = getCurrentInstance();

     const that = reactive({
       isShow:true,
       hasData:false,
       mapData:[],
       lineData:[],
     })
     
     const getMapData = () =>{
        proxy.$http({
          method:'get',
          url: '/api/getMapData'})
        .then(res =>{
          that.hasData = true;
          that.mapData = res.data.data;
        }).catch(err =>{
          console.log(err);
        })
     }

     const getLineData = () =>{
       proxy.$http({
          method:'get',
          url: '/api/getLineData'})
        .then(res =>{
          that.hasData = true;
          that.lineData = res.data.data
        }).catch(err =>{
          console.log(err);
        })
        
     }

     onBeforeMount(() => {
       getMapData();
       getLineData();
     })
    
    return{
      ...toRefs(that)
    }
  }
}
</script>

<style lang="less" scoped>
  

  .demo2{
    :deep(.el-button){
      position: fixed;
      right: 30vw;
      margin-top: 10vh;
      z-index: 999;
    }

    .map{
      width: 70vw;
      height: 100vh;
      float: left;
    }

    .line{
      float: left;
      width: 30vw;
      height: 40vh;
      padding-top: 10vh;
    }
  }
</style>