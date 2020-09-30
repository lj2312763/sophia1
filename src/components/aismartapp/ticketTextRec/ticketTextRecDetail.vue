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
          title: '增值税发票识别',
          title_desc: '支持对增值税普票、专票、电子发票、卷票的所有关键字段进行结构化识别，包括发票基本信息、销售方及购买方信息、商品信息、价税信息等，其中四要素识别准确率超过99.9%',
          btn:{
            tiyan:{text:"功能体验",isShow:true,path:"#tiyan"},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/carSence/zengzhishui.png'),//banner区域

          list_nav_text:[
              {title:'功能介绍',id:1},
              {title:'功能体验',id:2},
              {title:'应用场景',id:3},
              {title:'特色优势',id:4},
              {title:'支持交流',id:5},
          ],//导航

          function_text: {
            gutter:50,
            span:12,
            list:[
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '全字段识别',
              desc: '支持对增值税普票、专票、电子发票、卷票全部关键字段的结构化识别，能够满足财税报销等场景中对任意字段的识别需求'
            },
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '二维码识别校验',
              desc: '识别票面左上角的二维码，获取发票代码、号码、金额、开票日期、校验码五个字段信息，与识别到的对应字段信息进行匹配校验，保证更高的识别准确率'
            },
            // {
            //   img: require('@/assets/images/aiSmartAppDetail/fn_icon3.png'),
            //   title: '端上质量校验',
            //   desc: '提供移动端SDK，使用时能实时检测取景框中是否包含身份证，是否存在模糊、欠/过曝等情况，并提示用户矫正，提高采集质量，提升准确率'
            // }
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
              {title:'财税报销',id:1},
              {title:'发票验真',id:2},
              {title:'账单记录',id:3},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/carSence/5.png'),
          app_title: '财税报销',
          app_desc: '使用增值税发票识别技术，实现对增值税普票或专票各字段信息的识别和录入，可应用于企业税务核算及内部报销等场景，能够有效减少人工核算工作量，降低人力成本，实现财税报销的自动化',
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

