<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>
<script>
  import vList from '../detailList';
  export default {
    data() {
      return {
        audion_tech: {
          title: '机动车销售发票识别',
          title_desc: '支持对机动车销售发票的26个关键字段进行结构化识别，包括发票代码、号码、开票日期、机器编号、购买方信息、车辆信息、销货单位信息、价税合计、价税合计小写、税率、税额、不含税价格等',
          btn:{
            tiyan:{text:"功能体验",isShow:true,path:"#tiyan"},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/carSence/jidongchefapiao.png'),//banner区域

          list_nav_text:[
              {title:'功能介绍',id:1},
              {title:'功能体验',id:2},
              {title:'应用场景',id:3},
              {title:'特色优势',id:4},
              {title:'支持交流',id:5},
          ],//导航

          function_text: {
            gutter:50,
            span:8,
            list:[
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '深入场景',
              desc: '深入汽车服务场景进行专项优化，可覆盖汽车购买、使用和服务的全部场景，提供全流程解决方案'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '证件风险检测',
              desc: '检测上传的图片是否为身份证复印件、临时身份证、屏幕翻拍身份证或被PS过的身份证，并返回对应的风险类型'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '端上质量校验',
              desc: '提供移动端SDK，使用时能实时检测取景框中是否包含身份证，是否存在模糊、欠/过曝等情况，并提示用户矫正，提高采集质量，提升准确率'
            }
          ]},
          detailType:'searchdetail',
          

          tiyan:{
            showFun:true,//功能体验
            funExperiText:'',
            // intro:'随机示例',
            // demo:'网易财经3月26日讯。今日沪指高开低走，一路震荡下行，午后跌幅进一步扩大。'
          },

          menu_text: {//应用场景
            curId:1,
            list:[
              {title:'车辆信息登记',id:1},
              {title:'汽车后市场服务',id:2},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/carSence/31.png'),
          app_title: '车辆信息登记',
          app_desc: '使用机动车销售发票识别技术，实现对已购买的车辆发票信息的识别，可应用于车辆信息核对、车辆上户、车牌申领等场景，能够快速完成车辆信息录入，有效降低人工录入成本，实现车辆信息登记的自动化',
          app_title1: '',
          app_desc1: '',
         

          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '字段齐全',
              desc: '支持对机动车销售发票的26个字段的结构化识别，能够实现不同业务场景下对任意字段信息的提取，满足各类相关需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '准确率高',
              desc: '依托优秀的图像处理技术和海量优质数据，支持识别各角度身份证照片，并对各少数民族身份证进行专项优化，识别准确率超过99%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '服务稳定',
              desc: '依托技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
            },
            // {
            //   img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
            //   title: '模型自助优化',
            //   desc: '中文普通话模型可在语音自训练平台上零代码自助训练，上传文本语料即可有效提升业务词汇的识别准确率5-25%'
            // }
          ],
        },
      }
    },
    components: {
      vList,
    }
  }
</script>

