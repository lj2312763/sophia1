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
          title: '营业执照识别',
          title_desc: '支持对不同版式营业执照的证件编号、社会信用代码、单位名称、地址、法人、类型、成立日期、有效日期、经营范围等关键字段进行结构化识别',
          btn:{
            tiyan:{text:"功能体验",isShow:true,path:"#tiyan"},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/card/yingyezhizhao.png'),//banner区域

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
              title: '全字段识别',
              desc: '支持对护照所有10个字段的结构化识别，能够实现不同业务场景下对任意字段信息的提取，满足各类相关需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '准确率高',
              desc: '依托优秀的图像处理技术，对护照反光、底纹等情况进行专项优化，关键字段识别准确率超过95%'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
              title: '服务稳定',
              desc: '依托技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
            }
          ]},
          detailType:'searchdetail',
          

          tiyan:{
            showFun:true,//功能体验
            funExperiText:'',
            position:true,
            // intro:'随机示例',
            // demo:'网易财经3月26日讯。今日沪指高开低走，一路震荡下行，午后跌幅进一步扩大。'
          },

          menu_text: {//应用场景
            curId:1,
            list:[
              {title:'商家资质审查',id:1},
              {title:'企业金融服务',id:2},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/card/12.png'),
          app_title: '商家资质审查',
          app_desc: '使用营业执照识别技术，实现对企业信息的结构化识别和录入，可应用于电商、零售、O2O等行业的商户入驻审查场景，实现商户信息的自动化审查和录入，有效提高客户体验，并大幅度提升服务标准和运营效率',
          app_title1: '',
          app_desc1: '',
         

          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '技术领先',
              desc: '依托优秀的图像处理技术和海量优质数据，支持对不同时期不同版式营业执照的结构化识别，能够满足对各式营业执照任意关键字段进行提取的需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '服务稳定',
              desc: '依托技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
            },
            // {
            //   img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
            //   title: '服务稳定',
            //   desc: '依托技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%'
            // },
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

