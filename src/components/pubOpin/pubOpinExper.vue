<template>
  <div class="pubOpinExper_container">

      <div class="menu_container">
          <div class="menu" @click="$router.go(-1)">
              <span>舆情追踪</span><span> > 事件舆情分析</span>
          </div>
      </div>

      <div class="pubOpinExper_search_container">
          <div class="search_content">
            <Select v-model="select3" slot="prepend" style="width: 80px" @on-select='changeEvenType'>
                <Option value="all">全部</Option>
                <Option value="ing">进行中</Option>
                <Option value="ed">已结束</Option>
            </Select>
            <Input search enter-button placeholder="请输入事件名称进行搜索" @on-search='eventSearch'/>
          </div>
          <div class="add_btn" @click="newEvent">新建事件</div>
      </div>
      <div class="pubOpinExper_list_container">
          <div class="list_item" v-for="(item,index) in eventArr" :key="index" @click="goEventDetail(item)">
              <div class="list_item_one">
                  <div class="ifFinshed">{{item.hasFinshed}}</div>
                  <div class="list_item_one_title">{{item.title}}</div>
              </div>
              <div class="list_item_two">
                  {{item.titleDesc}}
              </div>
              <div class="list_item_three">
                  {{item.startTime}} - {{item.endTime}}
              </div>
          </div>
      </div>
      <!--新建事件弹层-->
      <div class="mask_model_container" v-if="ifShowEventModel">
          <div class="mask_model_content">
              <div class="mask_model_title_area">
                  <div class="mask_model_title">新建事件</div>
                  <div class="close_img_container" @click="closeModel">
                      <img :src="closeImg" class="close_img">
                  </div>
              </div>
              <div class="mask_content">
                  <div class="event_item_content">
                      <div class="event_label">事件名称：</div>
                      <div class="input_content">
                            <Input v-model="eventName" placeholder="请输入事件名称"/>
                      </div>
                  </div>
                  <div class="event_item_content">
                      <div class="event_label">时间：</div>
                      <div class="input_content time_content">
                          <div class="start_dateTime">
                               <DatePicker type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" @on-change='getStartTime'></DatePicker>
                          </div>
                          <div class="date_Txt">至</div>
                          <div class="end_dateTime">
                               <DatePicker type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" @on-change='getEndTime'></DatePicker>
                          </div>
                      </div>
                  </div>
                  <div class="event_item_content fenxi_word">
                      <div class="event_label">分析词：</div>
                      <div class="input_content fenxi_input">
                          <Input v-model="fenxiWord" type="textarea" placeholder="多个分析词之间以，隔开，词组之间为“与”关系" :autosize="{minRows: 6,maxRows: 7}"/>
                      </div>
                  </div>
                  <div class="event_item_content paichu_word">
                      <div class="event_label">排除词：</div>
                      <div class="input_content paichu_input">
                          <Input v-model="paichuWord" type="textarea" placeholder="多个排除词之间以，隔开，词组之间为“与”关系" :autosize="{minRows: 6,maxRows: 7}"/>
                      </div>
                  </div>
                  <div class="event_item_content">
                      <div class="event_label"></div>
                      <div class="input_content oper_btn">
                          <div class="save_btn" @click="saveEvent">保存</div>
                          <div class="cancel_btn" @click="closeModel">取消</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <Spin v-if="isloading" style="margin:80px 0;">
          <Icon type="ios-loading" size=76 class="demo-spin-icon-load"></Icon>
          <div>正在保存</div>
      </Spin>

  </div>
