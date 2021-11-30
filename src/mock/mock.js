import Mock from 'mockjs'

let province = ["大庆","武汉","合肥","菏泽","廊坊","衢州","长沙","岳阳","金华","湘潭","保定","常德","莱芜","石家庄","株洲","秦皇岛","洛阳","丽水","义乌","宜昌","荆州","济宁","鄂尔多斯","盐城","汕尾","福州","宁夏","张家口","昆山","连云港"];
Mock.mock('/api/getMapData','get',{
  "data|34" : [{
      "name|1" : province,
      "value|50-200":200 
  }]
})

Mock.mock('/api/getLineData','get',{
  "data|20" : [{
    "date" : '@time("HH:mm:ss")',
    "value|68-160":160 
  }]
})

Mock.mock('/api/getGaugeData','get',{
  "data" : [
      {
      "name" : 'temperature',
      "value|0-60":37 
      },
      {
      "name" : 'humidity',
      "value|0-100":60 
      }
  ]
})