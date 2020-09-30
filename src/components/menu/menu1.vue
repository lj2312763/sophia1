<template>
    <div class="aiSmartApp_menu_container" v-if="navType == 1" @mouseleave="hideMenu">
      <div class="sub_container">
          <ul class="left">
            <li v-for="item in menuList" :key="item.id" @mouseover="lookDetail(item)" @click="jump(item)">{{item.text}}</li>
          </ul>
          <ul class="right">
             <li v-for="(item,index) in rightList" :key="index">
               <div class="sub_title" @click="queryList(item)">{{item.title}}</div>
               <div class="sub_child" v-for="(subItem,subIndex) in item.childList" :key="subIndex" @click="queryDetail(subItem,item.id)">
                 <span>
                   {{subItem.text}}
                    <div class="hot" v-if="subItem.hotUrl">
                        <img :src="subItem.hotUrl"  class="big_img">
                    </div>
                 </span>
                 
              </div>
             </li>
          </ul>
       </div>
    </div>
    <div class="insightData_menu_container" v-else-if="navType == 2" @mouseleave="hideMenu">
      <div @click="goList(8)" class="border_bottom_style falvzonghefenxi">法律综合分析</div>
      <div @click="goDetails(26)">地产综合分析</div>
      <div @click="goDetails(27)" class="pinpai">品牌舆情洞察</div>
      <div @click="goDetails(28)" class="dili">地理综合查询</div>
      <div @click="goDetails(33)" class="dili">旅游数据洞察</div>
      <div @click="goDetails(34)" class="dili">餐饮数据洞察</div>
      <div @click="goDetails(35)" class="dili">物业洞察分析</div>
    </div>
    <div class="obserData_menu_container" v-else-if="navType == 3" @mouseleave="hideMenu">
      <div @click="goList(9)" class="border_bottom_style">政治数据</div>
      <div @click="goDetails(29)">民生数据</div>
      <div @click="goDetails(30)">经济数据</div>
      <div @click="goDetails(31)">文化数据</div>
      <div @click="goDetails(32)">训练数据</div>
    </div>
    <div class="obserData_menu_container bigDataPlat" v-else-if="navType == 4" @mouseleave="hideMenu">
      <div @click="bigDataPlatChange(0)">推荐平台</div>
      <div @click="bigDataPlatChange(1)">算法实验室</div>
    </div>
</template>

