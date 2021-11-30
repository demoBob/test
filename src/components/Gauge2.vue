<template>
  <div>
    <div class='gaugeMain2' id="Gauge2"></div>
  </div>
</template>

<script>
import {inject,reactive,onMounted,watch} from 'vue'
import Mock from 'mockjs'
export default {
  name: 'Gauge2',
  props:{
    gaugeData:{
      type: Array,
      default:()=>[]
    }
  },
  setup(props) {
    let echarts = inject('ec')

    const vdata = reactive({
      sDatas2:[]
    })

    //console.log(props.gaugeData[1].value);
    
    function setOptions() {
      vdata.sDatas2 = []
      let status;
      if(props.gaugeData[1].value <= 38){
        status = '干燥';
      }else if(props.gaugeData[1].value > 38 && props.gaugeData[1].value <= 67){
        status = '舒适';
      }else{
        status = '潮湿';
      }
      let data = {
        value : props.gaugeData[1].value,
        name : status
      }
      
      vdata.sDatas2.push(data)
      console.log(vdata.sDatas2);
      
      let myChart = echarts.init(document.getElementById('Gauge2'));
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
                    [0.38, '#E8710D'],
                    [0.67, '#099EFE'],
                    [1, '#2402FB']
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
                splitNumber:10,
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
                return `${value}%`
                },
                color: 'auto'
            },
            data: vdata.sDatas2
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
  .gaugeMain2{
    width: 100%;
    height: 100%;
  }
</style>
