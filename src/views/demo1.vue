<template>
  <div class="demo1">
    <el-select v-model="type" @change="selectChange" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>  
    </el-select>
    <Map class="map" :mapData="mapData" v-if="type == 'map' && hasData"/>
    <Line class="line" :lineData="lineData" v-if="type == 'line' && hasData"/>
    <Gauge class="gauge" :gaugeData="gaugeData" v-if="type == 'gauge' && hasData"/>
    <Gauge2 class="gauge2" :gaugeData="gaugeData" v-if="type == 'gauge' && hasData"/>
  </div>
</template>

<script>

import {reactive,toRefs,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,getCurrentInstance} from 'vue'
import Map from '../components/Map.vue'
import Line from '../components/Line.vue'
import Gauge from '../components/Gauge.vue'
import Gauge2 from '../components/Gauge2.vue'
import Mock from 'mockjs'
export default {
  name: 'demo1',
  components:{
    Map:Map,
    Line:Line,
    Gauge:Gauge,
    Gauge2:Gauge2,
  },
  //setup执行时机是在beforeCreate之前，this是undefined
  setup(){//定义数据、方法,返回一个对象，尽量不要与vue2.x混用
    
    const {proxy} = getCurrentInstance();
    // console.log(proxy.$test);
     const that = reactive({
       type:'map',
       mapData:[],
       lineData:[],
       gaugeData:[],
       hasData: false,
       options:[
         {
           value:'map',
           label:'设备地图'
         },
         {
           value:'line',
           label:'心率曲线'
         },
         {
           value:'gauge',
           label:'空气温湿度'
         }
       ]
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

     const getGaugeData = () =>{
       proxy.$http({
          method:'get',
          url: '/api/getGaugeData'})
        .then(res =>{
          that.hasData = true;
          that.gaugeData = res.data.data
          console.log(that.gaugeData);
          
        }).catch(err =>{
          console.log(err);
        })
     }

     const selectChange = (value) =>{
       that.hasData = false;
       if(value == 'map'){
         getMapData()
       }else if(value == 'line'){
         getLineData()
       }else if(value == 'gauge'){
         getGaugeData()
       }
     }

    onBeforeMount(() => {
      //console.log('onBeforeMount');
    })

    onMounted(() => {
      getMapData()
      //console.log('onMounted',proxy.$el);
      //getMapData()
      // setInterval(() =>{
      //   getMapData()
      // },1000*30)
    })

    onBeforeUpdate(() =>{
      //console.log('onBeforeUpdate',proxy.$el);
    })
    

    onUpdated(() =>{
      //console.log('onUpdated',proxy.$el);
    })
    return{
      ...toRefs(that),
      selectChange
    }
  }
}
</script>

<style lang="less" scoped>
  

  .demo1{
    :deep(.el-select){
      position: fixed;
      top: 50px;
      left: 100px;
      z-index: 999;
    }

    .map{
      width: 100vw;
      height: 100vh;
    }

    .line{
      width: 100vw;
      height: 90vh;
      padding-top: 10vh;
    }

    .gauge{
      width: 48vw;
      height: 48vh;
      margin-left: 25vw;
    }
    .gauge2{
      width: 48vw;
      height: 48vh;
      margin-left: 25vw;
    }
  }
</style>