<template>
  <div class="pubOpin_container">
      <div class="banner_container">
          <div class="banner_content">
              <div class="banner_title">事件舆情分析</div>
              <div class="banner_desc">对某一网络事件在互联网上的整体传播情况，收集全网数据进行分析，自动生成多纬度全网事件分析报告</div>
              <div class="btn_container">
                  <div class="btn_one" @click="goExper">功能体验</div>
                  <div class="btn_two" @click="useNow">立即使用</div>
              </div>
          </div>
      </div>
      <div class="shijian_fenxi_one_container">
          <div class="shijian_fenxi_one_content">
              <div class="shijian_one_title">全网事件分析</div>
              <div class="shijian_one_desc">对某一网络事件在互联网上的整体传播情况，基于数据化的舆论分析，智能跟踪传播路径，事件走势、舆情总结等维度，助力解决舆论领域传播分析,评估与决策难题</div>
              <div class="shijian_imgtext_container">
                  <div class="shijian_txt_container">
                      <div class="shijian_txt_title">事件脉络</div>
                      <div class="shijian_txt_desc">通过大数据和人工智能深度学习实现舆论事件发展、演变，以及未来走向的自动化预测、研判，帮助客户用大数据技术手段实时预判风险和机遇，为企业决策提供有力参考</div>
                  </div>
                  <div class="shijian_img_container">
                      <img :src="shijianImg" class="shijianImg">
                  </div>
              </div>
          </div>
      </div>
      <div class="shijian_fenxi_two_container">
          <div class="shijia_fenxi_two_content">
              <div class="shijia_fenxi_two_img_container">
                  <img :src="shijianImg1" class="shijianImg1">
              </div>
              <div class="shijian_fenxi_two_txt_container">
                  <div class="shijian2_title">事件趋势</div>
                  <div class="shijian2_desc">当突发舆情事件时，本系统可以回溯突发舆情事件相关数据信息，宏观分析整体舆情事件，预测舆情发展趋势，为进一步舆情应对提供决策参考</div>
              </div>
          </div>
      </div>
      <div class="shijian_fenxi_three_container">
          <div class="shijian_fenxi_content">
              <div class="shijian3_txt_container">
                  <div class="shijian3_title">传播路径</div>
                  <div class="shijian3_desc">对所有文章内容进行情感值判断，根据正面倾向占比来定义媒体与企业的关系，属于何种范围</div>
              </div>
              <div class="shijian3_img_container">
                  <img :src="shijianImg3" class="shijian3_img">
              </div>
          </div>
      </div>
      <div class="shijian4_oper_container">
          <div class="oper_title">即刻获舆情追踪能力</div>
          <div class="oper_desc">快速与我们取得联系，请点击下方的合作咨询</div>
          <div class="oper_btn" @click="jump1">合作咨询</div>
      </div>
  </div>
