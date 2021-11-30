<template>
  <div>
    <div class='lineMain' id="Line"></div>
  </div>
</template>

<script>
import {inject,reactive,onMounted,watch} from 'vue'
import Mock from 'mockjs'
export default {
  name: 'Line',
  props:{
    lineData:{
      type: Array,
      default:()=>[]
    }
  },
  setup(props) {
    let echarts = inject('ec')

    const vdata = reactive({
      Xdatas:[],
      Ydatas:[]
    })

    console.log(props.lineData);
    
    function setOptions() { 
      for(let i = 0;i < props.lineData.length;i++){
        vdata.Ydatas.push(props.lineData[i].value)
        vdata.Xdatas.push(props.lineData[i].date)
      }
      let myChart = echarts.init(document.getElementById('Line'));
      myChart.showLoading();
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          left: 'center',
          text: '心率曲线'
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: vdata.Xdatas
        },
        yAxis: {
          type: 'value',
          max: (value) =>{
            return value.max + 40
          },
          splitNumber: 5, //设置y轴刻度间隔(为5时y轴刻度被平分为5等分)
          boundaryGap: [0, '100%']
        },

        series: [
          {
            name: 'bpm',
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: 'rgb(255, 250, 250)'
                },
                {
                  offset: 0,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: vdata.Ydatas
          }
        ]
      };
      myChart.setOption(option);
      myChart.hideLoading();
    }

    watch(() => props.lineData,(newValue) =>{
      //console.log(newValue);
      setOptions()
    })

    onMounted(() =>{     
      
      // console.log(vdata.Ydatas);
      // console.log(vdata.Xdatas);
      setOptions()
    })

    return {
      vdata
    }

  }
}
</script>

<style scoped>
  .lineMain{
    width: 100%;
    height: 100%;
    /* position: fixed !important;
    z-index: 999; */
  }
</style>
