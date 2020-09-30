<template>
  <div class="expericeColl_container">
    <div class="expericeColl">
      <div class="expericeColl_left">
        <div
          class="leftMenu"
          :class="{'oneActive':oneActive==item.id}"
          ref="leftMenu"
          v-for="(item,index) in menuList"
          :key="index"
          @click="changeLevelOneMenu(item)"
        >{{item.text}}</div>
      </div>
      <div class="expericeColl_right">
        <div class="expericeTitle">功能体验</div>
        <div class="leveltwoMenu_container">
          <div
            class="leveltwoMenu"
            ref="leveltwoMenu"
            :class="{'twoActive':twoActive==item.id}"
            v-for="(item,index) in twoMenuArr"
            :key="index"
            @click="levelTwoChange(item)"
          >{{item.title}}</div>
        </div>
        <div class="levelThreeMenu">
          <RadioGroup
            v-model="threeMenuText"
            v-for="(item,index) in threeMenuArr"
            :key="index"
            @on-change="changeValue(item)"
          >
            <Radio :label="item.id">
              <span>{{item.text}}</span>
            </Radio>
          </RadioGroup>
        </div>
        <VfuRouter :oneId="fuRouterOneId" :twoId="fuRoutertwoId" :routeId="fuRouterThreeId"></VfuRouter>
        <div class="suggest">
            <div class="li" :class="{'liActive':currentIndex==index}" v-for="(item,index) in suggestList" :key="index" @mouseover="itemOver(item,index)" @mouseleave="itemleave(item,index)" @click="itemClick(item,index)">
                <div>
                  <div class="icon"  v-if="currentIndex==index"><img :src="item.iconActive" alt=""></div>
                  <div class="icon" v-else><img :src="item.icon" alt=""></div>
                  <p>{{item.name}}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import VfuRouter from "./fuRouter";
