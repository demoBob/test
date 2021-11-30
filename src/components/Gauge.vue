<template>
  <div>
    <div class='gaugeMain' id="Gauge"></div>
  </div>
</template>

<script>
import {inject,reactive,onMounted,watch} from 'vue'
import Mock from 'mockjs'
export default {
  name: 'Gauge',
  props:{
    gaugeData:{
      type: Array,
      default:()=>[]
    }
  },
  setup(props) {
    let echarts = inject('ec')

    const vdata = reactive({
      sDatas:[]
    })

    console.log('g1',props.gaugeData[0].value);
    
    function setOptions() {
      vdata.sDatas = []
      let status;
      if(props.gaugeData[0].value <= 15){
        status = '寒冷';
      }else if(props.gaugeData[0].value > 15 && props.gaugeData[0].value <= 31){
        status = '舒适';
      }else{
        status = '炎热';
      }
      let data = {
        value : props.gaugeData[0].value,
        name : status
      }
      
      vdata.sDatas.push(data)
      
      let myChart = echarts.init(document.getElementById('Gauge'));
      myChart.showLoading();
      let option = {
        series: [
            {
            type: 'gauge',
            axisLine: {
                roundCap:true,
                lineStyle: {
                width: 30,
                color: [
                    [0.4375, '#2402FB'],
                    [0.6375, '#099EFE'],
                    [1, '#E8710D']
                ]
                }
            },
            min:-20,
            max:60,
            splitNumber:8,
            pointer: {
                itemStyle: {
                color: 'auto'
                }
            },
            axisTick: {
                distance: 5,
                length: 8,
                lineStyle: {
                color: 'auto',
                width: 2
                }
            },
            splitLine: {
                distance: 5,
                length: 20,
                lineStyle: {
                color: 'auto',
                width: 4
                }
            },
            axisLabel: {
                color: 'auto',
                distance: 40,
                fontSize: 20,
                
            },
            title: {
                offsetCenter: [0, '-30%'],
                fontSize: 30,
                color: 'auto'
            },
            detail: {
                valueAnimation: true,
                fontSize:40,
                formatter: (value) =>{
                return `${value}℃`
                },
                color: 'auto'
            },
            data: vdata.sDatas
            }
        ]
      };
      myChart.setOption(option);
      myChart.hideLoading();
    }

    watch(() => props.gaugeData,(newValue) =>{
      setOptions()
    })

    onMounted(() =>{     
      
      setOptions()
    })

    return {
      vdata
    }

  }
}
</script>

<style scoped>
  .gaugeMain{
    width: 100%;
    height: 100%;
  }
</style>
