<template>
  <div class="index_container">
    <div  class="menu_banner" :class="{'menu_banner_active':menu_banner_active}">
      <div  class="menu_banner_container">
          <!-- <transition name="slides"  mode="out-in" enter-active-class="animated slideInLeft"> -->
            <div  class="menu_bar" v-show="searchListShow">
              <div class="menu_content">
                <div class="menu_li" v-for="item in menuListNav" :class="{'menu_active':currentId==item.id}" @click="menuClick(item)" :key="item.id">{{item.moduleName}}</div>
                <div class="menu_li"  @click="liveClick()" :class="{'menu_active':currentId==10}">云直播</div>
                <div class="fu_btn" @click="jumpFn">
                  <img src="../assets/images/new_index/btnFn.png" alt="" srcset="">
                  <!-- <p>功能体验</p>
                  <div class="fu_btn_icon">
                    
                  </div> -->
                </div>
              </div>
            </div>
          <!-- </transition> -->
          <div class="banner" v-show="!menuShow">
            <!-- <transition name="slides"  mode="out-in" enter-active-class="animated slideInRight"> -->
              <div class="banner-top" v-if="searchListShow">
                  <Carousel 
                    v-model="loopItem"
                    :autoplay="setting.autoplay"
                    :autoplay-speed="setting.autoplaySpeed"
                    :dots="setting.dots"
                    :radius-dot="setting.radiusDot"
                    :trigger="setting.trigger"
                    :easing="setting.easing"
                    :arrow="setting.arrow"
                    >
                    <Carousel-item v-for="(item,index) in bannerList" :key="index" >
                        <div class="demo-carousel"  @click="bannerClick(index)">
                          <img :src="item" alt="" srcset="">
                        </div>
                    </Carousel-item>
                  </Carousel>
              </div>
            <!-- </transition>   -->
            <div class="banner-bottom">
              <!-- <transition name="slides"  mode="out-in" enter-active-class="animated slideInLeft"> -->
                <div class="search" v-show="searchListShow">
                   <Select v-model="search1" placeholder='搜索' filterable allow-create @on-query-change="querychange"	@on-open-change="openChange"	 @on-create="handleCreate" @on-change="changeValue" :capture='false'>
                      <Option v-for="item in searchList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <div class="search_pic" @click="changeValue(null)">
                      <img src="../assets/images/new_index/search.png" alt="">
                  </div>
                  <!-- <div class="search_pic">
                      <img src="../assets/images/new_index/search.png" alt="">
                  </div>
                  <input type="text" v-model="search"  placeholder="搜索"> -->
                </div>
              <!-- </transition> -->
              <!-- <transition name="slides"  mode="out-in" enter-active-class="animated slideInRight"> -->
                <div class="searchList" v-show="searchListShow">
                  <div class="searchItem" v-for="item in searchList" :key="item.id" @click="jumpDetail(item)">{{item.name}}</div>
                </div>
              <!-- </transition>   -->
              <!-- <transition name="slides"  mode="out-in" enter-active-class="animated slideInLeft"> -->
                <div class="subBannerList" @mouseout="subBannerout" v-show="searchListShow">
                    <div class="subBannerItem" v-for="(item,index) in subBannerList" @mouseover="subBannerOver(item,index)"  @click="jumpBanner(item)" :key="index">
                        <!-- <div class="itemCover" :class="{'subBannerItem_active':subBannerIndex==index}"> -->
                        <div class="itemCover" >
                          <!-- :duration="300" -->
                           <!-- <transition name="bounce"  mode="out-in" enter-active-class="animated rotateIn" leave-active-class="animated rotateOut"> -->
                              <div class="picIcon" v-show="subBannerIndex==index">
                                <img :src="item.pic" >
                              </div> 
                          <!-- </transition>   -->
                            <p>{{item.name}}</p>
                        </div> 
                      <img :src="item.url" style="width:100%;height:100%">
                    </div>
                </div>
              <!-- </transition>   -->
            </div>
          </div>
          <div class="menu_detail" v-if="menuShow" @mouseleave="menuOut()">
             <ul class="left">
                <li v-for="item in menuList" :key="item.id" :class="{'menu_detail_active':menu_detail_currentId==item.id}" @mouseover="lookDetail(item)" >{{item.moduleName}}</li>
              </ul>
              <ul class="right">
                <Waterfall :options="options">
                  <li v-for="(item,index) in rightList" :key="index">
                    <div class="sub_title">{{item.moduleName}}</div>
                      <div class="sub_child" v-for="subItem in item.childModules" :key="subItem.id" @click="queryDetail(subItem,item.routeId)">
                        <span>{{subItem.moduleName}}
                          <div class="hot" v-if="subItem.hot">
                            <img v-if="subItem.hot=='hot'" src="../assets/images/home/hot.png"  class="big_img">
                            <img v-if="subItem.hot=='new'" src="../assets/images/home/new.png"  class="big_img">
                          </div>
                        </span> 
                      </div>
                  </li>
                </Waterfall>
                 <div class="lookMore" @click="loadmore" v-show="this.currentId==1">
                    <img src="../assets/images/new_index/1.png" alt="" v-if="moreShow">
                    <img src="../assets/images/new_index/2.png" alt="" v-else>
                  </div>
              </ul>
          </div>
      </div>
    </div>
     <!-- 精选服务 -->
    <div  class="service_container">
      <div class="service_content">
          <div  class="service_title">
            <div class="border-silde"></div>
            精选服务
          </div>
          <div  class="service_subTitle">
            为您提供丰富完善、性能卓越的人工智能和大数据产品体系，赋能产业升级
          </div>
      </div>
      <div v-for="(item,index) in productList" :key="index">
        <div class="service_list">
            <div class="service_item" v-for="(subItem,subIndex) in item" :class="{'service_active':service_id==subItem.id}" :key="subItem.id" @click="service_item_Click(subItem,index,subIndex)">
              <div class="service_icon">
                <img :src="subItem.iconActive" v-if="service_id==subItem.id">
                <img :src="subItem.icon" v-else>
              </div>
              <p>{{subItem.name}}</p>
            </div>
        </div>
        <div class="service_line" v-show="index==barIndex">
           <div class="service_bar" ref="service_bar" style="left:90px"> </div>
        </div>
          <div class="service_detail" v-if="index==service_detailIndex" ref="service_detail">
            <transition name="fadeShow">
              <div class="detail_content" v-if="detailList.length>0" ref="detail_content">
                <div class="detail_item" v-for="childItem in detailList" :key="childItem.id" @click="queryDetail2(childItem)">
                  <div class="detail_item_title">
                    {{childItem.list_title}}
                  </div>
                  <div class="detail_item_desc">
                    {{childItem.list_desc}}
                  </div>
                </div>
              </div>
            </transition>
          </div>
      </div>
    </div>
    <!-- 人工智能体验空间 -->
    <div  class="ai_container">
        <div class="ai_content">
            <div class="ai_title">
              <div class="border-silde"></div>
              人工智能体验空间
            </div>
            <div class="ai_subTitle">
              人工智能体验空间
            </div>
             <div class="ai_card">
                <div class="ai_left">
                    <div class="ai_left_card">
                      <div class="ai_card_title">
                        人工智能体验馆
                      </div>
                      <div class="ai_card_desc">
                        零距离接触200+种人工智能黑科技，人气产品抢先体验
                      </div>
                      <div class="ai_btn" @click="jumpFn">
                        <p>功能体验</p>
                        <div class="fu_btn_icon">
                          <img src="../assets/images/new_index/right1.png">
                        </div>
                      </div>
                    </div>
                </div>
                <div class="ai_right">
                  <div class="ai_nav">
                    <div class="ai_nav_list" v-for="item in ai_nav_list" :key="item.id" :class="{'ai_nav_active':ai_nav_currentId==item.id}" @click="ai_navClick(item)">
                      {{item.name}}
                      <div class="ai_nav_line" v-show="ai_nav_currentId==item.id"></div>
                     </div>
                  </div>
                  <div class="ai_nav_content">
                    <div class="ai_nav_left">
                      <img :src="ai_nav_content.img" alt="">
                      <div class="ai_cover" @click="ai_nav_contentClick">
                         <img src="../assets/images/new_index/mustTry.png">
                      </div>
                    </div>
                    <div class="ai_nav_right" v-html="ai_nav_content.result"></div>
                  </div>
                </div>
             </div>
        </div>
    </div>
    <!-- 经典业务场景 -->
    <div  class="work_container">
        <div class="work_content">
            <div class="work_title">
              <div class="border-silde"></div>
             经典业务场景
            </div>
            <div class="work_subTitle">
              人工智能体验空间
            </div>
             <div class="work_card">
                <div class="work_left">
                  <div class="work_item" v-for="item in workList" :key="item.id" :class="{'work_active':workCurrentId==item.id}" @click="workClick(item)">
                      <div class="work_pic">
                        <img :src="item.imgActive" v-if="workCurrentId==item.id">
                        <img :src="item.img" v-else>
                      </div>
                      <p>{{item.name}}</p>
                  </div>
                </div>
                <div class="work_right" v-if="workContent">
                    <div class="work_right_lt">
                       <img :src="workContent.workBanner">
                    </div>
                    <div class="work_right_rt">
                      <div class="work_right_rt_item" v-for="item in workContent.workfaAn" :key="item.name">
                          <div class="work_item_title">{{item.title}}</div>
                          <div class="work_item_detail" v-for="(subItem,subIndex) in item.list" :key="subIndex">
                            <span v-if="subItem.path" @click="jumpDetail(subItem)">{{subItem.name}}</span>
                            <span v-else>{{subItem}}</span>
                          </div>
                      </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
     <!-- 大数据 -->
    <div  class="data_container">
        <div class="data_content">
            <div class="data_title">
              <div class="border-silde"></div>
              大数据助力企业数字化转型
            </div>
            <div class="data_subTitle">
              汇聚海量数据，向上推送数据应用，向下推送数据治理，向前推送企业数字化转型
            </div>
             <div class="data_card">
                <div class="data_left">
                  <div class="data_item" v-for="item in dataList" :key="item.id" :class="{'data_active':dataCurrentId==item.id}" @click="dataClick(item)">
                      <div class="data_pic">
                        <img :src="item.imgActive" v-if="dataCurrentId==item.id">
                        <img :src="item.img" v-else>
                      </div>
                      <p>{{item.name}}</p>
                  </div>
                </div>
                <div class="data_right" v-show="dataContent">
                    <div class="data_right_lt">
                       <img :src="dataContent.banner">
                        <div class="data_right_pos" v-if="dataContent.banner1">
                          <img :src="dataContent.banner1">
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
      <!-- 支持交流-->
    <div  class="chat_container">
        <div class="chat_content">
          <v-support></v-support>
        </div>
    </div>
      <!-- 全线产品持续上新，期待与您合作-->
    <div class="new_container">
        <div class="new_content">
          <div class="new_title">
            全线产品持续上新，期待与您合作
          </div>
          <div class="new_data">
            <div class="new_data_item" v-for="item in new_data_list" :key="item.name">
               <div class="new_data_title">
                 <span>{{item.num}}</span>{{item.fu}}
              </div>
               <div class="new_data_desc">
                 {{item.name}}
              </div>
            </div>
          </div>
          <div class="new_pic">
            <img src="../assets/images/new_index/map-02.png">
          </div>
          <div class="new_btn" @click="jumpFn">
            立即体验
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {Waterfall, WaterfallItem} from 'vue2-waterfall';
import vSupport from "./support/supportPoint2";
export default {
  data () {
    return {
       options:{},
       moreShow:true,
       seachBtn:require('@/assets/images/search/searchIcon.png'),
       search1:'',
       searchList1:[
        {label:"图像识别",value:'图像识别'},
        {label:"词法分析",value:'词法分析'},
        {label:"短语音识别",value:'短语音识别'},
        {label:"人脸识别",value:'人脸识别'},
        {label:"卡证文字识别",value:'卡证文字识别'},
      ],
      menu_detail_currentId:'',
      searchListShow:true,
      menuShow:false,
      dataCurrentId:1,
      workCurrentId:1,
      workContent:null,
      dataContent:null,
      barIndex:0,
      search:'',
      loopItem:0,
      currentId:-1,
      service_id:1,
      subBannerIndex:-1,
      service_detailIndex:0,
      ai_nav_content:null,
      detailList:[],
      productList:[],
      ai_nav_currentId:1,
      coverMsgList:[],
      ai_nav_list:[
        {
          name:'图像审核',
          id:1,
          coverMsg:[
            {title:'色情识别',desc:'通过'},
            {title:'暴恐识别',desc:'存在暴恐内容'},
            {title:'恶心识别',desc:'通过'},
            {title:'水印码识别',desc:'通过'},
            {title:'二维码识别',desc:'通过'},
            {title:'政治人物识别',desc:'通过'},
            {title:'敏感词识别',desc:'通过'},
            {title:'公众人物识别',desc:'存在公众人物'},
          ],
          content:{
            path:'/experienceColl',oneId:3,twoRouteId:'3.2',routeId:'3.2.1',subTilte:'图像审核',type:1,
            img:require('../assets/images/new_index/tushen.png'),
            result:`<p style="font-size: 16px;color: #121C33;">Response</p><p class="json-content"  style="white-space: pre-wrap;font-size: 14px;line-height: 24px;margin-top: 8px;">{
              <span class="hljs-attr">"conclusion"</span>: <span class="hljs-string">"不合规"</span>,
              <span class="hljs-attr">"log_id"</span>: <span class="hljs-string">"15910698309647035"</span>,
              <span class="hljs-attr">"data"</span>: [
                {
                  <span class="hljs-attr">"msg"</span>: <span class="hljs-string">"存在暴恐内容"</span>,
                  <span class="hljs-attr">"probability"</span>: <span class="hljs-number">0.9831414</span>,
                  <span class="hljs-attr">"type"</span>: <span class="hljs-number">3</span>
                },
                {
                  <span class="hljs-attr">"msg"</span>: <span class="hljs-string">"存在公众人物"</span>,
                  <span class="hljs-attr">"stars"</span>: [
                    {
                      <span class="hljs-attr">"probability"</span>: <span class="hljs-number">0.83510894</span>,
                      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"华赞"</span>
                    }
                  ],
                  <span class="hljs-attr">"type"</span>: <span class="hljs-number">11</span>
                }
              ],
              <span class="hljs-attr">"conclusionType"</span>: <span class="hljs-number">2</span>
            }</p>`
             ,
          }
        },
        {name:'银行卡识别',id:2,  coverMsg:[
            {title:'银行卡号',desc:'6222370033336266'},
            {title:'有效期',desc:'02/12'},
            {title:'银行名',desc:'工商银行'},
            {title:'银行卡类型',desc:'信用卡'},
          ],content:{
          path:'/experienceColl',oneId:2,twoRouteId:'2.1',routeId:'2.1.2',subTilte:'银行卡识别',type:1,
          img:require('../assets/images/new_index/yinhangka1.png'),
          result:`<p style="font-size: 16px;color: #121C33;">Response</p><div class="demo-json-content" style="white-space: pre-wrap;font-size: 14px;line-height: 24px;margin-top: 8px;">{
            <span class="hljs-attr">"log_id"</span>: <span class="hljs-string">"8556235120182478929"</span>,
            <span class="hljs-attr">"result"</span>: {
              <span class="hljs-attr">"bank_card_number"</span>: <span class="hljs-string">"6222 3700 3333 6266"</span>,
              <span class="hljs-attr">"valid_date"</span>: <span class="hljs-string">"02/12"</span>,
              <span class="hljs-attr">"bank_card_type"</span>: <span class="hljs-number">2</span>,
              <span class="hljs-attr">"bank_name"</span>: <span class="hljs-string">"工商银行"</span>
            }
          }</div>`
        }},
        {name:'增值税发票识别',id:3, 
         coverMsg:[
            {title:'发票类型',desc:'专用发票'},
            {title:'发票名称',desc:'北京增值税专用发票'},
            {title:'发票代码',desc:'1100154130'},
            {title:'发票号码',desc:'00772445'},
            {title:'开票日期',desc:'2016年11月15日'},
            {title:'备注',desc:'2016.9'},
            {title:'复核',desc:'马学琦'},
            {title:'开票人',desc:'焦红娟'},
          ],content:{
          path:'/experienceColl',oneId:2,twoRouteId:'2.2',routeId:'2.2.3',subTilte:'增值税发票识别',type:1,
          img:require('../assets/images/new_index/zengzhishui1.png'),
          result:`<p style="font-size: 16px;color: #121C33;">Response</p><div class="demo-json-content" style="white-space: pre-wrap;font-size: 14px;line-height: 24px;margin-top: 8px;">{
                <span class="hljs-attr">"log_id"</span>: <span class="hljs-string">"2866348087196355673"</span>,
                <span class="hljs-attr">"direction"</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">"words_result_num"</span>: <span class="hljs-number">31</span>,
                <span class="hljs-attr">"words_result"</span>: {
                  <span class="hljs-attr">"InvoiceNum"</span>: <span class="hljs-string">"00772445"</span>,
                  <span class="hljs-attr">"SellerName"</span>: <span class="hljs-string">"北京圣紫茗管理咨询有限公司"</span>,
                  <span class="hljs-attr">"CommodityTaxRate"</span>: [
                    {
                      <span class="hljs-attr">"word"</span>: <span class="hljs-string">"6%"</span>,
                      <span class="hljs-attr">"row"</span>: <span class="hljs-string">"1"</span>
                    }
                  ],
                  <span class="hljs-attr">"SellerBank"</span>: <span class="hljs-string">"上海浦发银行91150154740007408"</span>,
                  <span class="hljs-attr">"Checker"</span>: <span class="hljs-string">"马学琦"</span>,
                  <span class="hljs-attr">"NoteDrawer"</span>: <span class="hljs-string">"焦红娟"</span>,
                  <span class="hljs-attr">"CommodityAmount"</span>: [
                    {
                      <span class="hljs-attr">"word"</span>: <span class="hljs-string">"5785.38"</span>,
                      <span class="hljs-attr">"row"</span>: <span class="hljs-string">"1"</span>
                    }
                  ],
                  <span class="hljs-attr">"InvoiceDate"</span>: <span class="hljs-string">"2016年11月15日"</span>,
                  <span class="hljs-attr">"CommodityTax"</span>: [
                    {
                      <span class="hljs-attr">"word"</span>: <span class="hljs-string">"347.12"</span>,
                      <span class="hljs-attr">"row"</span>: <span class="hljs-string">"1"</span>
                    }
                  ],
                  <span class="hljs-attr">"PurchaserName"</span>: <span class="hljs-string">"北京百度网讯科技有限公司"</span>,
                  <span class="hljs-attr">"InvoiceTypeOrg"</span>: <span class="hljs-string">"北京增值税专用发票"</span>,
                  <span class="hljs-attr">"CommodityNum"</span>: [],
                  <span class="hljs-attr">"PurchaserBank"</span>: <span class="hljs-string">"招商银行北京分行上地支行110902160610706"</span>,
                  <span class="hljs-attr">"Remarks"</span>: <span class="hljs-string">"2016.9"</span>,
                  <span class="hljs-attr">"Password"</span>: <span class="hljs-string">""</span>,
                  <span class="hljs-attr">"SellerAddress"</span>: <span class="hljs-string">"北京市朝阳区64377727"</span>,
                  <span class="hljs-attr">"PurchaserAddress"</span>: <span class="hljs-string">"北京市海淀区上地十街10号百度大厦2层010-59928888"</span>,
                  <span class="hljs-attr">"InvoiceCode"</span>: <span class="hljs-string">"1100154130"</span>,
                  <span class="hljs-attr">"CommodityUnit"</span>: [],
                  <span class="hljs-attr">"Payee"</span>: <span class="hljs-string">""</span>,
                  <span class="hljs-attr">"PurchaserRegisterNum"</span>: <span class="hljs-string">"110108802100433"</span>,
                  <span class="hljs-attr">"CommodityPrice"</span>: [],
                  <span class="hljs-attr">"TotalAmount"</span>: <span class="hljs-string">"5785.38"</span>,
                  <span class="hljs-attr">"AmountInWords"</span>: <span class="hljs-string">"陆仟壹佰叁拾贰圆伍角整"</span>,
                  <span class="hljs-attr">"AmountInFiguers"</span>: <span class="hljs-string">"6132.50"</span>,
                  <span class="hljs-attr">"TotalTax"</span>: <span class="hljs-string">"347.12"</span>,
                  <span class="hljs-attr">"InvoiceType"</span>: <span class="hljs-string">"专用发票"</span>,
                  <span class="hljs-attr">"SellerRegisterNum"</span>: <span class="hljs-string">"110105057317113"</span>,
                  <span class="hljs-attr">"CommodityName"</span>: [
                    {
                      <span class="hljs-attr">"word"</span>: <span class="hljs-string">"服务费"</span>,
                      <span class="hljs-attr">"row"</span>: <span class="hljs-string">"1"</span>
                    }
                  ],
                  <span class="hljs-attr">"CommodityType"</span>: [],
                  <span class="hljs-attr">"CheckCode"</span>: <span class="hljs-string">""</span>
                }
              }</div>`
        }},
      ],
      serveList:[
          {name:'自然语言处理',id:1,iconActive:require('@/assets/images/new_index/icon/ziran green.png'),icon:require('@/assets/images/new_index/icon/ziran.png'),
            list:[
              {id:"1.1",path:'/serviceDetail',oneId:5,twoRouteId:'5.1',routeId:'5.1.1',list_title:'词法分析',list_desc:'提供分词、词性标注、命名实体识别三大功能，支撑自然语言的准确理解'},
              {id:"1.2",path:'/serviceDetail',oneId:5,twoRouteId:'5.1',routeId:'5.1.8',list_title:'短文本相似度',list_desc:'提供高精度文本相似度服务，帮助快速实现推荐、检索、排序等应用'},
              {id:"1.3",path:'/serviceDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.2',list_title:'情感倾向分析',list_desc:'对包含主观信息的文本进行情感倾向性判断，为口碑分析、话题监控、舆情分析等应用提供帮助'},
              {id:"1.4",path:'/serviceDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.8',list_title:'评论观点抽取',list_desc:'自动抽取和分析评论观点,帮助您实现舆情分析、用户理解，支持产品优化和营销决策'},
              {id:"1.5",path:'/serviceDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.4',list_title:'文章标签',list_desc:'对文章进行核心关键词分析，为新闻个性化推荐、相似文章聚合、文本内容分析等提供技术支持'},
              {id:"1.6",path:'/serviceDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.6',list_title:'新闻摘要',list_desc:'基于深度语义分析模型，自动抽取新闻文本中的关键信息并生成指定长度的新闻摘要'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/jiqi green.png'),name:'机器翻译',id:2,icon:require('@/assets/images/new_index/icon/jiqi.png'),
            list:[
              {id:"2.1",path:'/serviceDetail',oneId:5,twoRouteId:'5.4',routeId:'5.4.1',list_title:'通用版翻译',list_desc:'通用引擎以解决全场景语言障碍为目标，多领域适用，185种语言全面覆盖'},
              {id:"2.2",path:'/serviceDetail',oneId:5,twoRouteId:'5.4',routeId:'5.4.2',list_title:'垂直领域翻译',list_desc:'电商、社交、医疗、生物医药、科技电子、水利机械等多个专业领域翻译引擎'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/yuyin green.png'),name:'语音技术',id:3,icon:require('@/assets/images/new_index/icon/yuyin.png'),
            list:[
              {id:"3.1",path:'/serviceDetail',oneId:1,twoRouteId:'1.1',routeId:'1.1.1',list_title:'短语音识别',list_desc:'极速识别60秒内语音，简单易用'},
              {id:"3.2",path:'/serviceDetail',oneId:1,twoRouteId:'1.1',routeId:'1.1.2',list_title:'实时语音识别',list_desc:'采用实时识别方式，实现语音数据的传输和识别的同步，实时率可达0.3以下'},
              {id:"3.3",path:'/serviceDetail',oneId:1,twoRouteId:'1.1',routeId:'1.1.3',list_title:'录音文件识别',list_desc:'支持将不限时长的语音实时转换为文字'},
              {id:"3.4",path:'/serviceDetail',oneId:1,twoRouteId:'1.1',routeId:'1.1.4',list_title:'语音合成',list_desc:'可将文本实时、准确地转换为自然、流畅的语音，提供男声、女声、童声等多种合成音色'},
              {id:"3.5",path:'/serviceDetail',oneId:1,twoRouteId:'1.2',routeId:'1.2.1',list_title:'语音评测',list_desc:'通过智能语音技术自动对发音水平进行评价、发音错误、缺陷定位和问题分析'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/wenzi green.png'),name:'文字识别',id:4,icon:require('@/assets/images/new_index/icon/wenzi.png'),
            list:[
                {id:"4.1",path:'/serviceDetail',oneId:2,twoRouteId:'2.1',routeId:'2.1.1',list_title:'身份证识别',list_desc:'支持对二代居民身份证正反面所有8个字段进行结构化识别'},
                {id:"4.2",path:'/serviceDetail',oneId:2,twoRouteId:'2.1',routeId:'2.1.2',list_title:'银行卡识别',list_desc:'支持对主流银行卡的卡号、有效期、发卡行、卡片类型4个关键字段进行结构化识别'},
                {id:"4.3",path:'/serviceDetail',oneId:2,twoRouteId:'2.2',routeId:'2.2.3',list_title:'增值税发票识别',list_desc:'支持对增值税普票、专票、电子发票、卷票的所有关键字段进行结构化识别'},
                {id:"4.4",path:'/serviceDetail',oneId:2,twoRouteId:'2.3',routeId:'2.3.2',list_title:'行驶证识别',list_desc:'对机动车行驶证主页及副页所有21个字段进行结构化识别'},
                {id:"4.5",path:'/serviceDetail',oneId:2,twoRouteId:'2.5',routeId:'2.5.5',list_title:'网络图片文字识别',list_desc:'支持识别艺术字体或背景复杂的文字内容'},
                {id:"4.6",path:'/serviceDetail',oneId:2,twoRouteId:'2.4',routeId:'2.4.1',list_title:'手写文字识别',list_desc:'支持对图片中的手写中文、手写数字进行检测和识别'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/shipin green.png'),name:'视频技术',id:5,icon:require('@/assets/images/new_index/icon/shipin.png'),
            list:[
                {id:"5.1",path:'/serviceDetail',oneId:4,twoRouteId:'4.1',routeId:'4.1',list_title:'视频内容识别',list_desc:'基于对视频语音及图像的综合分析,对视频内容理解后形成分类标签'},
                {id:"5.2",path:'/serviceDetail',oneId:4,twoRouteId:'4.2',routeId:'4.2',list_title:'视频内容分析',list_desc:'通过多维AI技术，对视频进行智能分析，输出视频内容的泛标签'},
                {id:"5.3",path:'/serviceDetail',oneId:4,twoRouteId:'4.4',routeId:'4.4',list_title:'视频处理',list_desc:'提供全面的音视频内容结构化，音画字多维高性能的音视频处理框架，让“采、编、存、发”内容生产流程更简单'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/tuxiang green.png'),name:'图像技术',id:6,icon:require('@/assets/images/new_index/icon/tuxiang.png'),
            list:[
              {id:"6.1",path:'/serviceDetail',oneId:3,twoRouteId:'3.1',routeId:'3.1.1',list_title:'通用物体和场景识别',list_desc:'精准识别超过十万种物体和场景'},
              {id:"6.2",path:'/serviceDetail',oneId:3,twoRouteId:'3.5',routeId:'3.5.1',list_title:'车型识别',list_desc:'识别车辆的具体车型，以小汽车为主，可识别三千款常见车型'},
              {id:"6.3",path:'/serviceDetail',oneId:3,twoRouteId:'3.5',routeId:'3.5.3',list_title:'车流统计',list_desc:'根据视频抓拍图片序列，进行车辆检测和追踪，识别各类车辆在指定区域内的驶入、驶出数量，实现动态车流统计'},
              {id:"6.4",path:'/serviceDetail',oneId:3,twoRouteId:'3.3',routeId:'3.3.1',list_title:'相似图片搜索',list_desc:'以图搜图，在指定图库中搜索出相同或相似的图片'},
              {id:"6.5",path:'/serviceDetail',oneId:3,twoRouteId:'3.4',routeId:'3.4.5',list_title:'黑白图像上色',list_desc:'智能识别黑白图像内容并填充色彩，使黑白图像变得鲜活'},
              {id:"6.6",path:'/serviceDetail',oneId:3,twoRouteId:'3.4',routeId:'3.4.6',list_title:'图像风格转换',list_desc:'将图像转换成卡通画、铅笔画、哥特油画等9种艺术风格'},
              {id:"6.7",path:'/serviceDetail',oneId:3,twoRouteId:'3.4',routeId:'3.4.14',list_title:'人像动漫化',list_desc:'结合人脸检测、头发分割、人像分割等技术，为用户量身定制千人千面的二次元动漫形象'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/renlian green.png'),name:'人脸识别',id:7,icon:require('@/assets/images/new_index/icon/renlian.png'),
            list:[
              {id:"7.1",path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.1',list_title:'人脸检测',list_desc:'快速检测人脸并返回人脸框位置，输出人脸150个关键点坐标，准确识别多种属性信息'},
              {id:"7.2",path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.3',list_title:'人脸搜索',list_desc:'给定一张照片，对比人脸库中N张人脸，进行1：N检索，找出最相似的一张或多张人脸'},
              {id:"7.3",path:'/serviceDetail',oneId:6,twoRouteId:'6.3',routeId:'6.3.5',list_title:'人像渐变',list_desc:'通过AI技术对多张图片进行组合处理，生成基于人脸渐变的GIF图或视频'},
              {id:"7.4",path:'/serviceDetail',oneId:6,twoRouteId:'6.3',routeId:'6.3.1',list_title:'人脸融合',list_desc:'对两张人脸进行融合处理，生成的人脸同时具备两张人脸的外貌特征'},
              {id:"7.5",path:'/serviceDetail',oneId:6,twoRouteId:'6.3',routeId:'6.3.2',list_title:'人像分割',list_desc:'识别图像中的人体轮廓，与背景进行分离'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/renti green.png'),name:'人体识别',id:8,icon:require('@/assets/images/new_index/icon/renti.png'),
            list:[
              {id:"8.1",path:'/serviceDetail',oneId:6,twoRouteId:'6.4',routeId:'6.4.1',list_title:'驾驶行为分析',list_desc:'针对车载场景，识别驾驶员使用手机、抽烟、不系安全带、双手离开方向盘等动作姿态，分析预警危险驾驶行为'},
              {id:"8.2",path:'/serviceDetail',oneId:6,twoRouteId:'6.4',routeId:'6.4.4',list_title:'手势识别',list_desc:'识别图片中的手部位置和手势类型，可识别24种常见手势'},
              {id:"8.3",path:'/serviceDetail',oneId:6,twoRouteId:'6.2',routeId:'6.2.2',list_title:'人流量统计',list_desc:'统计图像中的人体个数和流动趋势'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/neirong green.png'),name:'内容审核',id:9,icon:require('@/assets/images/new_index/icon/neirong.png'),
            list:[
              {id:"9.1",path:'/serviceDetail',oneId:5,twoRouteId:'5.3',routeId:'5.3',list_title:'内容审核-文本',list_desc:'一站式检测文本中夹杂的色情、推广、辱骂、违禁、涉政、灌水等垃圾内容，净化网络环境'},
              {id:"9.2",path:'/serviceDetail',oneId:3,twoRouteId:'3.2',routeId:'3.2.1',list_title:'内容审核-图像',list_desc:'准确识别图片和视频中的涉黄、涉暴涉恐、政治敏感、微商广告、恶心等内容'},
              {id:"9.3",path:'/serviceDetail',oneId:4,twoRouteId:'4.3',routeId:'4.3',list_title:'内容审核-视频',list_desc:'对视频中的语音、文字、图像进行多维检测，及时发现涉黄、涉暴、政治敏感、广告、违禁品等风险内容'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/dashuju green.png'),name:'数据服务平台',id:10,icon:require('@/assets/images/new_index/icon/dashuju.png'),
            list:[
              {id:"10.1",path:'/fuwu',oneId:5,twoRouteId:'5.3',routeId:'5.3',list_title:'HDFS',list_desc:'数据接入服务面向实时数据，提供高效采集、传输、分发能力'},
              {id:"10.2",path:'/fuwu',oneId:5,twoRouteId:'5.3',routeId:'5.3',list_title:'HBase',list_desc:'通过机器学习的方式自动分析数据，提供数据表管理，从而帮助企业对内部的海量数据进行归一化、资产化'},
              {id:"10.3",path:'/fuwu',oneId:5,twoRouteId:'5.3',routeId:'5.3',list_title:'Hive',list_desc:'提供一站式大数据协同开发平台，可轻松完成数据建模，数据集成，脚本开发，作业调度，运维监控等多项任务'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/keshihua green.png'),name:'BI平台',id:11,icon:require('@/assets/images/new_index/icon/keshihua.png'),
            list:[
              {id:"11.1",path:'/BI',oneId:5,twoRouteId:'5.3',routeId:'5.3',list_title:'多种数据源接入',list_desc:'创建数据连接，提供数据大屏所需动态数据'},
              {id:"11.2",path:'/BI',oneId:5,twoRouteId:'5.3',routeId:'5.3',list_title:'图形化编辑界面',list_desc:'基于多种场景模板创建管理您的数据大屏'},
              {id:"11.3",path:'/BI',oneId:5,twoRouteId:'5.3',routeId:'5.3',list_title:'灵活部署和发布',list_desc:'画布、可视化界面编辑器和所见及所得的大屏编辑区域，是数据湖可视化最主要的功能区域'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/sousuo green.png'),name:'智能搜索',id:12,icon:require('@/assets/images/new_index/icon/sousuo.png'),
            list:[
              {id:"12.1",path:'/serviceDetail',oneId:5,twoRouteId:'5.1',routeId:'5.5.1',list_title:'智能搜索服务',list_desc:'为用户提供结构化、非结构化文本的多条件检索、统计、报表，提升用户文件搜索体验'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/tuijian green.png'),name:'智能推荐',id:13,icon:require('@/assets/images/new_index/icon/tuijian.png'),
            list:[
              {id:"13.1",path:'/serviceDetail',oneId:7,twoRouteId:'7.4',routeId:'7.4',list_title:'推荐系统',list_desc:'基于元知研究院大数据和人工智能技术，提供推荐平台和算法服务，并帮助企业构建个性化推荐应用'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/yuqing green.png'),name:'舆情分析',id:14,icon:require('@/assets/images/new_index/icon/yuqing.png'),
            list:[
              {id:"14.1",path:'/opinionAnalysisDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.2',list_title:'舆情监测',list_desc:'用户只需设置关键词，即可实现对全互联网的信息进行监测'},
              {id:"14.2",path:'/opinionAnalysisDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.2',list_title:'舆情分析',list_desc:'随时可以看到行业、品牌的分析数据。手中实时掌握品牌、竞品与行业信息'},
              {id:"14.3",path:'/opinionAnalysisDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.2',list_title:'舆情预警',list_desc:'根据警报级别、时间进行发送预警'},
              {id:"14.4",path:'/opinionAnalysisDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.2',list_title:'舆情报告',list_desc:'通过不同的条件，自定义数据报告。根据自己的需求快速导出数据'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/yingyong green.png'),name:'大数据应用',id:15,icon:require('@/assets/images/new_index/icon/yingyong.png'),
            list:[
              {id:"15.1",path:'/insightData',list_title:'法律数据洞察',list_desc:'全局考虑数据和分析结果在整个业务线运营链路中的作用以及能为运营决策带来的影响'},
              {id:"15.2",path:'/obserStarData',type:3,featurType:'0',list_title:'数据可视化',list_desc:'实现数据的分析、分享和交易等功能，为用户提供方便快捷的个性化平台服务来获取利润'},
              //{id:"15.3",path:'',list_title:'行为图谱',list_desc:'全端采集用户行为数据，整合业务数据等多种数据源，帮助企业构建体系化用户标签图书馆，输出用户行为画像'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/AR green.png'),name:'AR/VR',id:16,icon:require('@/assets/images/new_index/icon/AR.png'),
            list:[
              {id:"16.1",path:'',oneId:"E.2",twoRouteId:'E.2.2',routeId:'E.2.2.1',list_title:'增强现实',list_desc:'构建虚实互联的基础设施，变革人机交互的创新体验'},
              {id:"16.2",path:'',oneId:"E.1",twoRouteId:'E.1.1',routeId:'E.1.1.1',list_title:'虚拟现实',list_desc:'VR技术产品化应用服务，帮助开发者快速具备VR技术能力'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/wulianwang green.png'),name:'物联网',id:17,icon:require('@/assets/images/new_index/icon/wulianwang.png'),
            list:[
              {id:"17.1",path:'',oneId:'D3',twoRouteId:'D3.1',routeId:'D3.1.1',list_title:'接入与存储',list_desc:'帮助建立设备与云端之间安全可靠的双向连接及设备管理，以支撑海量设备的数据收集、控制、故障预测等各种物联网场景'},
              {id:"17.2",path:'',oneId:'D1',twoRouteId:'D1.2',routeId:'D1.2.1',list_title:'边缘计算',list_desc:'将云计算能力拓展至用户现场，可以提供临时离线、低延时的计算服务，包括消息规则、函数计算、AI 推断'},
              {id:"17.3",path:'',oneId:'D1',twoRouteId:'D1.3',routeId:'D1.3.1',list_title:'行业应用',list_desc:'为智能设备厂商提供适合IOT场景的一体化解决方案'},
            ]
          },
          {iconActive:require('@/assets/images/new_index/icon/qukuailian green.png'),name:'区块链',id:18,icon:require('@/assets/images/new_index/icon/qukuailian.png'),
            list:[
              {id:"18.1",path:'',oneId:'C.1',twoRouteId:'C.1.1',routeId:'C.1.1.1',list_title:'区块链引擎',list_desc:'为用户提供全面的云端区块链服务平台，能快速的为企业和开发者在公有云、私有云中搭建区块链网络'},
              {id:"18.2",path:'',oneId:'C.1',twoRouteId:'C.1.1',routeId:'C.1.1.2',list_title:'可信计算平台',list_desc:'保证在企业数据绝对安全和隐私保护的前提下完成多方数据协同计算， 同时做到企业数据确权及协作行为追溯，保证协作过程的权益平衡'},
              {id:"18.3",path:'',oneId:'C.1',twoRouteId:'C.1.1',routeId:'C.1.1.3',list_title:'行业应用',list_desc:'为智能设备厂商提供适合IOT场景的一体化解决方案'},
            ]
          },
      ],
      dataList:[
        {dataBanner1:require('@/assets/images/new_index/shuju/bg.gif'),dataBanner:require('@/assets/images/new_index/shuju/bg.png'),name:'数据采集',id:1,imgActive:require('@/assets/images/new_index/shuju/shujugreen.png'),img:require('@/assets/images/new_index/shuju/shuju.png')},
        {dataBanner:require('@/assets/images/new_index/shuju/banner4.png'),name:'数据接入与存储',id:2,imgActive:require('@/assets/images/new_index/shuju/jierugreen.png'),img:require('@/assets/images/new_index/shuju/jieru.png')},
        {dataBanner:require('@/assets/images/new_index/shuju/banner1.png'),name:'可视化查询与分析',id:3,imgActive:require('@/assets/images/new_index/shuju/keshihuagreen.png'),img:require('@/assets/images/new_index/shuju/keshihua.png')},
        {dataBanner1:require('@/assets/images/new_index/shuju/bg4.gif'),dataBanner:require('@/assets/images/new_index/shuju/bg4.png'),name:'驱动决策和产品智能',id:4,imgActive:require('@/assets/images/new_index/shuju/qudonggreen.png'),img:require('@/assets/images/new_index/shuju/qudong.png')},
      ],
      workList:[
        {workBanner:require('@/assets/images/new_index/tongxing.png'),workfaAn:[
          {title:"应用价值",list:['提升通行便捷性与安全性','业务关联拓展性','提升访客登记体验']},
          {title:"方案构成",list:['注册人脸库','人脸识别确认身份','联动硬件放行']},
          {title:"方案中所集成的AI服务",list:[
            {path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.2',name:'人脸对比'},
            {path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.3',name:'人脸搜索'},
            {path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.4',name:'活体检测'},
          ]},
        ],name:'人员通行管理',id:1,imgActive:require('@/assets/images/new_index/renyuangreen.png'),img:require('@/assets/images/new_index/renyuan.png')},
        {workBanner:require('@/assets/images/new_index/renlianTu.png'),workfaAn:[
          {title:"应用价值",list:['保障会员权益','提供会员个性化服务','精准营销推送，提高店铺营收']},
          {title:"方案构成",list:['人脸自动捕获','人脸自动捕获','会员人脸库','业务集成']},
          {title:"方案中所集成的AI服务",list:[
            {path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.6',name:'稠密关键点'},
            {path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.4',name:'活体检测'},
            {path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.1',name:'人脸检测'},
            {path:'/serviceDetail',oneId:6,twoRouteId:'6.1',routeId:'6.1.7',name:'质量检测'},
            ]},
        ],name:'人脸会员识别',id:2,imgActive:require('@/assets/images/new_index/renliangreen.png'),img:require('@/assets/images/new_index/renlian1.png')},
        {workBanner:require('@/assets/images/new_index/sellerTu.png'),workfaAn:[
          {title:"应用价值",list:['会员权益识别','会员个性化服务','精准营销推送']},
          {title:"方案构成",list:['评论数据库','自然语言算法库']},
          {title:"方案中所集成的AI服务",list:[
            {path:'/serviceDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.8',name:'评论观点抽取'},
            {path:'/serviceDetail',oneId:5,twoRouteId:'5.2',routeId:'5.2.2',name:'情感倾向分析'},
            {path:'/serviceDetail',oneId:5,twoRouteId:'5.3',routeId:'5.3',name:'文本审核'},
          ]},
        ],name:'消费者评论分析',id:3,imgActive:require('@/assets/images/new_index/xiaofeizhegreen.png'),img:require('@/assets/images/new_index/xiaofeizhe.png')},
      ],
      new_data_list:[
        {fu:'+',name:'技术能力',num:200},
        {fu:'+',name:'应用服务',num:800},
        {fu:'+',name:'行业数据',num:500},
      ],
      searchList:[
        {name:'文本审核',id:1,path:"/serviceDetail",oneId:5,twoRouteId:'5.3',routeId:'5.3'},
        {name:'机器翻译',id:2,path:"/serviceDetail",oneId:5,twoRouteId:'5.4',routeId:'5.4.1'},
        {name:'语音合成',id:3,path:"/serviceDetail",oneId:1,twoRouteId:'1.1',routeId:'1.1.4'},
        {name:'人脸识别',id:4,path:"/serviceDetail",oneId:6,twoRouteId:'6.1',routeId:'6.1.1'},
        {name:'智能推荐',id:5,path:"/serviceDetail",oneId:7,twoRouteId:'7.4',routeId:'7.4'}
      ],
      menuListNav:[
        {name:'AI智能',id:1},
        {name:'大数据',id:2},
        {name:'区块链',id:3},
        {name:'物联网',id:4},
        {name:'AR/VR',id:5}
      ],
      bannerList:[
        require('@/assets/images/new_index/banner1.png'),
        require('@/assets/images/new_index/banner2.png'),
      ],
      subBannerList:[
        {path:'/brandSentiment',url:require('@/assets/images/new_index/3033388.gif'),name:'品牌舆情洞察',pic:require('@/assets/images/new_index/brandIcon.png')},
        {path:'/insightData',url:require('@/assets/images/new_index/2509601.gif'),name:'法律洞察分析',pic:require('@/assets/images/new_index/falvIcon.png')},
        {path:'/travelInsights',url:require('@/assets/images/new_index/800ps.gif'),name:'旅游数据洞察',pic:require('@/assets/images/new_index/wuyeIcon.png')},
        {path:'/serviceDetail',oneId:1,twoRouteId:'1.1',routeId:'1.1.2',url:require('@/assets/images/new_index/2235004.gif'),name:'实时语音识别',pic:require('@/assets/images/new_index/luzhi.png')},
      ],
      setting: {
          autoplay: true,
          autoplaySpeed: 5000,
          dots: 'inside',
          radiusDot: false,
          trigger: 'click',
          arrow: 'hover',
          easing:'ease',
      },
      numChange:0,
      serverCurrentIndex:0,
      menuList:[],
      rightList:[],
      levelOne:'',
      menu_banner_active:false,
      category:11111
    }
  },
  components:{
    vSupport,
    Waterfall,
    WaterfallItem
  },
  created(){
     this.initData();
     this.initArray();
     this.ai_nav_content=this.ai_nav_list[0].content;
     this.workContent={
        workBanner:this.workList[0].workBanner,
        workfaAn:this.workList[0].workfaAn,
      }
      this.dataContent={
        banner:this.dataList[0].dataBanner,
        banner1:this.dataList[0].dataBanner1?this.dataList[0].dataBanner1:'',
      }
  },
  mounted(){
     this.initScroll();
    //  setTimeout(()=>{
    //    this.searchListShow=true;
    //  },500)
  },
  methods:{
      bannerClick(index){
        console.log(index)
         let routeData='';
        if(index==0){
          routeData = this.$router.resolve({
            path:'/educate',
            query:{
              title:1,
              subTitle:"智慧教育"
            }
          });
        }else if(index==1){
           routeData = this.$router.resolve({
            path:'/liveHood',
            query:{
              title:1,
              subTitle:"智慧办公"
            }
          });
        }
         window.open(routeData.href, '_blank');
      },
      changeValue(val){
        var searText1;
        var searText = document.getElementsByClassName('ivu-select-default')[0].children[0].children[1].children[1].value;
        if(val){
            searText1 = val;
        }
        else{
            searText1 = searText;
            this.searchList1.push({
                value: searText1,
                label: searText1
            });
        }
       
        let routerUrl = this.$router.resolve({
            path:'/searchIndex',
            query:{
              search:searText1
            }
        });
        window.open(routerUrl.href,'_blank');
      },
      querychange(val){
        //this.search1=val;
      },
      openChange(val){
        //console.log(val);
        // if(!val){
        //  this.changeValue();
        // }
      },
      handleCreate (val) {
        // var searText1;
        // var searText = document.getElementsByClassName('ivu-select-default')[0].children[0].children[1].children[1].value;
        // if(searText){
        //   searText1 = searText;
        // }
        // else{
        //   searText1 = val;
        // }
        this.searchList1.push({
            value: val,
            label: val
        });
      },
      jumpBanner(item){
        let routeData='';
       if(item.path=='/serviceDetail'){
         routeData = this.$router.resolve({
          path:item.path,
          query:{
            oneId:item.oneId,
            twoRouteId:item.twoRouteId,
            routeId:item.routeId,
            title:1,
            subTitle:item.name
          }
        });
       }else{
          routeData = this.$router.resolve({
            path:item.path,
            query:{
              title:1,
              subTitle:item.name
            }
          });
       }
        window.open(routeData.href, '_blank');

      },
      jumpDetail(item){
        let routeData = this.$router.resolve({
          path:item.path,
          query:{
            oneId:item.oneId,
            twoRouteId:item.twoRouteId,
            routeId:item.routeId,
            title:1,
            subTitle:item.name
          }
        });
        window.open(routeData.href, '_blank');
      },
      queryDetail2(item){
        let routeData='';
        if(item.path=='/opinionAnalysisDetail'){
          routeData = this.$router.resolve({
            path:'/opinionAnalysisDetail',
            query:{
              title:1,
              subTitle:"舆情分析"
            }
          });
        }
        else if(item.path=='/insightData'){
           routeData = this.$router.resolve({
            path:'/insightData',
            query:{
              title:1,
              subTitle:"舆情分析"
            }
          });
        }
        else if(item.path=='/obserStarData'){
          routeData = this.$router.resolve({
            path:'/obserStarData',
            query:{
              type:item.type,
              featurType:item.featurType,
              title:1,
              subTitle:item.list_title
            }
          });
        }
        else if(item.path=='/serviceDetailSimple'){
          routeData = this.$router.resolve({
            path:'/serviceDetailSimple',
            query:{
              oneId:item.oneId,
              twoRouteId:item.twoRouteId,
              routeId:item.routeId,
              title:1,
              subTitle:item.list_title
              
            }
          });
        }
        else if(item.path=='/fuwu'){
          routeData = this.$router.resolve({
            path:'/fuwu',
            query:{
              title:1,
              subTitle:"数据服务平台"
            }
          });
        }
        else if(item.path=='/BI'){
          routeData = this.$router.resolve({
            path:'/BI',
            query:{
              path:"BI",
              title:1,
              subTitle:"BI平台"
            }
          });
        }
        else if(item.path=='/serviceDetail'){
          routeData = this.$router.resolve({
            path:'/serviceDetail',
            query:{
              oneId:item.oneId,
              twoRouteId:item.twoRouteId,
              routeId:item.routeId,
              title:1,
              subTitle:item.list_title
            }
          });
        }else{

        }
        if(routeData){
          window.open(routeData.href, '_blank');
        }
      },
      queryDetail(item,levelTwoId){
        if(item.routeId=='5.5.2'){
          this.$router.push({
            path:'/opinionAnalysisDetail',
            query:{
              type:1,
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.2.8'){
          this.$router.push({
            path:'/wuyeInsight',
            query:{
              title:1,
              subTitle:" 物业数据洞察"
            }
          });
        }
        else if(item.routeId=='5.5.6'){
          this.$router.push({
            path:'/standard',
            query:{
              title:1,
              subTitle:"标准检索"
            }
          });
        }
        else if(item.routeId=='5.5.7'){
          this.$router.push({
            path:'/standardCountry',
            query:{
              title:1,
              subTitle:"国家数据检索"
            }
          });
        }
        else if(item.routeId=='5.5.8'){  
          this.$router.push({
            path:'/standardStati',
            query:{
              title:1,
              subTitle:" 部委数据检索"
            }
          });
        }
        else if(item.routeId=='5.5.9'){  
          this.$router.push({
            path:'/wordStatic',
            query:{
              title:1,
              subTitle:" 词频统计"
            }
          });
        }
        else if(item.routeId=='6.4.11'){
          this.$router.push({
            path:'/educate',
            // query:{
            //   title:1,
            //   subTitle:"智慧教育"
            // }
          });
        }
        else if(item.routeId=='6.4.13'){   
          this.$router.push({
            path:'/smartLight'
          });
        }
        else if(item.routeId=='6.4.14'){   
          this.$router.push({
            path:'/liveHome'
          });
        }
        else if(item.routeId=='6.4.15'){   
          this.$router.push({
            path:'/liveMedical'
          });
        }
        else if(item.routeId=='6.4.12'){
          this.$router.push({
            path:'/liveHood',
            // query:{
            //   title:1,
            //   subTitle:"智慧教育"
            // }
          });
        }
        else if(item.routeId=='B2.1.7'){
          this.$router.push({
            path:'/barEchartsTime',
            // query:{
            //   title:1,
            //   subTitle:"智慧教育"
            // }
          });
        }
        else if(item.routeId=='B2.1.20'){
          this.$router.push({
            path:'/model'
          });
        }
        else if(item.routeId=='E.1.5.1'){
         window.open(window.config.url+'/page/AR/web3d/3d/index.html', '_blank');
        }
        else if(item.routeId=='E.1.5.2'){
         window.open(window.config.url+'/page/VRequip/c6.html', '_blank');
        }
        else if(item.routeId=='E.1.5.3'){
         window.open(window.config.url+'/page/VRvideo/c1.html', '_blank');
        }
        else if(item.routeId=='B1.1'){
          this.$router.push({
            path:'/fuwu',
            query:{
              title:1,
              subTitle:"数据服务平台"
            }
          });
        }
        else if(item.routeId=='B1.2'){
          this.$router.push({
            path:'/serviceFenxi',
            query:{
              title:1,
              subTitle:"数据分析平台"
            }
          });
        }
        else if(item.routeId=='B1.3'){
          this.$router.push({
            path:'/BI',
            query:{
              title:1,
              subTitle:"BI平台"
            }
          });
        }
        else if(item.routeId=='B2.2.1'){
          this.$router.push({
            path:'/insightData',
            query:{
              title:1,
              subTitle:item.moduleName
            }
           
          });
        }
        else if(item.routeId=='B2.2.2'){
          this.$router.push({
            path:'/houseData',
            query:{
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.2.3'){
          this.$router.push({
            path:'/brandSentiment',
            query:{
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.2.4'){
          this.$router.push({
            path:'/foodInsights',
            query:{
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.2.5'){
          this.$router.push({
            path:'/travelInsights',
            query:{
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.2.6'){
          this.$router.push({
            path:'/geographySearch',
            query:{
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.2.7'){
          this.$router.push({
            path:'/paperIndex',
            query:{
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.3.1'){
          this.$router.push({
            path:'/obserStarData',
            query:{
              type:3,
              featurType:0,
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.3.2'){
           this.$router.push({
            path:'/obserStarData',
            query:{
              type:3,
              featurType:1,
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.3.3'){
           this.$router.push({
            path:'/obserStarData',
            query:{
              type:3,
              featurType:2,
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.3.4'){
           this.$router.push({
            path:'/obserStarData',
            query:{
              type:3,
              featurType:3,
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.3.5'){
           this.$router.push({
            path:'/obserStarData',
            query:{
              type:3,
              featurType:4,
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.routeId=='B2.2.9'){
           this.$router.push({
            path:'/pubOpin',
            query:{
              oneId:this.levelOne,
              twoRouteId:levelTwoId,
              routeId:item.routeId,
              title:1,
              subTitle:item.moduleName
            }
          });
        }
        else if(item.category=="11111"){
          this.$router.push({
            path:'/serviceDetail',
            query:{
              oneId:this.levelOne,
              twoRouteId:levelTwoId,
              routeId:item.routeId,
              title:1,
              subTitle:item.moduleName
            }
          });
        }else{
          this.$router.push({
            path:'/serviceDetailSimple',
            query:{
              oneId:this.levelOne,
              twoRouteId:levelTwoId,
              routeId:item.routeId,
              title:1,
              subTitle:item.moduleName
            }
          });
        }
      },
     initData(){
       if(localStorage.time){//存在时间，判断是否从缓存里取
         let _delayTime = 1000 * 60 * 60 * 24 * 2;//过期时间5天
         if(new Date().getTime()-localStorage.time>_delayTime){//大于过期时间请求接口

         }else{//小于过期时间缓存里取
          if(this.category=='11111'){
            if(localStorage.menuListNav){
                this.menuListNav=JSON.parse(localStorage.menuListNav);
                if(this.menuShow){
                  this.menuListNav.forEach(item=>{
                    if(this.currentId==item.id){
                      this.menuList=item.childModules;
                    }
                  })
                  this.menuList.forEach(subItem=>{
                    if(this.levelOne==subItem.routeId){
                      this.rightList=subItem.childModules;
                    }
                  })
                }
                return;
            }
            }else{
              if(localStorage.menuListNavMore){
                this.menuListNav=JSON.parse(localStorage.menuListNavMore);
                if(this.menuShow){
                  this.menuListNav.forEach(item=>{
                    if(this.currentId==item.id){
                      this.menuList=item.childModules;
                    }
                  })
                  this.menuList.forEach(subItem=>{
                    if(this.levelOne==subItem.routeId){
                      this.rightList=subItem.childModules;
                    }
                  })
                }
                return;
              }
            }
         }
       }else{//请求接口

       }
       
      this.$axios({
        method: "get",
        url: window.config.url+"/sitemgr/page/modulelist",
        params:{
          category:this.category,
          rootId:''
        }
      }).then(res => {
        if (res.data.code == 200000) {
          localStorage.time=new Date().getTime();
          if(this.category=='11111'){
            localStorage.menuListNav=JSON.stringify(res.data.data);
          }else{
            localStorage.menuListNavMore=JSON.stringify(res.data.data);
          }
          this.menuListNav=res.data.data;
          if(this.menuShow){
            this.menuListNav.forEach(item=>{
              if(this.currentId==item.id){
                 this.menuList=item.childModules;
              }
            })
            this.menuList.forEach(subItem=>{
              if(this.levelOne==subItem.routeId){
                this.rightList=subItem.childModules;
              }
            })
          }
        }
      }).catch(err => {

      });
    },
    // closeModal(){
     
    //   this.menu_banner_active=!this.menu_banner_active;
    //   this.initData();
    //   this.category=11111;
    // },
    loadmore(){
      this.menu_banner_active=!this.menu_banner_active;
      if(this.moreShow){
        this.moreShow=false;
        this.category='';
      }else{
         this.moreShow=true;
         this.category=11111;
      }
      this.initData();
      
     
      
    },
    lookDetail(item){
      this.rightList=item.childModules;
      console.log(this.rightList)
      this.levelOne=item.routeId;
      this.menu_detail_currentId=item.id;
    },
    initScroll(){
       window.addEventListener("scroll",()=>{
           let pos = document.body.scrollTop || document.documentElement.scrollTop;
           if(pos>=4000){
             this.numChange++;
             if(this.numChange<=1){
               this.increase();
             }
             
           }
           if(pos<3800){
              this.numChange=0;
           }
       })
    },
    increase(){
      this.new_data_list.forEach(item=>{
          var time = 1000, //总时间--毫秒为单位  
          finalNum =  item.num, //要显示的真实数值  
          regulator =  45, //调速器，调节数字改变的速度  
          step = finalNum / (time / regulator),/*每30ms增加的数值--*/  
          count = 0;//计数器  
          var timer = setInterval(()=>{  
              count = count + Math.floor(step);  
              if(count >= finalNum) {  
                 clearInterval(timer);  
                 count = finalNum;  
              }  
              var t = Math.floor(count);
              item.num=count; 
          }, 30);  
      })
    },
    jumpFn(){
       let routerUrl = this.$router.resolve({
            path:'/experienceColl',
            query:{
              oneId:5,
              twoRouteId:'5.1',
              routeId:'5.1.1',
            }
        });
        window.open(routerUrl.href,'_blank')
    },
    initArray(){
      for(var i =0;i<this.serveList.length;i++){
          this.productList[Math.floor(i/5)]=[];
      }
      for(var i =0;i<this.serveList.length;i++){
          this.productList[Math.floor(i/5)].push(this.serveList[i])
      }
      this.detailList=this.productList[0][0].list;
    },
    dataClick(item){
       this.dataCurrentId=item.id;
       this.dataContent={
          banner:item.dataBanner,
          banner1:item.dataBanner1?item.dataBanner1:'',
       }
    },
    workClick(item){
       this.workCurrentId=item.id;
       this.workContent={
         workBanner:item.workBanner,
         workfaAn:item.workfaAn,
       }
    },
    ai_navClick(item){
       this.ai_nav_currentId=item.id;
       this.ai_nav_content=item.content;
       this.coverMsgList=item.coverMsg;
    },
    ai_nav_contentClick(item){
      let routerUrl = this.$router.resolve({
            path:this.ai_nav_content.path,
            query:{
              oneId:this.ai_nav_content.oneId,
              twoRouteId:this.ai_nav_content.twoRouteId,
              routeId:this.ai_nav_content.routeId,
              type:this.ai_nav_content.type,
              subTilte:this.ai_nav_content.subTilte,
            }
        });
        window.open(routerUrl.href,'_blank')
    },
    liveClick(){
      this.currentId=10;
      let routerUrl = this.$router.resolve({
            path:'/live',
            query:{
              oneId:5,
              twoRouteId:'5.1',
              routeId:'5.1.1',
            }
        });
        window.open(routerUrl.href,'_blank')
    },
    menuClick(item){
      this.currentId=item.id;
      this.menuList=item.childModules?item.childModules:[];
      this.levelOne=this.menuList.length>0?this.menuList[0].routeId:''
      this.menuShow=true;
      this.menu_detail_currentId=this.menuList.length>0?this.menuList[0].id:'';
      this.rightList=this.menuList.length>0?this.menuList[0].childModules:[];
    },
    menuOut(){
      if(this.menu_banner_active){
       //this.menu_banner_active=!this.menu_banner_active;
      }else{
        this.menuShow=false;
      }
    },
    subBannerOver(item,index){
      this.subBannerIndex=index;
    },
    subBannerout(){
      this.subBannerIndex=-1;
    },
    service_item_Click(item,index,subIndex){
      if(this.serverCurrentIndex==index){//平行点击动画
        this.$refs.service_detail[0].style.height=this.$refs.service_detail[0].offsetHeight+"px";
        this.detailList=[];
        setTimeout(()=>{
          this.detailList=item.list;
          setTimeout(()=>{
            this.$refs.service_detail[0].style.height=this.$refs.detail_content[0].offsetHeight+40+"px";
          },0)
        },300)
        this.service_detailIndex=index;
      }else{//上下点击动画
        this.detailList=[];
        this.$refs.detail_content[0].style.display="none";
        this.serverCurrentIndex=index;
        this.$refs.service_detail[0].style.height=0+"px";
        this.$refs.service_detail[0].style.padding=0+"px";
        setTimeout(()=>{
            this.service_detailIndex=index;
            this.detailList=item.list;
            this.$refs.service_detail[0].style.height=0+"px";
            this.$refs.service_detail[0].style.padding=0+"px";
           // setTimeout(()=>{
              setTimeout(()=>{
                this.$refs.service_detail[0].style.height=this.$refs.detail_content[0].offsetHeight+40+"px";
              },0)
            //},300)
        },300)
      }
      this.service_id=item.id;
      this.$refs.service_bar[index].style.left =  240*subIndex+90+'px';
      this.barIndex=index;
    }
  }
}
</script>
<style lang='less'>
.waterfall{
  width:100%;
}
.ivu-carousel-track{
  transition: transform 1500ms ease 0s !important;
}
.ivu-carousel-dots-inside{
  padding-left:51px!important;
  bottom:35px!important;
  text-align:left!important;
}
.fadeShow-enter-active, .fadeShow-leave-active {
  transition: opacity .3s linear;
}
.fadeShow-enter, .fadeShow-leave-to {
   opacity:0;
}
.fadeShow-enter-to, .fadeShow-leave {
    opacity:1;
}
.vue-waterfall{
  width:100%;
  height:100%;
}
</style>
<style scoped lang='less'>
@keyframes spinning{
   from  { transform: rotate(0deg);}
   to { transform: rotate(360deg);}
}
.menu_banner{
  height: 532px;
  background: #F2F4F7;
  transition: all .3s linear;
  &.menu_banner_active{
     position: relative;
     z-index: 1;
     box-shadow: 0 8px 10px 0 rgba(184,190,204,0.30);
     height: 740px;
     transition: all .3s linear;
     .menu_banner_container{
        height: 100%;
        width:100%;
        transition: all .3s linear;
     }
  }
   .menu_banner_container  {
     width:1200px;
     margin:auto;
     height: 502px;
     background: #F2F4F7;
     display: flex;
     justify-content: space-between;
     transition: all .3s linear;
     .menu_bar{
       width:186px;
       height: 100%;
       background: url('../assets/images/new_index/tu.png') no-repeat center center;
       background-size: 100% 100%;
       .menu_content{
          width:100%;
          height: 100%;
          background: rgba(18,28,51,0.45);
          padding-top: 60px;
          position: relative;
          .menu_li{
            font-size: 16px;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            padding-left:35px;
            height: 55px;
            box-sizing: border-box;
            border-top: 1px solid rgba(255,255,255,0.2);
            cursor: pointer;
            overflow: hidden;
            position:relative;
            z-index: 2;
            // &:before {
            //   content: "";
            //   position: absolute;
            //   width: 140%;
            //   height: 60px;
            //   background-color: rgba(255,255,255,0.2);
            //   transform: rotate(10deg);
            //   top: -80px;
            //   left: 20%;
            //   z-index: 1;
            //   transition: .3s ease-in-out;
            // }
            
            // &:after {
            //   content: "";
            //   position: absolute;
            //   width: 140%;
            //   height: 70px;
            //   background-color: rgba(255,255,255,0.2);
            //   transform: rotate(10deg);
            //   top: 80px;
            //   left: -20%;
            //   z-index: 1;
            //   transition: .3s ease-in-out;
            // }
            
            // &:hover {
            //   background-color: rgba(255,255,255,0.2);
            //   transition: 0s linear;
            //   transition-delay: .3s;
            // }
            
            // &:hover:before {
            //   top: -20px;
            //   left: -20%;
            //   transition: .3s ease-in-out;
            // }
            
            // &:hover:after {
            //   top: 10px;
            //   left: -23%;
            //   transition: .3s ease-in-out;
            // }
            &.menu_active{
              background: rgba(255,255,255,0.15);
            }
            &:nth-child(6){
              border-bottom: 1px solid rgba(255,255,255,0.2);
            }
          }
          .fu_btn{
            position: absolute;
            left:35px;
            bottom:30px;
            font-size: 16px;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            cursor: pointer;
            width:116px;
            height:36px;
             img{
                width: 100%;
                display: block;
              }
            .fu_btn_icon{
              width: 28px;
              margin-left: 9px;
             
            }
          }
       }
     }
     .menu_detail{
       flex:1;
       height: 100%;
       overflow: auto;
       background:#fff;
       padding-top:35px;
       padding-bottom:17px;
       display: flex;
      
       .left{
          width:172px;
          height:500px;
          border-right:2px solid #F2F4F7;
          overflow: scroll;
          li{
            font-size: 16px;
            color: #3D4966;
            margin-bottom: 20px;
            padding-left:29px;
            cursor: pointer;
            &.menu_detail_active{
              font-weight:bold;
              color:#03A971
            }
          }
        }
        .right{
          // flex:1;
          width:830px;
          display: flex;
          flex-flow:wrap;
          height:100%;
          overflow: auto;
          box-sizing: border-box;
          position:relative;
          &::-webkit-scrollbar {
              height: 8px;
              width: 0px;
          }
          .lookMore{
            position: absolute;
            // margin-top:3px;
            // margin-left: 782px;
            top:3px;
            left:782px;
            width:20px;
            cursor: pointer;
            img{
              width: 100%;
              display: block;
            }
          }
          .closeModal{
            position: absolute;
            top:6px;
            right:40px;
            width:12px;
            cursor: pointer;
            img{
              width: 100%;
              display: block;
            }
          }
          li{
            width: 174px;
            margin-left: 30px;
            margin-bottom: 60px;
            .sub_title{
              font-size: 16px;
              color: #3D4966;
              border-bottom: 1px solid #EBECF0;
              font-weight: bold;
              padding-bottom:10px;
              margin-bottom:15px;
            }
            .sub_child{
              font-size: 14px;
              color: #7A8499;
              margin-top:12px;
              cursor: pointer;
              span{
                 position: relative;
                .hot{
                  width:30px;
                  position: absolute;
                  right:-38px;
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
     .banner{
        width:994px;
        margin-left: 20px;
        margin-top:20px;
       .banner-top{
         width:100%;
         height:230px;
         margin-bottom:20px;
         overflow:hidden;
         .ivu-carousel{
            width: 100%;
            height: 100%;
            .demo-carousel{
              width: 100%;
              height: 100%;
              cursor: pointer;
              img{
                height: 100%;
                width: 100%;
                display: block;
                object-fit: cover;
                object-position: center center;
              }
            }
          }
       }
       .banner-bottom{
         height:232px;
         padding:20px;
         background:#fff;
         .search{
            height: 40px;
            background: rgba(235,236,240,0.4);
            border-radius: 2px;
            font-size: 14px;
            color: #3D4966;
            display: flex;
            align-items: center;
             position: relative;
            /deep/.ivu-select-default {
              height: 100% !important;
              .ivu-select-selection {
                height: 100%;
                padding-left:7px;
                &>div{
                  height: 100%;
                    .ivu-select-input {
                      height: 100% !important;
                      line-height: 40px;
                      padding-left: 24px;
                    }
                }
                .ivu-select-selected-value {
                  line-height: 40px;
                  height: 100%;
                }
                .ivu-select-placeholder {
                  line-height: 40px;
                  color: #B8BECC;
                  height:100%;
                }
                .ivu-select-arrow {
                  display: none;
                }
              }
              /deep/.ivu-select-dropdown {
                /deep/.ivu-select-dropdown-list {
                  .ivu-select-item {
                    padding: 11px 10px;
                    color: #7A8499;
                  }
                  .ivu-select-item-focus{
                    background: none;
                    color: #03a971;
                  }
                  .ivu-select-item:hover {
                    color: #03a971;
                    background: none;
                  }
                }
              }
            }
            // img {
            //   width: 21px;
            //   position: absolute;
            //   right: 14px;
            //   cursor: pointer;
            // }
            .search_pic{
              position: absolute;
              width:14px;
              left:10px;
              cursor:pointer;
              z-index: 110;
              img{
                width: 100%;
                display: block;
               
              }
            }
            // input{
            //   flex:1;
            //   height: 100%;
            //   background: none;
            //   outline: none;
            // }
         }
         .searchList{
           margin-top:7px;
           margin-bottom: 18px;
           display: flex;
           .searchItem{
             font-size: 12px;
             color: #B8BECC;
             margin-right: 30px;
             cursor: pointer;
           }
         }
         .subBannerList{
            display: flex;
            .subBannerItem{
              width: 223px;
              height: 110px;
              overflow: hidden;
              margin-right: 20px;
              position: relative;
              cursor: pointer;
              .itemCover{
                position: absolute;
                left:0;
                top:0;
                bottom:0;
                right:0;
                font-size: 14px;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                //font-weight: bold;
                .picIcon{
                  // padding:15px;
                  //width:54px;
                  width:24px;
                  margin-bottom:5px;
                  // border-radius:50%;
                  // position:relative;
                  // box-sizing: border-box;
                  // &:after {
                  //     position: absolute;
                  //     top: 0;
                  //     left: 0;
                  //     height: 100%;
                  //     width: 100%;
                  //     content: '';
                  //     z-index: 1;
                  //     border-radius:50%;
                  //     box-sizing: border-box;
                  //     border: 1px solid #fff;
                  // } 
                  // &:hover:after {
                  //     animation: spinning cubic-bezier(0.18, 0.14, 0.29, 1) 1s;
                  //     border-left-color: #03A971;
                  //     // border-right-color: #03A971;
                  // }
                  img{
                    width: 100%;
                    display: block;
                  }
                }
                &.subBannerItem_active{
                  background: rgba(3,169,113,0.5);
                  color: #fff;
                }
              }
              img{
                height:100%;
                display:block
              }
            }
         }
       }
     }
   }
}
.service_container{
  background: #fff;
  padding-bottom:60px;
  .service_content{
    width: 1200px;
    margin: auto;
    .service_title{
      margin-top:40px;
      margin-bottom:15px;
      font-size: 30px;
      color: #121C33;
     
      display: flex;
      align-items: center;
      .border-silde{
        width: 4px;
        height: 26px;
        background: #03A971;
        margin-right:20px;
      }
    }
    .service_subTitle{
      padding-left:24px;
      font-size: 18px;
      color: #7A8499;
      margin-bottom:30px;
    }
  }
  .service_line{
    width:1200px;
    height: 2px;
    margin: auto;
    .service_bar{
      position: relative;
      width:60px;
      height: 2px;
      background: #03A971;
      transition: all .3s ease;
    }
  }
  .service_list{
    width: 1200px;
    margin: auto;
    display: flex;
    
    .service_item{
      padding-top:10px;
      width: 240px;
      cursor: pointer;
      margin-top:30px;
      color: #121C33;
      &.service_active{
        color: #03A971;
        font-weight: bold;
      }
      .service_icon{
        width: 48px;
        margin: auto;
        margin-bottom: 16px;
        img{
          width: 100%;
          display: block;
        }
      }
      p{
        font-size: 16px;
        text-align: center;
        margin-bottom:10px;
      }
    }
  }
  .service_detail{
    background: rgba(242,244,247,0.57);
    padding-top:30px;
    padding-bottom:10px;
    transition: height .3s ease;
    .detail_content{
      width: 1200px;
      margin:auto;
      display: flex;
      flex-wrap: wrap;
      .detail_item{
        cursor: pointer;
        width: 380px;
        margin-bottom:20px;
        margin-left:20px;
        padding:28px 40px 28px 30px;
        &:hover{
          background: #fff;
        }
        .detail_item_title{
          font-size: 16px;
          color: #3D4966;
          margin-bottom: 10px;
        }
        .detail_item_desc{
          font-size: 14px;
          color: #7A8499;
          line-height: 22px;
        }
      }
    }
  }
}
.ai_container{
  background: #F2F4F7;
  padding-bottom:60px;
  padding-top:40px;
  .ai_content{
    width: 1200px;
    margin: auto;
     .ai_title{
      margin-bottom:15px;
      font-size: 30px;
      color: #121C33;
      display: flex;
      align-items: center;
      .border-silde{
        width: 4px;
        height: 26px;
        background: #03A971;
        margin-right:20px;
      }
    }
    .ai_subTitle{
      padding-left:24px;
      font-size: 18px;
      color: #7A8499;
      margin-bottom:40px;
    }
    .ai_card{
      height: 373px;
      display: flex;
      justify-content: space-between;
      .ai_left{
        width: 307px;
        height: 100%;
        background: url('../assets/images/new_index/aiBg.png') no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        .ai_left_card{
          position: absolute;
          left:-25px;
          top:39px;
          width:290px;
          height: 230px;
          padding:25px 30px 0 25px;
          background: #fff;
          .ai_card_title{
            font-size: 18px;
            color: #121C33;
            margin-bottom: 15px;
          }
          .ai_card_desc{
            font-size: 14px;
            color: #3D4966;
            line-height: 23px;
          }
          .ai_btn{
            position: absolute;
            left:25px;
            bottom:30px;
            font-size: 16px;
            color: #121C33;
            display: flex;
            align-items: center;
            cursor: pointer;
            .fu_btn_icon{
              width: 28px;
              margin-left: 9px;
              img{
                width: 100%;
                display: block;
              }
            }
          }
        }
      }
      .ai_right{
        flex:1;
        height: 100%;
        background: #fff;
        padding:10px 35px 30px 35px;
        .ai_nav{
          display: flex;
          border-bottom: 1px solid #F2F4F7;
          margin-bottom: 20px;
          padding-left: 12px;
          .ai_nav_list{
            font-size: 14px;
            color: #3D4966;
            padding:13px 0;
            margin-right: 50px;
            position:relative;
            cursor: pointer;
            &.ai_nav_active{
              color:#03A971;
            }
            .ai_nav_line{
              position: absolute;
              width:100%;
              bottom:-1px;
              height: 2px;
              background: #03A971;
              transition: all 0.3s ease-in-out;
            }
          }
        }
        .ai_nav_content{
          height: 264px;
          display: flex;
          .ai_nav_left{
            width:528px;
            height: 100%;
            overflow: hidden;
            position: relative;
            .ai_cover{
              position: absolute;
              bottom: 20px;
              left: 20px;
              width: 76px;
              height: 26px;
              cursor: pointer;
              img{
                width:100%;
                display:block
              }
            }
            img{
              width:100%;
              display: block;
              height: 100%;
              object-fit: cover;
              object-position: center center;
            }
          }
          .ai_nav_right{
            background: #f9fafc;
            flex: 1;
            height: 100%;
            padding:15px;
            overflow: auto;
            &::-webkit-scrollbar {
                height: 5px;
                width: 5px;
            }
          }
        }
      }
    }
  }
}
.work_container{
  background: #fff;
  padding-bottom:60px;
  padding-top:40px;
  .work_content{
    width: 1200px;
    margin: auto;
    .work_title{
      margin-bottom:15px;
      font-size: 30px;
      color: #121C33;
      display: flex;
      align-items: center;
      .border-silde{
        width: 4px;
        height: 26px;
        background: #03A971;
        margin-right:20px;
      }
    }
    .work_subTitle{
      padding-left:24px;
      font-size: 18px;
      color: #7A8499;
      margin-bottom:40px;
    }
    .work_card{
      display: flex;
      justify-content: space-between;
      .work_left{
        width: 237px;
        .work_item{
          border: 1px solid #F2F4F7;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 152px;
          margin-bottom: 20px;
          cursor: pointer;
          font-size: 18px;
          color: #121C33;
          &.work_active{
            box-shadow: 0 2px 16px 0 rgba(184,190,204,0.30);
            color: #03A971;
          }
          .work_pic{
            width:36px;
            margin-bottom: 22px;
            img{
              width: 100%;
              display: block;
            }
          }
        }
      }
      .work_right{
        margin-left: 30px;
        flex:1;
        background: #fff;
        display: flex;
        .work_right_lt{
          flex:1;
          overflow: hidden;
          img{
            width: 100%;
            display: block;
          }
        }
        .work_right_rt{
          width:216px;
          margin-left:20px;
          .work_right_rt_item{
            height: 152px;
            padding:20px 25px;
            padding-right: 10px;
            border: 1px solid #F2F4F7;
            margin-bottom: 20px;
            font-size: 12px;
            color: #3D4966;
            line-height: 20px;
            &:last-child{
               .work_item_detail{
                 color: #03A971;
                 cursor: pointer;
               }
            }
            .work_item_title{
              font-size: 16px;
              color: #121C33;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}
.data_container{
  background: #F2F4F7;
  padding-bottom:60px;
  padding-top:40px;
  .data_content{
    width: 1200px;
    margin: auto;
    .data_title{
      margin-bottom:15px;
      font-size: 30px;
      color: #121C33;
      display: flex;
      align-items: center;
      .border-silde{
        width: 4px;
        height: 26px;
        background: #03A971;
        margin-right:20px;
      }
    }
    .data_subTitle{
      padding-left:24px;
      font-size: 18px;
      color: #7A8499;
      margin-bottom:40px;
    }
    .data_card{
      display: flex;
      justify-content: space-between;
      .data_left{
        width: 242px;
        .data_item{
          border: 1px solid #F2F4F7;
          background: #fff;
          display: flex;
          align-items: center;
          height: 80px;
          margin-bottom: 20px;
          cursor: pointer;
          font-size: 18px;
          color: #121C33;
          &.data_active{
            box-shadow: 0 2px 16px 0 rgba(184,190,204,0.30);
            color: #03A971;
          }
          .data_pic{
            width:36px;
            margin-right: 16px;
            margin-left: 15px;
            img{
              width: 100%;
              display: block;
            }
          }
        }
      }
      .data_right{
        margin-left: 30px;
        flex:1;
        background: #fff;
        display: flex;
        .data_right_lt{
          width:100%;
          position: relative;
          img{
            width: 100%;
            display: block;
          }
          .data_right_pos{
             position: absolute;
             width:656px;
             left:23px;
             top:25px;
          }
        }
      }
    }
  }
}
.chat_container{
  background: #fff;
  padding-bottom:60px;
  padding-top:40px;
  .chat_content{
    width: 1200px;
    margin: auto;
  }
}
.new_container{
  background: #fff;
  .new_content{
    width: 1200px;
    margin: auto;
    height: 420px;
    position: relative;
    padding-top:60px;
    margin-bottom: 50px;
    .new_title{
      font-size: 30px;
      color: #121C33;
      text-align: center;
      margin-bottom:40px;
    }
    .new_data{
      width:1200px;
      display: flex;
      justify-content: space-between;
      .new_data_item{
        width:380px;
        height: 168px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .new_data_title{
          font-size: 30px;
          color: #121C33;
          margin-bottom: 5px;
          span{
            font-size: 54px;
            color: #121C33;
          }
        }
        .new_data_desc{
          font-size: 20px;
          color: #121C33;
        }
      }
    }
    .new_btn{
      width:175px;
      height:50px;
      position: absolute;
      bottom:0;
      left:0;
      right:0;
      margin:auto;
      cursor: pointer;
      background: #03A971;
      border-radius: 3px;
      border-radius: 3px;
      font-size: 18px;
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .new_pic{
      position:absolute;
      top:0;
      left:0;
      right:0;
      width: 814px;
      margin: auto;
      img{
        width:100%;
        display: block;
      }
    }
  }
}

</style>