export default {
  props: {},
  data() {
    return {
      currentIndex:-1,
      suggestList:[
        {name:'合作咨询',icon:require('@/assets/images/common/zixun.png'),iconActive:require('@/assets/images/common/zixun1.png')},
        {name:'查看详情',icon:require('@/assets/images/common/detail.png'),iconActive:require('@/assets/images/common/detail1.png')},
      ],
      oneActive:'',
      twoActive:'',
      twoMenuArr: [],
      threeMenuArr: [],
      threeMenuText: "",
      passPortImg: "",
      resultArr: [],
      fuRouterOneId: "",
      fuRoutertwoId:'',
      fuRouterThreeId: "",
      menuList: [
          {
          id: "5",
          text: "自然语言处理",
          subList: [
            {
              title: "语言处理基础技术",
              routeId: "",
              id: "5.1",
              childList: [
                {
                  id: "5.1.1",
                  hotUrl: require("../../assets/images/home/hot.png"),
                  routeId: "/aiSmartAppDetail",
                  text: "词法分析"
                },
                // {
                //   id: "5.1.2",
                //   hotUrl: "",
                //   routeId: "/aiSentence",
                //   text: "句法分析"
                // },
                // {
                //   id: "5.1.3",
                //   hotUrl: require("../../assets/images/home/hot.png"),
                //   routeId: "/aiSyntax",
                //   text: "句式识别"
                // },
                {
                  id: "5.1.4",
                  hotUrl: "",
                  routeId: "/aiDepenpars",
                  text: "依存句法分析"
                },
                {
                  id: "5.1.5",
                  hotUrl: require("../../assets/images/home/hot.png"),
                  routeId: "/aiKeyword",
                  text: "关键词提取"
                },
                {
                  id: "5.1.6",
                  hotUrl: require("../../assets/images/home/hot.png"),
                  routeId: "/aiIdentity",
                  text: "命名实体识别"
                },
                { id: "5.1.8", hotUrl: "", routeId: "", text: "短文本相似度" },
                // {
                //   id: "5.1.9",
                //   hotUrl: "",
                //   routeId: "/aiBoundary",
                //   text: "句子边界识别"
                // },
                // { id: "5.1.10", hotUrl: "", routeId: "", text: "DNN语言模型" },
                { id: "5.1.11", hotUrl: "", routeId: "/aiSemantic", text: "词义相似度" },
                { id: "5.1.12", hotUrl: "", routeId: "", text: "词频统计" },
                { id: "5.1.13", hotUrl: "", routeId: "", text: "去除停用词" },
              ]
            },
            {
              title: "语言处理应用技术",
              routeId: "",
              id: "5.2",
              childList: [
                // { id: "5.2.1", hotUrl: "", routeId: "", text: "意图成分" },
                { id: "5.2.2", hotUrl: "", routeId: "", text: "情感分析" },
                { id: "5.2.3", hotUrl: "", routeId: "", text: "文本纠错" },
                { id: "5.2.4", hotUrl: "", routeId: "", text: "文章标签" },
                { id: "5.2.5", hotUrl: "", routeId: "", text: "文章分类" },
                { id: "5.2.6", hotUrl: "", routeId: "", text: "新闻摘要" },
                { id: "5.2.7", hotUrl: "", routeId: "", text: "地址识别" },
                { id: "5.2.8", hotUrl: "", routeId: "", text: "评论观点抽取" },
                { id: "5.2.9", hotUrl: "", routeId: "", text: "对话情绪识别" }
              ]
            },
            {
              title: "文本审核",
              routeId: "",
              id: "5.3",
              childList: [
                // { id: "5.3.1", hotUrl: "", routeId: "", text: "色情识别" },
                // { id: "5.3.2", hotUrl: "", routeId: "", text: "暴恐识别" },
                // { id: "5.3.3", hotUrl: "", routeId: "", text: "政治敏感" },
                // { id: "5.3.4", hotUrl: "", routeId: "", text: "恶意推广" },
                // { id: "5.3.5", hotUrl: "", routeId: "", text: "低俗辱骂" },
                // { id: "5.3.6", hotUrl: "", routeId: "", text: "低质灌水" }
              ]
            },
            {
              title:"机器翻译",
              routeId:'',
              id:"5.4",
              childList:[
                {id:"5.4.1", hotUrl:'', routeId:'', text:"通用翻译"},
                {id:"5.4.2", hotUrl:'', routeId:'', text:"垂直领域翻译"},
              ]
            },

          ]
        },
        {
          id: "1",
          text: "语音技术",
          subList: [
            {
              title: "语音识别",
              routeId: "/aiSmartAppList",
              id: "1.1",
              childList: [
                {
                  id: "1.1.1",
                  hotUrl: require("../../assets/images/home/hot.png"),
                  routeId: "/shortSpeechRecoDetail",
                  text: "短语音识别"
                },
                {
                  id: "1.1.2",
                  hotUrl: "",
                  routeId: "/realTimeReco",
                  text: "实时语音识别"
                },
                {
                  id: "1.1.3",
                  hotUrl: "",
                  routeId: "/fileReco",
                  text: "录音文件识别"
                },
                {
                  id: "1.1.4",
                  hotUrl: "",
                  routeId: "/speSyn",
                  text: "语音合成"
                }
              ]
            },
            {
              title: "语音扩展",
              routeId: "",
              id: "1.2",
              childList: [
                { id: "1.2.1", hotUrl: "", routeId: "", text: "语音评测" },
                { id: "1.2.2", hotUrl: "", routeId: "", text: "歌曲识别" },
                // { id: "1.2.3", hotUrl: "", routeId: "", text: "声纹识别" },
                { id: "1.2.4", hotUrl: "", routeId: "", text: "声音年龄识别" }
              ]
            }
          ]
        },
        {
          id: "2",
          text: "文字识别",
          subList: [
            {
              title: "卡证文字识别",
              routeId: "/cardTextRecList",
              id: "2.1",
              childList: [
                {
                  id: "2.1.1",
                  hotUrl: require("../../assets/images/home/hot.png"),
                  routeId: "/idCardRecDetail",
                  text: "身份证识别"
                },
                { id: "2.1.2", hotUrl: "", routeId: "", text: "银行卡识别" },
                {
                  id: "2.1.3",
                  hotUrl: require("../../assets/images/home/hot.png"),
                  routeId: "/passportRecDetail",
                  text: "护照识别"
                },
                { id: "2.1.4", hotUrl: "", routeId: "", text: "名片识别" },
                { id: "2.1.5", hotUrl: "", routeId: "", text: "户口本识别" },
                {
                  id: "2.1.6",
                  hotUrl: require("../../assets/images/home/hot.png"),
                  routeId: "/businessLiceRecDetail",
                  text: "营业执照识别"
                },
                {
                  id: "2.1.7",
                  hotUrl: require("../../assets/images/home/hot.png"),
                  routeId: "/returnPerRecDetail",
                  text: "港澳通行证识别"
                },
                {
                  id: "2.1.8",
                  hotUrl: "",
                  routeId: "",
                  text: "台湾往来通行证识别"
                },
                {
                  id: "2.1.9",
                  hotUrl: "",
                  routeId: "/experienceColl",
                  text: "出生医学证明识别"
                }
              ]
            },
            {
              title: "票据文字识别",
              routeId: "/ticketTextRecLiset",
              id: "2.2",
              childList: [
                { id: "2.2.1", 
                  hotUrl: "", 
                  routeId: "/ticketTextRecDetail",
                  text: "通用发票识别" },
                { id: "2.2.2", 
                  hotUrl: "", 
                  routeId: "/ticketTextRecDetail", 
                  text: "混贴票据识别" },
                {
                  id: "2.2.3",
                  hotUrl: require("../../assets/images/home/hot.png"),
                  routeId: "/ticketTextRecDetail",
                  text: "增值税发票识别"
                },
                { id: "2.2.4", hotUrl: "", routeId: "/ticketTextRecDetail", text: "承兑汇票识别" },
                { id: "2.2.5", hotUrl: "", routeId: "/ticketTextRecDetail", text: "银行回单识别" },
                { id: "2.2.6", hotUrl: "", routeId: "/ticketTextRecDetail", text: "银行支票识别" },
                { id: "2.2.7", hotUrl: "", routeId: "/ticketTextRecDetail", text: "定额发票识别" },
                {
                  id: "2.2.8",
                  hotUrl: "",
                  routeId: "/ticketTextRecDetail",
                  text: "通用机打发票识别"
                },
                { id: "2.2.9", hotUrl: "", routeId: "/ticketTextRecDetail", text: "火车票识别" },
                { id: "2.2.10", hotUrl: "", routeId: "/ticketTextRecDetail", text: "出租车票识别" },
                { id: "2.2.11", hotUrl: "", routeId: "/ticketTextRecDetail", text: "行程单识别" },
                // { id: "2.2.12", hotUrl: "", routeId: "/ticketTextRecDetail", text: "保险单识别" },
                { id: "2.2.13", hotUrl: "", routeId: "/ticketTextRecDetail", text: "彩票识别" }
              ]
            },
            {
              title: "汽车场景文字识别",
              routeId: "/carSceneRecList",
              id: "2.3",
              childList: [
                {
                  id: "2.3.1",
                  hotUrl: "",
                  routeId: "/jiashiLiceRecDetail",
                  text: "驾驶证识别"
                },
                {
                  id: "2.3.2",
                  hotUrl: "",
                  routeId: "/xshiLiceRecDetail",
                  text: "行驶证识别"
                },
                { id: "2.3.3", hotUrl: "", routeId: "", text: "车牌识别" },
                { id: "2.3.4", hotUrl: "", routeId: "", text: "VIN码识别" },
                {
                  id: "2.3.5",
                  hotUrl: "",
                  routeId: "",
                  text: "车辆合格证识别"
                },
                {
                  id: "2.3.6",
                  hotUrl: "",
                  routeId: "/carInvoRecDetail",
                  text: "机动车销售发票识别"
                }
              ]
            },
            {
              title: "教育场景文字识别",
              routeId: "",
              id: "2.4",
              childList: [
                { id: "2.4.1", hotUrl: "", routeId: "", text: "手写文字识别" },
                { id: "2.4.2", hotUrl: "", routeId: "", text: "公式识别" }
              ]
            },
            {
              title: "其他文字识别",
              routeId: "/otherTextRecList",
              id: "2.5",
              childList: [
                {
                  id: "2.5.1",
                  hotUrl: "",
                  routeId: "/tableTextRecDetail",
                  text: "表格文字识别"
                },
                {
                  id: "2.5.2",
                  hotUrl: "",
                  routeId: "/numberRecDetail",
                  text: "数字识别"
                },
                {
                  id: "2.5.4",  //  2.5.3
                  hotUrl: "",
                  routeId: "/sealDetectDetail",
                  text: "印章检测"
                },
                {
                  id: "2.5.5",   //  2.5.4
                  hotUrl: "",
                  routeId: "/netWorkPicRecDetail",
                  text: "网络图片文字识别"
                },
                {
                  id: "2.5.3",  // 2.5.5
                  hotUrl: "",
                  routeId: "/rqCodeRecDetail",
                  text: "二维码识别"
                }
              ]
            },
            {
              title:"通用文字识别",
              routeId:'',
              id:"2.6",
              childList:[
                {id:"2.6.1", hotUrl:'', routeId:'', text:"通用文字识别"},
                {id:"2.6.2", hotUrl:'', routeId:'', text:"高精度版"},
                {id:"2.6.3", hotUrl:'', routeId:'', text:"含位置信息版"},
                {id:"2.6.4", hotUrl:'', routeId:'', text:"高精度含位置版"},
              ]
            },
            {
              title:"PDF处理",
              routeId:'',
              id:"2.7",
              childList:[
                {id:"2.7.1", hotUrl:'', routeId:'', text:"pdf文字提取"},
                {id:"2.7.2", hotUrl:'', routeId:'', text:"pdf页面旋转"},
                {id:"2.7.3", hotUrl:'', routeId:'', text:"合并pdf文件"},
                // {id:"2.7.4", hotUrl:'', routeId:'', text:"pdf添加水印"},
              ]
            },
          ]
        },
        {
          id: "3",
          text: "图像技术",
          subList: [
            {
              title: "图像识别",
              routeId: "",
              id: "3.1",
              childList: [
                {
                  id: "3.1.1",
                  hotUrl: "",
                  routeId: "",
                  text: "通用物体和场景识别"
                },
                { id: "3.1.2", hotUrl: "", routeId: "", text: "图像主体检测" },
                { id: "3.1.3", hotUrl: "", routeId: "", text: "通用商品识别" },
                { id: "3.1.4", hotUrl: "", routeId: "", text: "品牌logo识别" },
                { id: "3.1.5", hotUrl: "", routeId: "", text: "植物识别" },
                { id: "3.1.6", hotUrl: "", routeId: "", text: "动物识别" },
                { id: "3.1.7", hotUrl: "", routeId: "", text: "地标识别" },
                { id: "3.1.8", hotUrl: "", routeId: "", text: "菜品识别" },
                { id: "3.1.9", hotUrl: "", routeId: "", text: "美食图片识别" },
                { id: "3.1.10", hotUrl: "", routeId: "", text: "果蔬识别" },
                { id: "3.1.11", hotUrl: "", routeId: "", text: "红酒识别" },
                { id: "3.1.12", hotUrl: "", routeId: "", text: "货币识别" },
                { id: "3.1.13", hotUrl: "", routeId: "", text: "门脸识别" },
                { id: "3.1.14", hotUrl: "", routeId: "", text: "看图说话" },
                { id: "3.1.15", hotUrl: "", routeId: "", text: "多标签识别" },
                { id: "3.1.16", hotUrl: "", routeId: "", text: "模糊图片识别" },
                // { id: "3.1.17", hotUrl: "", routeId: "", text: "场景识别" },
                { id: "3.1.18", hotUrl: "", routeId: "", text: "垃圾分类识别" }
              ]
            },
            {
              title: "图像审核",
              routeId: "",
              id: "3.2",
              childList: [
                // { id: "3.2.1", hotUrl: "", routeId: "", text: "图文审核" },
                // { id: "3.2.2", hotUrl: "", routeId: "", text: "色情识别" },
                // { id: "3.2.3", hotUrl: "", routeId: "", text: "暴恐检测" },
                // { id: "3.2.4", hotUrl: "", routeId: "", text: "政治敏感识别" },
                // { id: "3.2.5", hotUrl: "", routeId: "", text: "公众人物识别" },
                // { id: "3.2.6", hotUrl: "", routeId: "", text: "广告检测" },
                // { id: "3.2.7", hotUrl: "", routeId: "", text: "恶心图像识别" },
                // { id: "3.2.8", hotUrl: "", routeId: "", text: "图像质量检测" }
              ]
            },
            // {
            //   title: "图像搜索",
            //   routeId: "",
            //   id: "3.3",
            //   childList: [
            //     { id: "3.3.1", hotUrl: "", routeId: "", text: "相同图片搜索" },
            //     { id: "3.3.2", hotUrl: "", routeId: "", text: "相似图片搜索" },
            //     { id: "3.3.3", hotUrl: "", routeId: "", text: "商品图片搜索" },
            //     { id: "3.3.4", hotUrl: "", routeId: "", text: "绘本图片搜索" }
            //   ]
            // },
            {
              title: "图像效果增强",
              routeId: "",
              id: "3.4",
              childList: [
                { id: "3.4.1", hotUrl: "", routeId: "", text: "图像去雾" },
                // { id: "3.4.2", hotUrl: "", routeId: "", text: "图像修复" },
                { id: "3.4.3", hotUrl: "", routeId: "", text: "图像无损放大" },
                { id: "3.4.4", hotUrl: "", routeId: "", text: "拉伸图像恢复" },
                { id: "3.4.5", hotUrl: "", routeId: "", text: "黑白图像上色" },
                { id: "3.4.6", hotUrl: "", routeId: "", text: "图像风格转换" },
                {
                  id: "3.4.7",
                  hotUrl: "",
                  routeId: "",
                  text: "图像对比度增强"
                },
                {
                  id: "3.4.8",
                  hotUrl: "",
                  routeId: "",
                  text: "图像清晰度增强"
                },
                { id: "3.4.9", hotUrl: "", routeId: "", text: "滤镜" },
                { id: "3.4.10", hotUrl: "", routeId: "", text: "大头贴" },
                { id: "3.4.11", hotUrl: "", routeId: "", text: "人脸变妆" },
                { id: "3.4.12", hotUrl: "", routeId: "", text: "人脸美妆" },
                { id: "3.4.20", hotUrl: "", routeId: "", text: "人像动漫化" },
                // { id: "3.4.13", hotUrl: "", routeId: "", text: "颜龄检测" },
                { id: "3.4.14", hotUrl: "", routeId: "", text: "天空分割" },
                { id: "3.4.15", hotUrl: "", routeId: "", text: "灰度图转换" },
                // { id: "3.4.16", hotUrl: "", routeId: "", text: "灰度变换" },
                { id: "3.4.17", hotUrl: "", routeId: "", text: "创建缩略图" },
                // { id: "3.4.18", hotUrl: "", routeId: "", text: "图像数组表示" },
                // { id: "3.4.19", hotUrl: "", routeId: "", text: "图片转ASCII码风格" },

              ]
            },
            {
              title: "车辆分析",
              routeId: "",
              id: "3.5",
              childList: [
                { id: "3.5.1", hotUrl: "", routeId: "", text: "车型识别" },
                { id: "3.5.2", hotUrl: "", routeId: "", text: "车辆检测" },
                { id: "3.5.3", hotUrl: "", routeId: "", text: "车流统计" },
                { id: "3.5.4", hotUrl: "", routeId: "", text: "车辆属性识别" },
                { id: "3.5.5", hotUrl: "", routeId: "", text: "车辆损伤识别" },
                { id: "3.5.6", hotUrl: "", routeId: "", text: "车辆分割" }
              ]
            }
          ]
        },
        {
          id: "4",
          text: "视频技术",
          subList: [
            {
              title: "视频内容识别",
              routeId: "/VideoRecoList",
              id: "4.1",
              childList: [
                // { id: "4.1.1", hotUrl: "", routeId: "", text: "视频人脸识别" },
                // { id: "4.1.2", hotUrl: "", routeId: "", text: "视频语音识别" },
                // { id: "4.1.3", hotUrl: "", routeId: "", text: "视频文字识别" },
                // { id: "4.1.4", hotUrl: "", routeId: "", text: "视频物体识别" },
                // { id: "4.1.5", hotUrl: "", routeId: "", text: "视频分类识别" },
                // {
                //   id: "4.1.6",
                //   hotUrl: "",
                //   routeId: "",
                //   text: "视频帧标签识别"
                // },
                // { id: "4.1.7", hotUrl: "", routeId: "", text: "视频标签识别" },
                // { id: "4.1.8", hotUrl: "", routeId: "", text: "片头片尾识别" }
              ]
            },
            {
              title: "视频内容分析",
              routeId: "",
              id: "4.2",
              childList: [
                // { id: "4.2.1", hotUrl: "", routeId: "", text: "视频分类" },
                // {
                //   id: "4.2.2",
                //   hotUrl: "",
                //   routeId: "",
                //   text: "视频公众人物识别"
                // },
                // { id: "4.2.3", hotUrl: "", routeId: "", text: "泛标签提取" },
                // { id: "4.2.4", hotUrl: "", routeId: "", text: "节目识别" },
                // { id: "4.2.5", hotUrl: "", routeId: "", text: "动作事件识别" },
                // { id: "4.2.6", hotUrl: "", routeId: "", text: "地点场景识别" },
                // { id: "4.2.7", hotUrl: "", routeId: "", text: "视频质量检测" }
              ]
            },
            {
              title: "视频内容审核",
              routeId: "",
              id: "4.3",
              childList: [
                // { id: "4.3.1", hotUrl: "", routeId: "", text: "色情识别" },
                // { id: "4.3.2", hotUrl: "", routeId: "", text: "暴恐识别" },
                // { id: "4.3.3", hotUrl: "", routeId: "", text: "政治敏感识别" },
                // { id: "4.3.4", hotUrl: "", routeId: "", text: "违禁品识别" },
                // { id: "4.3.5", hotUrl: "", routeId: "", text: "广告检测" },
                // { id: "4.3.6", hotUrl: "", routeId: "", text: "logo检测" }
              ]
            },
            {
              title: "视频处理",
              routeId: "",
              id: "4.4",
              childList: [
                // { id: "4.4.1", hotUrl: "", routeId: "", text: "视频转码" },
                // { id: "4.4.2", hotUrl: "", routeId: "", text: "数字水印" },
                // { id: "4.4.3", hotUrl: "", routeId: "", text: "视频截图" },
                // { id: "4.4.4", hotUrl: "", routeId: "", text: "视频剪辑" },
                // { id: "4.4.5", hotUrl: "", routeId: "", text: "视频拼接" },
                // { id: "4.4.6", hotUrl: "", routeId: "", text: "视频换脸" },
                // { id: "4.4.7", hotUrl: "", routeId: "", text: "智能拆条" },
                // { id: "4.4.8", hotUrl: "", routeId: "", text: "智能集锦" },
                // { id: "4.4.9", hotUrl: "", routeId: "", text: "智能封面" },
                // { id: "4.4.10", hotUrl: "", routeId: "", text: "视频摘要" },
                // {
                //   id: "4.4.11",
                //   hotUrl: "",
                //   routeId: "",
                //   text: "视频首图封面生成"
                // },
                // {
                //   id: "4.4.12",
                //   hotUrl: "",
                //   routeId: "",
                //   text: "视频动态封面GIF"
                // },
                // {
                //   id: "4.4.13",
                //   hotUrl: "",
                //   routeId: "",
                //   text: "视频字幕转写和翻译"
                // }
              ]
            }
          ]
        },
        {
          id: "6",
          text: "人脸与人体识别",
          subList: [
            {
              title: "人脸识别",
              routeId: "/faceRecoList",
              id: "6.1",
              childList: [
                { id: "6.1.1", hotUrl: "", routeId: "", text: "人脸检测" },
                { id: "6.1.2", hotUrl: "", routeId: "", text: "人脸对比" },
                { id: "6.1.3", hotUrl: "", routeId: "", text: "人脸搜索" },
                { id: "6.1.4", hotUrl: "", routeId: "", text: "活体检测" },
                { id: "6.1.5", hotUrl: "", routeId: "", text: "五官定位" },
                {
                  id: "6.1.6",
                  hotUrl: "",
                  routeId: "",
                  text: "人脸关键点识别"
                },
                { id: "6.1.7", hotUrl: "", routeId: "", text: "肤色检测" },
                { id: "6.1.8", hotUrl: "", routeId: "", text: "皮肤分析" },
                // { id: "6.1.9", hotUrl: "", routeId: "", text: "3D人脸重建" },
                {
                  id: "6.1.10",
                  hotUrl: "",
                  routeId: "",
                  text: "人脸水印照对比"
                },
                {
                  id: "6.1.11",
                  hotUrl: "",
                  routeId: "",
                  text: "跨年龄人脸识别"
                },
                { id: "6.1.12", hotUrl: "", routeId: "", text: "面部特征分析" }
              ]
            },
            {
              title: "人体分析",
              routeId: "",
              id: "6.2",
              childList: [
                {
                  id: "6.2.1",
                  hotUrl: "",
                  routeId: "",
                  text: "人体关键点识别"
                },
                { id: "6.2.2", hotUrl: "", routeId: "", text: "人流量统计" },
                { id: "6.2.3", hotUrl: "", routeId: "", text: "人体检测与属性识别" },
                { id: "6.2.9", hotUrl: "", routeId: "", text: "步态识别" }
              ]
            },
            {
              title: "人体特效",
              routeId: "",
              id: "6.3",
              childList: [
                { id: "6.3.1", hotUrl: "", routeId: "", text: "人脸融合" },
                { id: "6.3.2", hotUrl: "", routeId: "", text: "人像分割" },
                { id: "6.3.7", hotUrl: "", routeId: "", text: "人像动漫化" },   //6.3.3
                { id: "6.3.4", hotUrl: "", routeId: "", text: "人脸属性编辑" },
                // { id: "6.3.5", hotUrl: "", routeId: "", text: "人像渐变" },
                { id: "6.3.6", hotUrl: "", routeId: "", text: "美颜美白" },
                { id: "6.3.8", hotUrl: "", routeId: "", text: "美型" }
              ]
            },
            {
              title: "行为分析",
              routeId: "",
              id: "6.4",
              childList: [
                { id: "6.4.1", hotUrl: "", routeId: "", text: "驾驶行为分析" },
                // { id: "6.4.2", hotUrl: "", routeId: "", text: "危险行为识别" },
                {
                  id: "6.4.3",
                  hotUrl: "",
                  routeId: "",
                  text: "手部关键点识别"
                },
                { id: "6.4.4", hotUrl: "", routeId: "", text: "手势识别" },
                // { id: "6.4.5", hotUrl: "", routeId: "", text: "指尖检测" },
                { id: "6.4.6", hotUrl: "", routeId: "", text: "人脸口罩识别" }
              ]
            }
          ]
        },
        {
          id: "9",
          text: "大数据应用",
          subList: []
        },
        {
          id: "10",
          text: "解决方案",
          subList: []
        },
        // {
        //   id: "9",
        //   text: "大数据分析",
        //   subList: [
        //     {
        //       title: "数据中心",
        //       routeId: "",
        //       id: "9.1",
        //       childList: [
        //         { id: "9.1.1", hotUrl: "", routeId: "", text: "舆情数据抓取" },
        //         { id: "9.1.2", hotUrl: "", routeId: "", text: "舆情数据存储" },
        //         { id: "9.1.3", hotUrl: "", routeId: "", text: "舆情数据导出" }
        //       ]
        //     },
        //     {
        //       title: "舆情监测",
        //       routeId: "",
        //       id: "9.2",
        //       childList: [
        //         { id: "9.2.1", hotUrl: "", routeId: "", text: "关键词设置" },
        //         { id: "9.2.2", hotUrl: "", routeId: "", text: "敏感信息预警" }
        //       ]
        //     },
        //     {
        //       title: "大数据分析",
        //       routeId: "",
        //       id: "9.3",
        //       childList: [
        //         { id: "9.3.1", hotUrl: "", routeId: "", text: "全网事件分析" },
        //         { id: "9.3.2", hotUrl: "", routeId: "", text: "微博事件分析" },
        //         { id: "9.3.3", hotUrl: "", routeId: "", text: "传播效果分析" },
        //         { id: "9.3.4", hotUrl: "", routeId: "", text: "热度趋势分析" },
        //         { id: "9.3.5", hotUrl: "", routeId: "", text: "低于分布分析" },
        //         { id: "9.3.6", hotUrl: "", routeId: "", text: "竞品分析" },
        //         { id: "9.3.7", hotUrl: "", routeId: "", text: "评论分析" }
        //       ]
        //     },
        //     {
        //       title: "舆情报告",
        //       routeId: "",
        //       id: "9.4",
        //       childList: [
        //         { id: "9.4.1", hotUrl: "", routeId: "", text: "舆情简报" },
        //         { id: "9.4.2", hotUrl: "", routeId: "", text: "定制专业报告" }
        //       ]
        //     },
        //     {
        //       title: "数据大屏",
        //       routeId: "",
        //       id: "9.5",
        //       childList: []
        //     }
        //   ]
        // },
      ],
      subTilte:''
    };
  },
  created(){
      this.initData();
  },
  watch:{
    $route(newVal,oldVal){
      this.initData();
    }
  },
  components: {
    VfuRouter
  },
  methods: {
    itemleave(item,index){
      this.currentIndex=-1;
    },
    itemOver(item,index){
      this.currentIndex=index;
    },
    itemClick(item,index){
      if(index==0){
         let routerUrl = this.$router.resolve({
            path:'/zixun',
            query:{
              title:1,
              subTitle:'合作咨询'
            }
        });
        window.open(routerUrl.href,'_blank')

      }else if(index==1){
         let routerUrl = this.$router.resolve({
            path:'/serviceDetail',
            query:{
              oneId:this.fuRouterOneId,
              twoRouteId:this.fuRoutertwoId,
              routeId:this.fuRouterThreeId,
              title:1,
              subTitle:this.subTilte
            }
        });
        window.open(routerUrl.href,'_blank')
        
      }else if(index==2){
         document.documentElement.scrollTop=0;
      }
    },
    initData(){
      var routerThreeId = this.$route.query.routeId;
      this.oneActive=this.$route.query.oneId;
      this.twoActive = this.$route.query.twoRouteId;
      this.menuList.forEach(item=>{
        if(item.id==this.oneActive){
          this.twoMenuArr = item.subList;
          item.subList.forEach(item1=>{
            if(item1.id==this.twoActive){
              this.threeMenuArr = item1.childList;
            }
          })
        }
      })
      if(!routerThreeId){
        this.threeMenuText = this.menuList[0].subList[0].childList[0].id;
      }
      else{
        this.threeMenuText = routerThreeId;
      }
      this.fuRouterOneId = this.$route.query.oneId;
      this.fuRoutertwoId = this.$route.query.twoRouteId;
      this.fuRouterThreeId = this.$route.query.routeId;
      this.subTilte=this.$route.query.subTilte?this.$route.query.subTilte:'词法分析';
    },
    levelTwoChange(arg) {
        this.fuRoutertwoId = arg.id;
        this.threeMenuArr = arg.childList;
        this.threeMenuText = arg.childList.length > 0 ? arg.childList[0].id : '';
        this.fuRouterThreeId = this.threeMenuText;
        this.twoActive = arg.id;
    },
    changeValue(val) {
        this.fuRouterThreeId = val.id;
        this.subTilte=val.text;
    },
    changeLevelOneMenu(arg) {
      if(arg.subList.length>0){
        this.twoMenuArr = arg.subList;
        this.fuRoutertwoId = arg.subList[0].id;
        this.threeMenuArr = arg.subList[0].childList.length > 0 ? arg.subList[0].childList : [];
        this.threeMenuText =  arg.subList[0].childList.length > 0 ? arg.subList[0].childList[0].id : '';
        this.fuRouterOneId = arg.id;
        this.fuRouterThreeId = this.threeMenuText;
        this.oneActive=arg.id;
        this.twoActive = arg.subList[0].id;
      }else{
         this.fuRouterOneId=arg.id;
         this.oneActive=arg.id;
         this.twoMenuArr=[];
         this.threeMenuArr=[];
      }
    },
  }
};
</script>