<script>
  export default {
    props:['navType'],
    data(){
      return{
        levelOne:"",
        levelTwo:'',
        ifShowMenu:true,
        hotImg:require('../../assets/images/home/hot.png'),
        rightList:[],
        activeClass:'',
        menuList:[//Ai菜单数据格式
          {//hotUrl分为三种情况，hotUrl标志为hot的，或者为new的，或者没有为空
            id:'1',
            text:"语音技术",
            subList:[
              {
                title:"语音识别",
                routeId:'/aiSmartAppList',
                id:"1.1",
                childList:[
                  {id:"1.1.1", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/shortSpeechRecoDetail', text:"短语音识别"},
                  {id:"1.1.2", hotUrl:'', routeId:'/realTimeReco', text:"实时语音识别"},
                  {id:"1.1.3", hotUrl:'', routeId:'/fileReco', text:"录音文件识别"},
                  {id:"1.1.4", hotUrl:'', routeId:'/speSyn', text:"语音合成"},
                ]
              },
              {
                title:"语音扩展",
                routeId:'',
                id:'1.2',
                childList:[
                  {id:"1.2.1", hotUrl:'', routeId:'', text:"语音评测"},
                  {id:"1.2.2", hotUrl:'', routeId:'', text:"歌曲识别"},
                  {id:"1.2.3", hotUrl:'', routeId:'', text:"声纹识别"},
                  {id:"1.2.4", hotUrl:'', routeId:'', text:"声音年龄识别"},
                ]
              },
              // {
              //   title:"demoList",
              //   routeId:'/demoList',
              //   id:'1.3',
              //   childList:[
              //     {id:"1.3.1", hotUrl:'', routeId:'/demoDetail', text:"demo详情"},
              //   ]
              // },
            ]
          },
          {
            id:'2',
            text:"文字识别",
            subList:[
              {
                title:"卡证文字识别",
                routeId:'/cardTextRecList',
                id:"2.1",
                childList:[
                  {id:"2.1.1", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/idCardRecDetail', text:"身份证识别"},
                  {id:"2.1.2", hotUrl:'', routeId:'', text:"银行卡识别"},
                  {id:"2.1.3", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/passportRecDetail', text:"护照识别"},
                  {id:"2.1.4", hotUrl:'', routeId:'', text:"名片识别"},
                  {id:"2.1.5", hotUrl:'', routeId:'', text:"户口本识别"},
                  {id:"2.1.6", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/businessLiceRecDetail', text:"营业执照识别"},
                  {id:"2.1.7", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/returnPerRecDetail', text:"港澳通行证识别"},
                  {id:"2.1.8", hotUrl:'', routeId:'', text:"台湾往来通行证识别"},
                  {id:"2.1.9", hotUrl:'', routeId:'/experienceColl', text:"出生医学证明识别"},
                ]
              },
              {
                title:"票据文字识别",
                routeId:'/ticketTextRecLiset',
                id:"2.2",
                childList:[
                  {id:"2.2.1", hotUrl:'', routeId:'', text:"通用发票识别"},
                  {id:"2.2.2", hotUrl:'', routeId:'', text:"混贴票据识别"},
                  {id:"2.2.3", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/ticketTextRecDetail', text:"增值税发票识别"},
                  {id:"2.2.4", hotUrl:'', routeId:'', text:"承兑汇票识别"},
                  {id:"2.2.5", hotUrl:'', routeId:'', text:"银行回单识别"},
                  {id:"2.2.6", hotUrl:'', routeId:'', text:"银行支票识别"},
                  {id:"2.2.7", hotUrl:'', routeId:'', text:"定额发票识别"},
                  {id:"2.2.8", hotUrl:'', routeId:'', text:"通用机打发票识别"},
                  {id:"2.2.9", hotUrl:'', routeId:'', text:"火车票识别"},
                  {id:"2.2.10", hotUrl:'', routeId:'', text:"出租车票识别"},
                  {id:"2.2.11", hotUrl:'', routeId:'', text:"行程单识别"},
                  {id:"2.2.12", hotUrl:'', routeId:'', text:"保险单识别"},
                  {id:"2.2.13", hotUrl:'', routeId:'', text:"彩票识别"},
                ]
              },
              {
                title:"汽车场景文字识别",
                routeId:'/carSceneRecList',
                id:"2.3",
                childList:[
                  {id:"2.3.1", hotUrl:'', routeId:'/jiashiLiceRecDetail', text:"驾驶证识别"},
                  {id:"2.3.2", hotUrl:'', routeId:'/xshiLiceRecDetail', text:"行驶证识别"},
                  {id:"2.3.3", hotUrl:'', routeId:'', text:"车牌识别"},
                  {id:"2.3.4", hotUrl:'', routeId:'', text:"VIN码识别"},
                  {id:"2.3.5", hotUrl:'', routeId:'', text:"车辆合格证识别"},
                  {id:"2.3.6", hotUrl:'', routeId:'/carInvoRecDetail', text:"机动车销售发票识别"},
                ]
              },
              {
                title:"教育场景文字识别",
                routeId:'',
                id:"2.4",
                childList:[
                  {id:"2.4.1", hotUrl:'', routeId:'', text:"出租车票识别"},
                  {id:"2.4.2", hotUrl:'', routeId:'', text:"行程单识别"},
                ]
              },
              {
                title:"其他文字识别",
                routeId:'/otherTextRecList',
                id:"2.5",
                childList:[
                  {id:"2.5.1", hotUrl:'', routeId:'/tableTextRecDetail', text:"表格文字识别"},
                  {id:"2.5.2", hotUrl:'', routeId:'/numberRecDetail', text:"数字识别"},
                  {id:"2.5.3", hotUrl:'', routeId:'/rqCodeRecDetail', text:"二维码识别"},
                  {id:"2.5.4", hotUrl:'', routeId:'/sealDetectDetail', text:"印章检测"},
                  {id:"2.5.5", hotUrl:'', routeId:'/netWorkPicRecDetail', text:"网络图片文字识别"},
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
            ]
          },
          {
            id:'3',
            text:"图像技术",
            subList:[
              {
                title:"图像识别",
                routeId:'',
                id:"3.1",
                childList:[
                  {id:"3.1.1", hotUrl:'', routeId:'', text:"通用物体和场景识别"},
                  {id:"3.1.2", hotUrl:'', routeId:'', text:"图像主体检测"},
                  {id:"3.1.3", hotUrl:'', routeId:'', text:"通用商品识别"},
                  {id:"3.1.4", hotUrl:'', routeId:'', text:"品牌logo识别"},
                  {id:"3.1.5", hotUrl:'', routeId:'', text:"植物识别"},
                  {id:"3.1.6", hotUrl:'', routeId:'', text:"动物识别"},
                  {id:"3.1.7", hotUrl:'', routeId:'', text:"地标识别"},
                  {id:"3.1.8", hotUrl:'', routeId:'', text:"菜品识别"},
                  {id:"3.1.9", hotUrl:'', routeId:'', text:"美食图片识别"},
                  {id:"3.1.10", hotUrl:'', routeId:'', text:"果蔬识别"},
                  {id:"3.1.11", hotUrl:'', routeId:'', text:"红酒识别"},
                  {id:"3.1.12", hotUrl:'', routeId:'', text:"货币识别"},
                  {id:"3.1.13", hotUrl:'', routeId:'', text:"门脸识别"},
                  {id:"3.1.14", hotUrl:'', routeId:'', text:"看图说话"},
                  {id:"3.1.15", hotUrl:'', routeId:'', text:"多标签识别"},
                  {id:"3.1.16", hotUrl:'', routeId:'', text:"模糊图片识别"},
                  {id:"3.1.17", hotUrl:'', routeId:'', text:"场景识别"},
                  {id:"3.1.18", hotUrl:'', routeId:'', text:"垃圾分类识别"},
                ]
              },
              {
                title:"图像审核",
                routeId:'',
                id:"3.2",
                childList:[
                  {id:"3.2.1", hotUrl:'', routeId:'', text:"图文审核"},
                  {id:"3.2.2", hotUrl:'', routeId:'', text:"色情识别"},
                  {id:"3.2.3", hotUrl:'', routeId:'', text:"暴恐检测"},
                  {id:"3.2.4", hotUrl:'', routeId:'', text:"政治敏感识别"},
                  {id:"3.2.5", hotUrl:'', routeId:'', text:"公众人物识别"},
                  {id:"3.2.6", hotUrl:'', routeId:'', text:"广告检测"},
                  {id:"3.2.7", hotUrl:'', routeId:'', text:"恶心图像识别"},
                  {id:"3.2.8", hotUrl:'', routeId:'', text:"图像质量检测"},
                ]
              },
              {
                title:"图像搜索",
                routeId:'',
                id:"3.3",
                childList:[
                  {id:"3.3.1", hotUrl:'', routeId:'', text:"相同图片搜索"},
                  {id:"3.3.2", hotUrl:'', routeId:'', text:"相似图片搜索"},
                  {id:"3.3.3", hotUrl:'', routeId:'', text:"商品图片搜索"},
                  {id:"3.3.4", hotUrl:'', routeId:'', text:"绘本图片搜索"},
                ]
              },
              {
                title:"图像效果增强",
                routeId:'',
                id:"3.4",
                childList:[
                  {id:"3.4.1", hotUrl:'', routeId:'', text:"图像去雾"},
                  {id:"3.4.2", hotUrl:'', routeId:'', text:"图像修复"},
                  {id:"3.4.3", hotUrl:'', routeId:'', text:"图像无损放大"},
                  {id:"3.4.4", hotUrl:'', routeId:'', text:"拉伸图像恢复"},
                  {id:"3.4.5", hotUrl:'', routeId:'', text:"黑白图像上色"},
                  {id:"3.4.6", hotUrl:'', routeId:'', text:"图像风格转换"},
                  {id:"3.4.7", hotUrl:'', routeId:'', text:"图像对比度增强"},
                  {id:"3.4.8", hotUrl:'', routeId:'', text:"图像清晰度增强"},
                  {id:"3.4.9", hotUrl:'', routeId:'', text:"滤镜"},
                  {id:"3.4.10", hotUrl:'', routeId:'', text:"大头贴"},
                  {id:"3.4.11", hotUrl:'', routeId:'', text:"人脸变妆"},
                  {id:"3.4.12", hotUrl:'', routeId:'', text:"人脸美妆"},
                  {id:"3.4.13", hotUrl:'', routeId:'', text:"颜龄检测"},
                  {id:"3.4.14", hotUrl:'', routeId:'', text:"人像动漫化"},
                ]
              },
              {
                title:"车辆分析",
                routeId:'',
                id:"3.5",
                childList:[
                  {id:"3.5.1", hotUrl:'', routeId:'', text:"车型识别"},
                  {id:"3.5.2", hotUrl:'', routeId:'', text:"车辆检测"},
                  {id:"3.5.3", hotUrl:'', routeId:'', text:"车流统计"},
                  {id:"3.5.4", hotUrl:'', routeId:'', text:"车辆属性识别"},
                  {id:"3.5.5", hotUrl:'', routeId:'', text:"车辆损伤识别"},
                  {id:"3.5.6", hotUrl:'', routeId:'', text:"车辆分割"},
                ]
              },
            ]
          },
          {
            id:'4',
            text:"视频技术",
            subList:[
              {
                title:"视频内容识别",
                routeId:'/VideoRecoList',
                id:"4.1",
                childList:[
                  {id:"4.1", hotUrl:'', routeId:'', text:"视频人脸识别"},
                  {id:"4.1", hotUrl:'', routeId:'', text:"视频语音识别"},
                  {id:"4.1", hotUrl:'', routeId:'', text:"视频文字识别"},
                  {id:"4.1", hotUrl:'', routeId:'', text:"视频物体识别"},
                  {id:"4.1", hotUrl:'', routeId:'', text:"视频分类识别"},
                  {id:"4.1", hotUrl:'', routeId:'', text:"视频帧标签识别"},
                  {id:"4.1", hotUrl:'', routeId:'', text:"视频标签识别"},
                  {id:"4.1", hotUrl:'', routeId:'', text:"片头片尾识别"},
                ]
              },
              {
                title:"视频内容分析",
                routeId:'',
                id:"4.2",
                childList:[
                  {id:"4.2.1", hotUrl:'', routeId:'', text:"视频分类"},
                  {id:"4.2.2", hotUrl:'', routeId:'', text:"视频公众人物识别"},
                  {id:"4.2.3", hotUrl:'', routeId:'', text:"泛标签提取"},
                  {id:"4.2.4", hotUrl:'', routeId:'', text:"节目识别"},
                  {id:"4.2.5", hotUrl:'', routeId:'', text:"动作事件识别"},
                  {id:"4.2.6", hotUrl:'', routeId:'', text:"地点场景识别"},
                  {id:"4.2.7", hotUrl:'', routeId:'', text:"视频质量检测"},
                ]
              },
              {
                title:"视频内容审核",
                routeId:'',
                id:"4.3",
                childList:[
                  {id:"4.3.1", hotUrl:'', routeId:'', text:"色情识别"},
                  {id:"4.3.2", hotUrl:'', routeId:'', text:"暴恐识别"},
                  {id:"4.3.3", hotUrl:'', routeId:'', text:"政治敏感识别"},
                  {id:"4.3.4", hotUrl:'', routeId:'', text:"违禁品识别"},
                  {id:"4.3.5", hotUrl:'', routeId:'', text:"广告检测"},
                  {id:"4.3.6", hotUrl:'', routeId:'', text:"logo检测"},
                ]
              },
              {
                title:"视频处理",
                routeId:'',
                id:"4.4",
                childList:[
                  {id:"4.4.1", hotUrl:'', routeId:'', text:"视频转码"},
                  {id:"4.4.2", hotUrl:'', routeId:'', text:"数字水印"},
                  {id:"4.4.3", hotUrl:'', routeId:'', text:"视频截图"},
                  {id:"4.4.4", hotUrl:'', routeId:'', text:"视频剪辑"},
                  {id:"4.4.5", hotUrl:'', routeId:'', text:"视频拼接"},
                  {id:"4.4.6", hotUrl:'', routeId:'', text:"视频换脸"},
                  {id:"4.4.7", hotUrl:'', routeId:'', text:"智能拆条"},
                  {id:"4.4.8", hotUrl:'', routeId:'', text:"智能集锦"},
                  {id:"4.4.9", hotUrl:'', routeId:'', text:"智能封面"},
                  {id:"4.4.10", hotUrl:'', routeId:'', text:"视频摘要"},
                  {id:"4.4.11", hotUrl:'', routeId:'', text:"视频首图封面生成"},
                  {id:"4.4.12", hotUrl:'', routeId:'', text:"视频动态封面GIF"},
                  {id:"4.4.13", hotUrl:'', routeId:'', text:"视频字幕转写和翻译"},
                ]
              },
            ]
          },
          {
            id:'5',
            text:"自然语言处理",
            subList:[
              {
                title:"语言处理基础技术",
                routeId:'',
                id:"5.1",
                childList:[
                  {id:"5.1.1", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/aiSmartAppDetail', text:"词法分析"},
                  {id:"5.1.2", hotUrl:'', routeId:'/aiSentence', text:"句法分析"},
                  {id:"5.1.3", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/aiSyntax', text:"句式识别"},
                  {id:"5.1.4", hotUrl:'', routeId:'/aiDepenpars', text:"依存句法分析"},
                  {id:"5.1.5", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/aiKeyword', text:"关键词提取"},
                  {id:"5.1.6", hotUrl:require('../../assets/images/home/hot.png'), routeId:'/aiIdentity', text:"命名实体识别"},
                  {id:"5.1.8", hotUrl:'', routeId:'', text:"短文本相似度"},
                  {id:"5.1.9", hotUrl:'', routeId:'/aiBoundary', text:"句子边界识别"},
                  {id:"5.1.10", hotUrl:'', routeId:'', text:"DNN语言模型"},
                  {id: "5.1.11", hotUrl: "", routeId: "/aiSemantic", text: "词义相似度" }
                ]
              },
              {
                title:"语言处理应用技术",
                routeId:'',
                id:"5.2",
                childList:[
                  {id:"5.2.1", hotUrl:'', routeId:'', text:"意图成分"},
                  {id:"5.2.2", hotUrl:'', routeId:'', text:"情感分析"},
                  {id:"5.2.3", hotUrl:'', routeId:'', text:"文本纠错"},
                  {id:"5.2.4", hotUrl:'', routeId:'', text:"文章标签"},
                  {id:"5.2.5", hotUrl:'', routeId:'', text:"文章分类"},
                  {id:"5.2.6", hotUrl:'', routeId:'', text:"新闻摘要"},
                  {id:"5.2.7", hotUrl:'', routeId:'', text:"地址识别"},
                  {id:"5.2.8", hotUrl:'', routeId:'', text:"评论观点抽取"},
                  {id:"5.2.9", hotUrl:'', routeId:'', text:"对话情绪识别"},
                ]
              },
              {
                title:"文本审核",
                routeId:'',
                id:"5.3",
                childList:[
                  {id:"5.3", hotUrl:'', routeId:'', text:"色情识别"},
                  {id:"5.3", hotUrl:'', routeId:'', text:"暴恐识别"},
                  {id:"5.3", hotUrl:'', routeId:'', text:"政治敏感"},
                  {id:"5.3", hotUrl:'', routeId:'', text:"恶意推广"},
                  {id:"5.3", hotUrl:'', routeId:'', text:"低俗辱骂"},
                  {id:"5.3", hotUrl:'', routeId:'', text:"低质灌水"},
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
            id:'6',
            text:"人脸与人体识别",
            subList:[
              {
                title:"人脸识别",
                routeId:'/faceRecoList',
                id:"6.1",
                childList:[
                  {id:"6.1.1", hotUrl:'', routeId:'', text:"人脸检测"},
                  {id:"6.1.2", hotUrl:'', routeId:'', text:"人脸对比"},
                  {id:"6.1.3", hotUrl:'', routeId:'', text:"人脸搜索"},
                  {id:"6.1.4", hotUrl:'', routeId:'', text:"活体检测"},
                  {id:"6.1.5", hotUrl:'', routeId:'', text:"五官定位"},
                  {id:"6.1.6", hotUrl:'', routeId:'', text:"人脸关键点识别"},
                  {id:"6.1.7", hotUrl:'', routeId:'', text:"肤色检测"},
                  {id:"6.1.8", hotUrl:'', routeId:'', text:"皮肤分析"},
                  {id:"6.1.9", hotUrl:'', routeId:'', text:"3D人脸重建"},
                  {id:"6.1.10", hotUrl:'', routeId:'', text:"人脸水印照对比"},
                  {id:"6.1.11", hotUrl:'', routeId:'', text:"跨年龄人脸识别"},
                  {id:"6.1.12", hotUrl:'', routeId:'', text:"面部特征分析"},
                ]
              },
              {
                title:"人体分析",
                routeId:'',
                id:"6.2",
                childList:[
                  {id:"6.2.1", hotUrl:'', routeId:'', text:"人体关键点识别"},
                  {id:"6.2.2", hotUrl:'', routeId:'', text:"人流量统计"},
                  {id:"6.2.3", hotUrl:'', routeId:'', text:"人体检测与属性"},
                ]
              },
              {
                title:"人体特效",
                routeId:'',
                id:"6.3",
                childList:[
                  {id:"6.3.1", hotUrl:'', routeId:'', text:"人脸融合"},
                  {id:"6.3.2", hotUrl:'', routeId:'', text:"人像分割"},
                  {id:"6.3.3", hotUrl:'', routeId:'', text:"人像动漫化"},
                  {id:"6.3.4", hotUrl:'', routeId:'', text:"人脸属性编辑"},
                  {id:"6.3.5", hotUrl:'', routeId:'', text:"人像渐变"},
                  {id:"6.3.6", hotUrl:'', routeId:'', text:"美颜美白"},
                ]
              },
              {
                title:"视频处理",
                routeId:'',
                id:"6.4",
                childList:[
                  {id:"6.4.1", hotUrl:'', routeId:'', text:"驾驶行为分析"},
                  {id:"6.4.2", hotUrl:'', routeId:'', text:"危险行为识别"},
                  {id:"6.4.3", hotUrl:'', routeId:'', text:"手部关键点识别"},
                  {id:"6.4.4", hotUrl:'', routeId:'', text:"手势识别"},
                  {id:"6.4.5", hotUrl:'', routeId:'', text:"指尖检测"},
                  {id:"6.4.6", hotUrl:'', routeId:'', text:"人脸口罩识别"},
                ]
              },
            ]
          },
          {
            id:'7',
            text:"智能推荐",
            subList:[
              {
                title:"元数据管理",
                routeId:'/recommendDetail',
                id:"7.1",
                childList:[
                  {id:"7.1.1", hotUrl:'', routeId:'', text:"入库校验规则"},
                  {id:"7.1.2", hotUrl:'', routeId:'', text:"元事件"},
                  {id:"7.1.3", hotUrl:'', routeId:'', text:"事件属性"},
                  {id:"7.1.4", hotUrl:'', routeId:'', text:"用户属性"},
                  {id:"7.1.5", hotUrl:'', routeId:'', text:"维度表"},
                  {id:"7.1.6", hotUrl:'', routeId:'', text:"虚拟属性"},
                  {id:"7.1.7", hotUrl:'', routeId:'', text:"虚拟事件"},
                  {id:"7.1.8", hotUrl:'', routeId:'', text:"Session管理"},
                ]
              },
              {
                title:"分析模块",
                routeId:'/recommendDetail',
                id:"7.2",
                childList:[
                  {id:"7.2.1", hotUrl:'', routeId:'', text:"事件分析"},
                  {id:"7.2.2", hotUrl:'', routeId:'', text:"用户分析"},
                  {id:"7.2.3", hotUrl:'', routeId:'', text:"分布分析"},
                  {id:"7.2.4", hotUrl:'', routeId:'', text:"漏斗分析"},
                  {id:"7.2.5", hotUrl:'', routeId:'', text:"归因分析"},
                ]
              },
              {
                title:"推荐管理",
                routeId:'/recommendDetail',
                id:"7.3",
                childList:[
                  {id:"7.3.1", hotUrl:'', routeId:'', text:"用户画像"},
                  {id:"7.3.2", hotUrl:'', routeId:'', text:"场景库"},
                  {id:"7.3.3", hotUrl:'', routeId:'', text:"预警管理"},
                  {id:"7.3.4", hotUrl:'', routeId:'', text:"内容推荐"},
                  {id:"7.3.5", hotUrl:'', routeId:'', text:"产品推荐"},
                  {id:"7.3.6", hotUrl:'', routeId:'', text:"用户推荐"},
                ]
              },
            ]
          },
          {
            id:'8',
            text:"智能搜索",
            subList:[
              {
                title:"智能搜索",
                routeId:'/searchDetail',
                id:"8.1",
                childList:[
                  {id:"8.1.1", hotUrl:'', routeId:'', text:"数据库检索"},
                  {id:"8.1.2", hotUrl:'', routeId:'', text:"数据交换接口与协议"},
                  {id:"8.1.3", hotUrl:'', routeId:'', text:"多语言搜索"},
                  {id:"8.1.5", hotUrl:'', routeId:'', text:"文档检索"},
                ]
              },
              {
                title:"数据处理",
                routeId:'/searchDetail',
                id:"8.2",
                childList:[
                  {id:"8.2.1", hotUrl:'', routeId:'', text:"数据接入"},
                  {id:"8.2.2", hotUrl:'', routeId:'', text:"数据处理"},
                  {id:"8.2.3", hotUrl:'', routeId:'', text:"数据索引"},
                  {id:"8.2.4", hotUrl:'', routeId:'', text:"智能检索"},
                  {id:"8.2.5", hotUrl:'', routeId:'', text:"数据聚合"},
                ]
              },
            ]
          },
          // {
          //   id:'9',
          //   text:"大数据分析",
          //   subList:[
          //     {
          //       title:"数据中心",
          //       routeId:'/bigDataPlat',
          //       id:"9.1",
          //       childList:[
          //         {id:"9.1.1", hotUrl:'', routeId:'', text:"舆情数据抓取"},
          //         {id:"9.1.2", hotUrl:'', routeId:'', text:"舆情数据存储"},
          //         {id:"9.1.3", hotUrl:'', routeId:'', text:"舆情数据导出"},
          //       ]
          //     },
          //     {
          //       title:"舆情监测",
          //       routeId:'/bigDataPlat',
          //       id:"9.2",
          //       childList:[
          //         {id:"9.2.1", hotUrl:'', routeId:'', text:"关键词设置"},
          //         {id:"9.2.2", hotUrl:'', routeId:'', text:"敏感信息预警"},
          //       ]
          //     },
          //     {
          //       title:"大数据分析",
          //       routeId:'/bigDataPlat',
          //       id:"9.3",
          //       childList:[
          //         {id:"9.3.1", hotUrl:'', routeId:'', text:"全网事件分析"},
          //         {id:"9.3.2", hotUrl:'', routeId:'', text:"微博事件分析"},
          //         {id:"9.3.3", hotUrl:'', routeId:'', text:"传播效果分析"},
          //         {id:"9.3.4", hotUrl:'', routeId:'', text:"热度趋势分析"},
          //         {id:"9.3.5", hotUrl:'', routeId:'', text:"低于分布分析"},
          //         {id:"9.3.6", hotUrl:'', routeId:'', text:"竞品分析"},
          //         {id:"9.3.7", hotUrl:'', routeId:'', text:"评论分析"},
          //       ]
          //     },
          //     {
          //       title:"舆情报告",
          //       routeId:'/bigDataPlat',
          //       id:"9.4",
          //       childList:[
          //         {id:"9.4.1", hotUrl:'', routeId:'', text:"舆情简报"},
          //         {id:"9.4.2", hotUrl:'', routeId:'', text:"定制专业报告"},
          //       ]
          //     },
          //     {
          //       title:"数据大屏",
          //       routeId:'',
          //       id:"9.5",
          //       childList:[
          //       ] 
          //     },
          //   ]
          // },
          {
            id:'10',
            text:"舆情分析",
            subList:[
              {
                title:"数据中心",
                routeId:'/opinionAnalysisDetail',
                id:"10.1",
                childList:[
                  {id:"10.1.1", hotUrl:'', routeId:'', text:"舆情数据抓取"},
                  {id:"10.1.2", hotUrl:'', routeId:'', text:"舆情数据存储"},
                  {id:"10.1.3", hotUrl:'', routeId:'', text:"舆情数据导出"},
                ]
              },
              {
                title:"舆情监测",
                routeId:'/opinionAnalysisDetail',
                id:"10.2",
                childList:[
                  {id:"10.2.1", hotUrl:'', routeId:'', text:"关键词设置"},
                  {id:"10.2.2", hotUrl:'', routeId:'', text:"敏感信息预警"},
                ]
              },
              {
                title:"舆情大数据分析",
                routeId:'/opinionAnalysisDetail',
                id:"10.3",
                childList:[
                  {id:"10.3.1", hotUrl:'', routeId:'', text:"全网事件分析"},
                  {id:"10.3.2", hotUrl:'', routeId:'', text:"微博事件分析"},
                  {id:"10.3.3", hotUrl:'', routeId:'', text:"传播效果分析"},
                  {id:"10.3.4", hotUrl:'', routeId:'', text:"热度趋势分析"},
                  {id:"10.3.5", hotUrl:'', routeId:'', text:"低于分布分析"},
                  {id:"10.3.6", hotUrl:'', routeId:'', text:"竞品分析"},
                  {id:"10.3.7", hotUrl:'', routeId:'', text:"评论分析"},
                ]
              },
              {
                title:"舆情报告",
                routeId:'/opinionAnalysisDetail',
                id:"10.4",
                childList:[
                  {id:"10.4.1", hotUrl:'', routeId:'', text:"舆情简报"},
                  {id:"10.4.2", hotUrl:'', routeId:'', text:"定制专业报告"},
                ]
              },
              {
                title:"数据大屏",
                routeId:'/opinionAnalysisDetail',
                id:"10.5",
                childList:[
                ] 
              },
            ]
          },
          {
            id:'11',
            text:"查看更多",
            // subList:[
            //   {
            //     title:"语音技术（35）",
            //     routeId:'/algorithm',
            //     id:"10.1",
            //     childList:[
            //     ]
            //   },
            //   {
            //     title:"图像文字识别（6）",
            //     routeId:'/algorithm',
            //     id:"10.2",
            //     childList:[
            //     ]
            //   },
            //   {
            //     title:"图像技术（98）",
            //     routeId:'/algorithm',
            //     id:"10.3",
            //     childList:[
            //     ]
            //   },
            //   {
            //     title:"视频技术（19）",
            //     routeId:'/algorithm',
            //     id:"10.4",
            //     childList:[
            //     ]
            //   },
            //   {
            //     title:"自然语言处理",
            //     routeId:'/algorithm',
            //     id:"10.5",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"人脸与人体识别（22）",
            //     routeId:'/algorithm',
            //     id:"10.6",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"步态识别（1）",
            //     routeId:'/algorithm',
            //     id:"10.7",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"智能推荐（5）",
            //     routeId:'/algorithm',
            //     id:"10.8",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"智能搜索（2）",
            //     routeId:'/algorithm',
            //     id:"10.9",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"机器学习（9）",
            //     routeId:'/algorithm',
            //     id:"10.10",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"物联网（20）",
            //     routeId:'/algorithm',
            //     id:"10.11",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"应用系统（106）",
            //     routeId:'/algorithm',
            //     id:"10.12",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"区块链（100）",
            //     routeId:'/algorithm',
            //     id:"10.13",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"AR（100）",
            //     routeId:'/algorithm',
            //     id:"10.14",
            //     childList:[
            //     ] 
            //   },
            //   {
            //     title:"VR（100）",
            //     routeId:'/algorithm',
            //     id:"10.15",
            //     childList:[
            //     ] 
            //   },
            // ]
          },
        ],
        
      }
    },
    created(){
      this.rightList=this.menuList[0].subList;
      this.levelOne=this.menuList[0].id;
    },
    methods:{
      queryList(item){
        // this.$router.push({
        //   path:'/aiSmartAppList',
        //   query:{
        //     type:1,
        //     routeId:item.routeId
        //   }
        // });
        
        if(item.childList.length<=0){
          // this.$router.push({
          //   path:'/experienceColl2',
          //   query:{
          //     oneId:this.levelOne,
          //     twoRouteId:item.id,
          //     // routeId:item.id,
          //     type:1,
          //   }
          // });
          if(item.routeId){
            this.$router.push({
              path:item.routeId,
              query:{
                type:1,
              }
            });
          }else{
            let routerUrl = this.$router.resolve({
                path:'/experienceColl2',
                query:{
                    oneId:this.levelOne,
                    twoRouteId:item.id,
                    type:1,
                }
            });
            window.open(routerUrl.href,'_blank')
          }
           
        }else{
          if(item.routeId){
            this.$router.push({
              path:item.routeId,
              query:{
                type:1,
              }
            });
          }else{
             let routerUrl = this.$router.resolve({
                  path:'/experienceColl2',
                  query:{
                      oneId:this.levelOne,
                      twoRouteId:item.id,
                      type:1,
                  }
              });
              window.open(routerUrl.href,'_blank')
          }
        }
         
         
        this.hideMenu()
      },
      queryDetail(item,levelTwoId){
        // if(item.routeId){
        //   this.$router.push({
        //     path:item.routeId,
        //     query:{
        //       type:1,
        //     }
        //   });
        // }
          // this.$router.push({
          //   path:'/experienceColl2',
          //   query:{
          //     oneId:this.levelOne,
          //     twoRouteId:levelTwoId,
          //     routeId:item.id,
          //     type:1,
          //   }
          // });
          //if(item.hot){}
          let routerUrl = this.$router.resolve({
              path:'/experienceColl2',
              query:{
                  oneId:this.levelOne,
                  twoRouteId:levelTwoId,
                  routeId:item.id,
                  type:1,
              }
          });
          window.open(routerUrl.href,'_blank')
        this.hideMenu()
      },
      lookDetail(item){
        this.rightList=item.subList;
        this.levelOne=item.id;
      },
      jump(item){
        if(item.id=='11'){
          this.$router.push({
            path:'/algorithm',
            query:{
              type:1,
            }
          });
        }
      },
      goList(arg){
        if(arg == 0){
          this.$router.push({
            path:'/aiSmartAppList',
            query:{
              type:1,
              featurType:0
            }
          });
        }
        else if(arg == 1){
          this.$router.push({
            path:'/faceRecoList',
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 2){
          this.$router.push({
            path:'/VideoRecoList',
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 3){
          this.$router.push({
            path:'/searchDetail', 
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 4){
          this.$router.push({
            path:'/opinionAnalysisDetail', 
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 5){
          this.$router.push({
            path:'/textReocList',
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 6){
          this.$router.push({
            path:'/aiSmartAppList',  
            query:{
              type:1,
              featurType:1
            }
          }); 
        }
        else if(arg == 7){
          this.$router.push({
            path:'/recommendDetail', 
            query:{
              type:1
            }
          }); 
        }
        else if(arg == 8){
          this.$router.push({
            path:'/insightData',   
            query:{
              type:2
            }
          }); 
        }
        else if(arg == 9){
          this.$router.push({
            path:'/obserStarData',  
            query:{
              type:3,
              featurType:0
            }
          }); 
        }
       this.hideMenu()
      },
      goDetails(arg){
        switch(arg){
          case 0:
            this.$router.push({
              path:'/aiSmartAppDetail',
              query:{
                type:1,
              } 
            });
            break;
          case 1:
            this.$router.push({
              path:'/aiSentence',
              query:{
                type:1,
              } 
            });
            break;
          case 2:
            this.$router.push({
              path:'/aiSyntax',
              query:{
                type:1,
              } 
            });
            break;
          case 3:
            this.$router.push({
              path:'/aiDepenpars',     //依存句法分析
              query:{
                type:1,
              } 
            });
            break;
          case 4:
            this.$router.push({
              path:'/aiKeyword',
              query:{
                type:1,
              } 
            });
            break;
          case 5:
            this.$router.push({
              path:'/aiIdentity',  //命名实体识别
              query:{
                type:1,
              } 
            });
            break;
          case 6:
            this.$router.push({
              path:'/aiSemantic',  //语义相似度
              query:{
                type:1,
              } 
            });
            break;
          case 7:
            this.$router.push({
              path:'/aiBoundary',
              query:{
                type:1,
              } 
            });
            break;
          case 17:
            this.$router.push({
              path:'/cardTextRecList',  
              query:{
                type:1,
              } 
            });
            break;      
          case 18:
            this.$router.push({
              path:'/ticketTextRecLiset',  
              query:{
                type:1,
              } 
            });
            break;       
          case 19:
            this.$router.push({
              path:'/carSceneRecList',  
              query:{
                type:1,
              } 
            });
            break;   
          case 21:
            this.$router.push({
              path:'/shortSpeechRecoDetail',  
              query:{
                type:1,
              } 
            });
            break;
          case 22:
            this.$router.push({
              path:'/realTimeReco',
              query:{
                type:1,
              } 
            });
            break;
          case 23:
            this.$router.push({
              path:'/fileReco',
              query:{
                type:1,
              } 
            });
            break;
          case 25:
            this.$router.push({
              path:'/speSyn',
              query:{
                type:1,
              } 
            });
            break;
          case 26:
            this.$router.push({
              path:'/houseData',  //geographySearch
              query:{
                type:2,
              }  
            });
            break;
          case 27:
            this.$router.push({
              path:'/brandSentiment',
              query:{
                type:2,
              }   //geographySearch 
            });
            break;
          case 28:
            this.$router.push({
              path:'/geographySearch',
              query:{
                type:2,
              } 
            });
            break;
          case 29 :
            this.$router.push({ 
              path:'/obserStarData',  
              query:{
                type:3,
                featurType:1
              }
            });
            break;
          case 30 :
            this.$router.push({ 
              path:'/obserStarData',  
              query:{
                type:3,
                featurType:2
              }
            });
            break;
          case 31:
            this.$router.push({ 
              path:'/obserStarData',  
              query:{
                type:3,
                featurType:3
              }
            });
            break;
            case 32:
            this.$router.push({ 
              path:'/obserStarData',  
              query:{
                type:3,
                featurType:4
              }
            });
            break;
            case 33:
            this.$router.push({ 
              path:'/travelInsights',  
              query:{
                type:2,
              }
            });
            break;  
            case 34:
            this.$router.push({ 
              path:'/foodInsights',  
              query:{
                type:2
              }
            });
            break;
            case 35:
            this.$router.push({ 
              path:'/wuyeInsight',  
              query:{
                type:2
              }
            });
            break;  
          default:
        }
        this.hideMenu()
      },
      goAlgorithm(){
        this.$router.push({
          path:'/algorithm',
          query:{
            type:1
          }
        });
        this.hideMenu()
      },
      hideMenu(){
        this.$emit('closeMenu',false);
      },
      bigDataPlatChange(parm){
        if(parm == 0){
          window.open('https://sfdemo.cloud.sensorsdata.cn/dashboard/?project=RealEstate&dash_type=normal&id=1096&client=')
        }
        else if(parm == 1){
          this.$axios({
            method:'post',
            url:'http://labs.cnscience.net/users/sign_in?user%5Bloginname%5D=15110111712&user%5Bpassword%5D=zhuxp2020',
          }).then(res=>{
            if(res.data.status == 1){
              window.open('http://labs.cnscience.net/projects/3409/stage.html');
            }
          }).catch(err=>{
            console.log(err)
          });
        }
      }
    }
  }
</script>

<style scoped lang='less'>
  .aiSmartApp_menu_container{
    position: absolute;
    z-index: 999;
    top: 90px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0 8px 24px 0 #3D4966;
    .sub_container{
      width: 1200px;
      height:542px;
      margin:auto;
      display: flex;
      padding: 30px 0;
      box-sizing: border-box;
      .left{
        width:165px;
        height:100%;
        border-right:1px solid #EBECF0;
        overflow: scroll;
        li{
         font-size: 16px;
         color: #121C33;
         margin-bottom: 20px;
         padding-left:10px;
         border-left:3px solid rgba(0,0,0,0);
         cursor: pointer;
          &:hover{
            color: #03A971;
            border-left:3px solid #03A971;
          }
        }
      }
      .right{
        flex:1;
        display: flex;
        flex-flow:wrap;
        height:100%;
        padding-left:30px;
        overflow: auto;
        box-sizing: border-box;
        li{
          width: 175px;
          margin-right: 25px;
          margin-bottom: 30px;
          .sub_title{
            font-size: 16px;
            color: #3D4966;
            border-bottom: 1px solid #EBECF0;
            padding:10px 0;
            cursor: pointer;
            &:hover{
              color: #03A971;
            }
          }
          .sub_child{
            font-size: 14px;
            color: #7A8499;
            margin-top:18px;
            cursor: pointer;
            span{
              position: relative;
              .hot{
                width:28px;
                position: absolute;
                right:-32px;
                top:-5px;
                img{
                  width: 100%;
                  display: block
                }
              }
            }
            
            &:hover{
              color: #03A971;
            }
          }
        }
      }
    }
   
  }
  .insightData_menu_container,.obserData_menu_container{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
    z-index: 999;
    top: 90px;
    left: 50%;
    transform: translateX(-64%);
    background-color: #FFFFFF;
    box-shadow: 0 8px 24px 0 #3D4966;
    div{
      margin-bottom: 11px;
      font-size: 14px;
      color: #7A8499;
    }
    div:hover{
      color:#03A971;
      cursor: pointer;
      // box-shadow: 0 2px 35px 0 #EBECF0;
    }
    // .falvzonghefenxi:hover{
    //   color:#03A971;
    //   cursor: pointer;
    //   background:rgba(128, 128, 128, 0.1);
    //   box-shadow: 0 2px 35px 0 #EBECF0;
    // }
    // .pinpai:hover{
    //   color:#03A971;
    //   cursor: pointer;
    //   background:rgba(128, 128, 128, 0.1);
    //   box-shadow: 0 2px 35px 0 #EBECF0;
    // }
    // .dili:hover{
    //   color:#03A971;
    //   cursor: pointer;
    //   background:rgba(128, 128, 128, 0.1);
    //   box-shadow: 0 2px 35px 0 #EBECF0;
    // }
  }
  .obserData_menu_container{
    transform: translateX(17%);
    div:hover{
      color:#03A971;
      cursor: pointer;
     // box-shadow: 0 2px 35px 0 #EBECF0;
    }
  }
  .bigDataPlat{
    transform: translateX(88%) !important;
  }
</style>
