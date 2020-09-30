<template>
  <div>
    <Banner :banner="banner" ref="banner"></Banner>
    <TextList :textImg="caseText"></TextList>
    <ListText :textImg="imgText"></ListText>
    <TextList :textImg="layText"></TextList>
    <ListText :textImg="personText"></ListText>
    <div class="content" id="lawQuery">
      <p class="title">律师查询</p>
      <div class="search">
        <Select style="width:300px"
            v-model="keyword"
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="searchLoading">
            <Option v-for="(item, index) in lawyerList"  @click.native="getMoreParams(item)" :value="item.id" :key="index">
              {{item.fullName}} {{item.firmName}}
            </Option>
        </Select>
        <Button  type="success" icon="ios-search" @click="search" style="margin-left:10px"></Button>
      </div>
    </div>
    <div class="content">
      <p class="title">即刻获得法律综合分析能力</p>
      <div class="zixun">快速与我们取得联系，请点击下方的合作咨询</div>
      <div class="intro">
         <i-button type="success" @click="jump1()">合作咨询</i-button>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../common/banner";
import Apply from "../common/apply";
import TextList from "../common/textList";
import ListText from "../common/listText";
export default {
  name: 'insightData',
  data () {
    return {
      label:'',
      keyword:"",
      lawyerInfo:null,
      baseUrl:window.config.url+'',
      searchLoading:false,
      lawyerList:[],
      area:"北京",
      banner:{
        url:require("../../assets/images/houseData/falv.png"),
        title:"法律综合分析",
        intro:"“工欲善其事，必先利其器”，为您提供全面的案件查询、律师分析、当事人分析等服务。",
        btn:{
          btn1:{path:"#lawQuery",query:"",text:"功能体验"},
          btn2:{path:"",query:"",text:"立即使用"},
          btn3:{path:"/document",query:"2",id:"0",text:"接口文档",subId:"0"}
        },
      },
      caseText:{
        url:require("../../assets/images/houseData/anjian.png"),
        id:'case',
        title:"案件综合分析",
        intro:"拥有最全的全国案件库，为您提供查询以及大数据展示接口服务",
        listTitle:"案件分析维度",
        list:[
          "·Top10案件分布",
          "·案件时间分布",
          "·总体案由分类",
          "·法院层级分布",
          "·案件类型分布",
          "·原告主体类型分布"
        ]
      },
      imgText:{
        url:require("../../assets/images/room/fayuan.png"),
        title:"法院判决分析",
        intro:"最高法公报案例、各地裁判文书、案例评析、仲裁裁决等资源，可以为您提供相似案由查询以及数据分析服务。",
        listTitle:"判决分析维度",
        list:[
         "·案件上诉、改判、再审率",
          "·二审判决结果分析",
          "·再审案件分析",
          "·判决标的额分布",
        ]
      },
      layText:{
        url:require("../../assets/images/houseData/lvshi.png"),
        title:"律师综合分析",
        intro:"为您提供律师擅长的行业&业务领域，所负责案件案由、类型、时间、地区、法院层级分布以及判决胜诉率详情查询服务。",
        listTitle:"律师分析维度",
        list:[
          "·擅长行业&业务领域",
          "·案由分布",
          "·案件地区分布",
          "·法院层级分布",
          "·判决胜诉率",
          "·判决标的额分布",
        ]
      },
      personText:{
        url:require("../../assets/images/houseData/dangshiren.png"),
        title:"当事人综合分析",
        intro:"您可以根据当事人名称进行案件搜索，方便您了解当事人的守法情况，为您的金融、信贷评估提供基础服务。&业务领域，所负责案件案由、类型、时间、地区、法院层级分布以及判决胜诉率详情查询服务。",
        listTitle:"当事人分析维度",
        list:[
          "·案件上诉、改判、再审率",
          "·二审判决结果分析",
          "·再审案件分析",
          "·判决标的额分布"
        ]
      },
    }
  },
  components:{
      Banner,
      TextList,
      ListText
  },
  created(){
    //this.search();
  },
  methods:{
    jump1(){
       let routerUrl = this.$router.resolve({
            path:'/zixun',
            // query:{
            //  title:1,
            //  subTitle:'合作咨询'
            // }
        });
        window.open(routerUrl.href,'_blank')
    },
    getMoreParams(item){
      this.lawyerInfo=item;
    },
    remoteMethod (query) {
       this.searchLoading = true;
      setTimeout(()=>{
         if (query !== '') {
            this.$axios({
                method: "get",
                url: this.baseUrl + "/insight/lawQuery/lawyer_search",
                params:{
                  keyword:query,
                  pageNo:1,
                  pageSize:10
                }
            }).then(res => {
                if(res.status==200){
                  this.searchLoading = false;
                  this.lawyerList=res.data.data.map.list;
                }
            }).catch(err=>{
               this.searchLoading = false;
               this.lawyerList=[];
            });
        } else {
            this.lawyerList = [];
        }
      },500)
       
    },
    search(){
         if(this.keyword){
            this.$router.push({
              path:"/lawyer",
              query:{
                type:2,
                id:this.keyword,
                lawName:this.lawyerInfo.fullName,
                firmName:this.lawyerInfo.firmName,
                count:this.lawyerInfo.mount,
              }
            })
         }else{
           this.$Message.warning("请输入用户名");
         }
     
    }
  }
}
</script>

<style scoped lang='less'>
.content{
  width:1200px;
  margin: auto;
  margin-bottom: 80px;
  .title{
    font-size: 36px;
    color: #121C33;
    text-align: center;
    margin-bottom: 20px;
  }
  .zixun{
    color: #7A8499;
    margin: 10px 0 25px 0;
    font-size: 20px;
    text-align: center;
  }
  .intro{
    width:509px;
    margin: auto;
    text-align: center;
  }
  .search{
    width:450px;
    margin: auto;
    display: flex;
    justify-content: center;
  }
}
</style>