</template>
<script>
export default {
  name:'pubOpin',
  data() {
      return {
          shijianImg:require('../../assets/images/pubOpin/shijianImg1.png'),
          shijianImg1:require('../../assets/images/pubOpin/diannao.png'),
          shijianImg3:require('../../assets/images/pubOpin/shijian3.png')
      }
  },
  methods:{
        useNow(){
            window.open(window.config.url+'/sophiaManager/sysindex.html','_blank');
        },
        jump1(){
            let routerUrl = this.$router.resolve({
                path:'/zixun',
            });
            window.open(routerUrl.href,'_blank')
        },
        goExper(){
            this.$router.push({
                path:'/pubOpinExper'
            });
        }
  }
};
</script>
<style lang="less">
.pubOpin_container{
    width: 100%;
    .banner_container{
        width: 100%;
        height: 350px;
        background-image: url('../../assets/images/pubOpin/banner.png');
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .banner_content{
            width: 1200px;
            height: 100%;
            .banner_title{
                width: 100%;
                margin-top: 81px;
                font-family: PingFangSC-Medium;
                font-size: 30px;
                color: #FFFFFF;
                margin-bottom: 15px;
            }
            .banner_desc{
                width: 496px;
                margin-bottom: 40px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #FFFFFF;
                line-height: 28px;
            }
            .btn_container{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .btn_one,.btn_two{
                    width: 120px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #FFFFFF;
                }
                .btn_one{
                    background: #03A971;
                    border-radius: 3px;
                    margin-right: 40px;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .btn_two{
                    border: 1px solid #FFFFFF;
                    border-radius: 3px;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .shijian_fenxi_one_container{
        width: 100%;
        height: 598px;
        background-image: url('../../assets/images/pubOpin/weitu1.png');
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        .shijian_fenxi_one_content{
            width: 1200px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .shijian_one_title{
                margin-top: 60px;
                margin-bottom: 11px;
                font-family: PingFangSC-Regular;
                font-size: 26px;
                color: #121C33;
            }
            .shijian_one_desc{
                width: 566px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #7A8499;
                line-height: 26px;
                text-align: center;
                margin-bottom: 73px;
            }
            .shijian_imgtext_container{
                width: 1200px;
                height: 305px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .shijian_txt_container{
                    width: 450px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .shijian_txt_title{
                        width: 100%;
                        font-family: PingFangSC-Semibold;
                        font-size: 22px;
                        color: #121C33;
                        padding-left: 11px;
                        box-sizing: border-box;
                        border-left: #03A971 3px solid;
                        margin-bottom: 15px;
                    }
                    .shijian_txt_desc{
                        width: 438px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #7A8499;
                        line-height: 26px;
                        padding-left: 11px;
                        box-sizing: border-box;
                    }
                }
                .shijian_img_container{
                    width: 490px;
                    .shijianImg{
                        width: 100%;
                    }
                }
            }
        }
    }
    .shijian_fenxi_two_container{
        width: 100%;
        height: 520px;
        background-image: url('../../assets/images/pubOpin/weitu2.png');
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        .shijia_fenxi_two_content{
            width: 1200px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .shijia_fenxi_two_img_container{
                width: 625px;
                height: 392px;
                margin-right: 27.4px;
                .shijianImg1{
                    width: 100%;
                }
            }
            .shijian_fenxi_two_txt_container{
                .shijian2_title{
                    padding-left: 11px;
                    box-sizing: border-box;
                    border-left: #03A971 3px solid;
                    font-family: PingFangSC-Semibold;
                    font-size: 22px;
                    color: #121C33;
                }
                .shijian2_desc{
                    width: 392px;
                    margin-top: 15px;
                    padding-left: 11px;
                    box-sizing: border-box;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #7A8499;
                    line-height: 26px;
                }
            }
        }
    }
    .shijian_fenxi_three_container{
        width: 100%;
        display: flex;
        justify-content: center;
        .shijian_fenxi_content{
            width: 1200px;
            margin-top: 23px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .shijian3_txt_container{
                width: 405px;
                .shijian3_title{
                    padding-left: 11px;
                    box-sizing: border-box;
                    border-left: #03A971 3px solid;
                    font-family: PingFangSC-Semibold;
                    font-size: 22px;
                    color: #121C33;
                    margin-bottom: 15px;
                }
                .shijian3_desc{
                    width: 392px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #7A8499;
                    line-height: 26px;
                }
            }
            .shijian3_img_container{
                width: 544px;
                height: 272px;
                .shijian3_img{
                    width: 100%;
                }
            }
        }
    }
    .shijian4_oper_container{
        margin-top: 117px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 60px;
        .oper_title{
            font-family: PingFangSC-Regular;
            font-size: 30px;
            color: #121C33;
            text-align: center;
            margin-bottom: 9px;
        }
        .oper_desc{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #7A8499;
            text-align: center;
            margin-bottom: 22px;
        }
        .oper_btn{
            width: 140px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #03A971;
            border-radius: 3px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #FFFFFF;
            &:hover{
                cursor: pointer;
            }
        }
    }
}
</style>