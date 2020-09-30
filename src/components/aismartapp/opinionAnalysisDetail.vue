<template>
  <div class="hello">
    <vList :objText='audion_tech'></vList>
  </div>
</template>
<script>
  import vList from './detailList';
  export default {
    name: 'opinionAnalysisDetail',
    data() {
      return {
         audion_tech: {
          title: '舆情分析',
          title_desc: '对全媒体渠道的个性化监测与洞察，帮助企业在倾听目标受众、分析行业趋势的同时，管理品牌声誉，预警传播危机。',
          btn:{
            tiyan:{text:"功能体验",isShow:false,},
            use_btn:{text:"立即使用",isShow:false,},
            tech_file:{text:"下载舆情报告",isShow:true,type:'downLoad'}
          },
          list_img: require('@/assets/images/aiSmartAppDetail/yuqing.png'),//banner区域

          list_nav_text:[
              {title:'功能介绍',id:1},
              // {title:'功能体验',id:2},
              // {title:'应用场景',id:3},
              {title:'特色优势',id:4},
              {title:'支持交流',id:5},
              {title:'报告展示',id:6},
          ],//导航

          function_text:  {
            gutter:50,
            span:12,
            list:[
            {
              img:  require('@/assets/images/new_index/icon/dashuju.png'),
              title: '舆情监测',
              desc: '用户只需设置关键词，即可实现对全互联网的信息进行监测。'
            },
            {
              img: require('@/assets/images/new_index/icon/jiqi.png'),
              title: '舆情预警',
              desc: '根据警报级别、时间进行发送预警。'
            },
            {
              img:  require('@/assets/images/new_index/icon/neirong.png'),
              title: '舆情分析',
              desc: '随时可以看到行业、品牌的分析数据。手中实时掌握品牌、竞品与行业信息。让企业决策运筹帷幄。'
            },
            {
              img:  require('@/assets/images/new_index/icon/qukuailian.png'),
              title: '舆情报告',
              desc: '通过不同的条件，自定义数据报告。根据自己的需求快速导出数据。'
            }
          ]},
          detailType:'optionanaly',

          tiyan:{
            showFun:false,//功能体验
            funExperiText:'请输入一段想分析的文本：',
            intro:'随机示例',
            demo:'网易财经3月26日讯。今日沪指高开低走，一路震荡下行，午后跌幅进一步扩大，最终失守3000点，创指大跌近2.5%，收光头大阴线，前期跌幅较大的猪肉、养鸡板块逆势上涨，领涨两市，午后港口航运强势拉升，最终小幅上涨，连云港等三股涨停，白酒、家电等白马蓝筹表现较为坚挺，国防军工概念大幅回调，领跌两市，中船科技等5股跌停，科创板预期股一路走低，跌幅居前，华胜天成等6股跌停，盘中多股出现恐慌性砸盘。截至收盘：沪指跌1.51%，报2997.10点；深指跌1.94%，报9513.00点；创业板指数跌2.32%，报1630.19点。板块方面：仅少数板块逆市飘红，交运港口、黄金水道、中日韩自贸区等板块涨幅居前，军工、园区开发、航母等板块跌幅居前。外围情况：美国三大股指大致收平，10年期美债收益率跌破2.4%之际投资者持续担忧经济形势。苹果2019年春季发布会AllIn服务：AppleNews+、信用卡、游戏商店、AppleTV+；股价一度跌2%，收跌1.2%。'
          },

          menu_text: {//应用场景
            curId:3,
            list:[
              {title:'用户身份认证',id:1},
              {title:'文字违规识别',id:2},
              {title:'出版物图像转文本',id:3},
              {title:'手写内容识别',id:4},
            ],
          },
          showYun:false,
          weitu: require('@/assets/images/ai/yingyong1.png'),
          app_title: '传统新闻媒体',
          app_desc: '通用OCR识别可以帮助将大量纸质文档转换成可编辑的文本，极大的便利了文字的排版、信息的检索。',
          app_title1: '出版物图片',
          app_desc1: '通用OCR识别可以将出版物的图像转成可供编辑的文本，在出版物的归类、检索等方面，大大降低人力投入成本。',
         

          baogao: {//报告展示
            id:"baogao",
            list:[
              {
               title:'游戏监测',
               des:"2020年1月发行手游并未享受到疫情红利，反而多被挤出市场。网友疫情期间宅在家里多玩《王者荣耀》类成熟游戏，新发手游备受冷落。",
               btn:"下载报告",
               url:window.config.url+"/kyfysm/游戏监测.pdf"
              },
              {
               title:'楼盘对比',
               des:"新楼盘舆情数据对比显示：疫情重创房地产业后，区域性房地产企业动恢复缓慢，全国性地产巨头恢复较快，在不断抢夺市场份额。",
               btn:"下载报告",
               url:window.config.url+"/kyfysm/楼盘对比.pdf"
              },
              {
               title:'钉钉专题',
               des:"钉钉在疫情期间，收获大量青少年用户同时，负面评价汹涌而来，称用户为“小学生”无法改变钉钉办公产品定位，与社交、在线教育产品特性的背离。",
               btn:"下载报告",
               url:window.config.url+"/kyfysm/钉钉专题.pdf"
              },
              {
               title:'生鲜电商',
               des:"经过疫情洗礼，生鲜电商初步完成了市场建设和用户习惯的培育，未来企业的货源建设、物流建设强度将决定了其市场竞争力的大小。",
               btn:"下载报告",
               url:window.config.url+"/kyfysm/生鲜电商.pdf"
              }
            ],
          },

          advant_text: [
            {
              img:   require('@/assets/images/new_index/icon/neirong.png'),
              title: '海量数据',
              desc: '精准抓取'
            },
            {
              img:  require('@/assets/images/new_index/icon/qukuailian.png'),
              title: '权限设置',
              desc: '自由灵活'
            },
            {
              img: require('@/assets/images/new_index/icon/yingyong.png'),
              title: '高效预警',
              desc: '实时推送'
            },
            {
              img: require('@/assets/images/new_index/icon/wenzi.png'),
              title: '智能分析',
              desc: '图表展示'
            },
            {
              img:  require('@/assets/images/new_index/icon/tuijian.png'),
              title: '统计报表',
              desc: '多种格式导出'
            }
          ],
        },


        // audion_tech: {
        //   title: '舆情分析',
        //   title_desc: '对全媒体渠道的个性化监测与洞察，帮助企业在倾听目标受众、分析行业趋势的同时，管理品牌声誉，预警传播危机。',
        //   use_btn: '立即使用',
        //   tech_file: '技术文档',
        //   list_img: require('@/assets/images/aiSmartAppDetail/yuqing.png'),
        //   menu_text: [],
        //   weitu:'',
        //   app_title: '',
        //   app_desc: '',
        //   detailType:'optionanaly',
        //   searchIcon:require('@/assets/images/aiSmartAppDetail/search.png'),
        //   list_nav_text:['功能介绍','特色优势','支持交流'],
        //   function_text: [
        //     {
        //       img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
        //       title: '舆情监测',
        //       desc: '用户只需设置关键词，即可实现对全互联网的信息进行监测。'
        //     },
        //     {
        //       img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
        //       title: '舆情预警',
        //       desc: '根据警报级别、时间进行发送预警。'
        //     },
        //     {
        //       img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
        //       title: '舆情分析',
        //       desc: '随时可以看到行业、品牌的分析数据。手中实时掌握品牌、竞品与行业信息。让企业决策运筹帷幄。'
        //     },
        //     {
        //       img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
        //       title: '舆情报告',
        //       desc: '通过不同的条件，自定义数据报告。根据自己的需求快速导出数据。'
        //     }
        //   ],
        //   advant_text: [
        //     {
        //       img: require('@/assets/images/aiSmartAppDetail/icon1.png'),
        //       title: '海量数据',
        //       desc: '精准抓取'
        //     },
        //     {
        //       img: require('@/assets/images/aiSmartAppDetail/icon2.png'),
        //       title: '权限设置',
        //       desc: '自由灵活'
        //     },
        //     {
        //       img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
        //       title: '高效预警',
        //       desc: '实时推送'
        //     },
        //     {
        //       img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
        //       title: '智能分析',
        //       desc: '图表展示'
        //     },
        //     {
        //       img: require('@/assets/images/aiSmartAppDetail/icon3.png'),
        //       title: '统计报表',
        //       desc: '多种格式导出'
        //     }
        //   ],
        // },
      }
    },
    components: {
      vList,
    },
  }
</script>