<style scoped lang='less'>
.expericeColl_container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .expericeColl {
    width: 1200px;
    margin-top: 60px;
    margin-bottom: 140px;
    display: flex;
    .expericeColl_left {
      width: 161px;
      height: 631px;
      margin-right: 39px;
      border-right: 1px solid #ebecf0;
      .leftMenu {
        font-size: 16px;
        color: #121c33;
        margin-bottom: 20px;
        padding-left: 10px;
        box-sizing: border-box;
        cursor: pointer;
        &.oneActive{
          color: #03A971;border-left: #03A971 3px solid;
        }
      }
    }
    .expericeColl_right {
      width: 996px;
       .suggest{
          position: fixed;
          right:30px;
          bottom:30px;
          background: #FFFFFF;
          box-shadow: 0 3px 17px 0 #B8BECC;
          z-index: 1000;
          .li{
            width:60px;
            height:60px;
            background: #FFFFFF;
            border-bottom:1px solid #EBECF0;
            text-align: center;
            font-size: 10px;
            color: #121C33;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            &.liActive{
                background: #03A971;
                color: #fff;
            }
            &:last-child{
            border-bottom:none
            }
            .icon{
              width:17px;
              margin:auto;
              margin-bottom: 6px;
              img{
                width:100%;
                display: block;
              }
            }
          }
        }
      .expericeTitle {
        width: 100%;
        text-align: center;
        font-size: 24px;
        color: #121c33;
        margin-bottom: 30px;
      }
      .leveltwoMenu_container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 28px;
        .leveltwoMenu {
          flex:1;
          height: 48px;
          padding: 13px 5px;
          box-sizing: border-box;
          font-size: 16px;
          color: #3d4966;
          display: flex;
          align-items: center;
          justify-content: center;
          border: #b8becc 1px solid;
          margin-bottom: 20px;
          border-right:none;
          cursor: pointer;
          &:last-child{
            border-right: #b8becc 1px solid;
            border-radius: 0px 100px 100px 0px;
          }
          &:nth-child(1){
             border-radius: 99px 0px 0px 99px;
          }
          &.twoActive{
            background-color: rgb(3, 169, 113);
            color: rgb(255, 255, 255);
          }
        }
      }
      .levelThreeMenu {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 25px;
        /deep/.ivu-radio-default {
          font-size: 14px;
          color: #121c33;
          margin-bottom: 10px;
          label {
            margin-right: 20px;
            .ivu-radio-inner::after {
              border-color: #03a971;
            }
            .ivu-radio-checked .ivu-radio-inner {
              border-color: #03a971;
            }
            .ivu-radio-inner::after {
              background-color: #03a971;
            }
          }
        }
      }
    }
  }
}
</style>