</template>
<script>
export default {
  name:'pubOpinExper', 
  data() {
      return {
        searchValue:'',
        eventArr:[
            {
                hasFinshed:'已结束',
                title:'十一还能出去“浪”吗？',
                titleDesc:'张泉灵抛出这一问题后,张文宏第一反应是:这个问题回答起来略微有点难度大. 9... 一把,毕竟因为疫情的原因,很多盆友都将自己的旅游计划搁置许久了,...',
                startTime:'2020-09-01 00:00:00',
                endTime:'2020-09-17 14:44:00',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/1489e41b4c6efb3f5ae3591fa76686d70ef.html'
            },
            {
                hasFinshed:'已结束',
                title:'中印冲突',
                titleDesc:'《印度快报》18日报道称，印中两军在边境地区发生暴力冲突后，印度铁道部和电信部将不再考虑与中国公司的合作。 对于有消息称“印度似乎已派出力量增援边防部队”，赵立坚说，中印正通过军事和外交渠道对话解决有关现地问题，目前没有需要发布的消息。',
                startTime:'2020-06-19 14:27:34',
                endTime:'2020-09-17 14:27:34',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/14465d050c99f81ad5ddac2a83771f5c705.html'
            },
            {
                hasFinshed:'已结束',
                title:'云南瑞丽宣布“封城”',
                titleDesc:'云南瑞丽市封城 全员居家隔离疫情 云南瑞丽瑞丽封城',
                startTime:'2020-09-15 00:00:00',
                endTime:'2020-09-17 14:40:00',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/147bb9bfe647d8d0f97b09230d30c8c709c.html'
            },
            {
                hasFinshed:'已结束',
                title:'字节跳动回应TikTok交易',
                titleDesc:'在接受中国官方媒体新华社采访时，长期跟踪研究技术贸易法规的中国对外经济贸易大学教授崔凡表示，这两项技术出口受限，可能会影响到眼下正在酝酿中的TikTok美国业务出售交易。 如果，TikTok母公司字节跳动需要出售，就需要准备出口调整后目录中的限制类技术，暂停磋商与贸易程序，履行相关申请手续，这一切的手续将让抖音的交易延期进行。',
                startTime:'2020-06-19 14:15:05',
                endTime:'2020-09-17 14:15:05',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/143d5f687849573dfe3b573a7c2026aeb01.html'
            },
            {
                hasFinshed:'已结束',
                title:'山东冠县调查农家女被冒名顶替上大学',
                titleDesc:'据澎湃新闻此前报道,高考“落榜”16年后,冠县人陈秋媛(化名)打算报考成人教育学校,来填补心中的遗憾。 然而,在信息填报时她才发现,“陈秋媛”已经在山东理工大学“就读”过,并顺利毕业,而学信网上的“陈秋媛”,照片栏上是另外一个陌生女孩的头像',
                startTime:'2020-06-02 14:26:05',
                endTime:'2020-08-31 14:26:05',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/76db46e0e4d2d332286e9f39ab6bbd4602.html'
            },
            {
                hasFinshed:'已结束',
                title:'腾讯 老干妈',
                titleDesc:'老干妈回应：腾讯被骗了腾讯和老干妈有没签广告合同，如果没签，老干妈反告腾讯，是腾讯侵占老干妈品牌权。',
                startTime:'2020-06-02 14:24:21',
                endTime:'2020-08-31 14:24:21',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/75cc0edbae01d0103d04713a52f35a1656.html'
            },
            {
                hasFinshed:'已结束',
                title:'当当网',
                titleDesc:'2月20日，当当人力资源部发布人事调整公告称，从2019年1月开始，李国庆不再担任当当网任何职务，但仍是公司股东。 在20日发布的公开信中，李国庆称，“当当结束了夫妻店治理结构，俞渝会带领公司洒脱地开创未来。”',
                startTime:'2020-05-30 09:03:26',
                endTime:'2020-08-28 09:03:26',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/68f92a3f345eaea073ac198d5a2bcaa3d8.html'
            }
        ],
        select3:'all',
        closeImg:require('../../assets/images/pubOpin/close.png'), 
        eventName:'',
        ifShowEventModel:false,
        startDateTime:'',
        endDateTime:'',
        fenxiWord:'',
        paichuWord:'',
        isloading:false
      }
  },
  methods:{
    goEventDetail(arg){
        let detUrl = arg.enventUrl || '';
        if(detUrl == '报告正在努力生成中，请耐心等待！'){
            this.$Message.info(detUrl);
            return
        }
        else{
            window.open(detUrl,'_blank');
        }
    },
    newEvent(){
        this.ifShowEventModel = true;
    },
    closeModel(){
        this.ifShowEventModel = false;
    },
    saveEvent(){
        let eventName = this.eventName;
        let startDateTime =this.startDateTime;
        let endDateTime = this.endDateTime;
        let fenxiWord = this.fenxiWord;
        let paichuWord = this.paichuWord;
        if(!eventName){
            this.$Message.info('请输入事件名！')
            return;
        }
        this.ifShowEventModel = false;
        this.isloading = true;
        setTimeout(()=>{
            this.eventArr.unshift({
                hasFinshed:'已结束',
                title:eventName,
                titleDesc:fenxiWord,
                startTime:startDateTime,
                endTime:endDateTime,
                enventUrl:'报告正在努力生成中，请耐心等待！'
            });
            this.isloading = false;
        },1500);
    },
    getStartTime(e){
        this.startDateTime = e;
    },
    getEndTime(e){
        this.endDateTime = e;
    },
    changeEvenType(e){
        let strType = e.value;
        let dataArr = [
            {
                hasFinshed:'已结束',
                title:'十一还能出去“浪”吗？',
                titleDesc:'张泉灵抛出这一问题后,张文宏第一反应是:这个问题回答起来略微有点难度大. 9... 一把,毕竟因为疫情的原因,很多盆友都将自己的旅游计划搁置许久了,...',
                startTime:'2020-09-01 00:00:00',
                endTime:'2020-09-17 14:44:00',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/1489e41b4c6efb3f5ae3591fa76686d70ef.html'
            },
            {
                hasFinshed:'已结束',
                title:'中印冲突',
                titleDesc:'《印度快报》18日报道称，印中两军在边境地区发生暴力冲突后，印度铁道部和电信部将不再考虑与中国公司的合作。 对于有消息称“印度似乎已派出力量增援边防部队”，赵立坚说，中印正通过军事和外交渠道对话解决有关现地问题，目前没有需要发布的消息。',
                startTime:'2020-06-19 14:27:34',
                endTime:'2020-09-17 14:27:34',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/14465d050c99f81ad5ddac2a83771f5c705.html'
            },
            {
                hasFinshed:'已结束',
                title:'云南瑞丽宣布“封城”',
                titleDesc:'云南瑞丽市封城 全员居家隔离疫情 云南瑞丽瑞丽封城',
                startTime:'2020-09-15 00:00:00',
                endTime:'2020-09-17 14:40:00',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/147bb9bfe647d8d0f97b09230d30c8c709c.html'
            },
            {
                hasFinshed:'已结束',
                title:'字节跳动回应TikTok交易',
                titleDesc:'在接受中国官方媒体新华社采访时，长期跟踪研究技术贸易法规的中国对外经济贸易大学教授崔凡表示，这两项技术出口受限，可能会影响到眼下正在酝酿中的TikTok美国业务出售交易。 如果，TikTok母公司字节跳动需要出售，就需要准备出口调整后目录中的限制类技术，暂停磋商与贸易程序，履行相关申请手续，这一切的手续将让抖音的交易延期进行。',
                startTime:'2020-06-19 14:15:05',
                endTime:'2020-09-17 14:15:05',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/143d5f687849573dfe3b573a7c2026aeb01.html'
            },
            {
                hasFinshed:'已结束',
                title:'山东冠县调查农家女被冒名顶替上大学',
                titleDesc:'据澎湃新闻此前报道,高考“落榜”16年后,冠县人陈秋媛(化名)打算报考成人教育学校,来填补心中的遗憾。 然而,在信息填报时她才发现,“陈秋媛”已经在山东理工大学“就读”过,并顺利毕业,而学信网上的“陈秋媛”,照片栏上是另外一个陌生女孩的头像',
                startTime:'2020-06-02 14:26:05',
                endTime:'2020-08-31 14:26:05',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/76db46e0e4d2d332286e9f39ab6bbd4602.html'
            },
            {
                hasFinshed:'已结束',
                title:'腾讯 老干妈',
                titleDesc:'老干妈回应：腾讯被骗了腾讯和老干妈有没签广告合同，如果没签，老干妈反告腾讯，是腾讯侵占老干妈品牌权。',
                startTime:'2020-06-02 14:24:21',
                endTime:'2020-08-31 14:24:21',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/75cc0edbae01d0103d04713a52f35a1656.html'
            },
            {
                hasFinshed:'已结束',
                title:'当当网',
                titleDesc:'2月20日，当当人力资源部发布人事调整公告称，从2019年1月开始，李国庆不再担任当当网任何职务，但仍是公司股东。 在20日发布的公开信中，李国庆称，“当当结束了夫妻店治理结构，俞渝会带领公司洒脱地开创未来。”',
                startTime:'2020-05-30 09:03:26',
                endTime:'2020-08-28 09:03:26',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/68f92a3f345eaea073ac198d5a2bcaa3d8.html'
            }
        ];
        if(strType == 'all'){
            this.eventArr = dataArr;
        }
        else if(strType == 'ing'){
            let ingArr = [];
            dataArr.forEach((item,index)=>{
                if(item.hasFinshed == '进行中'){
                    ingArr.push(item)
                }
            });
            this.eventArr = ingArr;
        }
        else if(strType == 'ed'){
            let edArr = [];
            dataArr.forEach((item,index)=>{
                if(item.hasFinshed == '已结束'){
                    edArr.push(item)
                }
            });
            this.eventArr = edArr;
        }
    },
    eventSearch(e){
        let searchTxt = e;
        let dataArr = [
            {
                hasFinshed:'已结束',
                title:'十一还能出去“浪”吗？',
                titleDesc:'张泉灵抛出这一问题后,张文宏第一反应是:这个问题回答起来略微有点难度大. 9... 一把,毕竟因为疫情的原因,很多盆友都将自己的旅游计划搁置许久了,...',
                startTime:'2020-09-01 00:00:00',
                endTime:'2020-09-17 14:44:00',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/1489e41b4c6efb3f5ae3591fa76686d70ef.html'
            },
            {
                hasFinshed:'已结束',
                title:'中印冲突',
                titleDesc:'《印度快报》18日报道称，印中两军在边境地区发生暴力冲突后，印度铁道部和电信部将不再考虑与中国公司的合作。 对于有消息称“印度似乎已派出力量增援边防部队”，赵立坚说，中印正通过军事和外交渠道对话解决有关现地问题，目前没有需要发布的消息。',
                startTime:'2020-06-19 14:27:34',
                endTime:'2020-09-17 14:27:34',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/14465d050c99f81ad5ddac2a83771f5c705.html'
            },
            {
                hasFinshed:'已结束',
                title:'云南瑞丽宣布“封城”',
                titleDesc:'云南瑞丽市封城 全员居家隔离疫情 云南瑞丽瑞丽封城',
                startTime:'2020-09-15 00:00:00',
                endTime:'2020-09-17 14:40:00',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/147bb9bfe647d8d0f97b09230d30c8c709c.html'
            },
            {
                hasFinshed:'已结束',
                title:'字节跳动回应TikTok交易',
                titleDesc:'在接受中国官方媒体新华社采访时，长期跟踪研究技术贸易法规的中国对外经济贸易大学教授崔凡表示，这两项技术出口受限，可能会影响到眼下正在酝酿中的TikTok美国业务出售交易。 如果，TikTok母公司字节跳动需要出售，就需要准备出口调整后目录中的限制类技术，暂停磋商与贸易程序，履行相关申请手续，这一切的手续将让抖音的交易延期进行。',
                startTime:'2020-06-19 14:15:05',
                endTime:'2020-09-17 14:15:05',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/143d5f687849573dfe3b573a7c2026aeb01.html'
            },
            {
                hasFinshed:'已结束',
                title:'山东冠县调查农家女被冒名顶替上大学',
                titleDesc:'据澎湃新闻此前报道,高考“落榜”16年后,冠县人陈秋媛(化名)打算报考成人教育学校,来填补心中的遗憾。 然而,在信息填报时她才发现,“陈秋媛”已经在山东理工大学“就读”过,并顺利毕业,而学信网上的“陈秋媛”,照片栏上是另外一个陌生女孩的头像',
                startTime:'2020-06-02 14:26:05',
                endTime:'2020-08-31 14:26:05',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/76db46e0e4d2d332286e9f39ab6bbd4602.html'
            },
            {
                hasFinshed:'已结束',
                title:'腾讯 老干妈',
                titleDesc:'老干妈回应：腾讯被骗了腾讯和老干妈有没签广告合同，如果没签，老干妈反告腾讯，是腾讯侵占老干妈品牌权。',
                startTime:'2020-06-02 14:24:21',
                endTime:'2020-08-31 14:24:21',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/75cc0edbae01d0103d04713a52f35a1656.html'
            },
            {
                hasFinshed:'已结束',
                title:'当当网',
                titleDesc:'2月20日，当当人力资源部发布人事调整公告称，从2019年1月开始，李国庆不再担任当当网任何职务，但仍是公司股东。 在20日发布的公开信中，李国庆称，“当当结束了夫妻店治理结构，俞渝会带领公司洒脱地开创未来。”',
                startTime:'2020-05-30 09:03:26',
                endTime:'2020-08-28 09:03:26',
                enventUrl:'http://bsddata.oss-cn-hangzhou.aliyuncs.com/yuqing_oem/html/68f92a3f345eaea073ac198d5a2bcaa3d8.html'
            }
        ];
        let afterSearArr = [];
        dataArr.forEach((item,index)=>{
            if(item.title.indexOf(searchTxt) != -1){
                afterSearArr.push(item)
            }
        });
        this.eventArr = afterSearArr;
    }
  }
};
</script>
<style lang="less">
.pubOpinExper_container{
    width: 100%;
    height: 100%;
    background: #f1f3f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    .menu_container{
        width: 100%;
        height: 80px;
        background: #FFFFFF;
        box-shadow: 0 3px 6px 0 #F2F4F7;
        display: flex;
        align-items: center;
        justify-content: center;
        .menu{
            width: 1200px;
            height: 100%;
            span:nth-child(1){
                font-size: 16px;
                color: #121C33;
                letter-spacing: 0;
                line-height: 80px;
            }
            span:nth-child(2){
                font-size: 16px;
                color: #B8BECC;
                letter-spacing: 0;
                line-height: 80px;
            }
        }
        .menu{
            cursor: pointer;
        }
    }
    .pubOpinExper_search_container{
        width: 1200px;
        height: 80px;
        padding: 24px;
        background-color: #ffffff;
        margin-top: 31px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .search_content{
            width: 387px;
            height: 32px;
            display: flex;
            align-items: center;
            /deep/.ivu-select-default{
                /deep/.ivu-select-selection{
                    border-radius: 0;
                    border-right: none;
                    /deep/.ivu-select-selection{
                        border-color: #dcdee2 !important;
                        outline: 0;
                        box-shadow: 0 0 0 2px #dcdee2 !important;
                    }
                }
                /deep/.ivu-select-selection:hover {
                    border-color: #dcdee2;
                }
                /deep/.ivu-select-selection-focused,.ivu-select-selection:hover{
                    border-color: #dcdee2 !important;
                }
            }
            /deep/.ivu-input-wrapper{
                /deep/.ivu-input-default{
                    border-radius: 0;
                }
                /deep/.ivu-input:focus{
                    border-color: #dcdee2;
                    box-shadow:none;
                }
                /deep/.ivu-input:hover {
                    border-color: #dcdee2;
                }
                /deep/.ivu-input-search{
                    background: #03A971 !important;
                    border-color: #03A971 !important;
                }
            }
        }
        .add_btn{
            width: 87px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            line-height: 22px;
            background: #03A971;
            border-radius: 4px;
            &:hover{
                cursor: pointer;
            }
        }
    }
    .pubOpinExper_list_container{
        margin-top: 19px;
        margin-bottom: 40px;
        width: 1200px;
        padding: 24px;
        background-color: #ffffff;
        min-height: 440px;
        box-sizing: border-box;
        .list_item{
            width: 100%;
            padding-bottom: 14px;
            padding-top: 24px;
            box-sizing: border-box;
            border-bottom: 1px solid #EBECF0;
            &:hover{
                cursor: pointer;
            }
            .list_item_one{
                width: 100%;
                display: flex;
                align-items: center;
                margin-bottom: 6px;
                .ifFinshed{
                    border: 1px solid #FE5560;
                    color: #FE5560;
                    padding: 1px 6px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px;
                }
                .list_item_one_title{
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #3D4966;
                }
            }
            .list_item_two{
                width: 1036px;
                margin-bottom: 2px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                overflow: hidden;
                -webkit-box-orient: vertical;
            }
            .list_item_three{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #7A8499;
                line-height: 20px;
            }
        }
    }
    .ivu-spin-default{
        position: fixed;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .mask_model_container{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:rgba(0, 0,0,0.6);
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        .mask_model_content{
            width: 800px;
            background: #FFFFFF;
            .mask_model_title_area{
                width: 100%;
                height: 56px;
                border-bottom: 1px solid #F2F4F7;
                border-radius: 4px 4px 4px 0;
                padding: 0 20px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .mask_model_title{
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #121C33;
                    font-weight: 550;
                }
                .close_img_container{
                    width: 13.3px;
                    &:hover{
                        cursor: pointer;
                    }
                    .close_img{
                        width: 100%;
                    }
                }
            }
            .mask_content{
                width: 100%;
                height: 550px;
                padding: 24px 145px 34px 60px;
                box-sizing: border-box;
                .event_item_content{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    .event_label{
                        width: 80px;
                        margin-right: 15px;
                        font-family: PingFangSC-Regular;
                        font-size: 16px;
                        color: #3D4966;
                        letter-spacing: 0;
                        text-align: right;
                    }
                    .input_content{
                        width: 500px;
                        height: 40px;
                    }
                    .time_content{
                        display: flex;
                        align-items: center;
                        .start_dateTime,.end_dateTime{
                            width: 227px;
                            height: 100%;
                        }
                        .date_Txt{
                            width: 46.6px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: PingFangSC-Regular;
                            font-size: 16px;
                            color: #3D4966;
                            letter-spacing: 0;
                        }
                    }
                    .oper_btn{
                        display: flex;
                        align-items: center;
                        .save_btn,.cancel_btn{
                            width: 110px;
                            height: 40px;   
                            border-radius: 4px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 10px;
                            font-family: PingFangSC-Regular;
                            font-size: 16px;
                            letter-spacing: 0;
                            text-align: center;
                        }
                        .save_btn{
                            background: #03A971;
                            color: #FFFFFF;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                        .cancel_btn{
                            border: 1px solid #B8BECC;
                            color: #3D4966;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                    }
                }
                .fenxi_word,.paichu_word{
                    align-items: flex-start;
                    .fenxi_input,.paichu_input{
                        width: 500px;
                        height: 128px;
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
}
</style>