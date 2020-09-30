<template>
  <div class="live_container">
      <div class="banner_container">
          <div class="text_container">
              <div class="title">云直播</div>
              <div class="desc">云直播（Cloud Streaming Services，CSS）为您提供极速、稳定、专业的云端直播处理服务，根据业务的不同直播场景需求，云直播提供了标准直播、慢直播、快直播三种服务，分别针对大规模实时观看、高并发推流录制、超低延时直播场景，配合移动直播 SDK，为您提供一站式的音视频直播解决方案。</div>
              <div class="img_container">
                 <img :src="liveGif" class="gif">
              </div>
          </div>
      </div>
      <div class="content_container">
          <div class="step_container">
              <div class="title">四步轻松直播</div>
              <div class="desc">提供稳定流畅、低延时、高并发的服务</div>
              <div class="content">
                  <div class="contentItem" v-for="(item,index) in contArr" :key="index">
                      <div class="cImg_container">
                          <img :src="item.src" alt="">
                      </div>
                      <div class="c_text_title">
                          {{item.intro}}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="techno_Plat_container">
          <div class="plat_content">
              <div class="title">主流技术平台</div>
              <div class="desc">涵盖阿里，腾讯和网易等厂商，提供专业的跨平台视频技术和内容分发网络</div>
              <div class="live_type">
                  <div class="live_type_item" :style="{backgroundImage: 'url(' + item.bgi + ')'}" v-for="(item,index) in livetyArr" :key="index">
                      <div class="content">
                          <div class="live_title">{{item.title}}</div>
                          <div class="live_desc">{{item.desc}}</div>
                          <div class="btn_container">
                              <div class="btn1" @click="goManger">{{item.btn1}}</div>
                              <div class="btn2" @click="goManger">{{item.btn2}}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
      data(){
          return{
            //   bgi:require('../../assets/images/live/banner.png')
            liveGif:require('../../assets/images/live/live.gif'),
            contArr:[
                {
                    src:require('../../assets/images/live/zhuce.png'),
                    intro:'1、注册'
                },
                {
                    src:require('../../assets/images/live/xiazai.png'),
                    intro:'2、下载'
                },
                {
                    src:require('../../assets/images/live/chuangjian.png'),
                    intro:'3、创建'
                },
                {
                    src:require('../../assets/images/live/shiyong.png'),
                    intro:'4、使用'
                }
            ],
            livetyArr:[
                {
                    title:'网易云直播',
                    desc:'基于专业的跨平台视频编解码技术和大规模视频内容分发网络，提供稳定流畅、低延时、高并发的音视频通话服务，助力轻松打造企业级在线直播平台',
                    btn1:'立即使用',
                    btn2:'查看详情',
                    bgi:require('../../assets/images/live/wangyiyun.png')
                },
                {
                    title:'阿里直播',
                    desc:'视频直播（ApsaraVideo Live）是基于领先的内容接入与分发网络和大规模分布式实时视频处理技术（含窄带高清TM）打造的音视频直播平台，提供易接入、低延迟、高并发、高清流畅的音视频直播服务。',
                    btn1:'立即使用',
                    btn2:'查看详情',
                    bgi:require('../../assets/images/live/aliyun.png')
                },
                {
                    title:'腾讯直播',
                    desc:'为您提供极速、稳定、专业的云端直播处理服务，根据业务的不同直播场景需求，提供了标准直播、慢直播、快直播三种服务，分别针对大规模实时观看、高并发推流录制、超低延时直播场景，配合移动直播 SDK，为您提供一站式的音视频直播解决方案。',
                    btn1:'立即使用',
                    btn2:'查看详情',
                    bgi:require('../../assets/images/live/tengxunyun.png')
                },
                {
                    title:'电竞云直播',
                    desc:'提供嵌入式开播工具，用于嵌入到手游客户端，为游戏赋予领先的开播能力。玩家在游戏内即可一键开播，极大降低开播成本，轻松获取更多直播内容，帮助游戏快速传播。',
                    btn1:'立即使用',
                    btn2:'查看详情',
                    bgi:require('../../assets/images/live/dianjing.png')
                }
            ]
          }
      },
      methods:{
          goManger(){
            window.open(window.config.url+'/sophiaManager/sysindex.html','_blank');
          }
      }
  }
