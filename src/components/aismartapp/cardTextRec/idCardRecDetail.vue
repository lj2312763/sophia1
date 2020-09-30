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
          title: '身份证识别',
          title_desc: '支持对二代居民身份证正反面所有8个字段进行结构化识别，包括姓名、性别、民族、出生日期、住址、身份证号、签发机关、有效期限，识别准确率超过99%；同时支持身份证正面头像检测，并返回头像切片的base64编码及位置信息',
          btn:{
            tiyan:{text:"功能体验",isShow:true,path:"#tiyan"},
            use_btn:{text:"立即使用",isShow:true,},
            tech_file:{text:"技术文档",isShow:true,}
          },
          list_img: require('@/assets/images/card/shenfenzhengshibie.png'),//banner区域

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
              desc: '支持对二代居民身份证正反两面全部字段的结构化识别，能够满足身份证使用场景中对任意字段的识别需求'
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
            position:true,
            // intro:'随机示例',
            // demo:'网易财经3月26日讯。今日沪指高开低走，一路震荡下行，午后跌幅进一步扩大。'
          },

          menu_text: {//应用场景
            curId:1,
            list:[
              {title:'远程身份认证',id:1},
              {title:'金融服务',id:2},
              {title:'出境旅游、留学',id:3},
            ],
          },
          showYun:true,
          weitu: require('@/assets/images/yuyin/shishiyuyin.png'),
          app_title: '远程身份认证',
          app_desc: '结合OCR和人脸识别技术，实现对用户身份证件信息的自动识别和录入，同时通过人脸核身解决方案进行人脸识别和活体检测，完成用户身份验证，应用于金融保险、社保、电商、O2O等行业，有效降低用户输入成本，控制业务风险',
          app_title1: '',
          app_desc1: '',
         

          advant_text: [
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon1.png'),
              title: '字段齐全',
              desc: '支持对二代居民身份证所有8个字段的结构化识别，能够实现不同业务场景下对任意字段信息的提取，满足各类相关需求'
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
            {
              img: require('@/assets/images/aiSmartAppDetail/fn_icon2.png'),
              title: '模型自助优化',
              desc: '中文普通话模型可在语音自训练平台上零代码自助训练，上传文本语料即可有效提升业务词汇的识别准确率5-25%'
            }
          ],
        },
      }
    },
    components: {
      vList,
    }
  }
</script>

