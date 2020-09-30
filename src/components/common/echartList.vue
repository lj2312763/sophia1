<template>
    <div class="content-box">
        <Row class="header">
            <i-col span="6" class="col-list">
              <div class="col-title">
                  <div class="label"></div>
                  <span class="title-content">{{listData.title}}</span>
              </div>
            </i-col>
            <i-col span="6" offset="12" class="col-list">
              <div class="col-select">
                <i-select v-model="circle" style="width:200px">
                    <i-option v-for="item in circleList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                </i-select>
              </div>
            </i-col>
        </Row>
        <Row class="eat-header">
            <i-col :span="listData.gutter" class="eat-num" v-for="(item,index) in listData.list" :key="index">
              <div class="num">{{item.value}}</div>
              <div class="subTitle">{{item.name}}</div>
            </i-col>
        </Row>
         <div v-if="listData.id=='traffic'" class="mapList">
             <Row>
                  <i-col span="12">
                    <div class="pic">
                      <div class="traffic-map-container" id="traffic-map-container"></div>
                    </div>
                  </i-col>
                  <i-col span="12" >
                        <Row class="header">
                            <i-col span="6" class="col-list">
                              <div class="col-title">
                                  <div class="label"></div>
                                  <span class="title-content">{{listData.subtitle}}</span>
                              </div>
                            </i-col>
                            <i-col span="6" offset="12" class="col-list">
                              <div class="col-select">
                                <i-select v-model="bus" style="width:200px" filterable>
                                    <i-option v-for="item in busList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                                </i-select>
                              </div>
                            </i-col>
                        </Row>
                        <Row >
                            <i-col span="8" class="traffic-list">
                              <div class="traffic-title">
                                序号
                              </div>
                            </i-col>
                            <i-col span="8" class="traffic-list">
                              <div class="traffic-title">
                                名称
                              </div>
                            </i-col>
                            <i-col span="8" class="traffic-list">
                              <div class="traffic-title"  style="margin-left:80px">
                                距离(m)
                              </div>
                            </i-col>
                        </Row>
                        <div class="rightList">
                          <Row v-for="(item,index) in listData.trafficList"  :key="index">
                              <i-col span="8" class="traffic-list" >
                                <div class="traffic-title">
                                  {{index+1}}
                                </div>
                              </i-col>
                              <i-col span="8" class="traffic-list" >
                                <div class="traffic-title">
                                  {{item.name}}
                                </div>
                              </i-col>
                              <i-col span="8" class="traffic-list" >
                                <div class="traffic-title" style="margin-left:80px">
                                  {{item.distance}}
                                </div>
                              </i-col>
                          </Row>
                        </div> 
                  </i-col>
              </Row>
         </div>
        <div class="echart-canyin" v-else  >
            <piesEcharts :id="listData.id" :pieEchartsData="listData.list" ></piesEcharts>
        </div>
       
    </div>
</template>