</script>
<style scoped lang='less'>
.live_container{
    width: 100%;
    .banner_container{
        width: 100%;
        height: 350px;
        background-image: url('../../assets/images/live/banner.png');
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        .text_container{
            width: 1200px;
            height: 100%;
            position: relative;
            .img_container{
                position: absolute;
                top: 34px;
                right: 0px;
                width: 437px;
                height: 370px;
                background-image: url('../../assets/images/live/pc.png');
                background-size: cover;
                background-position: center;
                .gif{
                    width: 411px;
                    height: 234px;
                    position: absolute;
                    top: 16px;
                    left: 13px;
                }
            }
            .title{
                margin-top: 81px;
                margin-bottom: 15px;
                font-size: 30px;
                color: #FFFFFF;
            }
            .desc{
                width: 574px;
                font-size: 14px;
                color: #FFFFFF;
                text-align: justify;
                line-height: 28px;
            }
        }
    }
    .content_container{
        width: 100%;
        background-color: cadetblue;
        display: flex;
        justify-content: center;
        background-image: url('../../assets/images/live/bj.png');
        background-size: cover;
        background-position: center;
        .step_container{
            width: 1200px;
            height: 419px;
            padding-top: 60px;
            box-sizing: border-box;
            .title{
                padding-left: 20px;
                font-size: 30px;
                color: #121C33;
                border-left: 4px #03A971 solid;
                margin-bottom: 15px;
            }
            .desc{
                font-size: 18px;
                color: #7A8499;
                margin-bottom: 30px;
            }
            .content{
                display: flex;
                width: 100%;
                height: 196px;
                justify-content: space-between;
                .contentItem{
                    width: 278px;
                    height: 196px;
                    background: #FFFFFF;
                    box-shadow: 0 2px 16px 0 rgba(184,190,204,0.50);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    .cImg_container{
                        width: 61px;
                        height: 60px;
                        margin-bottom: 16px;
                        img{
                            width: 100%;
                        }
                    }
                    .c_text_title{
                        font-size: 18px;
                        color: #121C33;
                        text-align: center;
                    }
                }
            }
        }
    }
    .techno_Plat_container{
        width: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        padding-top: 60px;
        padding-bottom: 51px;
        .plat_content{
            width: 1200px;
            .title{
                padding-left: 20px;
                font-size: 30px;
                color: #121C33;
                border-left: 4px #03A971 solid;
                margin-bottom: 15px;
            }
            .desc{
                font-size: 18px;
                color: #7A8499;
                margin-bottom: 28px;
            }
            .live_type{
                width: 100%;
                .live_type_item{
                    width: 100%;
                    margin-bottom: 30px;
                    background-size: cover;
                    background-position: center;
                    padding: 29px 28px;
                    .content{
                        background: rgba(255,255,255,0.1);
                        width: 490px;
                        border-radius: 3px;
                        padding: 34px 25px;
                        box-sizing: border-box;
                        .live_title{
                            font-size: 22px;
                            color: #FFFFFF;
                            margin-bottom: 10px;
                        }
                        .live_desc{
                            font-size: 14px;
                            color: #FFFFFF;
                            line-height: 27px;
                            text-align: justify;
                            margin-bottom: 39px;
                        }
                        .btn_container{
                            display: flex;
                            align-items: center;
                            .btn1{
                                background: #03A971;
                                border-radius: 3px;
                                margin-right: 40px;
                                font-size: 14px;
                                color: #FFFFFF;
                                padding: 8px 32px;
                                box-sizing: border-box;
                            }
                            .btn2{
                                border: 1px solid #FFFFFF;
                                border-radius: 3px;
                                padding: 8px 32px;
                                box-sizing: border-box;
                                font-size: 14px;
                                color: #FFFFFF;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
