<template>
  <div>
    <div class='mapMain' id="Map"></div>
  </div>
</template>

<script>
import {inject,reactive,onMounted,watch,getCurrentInstance} from 'vue'
import Mock from 'mockjs'
import geoCoordMap from '../utils/mapData'
import provinces from '../utils/nameList'
// import '../utils/js/china.js'
import china from '../utils/china.json'
import province_city from '../utils/province_city.json'
export default {
  name: 'Map',
  props:{
    mapData:{
      type: Array,
      default:()=>[]
    }
  },
  // props:['mapData'],
  setup(props) {

    const {proxy} = getCurrentInstance();

    let echarts = inject('ec')
    echarts.registerMap('china',china)

    // console.log(echarts.getMap('china').geoJSON);
    

    const vdata = reactive({
      mapName:'china',
      datas:[]
    })


    function getConvertData(data,mapName){ 
            let res = [];
            for (let i = 0; i < data.length; i++) {
                let geoCoord = geoCoordMap[data[i].name];
                if(mapName == 'china'){
                  if (geoCoord) {
                      res.push({
                          name: data[i].name,
                          value: geoCoord.concat(data[i].value),
                      });
                  }
                }else{   
                  province_city.forEach(item =>{
                    item.children.forEach(itt =>{
                      if(itt.name == data[i].name){
                        console.log(data[i].name+'位于省份：', item.name)
                        let proName;
                        if(item.name.includes('自治区')){ 
                          proName = item.name.substring(0,item.name.length-3)
                        }else{
                          proName = item.name.substring(0,item.name.length-1)
                        }
                        console.log(proName);
                        if(geoCoord && proName == mapName){
                          res.push({
                              name: data[i].name,
                              value: geoCoord.concat(data[i].value),
                          });
                        }
                      }
                    })
                  })
                }
                
            }
            return res;
           
    }

    const chinaMapHidden = (chinaMap) =>{
        chinaMap.on('click', async (params) =>{
          console.log(params.name);
          if(params.name in provinces){
           let f =  await proxy.$http({
            method:'get',
            url: `/province/${provinces[params.name]}.json`})
            if(f){
              echarts.registerMap(`${params.name}`,f.data)
              vdata.mapName = params.name
              setOptions()
            }
          }
          
        })
    }
    
    const setOptions = () => {
      vdata.datas = props.mapData;
      console.log('地图数据',props.mapData);
    
      let myChart = echarts.init(document.getElementById('Map'));
      // 获得地图数据
      myChart.showLoading();
      let option = {
        title: {
          text: '全国设备分布',
          // subtext: 'data from PM25.in',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        geo: {
          show: true,
          map: vdata.mapName,
          label: {
            show:true,
            color:' #2e689a',
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#005198',
              borderColor: '#1180c7',
            },
            emphasis: {
              areaColor: '#4499d0',
            }
          },
          emphasis:{
            label:{
              show:true,
              color:'#E7F3FF',
            }
          }
        },
        series:[
          {
            name: 'pm2.5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: getConvertData(vdata.datas,vdata.mapName),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            encode: {
              value: 2
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            itemStyle:{
              color:'#E7F3FF'
            }
          },
        ]            
      }

      myChart.setOption(option);
      chinaMapHidden(myChart);
      myChart.hideLoading();
    }
    watch(() => props.mapData,(newValue) =>{
      vdata.datas = newValue
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
  .mapMain{
    width: 100%;
    height: 100%;
  }
</style>
