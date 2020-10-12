<template>
  <div class="grecModel_container">
      <div class="grecModel_content">
          <div class="grecModel_title">
              <div class="title_text">步态详情</div>
              <div class="closeIcon" @click="closeWindow">
                  <img :src="closeImg" class="closeIconImg">
              </div>
          </div>
          <div class="grecModel_result">
              <div class="grecModel_result_top" v-if="ifShowMinren">对比目标</div>
              <div class="grecModel_result_bottom">
                  <div class="grec_left" v-if="ifShowMinren">
                      <div class="grec_left_top" ref="mubiaoDom" @click="changeDuibi(1)">
                          <div class="suolue_tu">
                              <img :src="pageData.mubiao.sulueImg" class="suolue_tu_img">
                          </div>
                          <div class="suolue_intro">
                              <div class="name_container">
                                  <span>姓名：</span>
                                  <span>{{pageData.mubiao.name}}</span>
                              </div>
                              <div class="time_container">
                                  <span>时间：</span>
                                  <span>{{pageData.mubiao.time}}</span>
                              </div>
                              <div class="jiansuoyuan_container">
                                  <span>检索源：</span>
                                  <span>{{pageData.mubiao.source}}</span>
                              </div>
                          </div>
                      </div>
                      <div class="grec_left_center">
                            <div class="matchScore_container">
                                <div class="score_text">{{pageData.sim}}</div>
                                <div class="score">匹配度</div>
                            </div>
                      </div>
                      <div class="grec_left_bottom">
                          <div class="grec_left_bottom_title">比对结果</div>
                          <div class="grec_left_bottom_content" ref="jieguoDom" @click="changeDuibi(2)">
                            <div class="suolue_tu">
                                <img :src="pageData.jieguo.sulueImg" class="suolue_tu_img">
                            </div>
                            <div class="suolue_intro">
                                <div class="time_container">
                                    <span>时间：</span>
                                    <span>{{pageData.jieguo.time}}</span>
                                </div>
                                <div class="jiansuoyuan_container">
                                    <span>检索源：</span>
                                    <span>{{pageData.jieguo.source}}</span>
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div class="grec_left nobody" v-if="ifShowNobody">
                    <div class="duibi_tagert">比对结果</div>
                    <div class="grec_left_top" ref="mubiaoDom" @click="changeDuibi(1)">
                        <div class="suolue_tu">
                            <img :src="nobodyPageData.mubiao.sulueImg" class="suolue_tu_img">
                        </div>
                        <div class="suolue_intro">
                            <div class="name_container">
                                <span>姓名：</span>
                                <span>{{nobodyPageData.mubiao.name}}</span>
                            </div>
                            <div class="time_container">
                                <span>时间：</span>
                                <span>{{nobodyPageData.mubiao.time}}</span>
                            </div>
                            <div class="jiansuoyuan_container">
                                <span>检索源：</span>
                                <span>{{nobodyPageData.mubiao.source}}</span>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div class="grec_right">
                      <div class="oper_btn_container">
                          <div class="oper_btn_content_container" ref="oper_btn_content">
                              <div class="btn1" :class="{'btn_active':currentId==btnStyObj.btn1}" @click="changeBtn(1)">场景图</div>
                              <div class="btn2" :class="{'btn_active':currentId==btnStyObj.btn2}" @click="changeBtn(2)">步态图</div>
                          </div>
                      </div>
                      <div class="image_container">
                          <div class="changjin_tu_container" :class="{'activeChangJin':whFlag}" v-show="ifshowChang">
                              <div class="changjingtu">
                                    <div class="swiper-container">
                                        <div class="swiper-wrapper">
                                            <div class="swiper-slide"  :style="{height:elHight}"  v-for="(item,index) in changjinImgArr" :key="index"><img :src="item.changjingImg" class="changjingImg" ref="changjingImg"></div>
                                        </div>
                                    </div>
                                    <!-- <el-carousel :height="elHight" arrow="never" indicator-position="none" :autoplay="setting.autoplay" :interval="setting.autoplaySpeed">
                                        <el-carousel-item v-for="(item,index) in changjinImgArr" :key="index">
                                            <img :src="item.changjingImg" class="changjingImg" ref="changjingImg">
                                        </el-carousel-item>
                                    </el-carousel> -->
                                    <!-- <Carousel
                                        v-model="value3"
                                        :autoplay="setting.autoplay"
                                        :autoplay-speed="setting.autoplaySpeed"
                                        :dots="setting.dots"
                                        :radius-dot="setting.radiusDot"
                                        :trigger="setting.trigger"
                                        :easing="setting.easing"
                                        :arrow="setting.arrow">
                                        <CarouselItem v-for="(item,index) in changjinImgArr" :key="index">
                                            <img :src="item.changjingImg" class="changjingImg">
                                        </CarouselItem>
                                    </Carousel> -->
                              </div>
                              <div class="bofang_btn_container">
                                  <img :src="bofangIcon" v-if="ifShowBofangIcon" class="bofangIcon" @click="bofangCjFn">
                              </div>
                          </div>
                          <div class="butai_tu_container" v-show="ifShowBu">
                              <img :src="butaImg" class="butaImg" @click="fadaButaiFn">
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { getImgSize } from "@/assets/js/imgPreviewBase64";
export default {
  data() {
    return {
        whFlag:false,
        closeImg: require("../../../assets/images/insightData/dialog_button_close_normal copy.png"),
        suolueTu:require("../../../assets/images/step/ps2.png"),
        bofangIcon:require("../../../assets/images/step/play.png"),
        currentId:1,
        btnStyObj:{
            btn1:1,
            btn2:2
        },
        ifshowChang:true,
        ifShowBu:false,
        butaImg:require("../../../assets/images/step/butai.jpg"),  
        changjinImgArr:[],
        value3: 0,
        setting: {
            autoplay: false,
            autoplaySpeed: 500,
            dots:false,
            radiusDot: false,
            trigger: 'click',
            arrow:false,
            easing:'ease',
        },
        pageData:null,
        nobodyPageData:null,
        ifShowBofangIcon:true,
        imgFa:'',
        ifShowMinren:false,
        ifShowNobody:false,
        elHight:40,
        mySwiper:null
    };
  },
  props:['detailData'],
  created(){
      var detailData = this.detailData;
      console.log(detailData,'detailData')
      if(detailData.data.Name == '陌生人'){
        this.ifShowNobody = true;
        this.ifShowMinren = false;
        var mubiaoObj = {
            sulueImg:detailData.data.PreviewImage || '',
            name:detailData.data.Name || '',
            time: this.$dateUtil.formatTime(detailData.timestamp,'yy-mm-dd hh:mm:ss') || '', 
            source:detailData.data.VideoSourceName || ''
        };
        this.nobodyPageData = {
            mubiao:mubiaoObj
        };
      }
      else{
        this.ifShowNobody = false;
        this.ifShowMinren = true;
        var mubiaoObj = {
            sulueImg:detailData.TargetFeature.PreviewImage || '',
            name:detailData.MonitorInfo.Name || '',
            time: this.$dateUtil.formatTime(detailData.timestamp,'yy-mm-dd hh:mm:ss') || '', 
            source:detailData.TargetFeature.VideoSourceName || ''
        };
        var jieguoObj = {
            sulueImg:detailData.data.PreviewImage || '',
            time:this.$dateUtil.formatTime(detailData.timestamp,'yy-mm-dd hh:mm:ss') || '',  
            source:detailData.data.VideoSourceName || ''
        };
        var sims = detailData.data.Sim || '';
        this.pageData = {
            mubiao:mubiaoObj,
            jieguo:jieguoObj,
            sim:(sims*100).toFixed()
        };
      }
  },
    mounted(){
        setTimeout(()=>{
            this.mySwiper = new Swiper ('.swiper-container', {
                loop: false, // 循环模式选项
                autoplay : {
                    delay:500
                },
                speed:500
            });
            this.mySwiper.autoplay.stop();
            // var detailData = this.detailData;
            // if(detailData.data.Name == '陌生人'){
            //     this.changeDuibi(1);
            // }
            // else{
            //     this.changeDuibi(2);
            // }  
            // console.log(this.mySwiper,'aaaaaaaaaa') ;  
        },300)
        var detailData = this.detailData;
        if(detailData.data.Name == '陌生人'){
            this.changeDuibi(1);
        }
        else{
            this.changeDuibi(2);
        }  
    },
  methods: {
      closeWindow(){
        this.$emit('closeWindow')
      },
      changeBtn(arg){
          this.value3 = 0;
          this.currentId = arg;
          if(arg == 1){
            this.ifshowChang = true;
            this.ifShowBu = false;
          }
          else if(arg == 2){
            this.ifshowChang = false;
            this.ifShowBu = true;
          }
      },
      bofangCjFn(){
        //   this.setting.autoplay = true;
          this.ifShowBofangIcon = false;
          console.log(this.mySwiper.autoplay.start());
          setTimeout(()=>{
            // this.setting.autoplay = false;
            this.mySwiper.autoplay.stop();
            this.ifShowBofangIcon = true;
          },3200)
      },
      fadaButaiFn(){
          let imgUrl = this.imgFa;
          window.open(imgUrl,'_blank');
      },
      changeDuibi(arg){
          console.log(arg)
          var detailData = this.detailData;
          var mubiaoDom = this.$refs.mubiaoDom;
          var jieguoDom = this.$refs.jieguoDom;
          this.changjinImgArr = [];
          this.ifshowChang=false;
          this.imgFa = '';
        //  this.mySwiper.autoplay.stop();
        //  this.ifShowBofangIcon = true;
         this.$nextTick(()=>{
            this.ifshowChang=true;
          if(arg == 1){
              if(this.currentId==1){
                  this.ifShowBu = false;
              }else{
                this.ifShowBu = true;
                this.ifshowChang=false;
              }
            if(mubiaoDom){
                mubiaoDom.style = 'border: 2px solid #03A971';
            }
            if(jieguoDom){
                jieguoDom.style = 'border: 1px solid #B8BECC';
            }
            var scenImaArr = [];
            var butaImg = '';
            if(detailData.data.Name == '陌生人'){
                scenImaArr = detailData.data.SceneImageUrls || [];
                butaImg = window.config.iconUrl + detailData.data.StepImageUrl;
            }
            else{
                scenImaArr = detailData.MonitorInfo.MonitorSceneImageUrls || [];
                butaImg = window.config.iconUrl + detailData.MonitorInfo.MonitorStepImageUrl;
            }
            var scenImaArr1 = [];
            for(var i=0;i<scenImaArr.length;i++){
                scenImaArr1.push({
                    changjingImg:window.config.iconUrl+scenImaArr[i]
                });
            }
            this.changjinImgArr = scenImaArr1; 
            let _this=this;  
            getImgSize(this.changjinImgArr[scenImaArr1.length-1].changjingImg).then(res => {
                _this.whFlag = res.flag;
            });
            this.$nextTick(()=>{
                this.$refs.changjingImg[scenImaArr1.length-1].onload = function(){
                    let changjingImgDom = _this.$refs.changjingImg[scenImaArr1.length-1].height;
                    _this.elHight = changjingImgDom + 'px';
                    // let elDom = document.getElementsByClassName('el-carousel__container')[0];
                    // $("el-carousel__container")[0].css({"height":changjingImgDom + 'px' + '!important'});
                }
            });   
            this.butaImg = butaImg;
            this.imgFa  = this.butaImg;
          }
          else if(arg == 2){
            if(this.currentId==1){
                this.ifShowBu = false;
            }else{
                this.ifShowBu = true;
                this.ifshowChang=false;
            }
            if(mubiaoDom){
                mubiaoDom.style = 'border: 1px solid #B8BECC';   
            }
            if(jieguoDom){
                jieguoDom.style = 'border: 2px solid #03A971';
            }
            var scenImaArr = detailData.data.SceneImageUrls || [];
            var scenImaArr1 = [];
            for(var j=0;j<scenImaArr.length;j++){
                scenImaArr1.push({
                    changjingImg:window.config.iconUrl+scenImaArr[j]
                });
            }
            this.changjinImgArr = scenImaArr1; 
            let _this=this;  
            getImgSize(this.changjinImgArr[scenImaArr1.length-1].changjingImg).then(res => {
                _this.whFlag = res.flag;
                console.log(_this.whFlag)
            });
            this.$nextTick(()=>{
                this.$refs.changjingImg[scenImaArr1.length-1].onload = function(){
                    let changjingImgDom = _this.$refs.changjingImg[scenImaArr1.length-1].height;
                    _this.elHight = changjingImgDom + 'px';
                }
            }); 
            this.butaImg = window.config.iconUrl + detailData.data.StepImageUrl;
            this.imgFa  = this.butaImg;
          }
         })
      }
  },
};
</script>
<style scoped lang="less">
.grecModel_container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 13;
    .grecModel_content{
        width: 1100px;
        max-height: 80%;
        overflow: scroll;
        background: #FFFFFF;
        .grecModel_title{
            width: 100%;
            height: 56px;
            border-bottom: 1px solid #F2F4F7;
            padding: 0 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title_text{
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #121C33;
            }
            .closeIcon{
                &:hover{
                    cursor: pointer;
                }
                width: 13.3px;
                height: 13.3px;
                .closeIconImg{
                    width: 100%;
                }
            }
        }
        .grecModel_result{
            width: 100%;
            height: 524px;
            padding: 20px;
            box-sizing: border-box;
            .grecModel_result_top{
                width: 100%;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #121C33;
                margin-bottom: 10px;
            }
            .grecModel_result_bottom{
                width: 100%;
                height: 446px;
                display: flex;
                justify-content: space-between;
                .grec_left{
                    width: 363px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .grec_left_top{
                        width: 100%;
                        height: 130px;
                        background: #FFFFFF;
                        border: 1px solid #B8BECC;
                        border-radius: 2px;
                        margin-bottom: 22px;
                        padding: 10px;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        &:hover{
                            cursor: pointer;
                        }
                        .suolue_tu{
                            width: 90px;
                            height: 100%;
                            overflow: hidden;
                            margin-right: 15px;
                            .suolue_tu_img{
                                width: 100%;
                            }
                        }
                        .suolue_intro{
                            flex: 1;
                            .name_container,.time_container,.jiansuoyuan_container{
                                width: 100%;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #121C33;
                                line-height: 28px;
                                word-break: break-all;
                            }
                        }
                    }
                    .grec_left_center{
                        width: 106px;
                        height: 106px;
                        background-image: url('../../../assets/images/JobFile/Ring.png');
                        background-size: cover;
                        background-position: center;
                        position: relative;
                        margin-bottom: 24px;
                        .matchScore_container{
                            position: absolute;
                            top: 55%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            .score_text{
                                font-size: 36px;
                                color: #03A971;
                                text-align: center;
                                line-height: 24px;
                            }
                            .score{
                                font-size: 12px;
                                color: #03A971;
                                text-align: center;
                                line-height: 24px;
                            }
                        }
                    }
                    .grec_left_bottom{
                        width: 100%;
                        .grec_left_bottom_title{
                            width: 100%;
                            margin-bottom: 10px;
                            font-family: PingFangSC-Regular;
                            font-size: 16px;
                            color: #121C33;
                        }
                        .grec_left_bottom_content{
                            width: 100%;
                            height: 130px;
                            padding: 10px;
                            box-sizing: border-box;
                            background: #FFFFFF;
                            border: 1px solid #B8BECC;
                            border-radius: 2px;
                            display: flex;
                            align-items: center;
                            &:hover{
                                cursor: pointer;
                            }
                            .suolue_tu{
                                width: 90px;
                                height: 100%;
                                margin-right: 15px;
                                overflow: hidden;
                                .suolue_tu_img{
                                    width: 100%;
                                }
                            }
                            .suolue_intro{
                                flex: 1;
                                .time_container,.jiansuoyuan_container{
                                    width: 100%;
                                    font-family: PingFangSC-Regular;
                                    font-size: 14px;
                                    color: #121C33;
                                    line-height: 28px;
                                    word-break: break-all;
                                }
                            }
                        }
                    }
                }
                .nobody{
                    justify-content: center;
                    .duibi_tagert{
                        width: 100%;
                        margin-bottom: 10px;
                        font-family: PingFangSC-Regular;
                        font-size: 16px;
                        color: #121C33;
                    }
                }
                .grec_right{
                    width: 658px;
                    height: 100%;
                    background: #FFFFFF;
                    border: 1px solid #B8BECC;
                    border-radius: 2px;
                    padding: 17px 20px;
                    box-sizing: border-box;
                    .oper_btn_container{
                        width: 100%;
                        height: 30px;
                        display: flex;
                        justify-content: center;
                        margin-bottom: 17px;
                        .oper_btn_content_container{
                            width: 130px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .btn1,.btn2{
                                width: 60px;
                                height: 30px;
                                background: #B8BECC;
                                border-radius: 3px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #FFFFFF;
                                text-align: center;
                                &:hover{
                                    cursor: pointer;
                                }
                            }
                            .btn_active{
                                background: #03A971;
                            }
                        }
                    }
                    .image_container{
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        .changjin_tu_container{
                            width: 205px;
                            &.activeChangJin{
                                width:410px;
                            }
                            height: 358px;
                            overflow: hidden;
                            .changjingtu{
                                width: 100%;
                                max-height: 322px;
                                overflow: hidden;
                                .changjingImg{
                                    width: 100%;
                                }
                            }
                            .bofang_btn_container{
                                width: 100%;
                                height: 40px;
                                opacity: 0.85;
                                margin-top:-1px;
                                background: #121C33;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                .bofangIcon{
                                    width: 26px;
                                    &:hover{
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                        .butai_tu_container{
                            width: 100%;
                            height: 236px;
                            margin-top: 78px;
                            .butaImg{
                                width: 100%;
                                &:hover{
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