<script>
import piesEcharts from "./echarts/piesEcharts"
export default {
  props:['listData1','location','locationName'],
  data () {
    return {
     // pieEchartsData:[],
      infoWindow: new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -33),
          anchor: 'bottom-center'
      }),
      markers:[],
      marker: null,
      circle:'1500',
      bus:'公交站',
      Map:null,
      listData:[],
      busList: [
          {
              value: '公交站',
              label: '公交站'
          },
          {
              value: '地铁',
              label: '地铁'
          },
          {
              value: '停车场',
              label: '停车场'
          },
      ],
      circleList: [
          {
              value: '500',
              label: '核心商圈(0-0.5km)'
          },
          {
              value: '1000',
              label: '主力商圈(0-1km)'
          },
          {
              value: '1500',
              label: '全部商圈(0-1.5km)'
          },
      ],
    }
  },
  components:{
    piesEcharts
  },
  watch: {
    location(newName, oldName) {
       this.init();
       this.initTrafficData();
       this.Map.setCenter([newName.split(',')[0],newName.split(',')[1]]);
       
    },
    circle(){
       this.init();
       this.initTrafficData();
    },
    bus(){
       this.initTrafficData();
    }
  }, 
  created(){
    this.listData=this.listData1;
    this.init();
    this.initTrafficData();
  },
  mounted(){
       let _scale = new AMap.Scale(),
        _toolbar = new AMap.ToolBar({
          liteStyle: true
        });
      this.Map = new AMap.Map("traffic-map-container", window.defaultMapOption);
      this.Map.addControl(_scale);
      this.Map.addControl(_toolbar);
      
  },
  methods:{
     init() {
       this.listData.list.forEach(item => {
          this.initData(item.name.split('（')[0],item);
       });
      },
     initData(keywords, val) {
      this.$axios({
        method: "get",
        url: "https://restapi.amap.com/v3/place/around",
        params: {
          key: window.mapKey,
          location: this.location,
          radius: this.circle,
          keywords: keywords
        }
      })
        .then(res => {
          if (res.status == 200) {
            val.value = res.data.count;
          }
        })
        .catch(err => {});
      },
     initTrafficData() {
       if(this.markers.length){
         this.Map.remove(this.markers);
          this.markers=[];
       }
      this.$axios({
        method: "get",
        url: "https://restapi.amap.com/v3/place/around",
        params: {
          key: window.mapKey,
          location: this.location,
          radius: this.circle,
          keywords: this.bus,
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.listData.trafficList=res.data.pois;
            this.drawStartMarker();
            this.addMarker();
          }
        })
        .catch(err => {});
      },
      removeMarkers(){
          this.Map.remove(markers);
      },
      addMarker() {
         let _this = this;
         let _marker = new AMap.Marker({
            position: [_this.location.split(",")[0], _this.location.split(",")[1]],
            //icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
            map: _this.Map,
            //offset: new AMap.Pixel(-13, -30),
            //anchor:'bottom-center'
           // title: _this.locationName,
            //size:12
          });
          _marker.content = `<p style="margin:0 15px;color:#fff">${_this.locationName}<p>`;
          _marker.on('click', _this.markerClick);
          _this.markers.push(_marker)
          _marker.emit('click', {target: _marker});
      },
      drawStartMarker(){
            let _this = this;
            _this.listData.trafficList.forEach(item=>{
                let _position1 = [item.location.split(',')[0], item.location.split(',')[1]];
                let _marker = new AMap.Marker({
                    position: new AMap.LngLat(_position1[0], _position1[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    map: _this.Map,
                });
                _marker.content = `<p style="margin:0 15px;color:#fff">${item.name}<p>`;
                _marker.on('click', _this.markerClick);
                 _this.markers.push(_marker)
            })
        },
        markerClick(e) {
            this.infoWindow.setContent(e.target.content);
            this.infoWindow.open(this.Map, e.target.getPosition());
        },
  }
}
</script>

<style scoped lang='less'>
 .content-box{
    width:1200px;
    margin: auto;
    border: 1px solid #EBECF0;
    margin-bottom: 20px;
    .mapList{
      margin-top:20px;
      .pic{
        width: 100%;
        padding:10px;
        padding-top:0;
        height: 580px;
        .traffic-map-container{
          width: 100%;
          height: 100%;
        }
      }
      .rightList{
        height: 475px;
        overflow: auto;
      }
      .header{
        margin-bottom: 0;
      }
      .traffic-list{
        border-bottom:1px solid #F0F2F5 ;
        height: 48px;
        line-height: 48px;
        font-size: 12px;
        color: #3D4966;
      }
    }
    .echart-canyin{
      height: 400px;
    }
    .eat-num{
      border-right: 1px solid #EBECF0;
      padding-left:20px;
      &.ivu-col-span-5{
        width:20% !important;
      }
      &:last-child{
          border-right:none;
      }
      .num{
        font-size: 36px;
        color: #121C33;
        letter-spacing: 0;
      }
      .subTitle{
        font-size: 18px;
        color: #3D4966;
        letter-spacing: 0;
      }
    }
    .header{
      height: 60px;
      background: #F2F4F7;
      margin-bottom: 15px;
      .col-list{
        height: 100%;
          .col-title{
            display: flex;
            align-items: center;
            height: 100%;
            .label{
              width: 5px;
              background: #03A971;
              height: 100%;
              margin-right: 10px;
            }
            .title-content{
              flex:1;
              font-size: 22px;
                color: #121C33;
                letter-spacing: 0;
            }
          }
          .col-select{
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: flex-end;
            margin-right:10px;
          }
      }
      
     
    }
  }
</style>
