<template>
  <div class="behav_container">
      <div class="behaiv_title">基本行为>{{centerTitle}}>{{rightTitle}}</div>
      <div class="behaiv_content">

         <transition name="slide-fade">
            <div class="left" v-show="ifShowLeft">
                <div class="one"></div>
                <div class="jianxi"></div>
                <div class="two" ref="yuanquanDom">
                    <div class="xiesanjiao1" @mousedown="clickKuai(0)">
                        <div class="title_text1" id="title_text1">生理需求</div>
                    </div>
                    <div class="xiesanjiao2" @mousedown="clickKuai(1)">
                        <div class="title_text2" id="title_text2">安全需求</div>
                    </div>
                    <div class="xiesanjiao3" @mousedown="clickKuai(2)">
                        <div class="title_text3" id="title_text3">爱与归属</div>
                    </div>
                    <div class="xiesanjiao4" @mousedown="clickKuai(3)">
                        <div class="title_text4" id="title_text4">被人尊重</div>
                    </div>
                    <div class="xiesanjiao5" @mousedown="clickKuai(4)">
                        <div class="title_text5" id="title_text5">自我实现</div>
                    </div>
                </div>
                <div class="xiesanjiao4_1" v-if="ifShowmodel">
                </div>
                <img :src="activeImg" class="activeImg" v-if="ifShowActiveImg" @click="hideCenterRight">
                <div class="jianxi1"></div>
                <div class="three"></div>
                <div class="four">
                    <img :src="renImg" class="renImg">
                </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div class="center" v-show="ifShowCenter">
                <div class="shanImg0">
                    <img :src="shanImg0" class="img">
                </div>
                <div class="shanImg1" @click="clicekCenter(0,CenterObj.type)">
                    <div class="shanImgText1">
                        {{CenterObj.key1}}
                    </div>
                    <img :src="shanImg1" class="img">
                </div>
                <div class="shanImg2" @click="clicekCenter(1,CenterObj.type)">
                    <div class="shanImgText2">
                        {{CenterObj.key2}}
                    </div>
                    <img :src="shanImg2" class="img">
                </div>
                <div class="shanImg3" @click="clicekCenter(2,CenterObj.type)">
                    <div class="shanImgText3">
                        {{CenterObj.key3}}
                    </div>
                    <img :src="shanImg3" class="img">
                </div>
                <div class="shanImg4" @click="clicekCenter(3,CenterObj.type)">
                    <div class="shanImgText4">
                        {{CenterObj.key4}}
                    </div>
                    <img :src="shanImg4" class="img">
                </div>
                <div class="shanImg5" @click="clicekCenter(4,CenterObj.type)">
                    <div class="shanImgText5">
                        {{CenterObj.key5}}
                    </div>
                    <img :src="shanImg5" class="img">
                </div>
                <div class="shanImg6" @click="clicekCenter(5,CenterObj.type)">
                    <div class="shanImgText6">
                        {{CenterObj.key6}}
                    </div>
                    <img :src="shanImg6" class="img">
                </div>
                <div class="shanImg7" @click="clicekCenter(6,CenterObj.type)">
                    <div class="shanImgText7">
                        {{CenterObj.key7}}
                    </div>
                    <img :src="shanImg7" class="img">
                </div>
                <div class="shanImg8">
                    <img :src="shanImg8" class="img">
                </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div class="right" v-show="ifShowRight">
                <div class="oneRight">
                    <img :src="youbanImg1">
                </div>
                <div class="twoRight">
                    <div class="child_twoRight1">{{rightObj.key1}}</div>
                    <div class="child_twoRight2">{{rightObj.key2}}</div>
                    <div class="child_twoRight3">{{rightObj.key3}}</div>
                    <div class="child_twoRight4">{{rightObj.key4}}</div>
                    <div class="child_twoRight5">{{rightObj.key5}}</div>
                </div>
            </div>
          </transition>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        renImg:require("../../assets/images/behavGraph/ren.png"),
        activeImg:require("../../assets/images/behavGraph/you_ban_yuan1.png"),
        shanImg0:require("../../assets/images/behavGraph/shang.png"),
        shanImg1:require("../../assets/images/behavGraph/路径1.png"),
        shanImg2:require("../../assets/images/behavGraph/路径2.png"),
        shanImg3:require("../../assets/images/behavGraph/路径3.png"), 
        shanImg4:require("../../assets/images/behavGraph/路径4.png"), 
        shanImg5:require("../../assets/images/behavGraph/路径6.png"), 
        shanImg6:require("../../assets/images/behavGraph/路径7.png"), 
        shanImg7:require("../../assets/images/behavGraph/路径.png"),
        shanImg8:require("../../assets/images/behavGraph/xia.png"),
        youbanImg1: require("../../assets/images/behavGraph/you_ban_yuan.png"),
        centerTitle:'被人尊重的需求',
        rightTitle:'信用',
        ifShowCenter:false,
        ifShowRight:false,
        ifShowmodel:false,
        ifShowActiveImg:false,
        ifShowLeft:true,
        CenterObj:{},
        zzCenterObj:{
            key1:'久仰',
            key2:'仰视',
            key3:'侮蔑',
            key4:'信用',
            key5:'冷淡',
            key6:'钦佩',
            key7:'拥戴',
            type:'brzz'
        },
        qpRightObj:{
            key1:'敬重',  
            key2:'敬佩',
            key3:'敬仰',
            key4:'敬爱',
            key5:'佩服' 
        },
        ydRightObj:{
            key1:'爱护',  
            key2:'爱惜',
            key3:'拥护',
            key4:'爱戴',
            key5:'拥爱' 
        },
        aqCenterObj:{
            key1:'搬家',
            key2:'看病',
            key3:'救护',
            key4:'急诊',
            key5:'婚检',
            key6:'安检',
            key7:'安定',
            type:'aqxq'
        },
        aqBjRightObj:{
            key1:'货拉拉',  
            key2:'快狗打车',
            key3:'兄弟搬家',
            key4:'58同城',
            key5:'四方搬家' 
        },
        aqKbRightObj:{
            key1:'平安好医生',  
            key2:'1药网',
            key3:'叮当快药',
            key4:'人为用药',
            key5:'妙寻医生'   
        },
        ajRightObj:{
            key1:'安装',  
            key2:'安顿',
            key3:'安息',
            key4:'安局',
            key5:'安济' 
        },
        adRightObj:{
            key1:'悠闲',  
            key2:'清静',
            key3:'平安',
            key4:'安好',
            key5:'安祥' 
        },
        slCenterObj:{
            key1:'吃饭',
            key2:'吃早餐',
            key3:'吃晚餐',
            key4:'吃快餐',
            key5:'看电影',
            key6:'唱歌',
            key7:'吃午餐',
            type:'slxq'
        },
        slcfRightObj:{
            key1:'大众点评',  
            key2:'饿了么',
            key3:'美团',
            key4:'豆果',
            key5:'下厨房' 
        },
        slcgRightObj:{
            key1:'ktv',  
            key2:'中国好声音',
            key3:'金话筒',
            key4:'网易云音乐',
            key5:'全名K歌' 
        },
        zwCenterObj:{
            key1:'冥想',
            key2:'冒险',
            key3:'越野',
            key4:'讲课',
            key5:'跑酷',
            key6:'演讲',
            key7:'革命',
            type:'zwsx'
        },
        zwmxRightObj:{
            key1:'Now冥想',  
            key2:'潮汐',
            key3:'Peace',
            key4:'GEIST',
            key5:'' 
        },
        zwmaoxianRightObj:{
            key1:'滑雪大冒险',  
            key2:'宝宝开车大冒险',
            key3:'小云朵大冒险',
            key4:'恐龙宝贝大冒险',
            key5:'' 
        },
        zwyueyeRightObj:{
            key1:'越野赛车',  
            key2:'摩托车越野赛车3D',
            key3:'越野摩托车赛车',
            key4:'疯狂越野车',
            key5:'阿拉斯加越野赛车 ' 
        },
        zwjiangkeRightObj:{
            key1:'coursera',  
            key2:'网易云课堂',
            key3:'云学堂',
            key4:'腾讯课堂',
            key5:'MOOC' 
        },
        zwpaokuRightObj:{
            key1:'地铁跑酷',  
            key2:'圣诞老人跑酷',
            key3:'全城跑酷',
            key4:'跑酷自行车2',
            key5:'跑酷' 
        },
        zwyanjiangRightObj:{
            key1:'讲演',  
            key2:'演说',
            key3:'演讲',
            key4:'阐述',
            key5:'解说' 
        },
        zwgemingRightObj:{
            key1:'革命',  
            key2:'运动',
            key3:'革新',
            key4:'改良',
            key5:'反动' 
        },
        aguiCenterObj:{
            key1:'入伍',
            key2:'携手',
            key3:'开车',
            key4:'旅行',
            key5:'赠送',
            key6:'相守',
            key7:'归宿',
            type:'aygs'
        },
        aguiruwuRight:{
            key1:'全国征兵网',  
            key2:'参军入伍',
            key3:'征兵',
            key4:'励志参军',
            key5:'' 
        },
        aguixieshouRight:{
            key1:'陌陌',  
            key2:'一直播',
            key3:'虎牙',
            key4:'斗鱼',
            key5:'抖音' 
        },
        aguikaicheRight:{
            key1:'百度',  
            key2:'高德',
            key3:'苹果',
            key4:'谷歌',
            key5:'搜狗' 
        },
        aguiyouxingRight:{
            key1:'邦游行',  
            key2:'游行记录',
            key3:'美食节游行',
            key4:'',
            key5:'' 
        },
        aguixiangshouRight:{
            key1:'相伴',  
            key2:'相陪',
            key3:'相随',
            key4:'厮守',
            key5:'陪伴' 
        },
        aguiguisuRight:{
            key1:'归宿',  
            key2:'抵达',
            key3:'到达',
            key4:'回归',
            key5:'归港' 
        },   
        aguizengsongRight:{
            key1:'淘宝',  
            key2:'咸鱼',
            key3:'京东',
            key4:'当当',
            key5:'亚马逊' 
        },
        rightObj:{},
        zzrightjiuyangObj:{
            key1:'知乎',
            key2:'抖音',
            key3:'百度',
            key4:'淘宝',
            key5:'抖音' 
        }
    }
  },
  mounted(){
      this.CenterObj = this.zzCenterObj;
      this.rightObj = this.zzrightjiuyangObj;
      this.changeStyleText();
  },
  methods:{
      changeStyleText(){
        $('#title_text1').show().arctext({
            radius:180
        })
        $('#title_text2').show().arctext({
            radius:180
        })
        $('#title_text3').show().arctext({
            radius:180
        })
        $('#title_text4').show().arctext({
            radius:180
        })
        $('#title_text5').show().arctext({
            radius:180
        })
      },
      clickKuai(arg){
          let yuanquanDom = this.$refs.yuanquanDom;
          setTimeout(()=>{
            let _this = this;
            this.ifShowmodel = true;
            this.ifShowActiveImg = true; 
            this.ifShowCenter = true;
            this.ifShowRight = true;
            this.ifShowLeft = false;
            setTimeout(()=>{
                _this.ifShowLeft = true;
            },0);
          },1900);
          if(arg == 0){ //生理需求
            yuanquanDom.style="transform: rotate(215deg);transition: transform 2s;";   
            setTimeout(()=>{
                this.CenterObj = this.slCenterObj;
                this.rightObj = this.slcfRightObj;
                this.centerTitle = '生理上的需求';
                this.rightTitle = '吃快餐';
            },2200);
          }
          else if(arg == 1){ //安全需求
           yuanquanDom.style="transform: rotate(140deg);transition: transform 2s;";
           setTimeout(()=>{
               this.CenterObj = this.aqCenterObj;
               this.rightObj = this.aqKbRightObj;
               this.centerTitle = '安全上的需求';
               this.rightTitle = '急诊';
           },2200);
          }
          else if(arg == 2){ //爱与归属  
            yuanquanDom.style="transform: rotate(68deg);transition: transform 2s;";
            setTimeout(()=>{
                this.CenterObj = this.aguiCenterObj;
                this.rightObj = this.aguiyouxingRight;
                this.centerTitle = '爱与归属需求';
                this.rightTitle = '旅行';
            },2200);
          }
          else if(arg == 3){//被人尊重
            yuanquanDom.style="transform: rotate(0deg);transition: transform 2s;";
            setTimeout(()=>{
               this.CenterObj = this.zzCenterObj;
               this.rightObj = this.zzrightjiuyangObj;
               this.centerTitle = '被人尊重的需求';
               this.rightTitle = '信用';
           },2200);
          }
          else if(arg == 4){ //自我实现
            yuanquanDom.style="transform: rotate(289deg);transition: transform 2s;";
            setTimeout(()=>{
                this.CenterObj = this.zwCenterObj;
                this.rightObj = this.zwjiangkeRightObj;
                this.centerTitle = '自我实现的需求';
                this.rightTitle = '讲课';
            },2200);
          }
      },
      clicekCenter(arg1,arg2){
          if(arg1 == 0){
              switch (arg2) {
                  case 'brzz':    //被人尊重
                  this.rightObj = this.zzrightjiuyangObj;
                  this.rightTitle = '久仰';
                      break;
                  case 'aqxq':    //安全需求 
                  this.rightObj = this.aqBjRightObj;
                  this.rightTitle = '搬家';
                      break;
                  case 'slxq':    //生理需求 
                  this.rightObj = this.slcfRightObj;
                  this.rightTitle = '吃饭';
                      break;
                  case 'zwsx':    //自我实现 
                  this.rightObj = this.zwmxRightObj;
                  this.rightTitle = '冥想';
                      break;
                  case 'aygs':    //爱与归属  
                  this.rightObj = this.aguiruwuRight;
                  this.rightTitle = '入伍';
                      break;
                  default:
                      break;
              }
              let oldCenterObj = this.CenterObj;
              let newCenterObj = {};
              for(var attr in oldCenterObj){
                  if(attr == 'key1'){
                      newCenterObj['key1'] = oldCenterObj['key4'];
                  }
                  else if(attr == 'key4'){
                      newCenterObj['key4'] = oldCenterObj['key1'];
                  }
                  else{
                      newCenterObj[attr] = oldCenterObj[attr];
                  }
              }
              this.CenterObj = newCenterObj;
          }
          else if(arg1 == 1){
              switch (arg2) {
                  case 'brzz':    //被人尊重
                  this.rightObj = this.zzrightjiuyangObj;
                  this.rightTitle = '仰视';
                      break;
                  case 'aqxq':    //安全需求
                  this.rightObj = this.aqKbRightObj;
                  this.rightTitle = '看病';
                      break;
                  case 'slxq':    //生理需求
                  this.rightObj = this.slcfRightObj;
                  this.rightTitle = '吃早餐';
                      break;
                  case 'zwsx':    //自我实现 
                  this.rightObj = this.zwmaoxianRightObj;
                  this.rightTitle = '冒险';
                      break;
                  case 'aygs':    //爱与归属 
                  this.rightObj = this.aguixieshouRight;
                  this.rightTitle = '携手';
                      break;
                  default:
                      break;
              }
              let oldCenterObj = this.CenterObj;
              let newCenterObj = {};
              for(var attr in oldCenterObj){
                  if(attr == 'key2'){
                      newCenterObj['key2'] = oldCenterObj['key4'];
                  }
                  else if(attr == 'key4'){
                      newCenterObj['key4'] = oldCenterObj['key2'];
                  }
                  else{
                      newCenterObj[attr] = oldCenterObj[attr];
                  }
              }
              this.CenterObj = newCenterObj;
          }
          else if(arg1 == 2){
              switch (arg2) {
                  case 'brzz':    //被人尊重
                  this.rightObj = this.zzrightjiuyangObj;
                  this.rightTitle = '侮蔑';
                      break;
                  case 'aqxq':    //安全需求
                  this.rightObj = this.aqKbRightObj;
                  this.rightTitle = '救护';
                      break;
                  case 'slxq':    //生理需求
                  this.rightObj = this.slcfRightObj;
                  this.rightTitle = '吃晚餐';
                      break;
                  case 'zwsx':    //自我实现 
                  this.rightObj = this.zwyueyeRightObj;
                  this.rightTitle = '越野';
                      break;
                  case 'aygs':    //爱与归属 
                  this.rightObj = this.aguikaicheRight;
                  this.rightTitle = '开车';
                      break;
                  default:
                      break;
              }
              let oldCenterObj = this.CenterObj;
              let newCenterObj = {};
              for(var attr in oldCenterObj){
                  if(attr == 'key3'){
                      newCenterObj['key3'] = oldCenterObj['key4'];
                  }
                  else if(attr == 'key4'){
                      newCenterObj['key4'] = oldCenterObj['key3'];
                  }
                  else{
                      newCenterObj[attr] = oldCenterObj[attr];
                  }
              }
              this.CenterObj = newCenterObj;
          }
          else if(arg1 == 3){
              switch (arg2) {
                  case 'brzz':    //被人尊重
                  this.rightObj = this.zzrightjiuyangObj;
                  this.rightTitle = '信用';
                      break;
                  case 'aqxq':    //安全需求
                  this.rightObj = this.aqKbRightObj;
                  this.rightTitle = '急诊';
                      break;
                  case 'slxq':    //生理需求
                  this.rightObj = this.slcfRightObj;
                  this.rightTitle = '吃快餐';
                      break;
                  case 'zwsx':    //自我实现  
                  this.rightObj = this.zwjiangkeRightObj;
                  this.rightTitle = '讲课';
                      break;
                  case 'aygs':    //爱与归属 
                  this.rightObj = this.aguiyouxingRight;
                  this.rightTitle = '旅行';
                      break;
                  default:
                      break;
              }
              let oldCenterObj = this.CenterObj;
              let newCenterObj = {};
              for(var attr in oldCenterObj){
                  if(attr == 'key4'){
                      newCenterObj['key4'] = oldCenterObj['key4'];
                  }
                  else if(attr == 'key4'){
                      newCenterObj['key4'] = oldCenterObj['key4'];
                  }
                  else{
                      newCenterObj[attr] = oldCenterObj[attr];
                  }
              }
              this.CenterObj = newCenterObj;
          }
          else if(arg1 == 4){
              switch (arg2) {
                  case 'brzz':    //被人尊重
                  this.rightObj = this.zzrightjiuyangObj;
                  this.rightTitle = '冷淡';
                      break;
                  case 'aqxq':    //安全需求
                  this.rightObj = this.aqKbRightObj;
                  this.rightTitle = '婚检';
                      break;
                  case 'slxq':    //生理需求
                  this.rightObj = this.slcfRightObj;
                  this.rightTitle = '看电影'; 
                      break;
                  case 'zwsx':    //自我实现
                  this.rightObj = this.zwpaokuRightObj;
                  this.rightTitle = '跑酷';
                      break;
                  case 'aygs':    //爱与归属 
                  this.rightObj = this.aguizengsongRight;
                  this.rightTitle = '赠送';
                      break;
                  default:
                      break;
              }
              let oldCenterObj = this.CenterObj;
              let newCenterObj = {};
              for(var attr in oldCenterObj){
                  if(attr == 'key5'){
                      newCenterObj['key5'] = oldCenterObj['key4'];
                  }
                  else if(attr == 'key4'){
                      newCenterObj['key4'] = oldCenterObj['key5'];
                  }
                  else{
                      newCenterObj[attr] = oldCenterObj[attr];
                  }
              }
              this.CenterObj = newCenterObj;
          }
          else if(arg1 == 5){
              switch (arg2) {
                  case 'brzz':    //被人尊重
                  this.rightObj = this.qpRightObj;
                  this.rightTitle = '钦佩';
                      break;
                  case 'aqxq':    //安全需求  
                  this.rightObj = this.ajRightObj;
                  this.rightTitle = '安检';
                      break;
                  case 'slxq':    //生理需求  
                  this.rightObj = this.slcgRightObj;
                  this.rightTitle = '唱歌'; 
                      break;
                  case 'zwsx':    //自我实现 
                  this.rightObj = this.zwyanjiangRightObj;
                  this.rightTitle = '演讲';
                      break;
                  case 'aygs':    //爱与归属 
                  this.rightObj = this.aguixiangshouRight;
                  this.rightTitle = '相守';
                      break;
                  default:
                      break;
              }
              let oldCenterObj = this.CenterObj;
              let newCenterObj = {};
              for(var attr in oldCenterObj){
                  if(attr == 'key6'){
                      newCenterObj['key6'] = oldCenterObj['key4'];
                  }
                  else if(attr == 'key4'){
                      newCenterObj['key4'] = oldCenterObj['key6'];
                  }
                  else{
                      newCenterObj[attr] = oldCenterObj[attr];
                  }
              }
              this.CenterObj = newCenterObj;
          }
          else if(arg1 == 6){
              switch (arg2) {
                  case 'brzz':    //被人尊重
                  this.rightObj = this.ydRightObj;
                  this.rightTitle = '拥戴';
                      break;
                  case 'aqxq':    //安全需求 
                  this.rightObj = this.adRightObj;
                  this.rightTitle = '安定';
                      break;
                  case 'slxq':    //生理需求
                  this.rightObj = this.slcfRightObj;
                  this.rightTitle = '吃午餐'; 
                      break;
                  case 'zwsx':    //自我实现 
                  this.rightObj = this.zwgemingRightObj;
                  this.rightTitle = '革命';
                      break;
                  case 'aygs':    //爱与归属 
                  this.rightObj = this.aguiguisuRight;   
                  this.rightTitle = '归宿';
                      break;
                  default:
                      break;
              }
              let oldCenterObj = this.CenterObj;
              let newCenterObj = {};
              for(var attr in oldCenterObj){
                  if(attr == 'key7'){
                      newCenterObj['key7'] = oldCenterObj['key4'];
                  }
                  else if(attr == 'key4'){
                      newCenterObj['key4'] = oldCenterObj['key7'];
                  }
                  else{
                      newCenterObj[attr] = oldCenterObj[attr];
                  }
              }
              this.CenterObj = newCenterObj;
          }
      },
      hideCenterRight(){
            this.ifShowmodel = false;
            this.ifShowActiveImg = false; 
            this.ifShowCenter = false;
            this.ifShowRight = false;
      }
  }
}
</script>
<style scoped lang="less">
.behav_container{
    width: 100%;
    height: 1080px;
    background: #0C0E47;
    background-image: url('../../assets/images/behavGraph/content_bgi.png');
    background-position: center;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .behaiv_title{
        position: absolute;
        top: 40px;
        left: 50px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #02D7FF;
    }
    .behaiv_content{
        margin-top: -290px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 900px;
        .slide-fade-enter-active {
            transition: all .8s ease;
        }
        .slide-fade-leave-active {
            transition: all 1.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .slide-fade-enter, .slide-fade-leave-to{
            transform: translateX(20px);
            opacity: 0;
        }
        .left{
            width: 450px;
            height: 450px;
            position: relative;
            .one,.two,.three,.four{
                position: absolute;
            }
            .one{
                top: 50%;
                left: 50%;
                transform: translate(-50.5%,-50.5%);
                width: 104%;
                height: 104%;
                border-radius: 50%;
                border: 5px solid #11ABD0;
            }
            .jianxi{
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                position: absolute;
                width: 98%;
                height: 98%;
                border-radius: 50%;
                border: 4px solid rgba(12,14,71);
            }
            .two{
                top: 50%;
                left: 50%;
                width: 99%;
                height: 99%;
                margin-left:-50%;
                margin-top: -50%;
                border-radius: 50%;
                overflow: hidden;
                .xiesanjiao1,.xiesanjiao2,.xiesanjiao3,.xiesanjiao4,.xiesanjiao5{
                    width: 68%;
                    height: 232px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform-origin: left top;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .xiesanjiao1{
                    background-color: #11ABD0;
                    -webkit-transform: rotate(75deg) skew(-17deg, 35deg);
                    -ms-transform: rotate(75deg) skew(-17deg, 35deg);
                    transform: rotate(75deg) skew(-17deg, 35deg);
                    .title_text1{
                        text-align: center;
                        position: absolute;
                        left: 74px;
                        top: 82px;
                        color: #0C0E47;
                        font-size: 19px;
                        -webkit-transform: rotate(136deg);
                        transform: rotate(124deg) skew(-17deg, 7deg) translate3d(22px, -2px, 88px);
                    }
                }
                .xiesanjiao2{
                    background-color: #11ABD0;
                    -webkit-transform: rotate(150deg) skew(-17deg, 35deg);
                    -ms-transform: rotate(150deg) skew(-17deg, 35deg);
                    transform: rotate(150deg) skew(-17deg, 35deg);
                    .title_text2{
                        text-align: center;
                        position: absolute;
                        left: 74px;
                        top: 82px;
                        color: #0C0E47;
                        font-size: 19px;
                        -webkit-transform: rotate(136deg);
                        transform: rotate(124deg) skew(-17deg, 7deg) translate3d(22px, -2px, 88px);
                    }
                }
                .xiesanjiao3{
                    background-color: #11ABD0;
                    -webkit-transform: rotate(216deg) skew(-17deg, 44deg);
                    -ms-transform: rotate(216deg) skew(-17deg, 44deg);
                    transform: rotate(216deg) skew(-17deg, 44deg);
                    .title_text3{
                        text-align: center;
                        position: absolute;
                        left: 52px;
                        top: 82px;
                        color: #0C0E47;
                        font-size: 19px;
                        -webkit-transform: rotate(136deg);
                        transform: rotate(121deg) skew(-21deg, 7deg) translate3d(22px, -2px, 88px);
                    }
                }
                .xiesanjiao4{
                    background-color: #11ABD0;
                    -webkit-transform: rotate(288deg) skew(-17deg, 38deg);
                    -ms-transform: rotate(288deg) skew(-17deg, 38deg);
                    transform: rotate(288deg) skew(-17deg, 38deg);
                    .title_text4{
                        text-align: center;
                        position: absolute;
                        left: 67px;
                        top: 82px;
                        color: #0C0E47;
                        font-size: 19px;
                        -webkit-transform: rotate(136deg);
                        transform: rotate(121deg) skew(-17deg, 7deg) translate3d(22px, -2px, 88px);
                    }
                }
                .xiesanjiao5{
                    background-color: #11ABD0;
                    -webkit-transform: rotate(360deg) skew(-17deg, 38deg);
                    -ms-transform: rotate(360deg) skew(-17deg, 38deg);
                    transform: rotate(360deg) skew(-17deg, 38deg);
                    .title_text5{
                        text-align: center;
                        position: absolute;
                        left: 67px;
                        top: 82px;
                        color: #0C0E47;
                        font-size: 19px;
                        -webkit-transform: rotate(136deg);
                        transform: rotate(122deg) skew(-17deg, 7deg) translate3d(22px, -2px, 88px);
                    }
                }
            }
            .activeImg{
                height: 96px;
                position: absolute;
                top: -176px;
                right: -51px;
                height: 180%;
                transform: scale(0.3); 
            }
            .xiesanjiao4_1{
                width: 68%;
                height: 343px;
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform-origin: left top;
                transform-origin: left top;
                background-color: rgba(12, 14, 71);
                -webkit-transform: rotate(288deg) skew(-17deg, 38deg);
                transform: rotate(288deg) skew(-24deg, 33deg);
            }
            .jianxi1{
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                position: absolute;
                width: 77%;
                height: 77%;
                border-radius: 50%;
                border: 5px solid rgba(12,14,71);
            }
            .three{
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 75%;
                height: 75%;
                border: 5px solid #11ABD0;
                border-radius: 50%;
                z-index: 9;
                background-color: rgba(12,14,71);
            }
            .four{
                top: 50%;
                left: 50%;
                width: 55%;
                height: 55%;
                transform: translate(-50%,-50%); 
                z-index: 10;
                .renImg{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .center{
            width: 180px;
            height: 55%;
            position: relative;
            .shanImg0,.shanImg1,.shanImg2,.shanImg3,.shanImg4,.shanImg5,.shanImg6,.shanImg7,.shanImg8{
                position: relative;
                width: 100%;
                height: 100px;
                &:hover{
                    cursor: pointer;
                }
                .img{
                    width: 100%;
                }
            }
            .shanImg0{
                position: absolute !important;
                transform: scale(0.2) rotate(-3deg);
                left: -94px;
                top: 13px;    
            }
            .shanImg8{
                position: absolute !important;
                -webkit-transform: scale(0.2);
                transform: scale(0.2) rotate(14deg);
                left: -104px;
                top: 391px;
            }
            .shanImg1{
                transform: scale(0.5);
                margin-left: -61px;
                margin-top: 20px;
            }
            .shanImgText1{
                position: absolute;
                transform: rotate(-31.91deg);
                font-family: PingFangSC-Regular;
                font-size: 23.56px;
                color: #29A4DD;
                top: 67px;
                left: 53px;
            }
            .shanImg2{
                transform: scale(0.5) rotate(2deg);
                margin-left: -36px;
                margin-top: -49px;
            }
            .shanImgText2{
                position: absolute;
                opacity: 0.6;
                transform: rotate(-21.9deg);
                font-family: PingFangSC-Regular;
                font-size: 23.56px;
                color: #29A4DD;
                top: 58px;
                left: 59px;
            }
            .shanImg3{
                margin-left: -17px;
                margin-top: -38px;
                -webkit-transform: rotate(9deg) scale(0.5);
                transform: rotate(4deg) scale(0.5);
            }
            .shanImgText3{
                position: absolute;
                opacity: 0.6;
                transform: rotate(-10.92deg);
                font-family: PingFangSC-Regular;
                font-size: 23.56px;
                color: #29A4DD;
                top: 58px;
                left: 59px;
            }
            .shanImg4{
                transform: scale(0.5) rotate(6deg);
                margin-left: -10px;
                margin-top: -32px;
            }
            .shanImgText4{
                top: 44px;
                left: 56px;
                position: absolute;
                opacity: 0.6;
                font-family: PingFangSC-Regular;
                font-size: 23.56px;
                color: #0C0E47;
            }
            .shanImg5{
                transform: scale(0.5) rotate(-1deg);
                margin-left: -21px;
                margin-top: -36px;
            }
            .shanImgText5{
                top: 39px;
                left: 56px;
                position: absolute;
                opacity: 0.6;
                font-family: PingFangSC-Regular;
                -webkit-transform: rotate(-10.92deg);
                transform: rotate(19.08deg);
                font-size: 23.56px;
                color: #29A4DD;
            }
            .shanImg6{
                transform: scale(0.5) rotate(-2deg);
                margin-left: -42px;
                margin-top: -49px;
            }
            .shanImgText6{
                top: 44px;
                left: 56px;
                position: absolute;
                opacity: 0.6;
                font-family: PingFangSC-Regular;
                -webkit-transform: rotate(-10.92deg);
                transform: rotate(26.08deg);
                font-size: 23.56px;
                color: #29A4DD;
            }
            .shanImg7{
                transform: scale(0.5) rotate(64deg);
                margin-left: -59px;
                margin-top: -44px;
            }
            .shanImgText7{
                top: 58px;
                left: 58px;
                position: absolute;
                opacity: 0.6;
                font-family: PingFangSC-Regular;
                -webkit-transform: rotate(-10.92deg);
                transform: rotate(-29.92deg);
                font-size: 23.56px;
                color: #29A4DD;
            }
        }
        .right{
            width: 420px;
            height: 57%;
            margin-left: 10px;
            display: flex;
            align-items: center;
            .oneRight{
                transform: scale(0.35) rotate(4deg);
                margin-left: -233px;
            }
            .twoRight{
                width: 400px;
                height: 100%;
                margin-left: -97px;
                background-image: url('../../assets/images/behavGraph/twoRight.png');
                background-size: 100% 100%;
                background-position: center;
                z-index: 9;
                position: relative;
                .child_twoRight1,.child_twoRight2,.child_twoRight3,.child_twoRight4,.child_twoRight5{
                    position: absolute;
                    color: #29A4DD;
                }
                .child_twoRight1{
                    top: 230px;
                    left: 50px;
                }
                .child_twoRight2{
                    top: 202px;
                    left: 146px;
                }
                .child_twoRight3{
                    top: 247px;
                    left: 143px;
                }
                .child_twoRight4{
                    top: 298px;
                    left: 143px;
                }
                .child_twoRight5{
                    top: 242px;
                    left: 250px;
                }
            }
        }
    }
}
</style>

