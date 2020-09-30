<template>
  <div class="elevation_info_container">
      <div class="menu_container">
          <div class="menu" @click="$router.go(-1)">
              <span>地理信息综合查询</span><span> > {{infTitle}}</span>
          </div>
      </div>
      <div class="title">地理信息综合查询</div>
      <div class="nav_container" ref="navArr">
        <div v-for="(item,index) in NavArrtext" :key="index" @click="changeComponent(index)">{{item}}</div>
      </div>
      <vAltitude v-if="showComponent == 0"></vAltitude>
      <vSunshi v-else-if="showComponent == 1"></vSunshi>
      <vRainfall v-else></vRainfall>
  </div>
</template>

<script>
import vAltitude from './altitudeInfo';
import vSunshi from './SunshineInfo';
import vRainfall from './rainfallInfo';
export default {
  data() {
    return {
        NavArrtext:['全国海拔信息','全国日照信息','全国降雨信息'],
        showComponent:0,
        infTitle:'全国海拔信息'
    };
  },
  components:{
      vAltitude,
      vSunshi,
      vRainfall
  },
  mounted(){
    if(this.$refs.navArr){
        var navArrDom = this.$refs.navArr.childNodes;
        navArrDom[0].style = 'border-bottom:3px #03A971 solid;color: #121C33;margin-bottom: -2px;';
    }
  },
  methods:{
      changeComponent(arg){
        if(arg == 0){
            this.infTitle = '全国海拔信息';
        }
        else if(arg == 1){
            this.infTitle = '全国日照信息';
        }
        else if(arg == 2){
            this.infTitle = '全国降雨信息';
        }
        this.showComponent = arg;
        if(this.$refs.navArr){
            var navArrDom = this.$refs.navArr.childNodes;
            for(var i = 0;i < navArrDom.length;i++){
                if(i == arg){
                    navArrDom[i].style = 'border-bottom:3px #03A971 solid;color: #121C33;margin-bottom: -2px;';
                }
                else{
                    navArrDom[i].style = 'border-bottom:none;color:#7A8499;';
                }
            }   
        }
      }
  }
}
</script>

<style scoped lang='less'>
.elevation_info_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .menu_container{
        width: 100%;
        height: 80px;
        background: #FFFFFF;
        box-shadow: 0 3px 6px 0 #F2F4F7;
        display: flex;
        align-items: center;
        justify-content: center;
        .menu{
            width: 1200px;
            height: 100%;
            span:nth-child(1){
                font-size: 16px;
                color: #121C33;
                letter-spacing: 0;
                line-height: 80px;
            }
            span:nth-child(2){
                font-size: 16px;
                color: #B8BECC;
                letter-spacing: 0;
                line-height: 80px;
            }
        }
        .menu{
            cursor: pointer;
        }
    }
    .title{
        width: 1200px;
        margin-top: 90px;
        margin-bottom: 40px;
        font-size: 36px;
        color: #121C33;
        text-align: center;
    }
    .nav_container {
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid rgba(184,190,204,0.41);
        margin-bottom: 41px;
        font-size: 18px;
        color: #7A8499;
        text-align: center;
        div {
            padding: 13px 0;
            box-sizing: border-box;
            font-size: 18px;
        }
    }
}
</style>
