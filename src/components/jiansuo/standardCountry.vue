<template>
  <div class="fankui_container">
    <div class="fankui_content">  
        <div class="banner">
            <div class="title">国家统计局搜索</div>
        </div>
        <div class="content_container">
            <Form :model="formItem" :label-width="95" ref="formItem" :rules="ruleValidate">
                <!-- <FormItem label="详细指标：" prop="zhibiao">
                    <Cascader :data="dataCar" v-model="formItem.zhibiao"  size="large" placeholder="请选择详细指标"></Cascader>
                </FormItem>
                <FormItem label="地区：" prop="area">
                    <Select v-model="formItem.area"  placeholder="请选择地区" size="large">
                        <Option v-for="item in areaList" :value="item" :key="item">{{item}}</Option>
                    </Select>
                </FormItem> -->
                <FormItem label="统计年份：" prop="year">
                    <DatePicker type="year" placeholder="请选择年份" size="large" v-model="formItem.year"></DatePicker>
                </FormItem>
                <FormItem label="季度：">
                    <RadioGroup v-model="formItem.quarter">
                        <Radio label="第一季度">第一季度</Radio>
                        <Radio label="第二季度">第二季度</Radio>
                        <Radio label="第三季度">第三季度</Radio>
                        <Radio label="第四季度">第四季度</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="统计月份：" prop="">
                    <Select v-model="formItem.month1"   placeholder="请选择月份" size="large" style="width:160px">
                            <Option v-for="item in months" :value="item" :key="item">{{item}}</Option>
                        </Select>
                        <span>&nbsp;至&nbsp;</span>
                    <Select v-model="formItem.month2"   placeholder="请选择月份" size="large" style="width:160px">
                            <Option v-for="item in months" :value="item" :key="item">{{item}}</Option>
                        </Select>
                </FormItem>
                <FormItem label="关键词：" prop="keyword">
                    <Input v-model="formItem.keyword" size="large" placeholder=""></Input>
                </FormItem>
            </Form>
            <div class="btnSearch">
               <Button type="success" class="search1" @click="search">检索</Button>
            </div>
        </div> 
    </div>
    <div class="fast_content" v-if="showFast">
        <div class="result_title">
            快速检索
        </div>
        <div class="result_list">
            <div class="fast_item" v-for="(item,index) in fastList" :key="item.title" v-if="index<6">
                <div class="fast_title">{{item.label}}</div>
                <div class="fast_desc" v-for="(subItem,subIndex) in item.children" v-if="subIndex<3" :key="subItem.tableLable" @click="fastSearch(subItem)">{{subItem.tableLable}}</div>
            </div>
        </div> 
    </div>  
    <div class="result_content" v-if="showRes">
        <div class="result_title">
            检索结果
        </div>
         <!--   -->
        <div class="empty" v-if="isloading">
            <Spin style="margin:80px 0;">
                <Icon type="ios-loading" size=76 class="demo-spin-icon-load"></Icon>
                <div>加载中...</div>
            </Spin>
         </div>   
        <Table :columns="columns" :data="dataList" stripe></Table>
        <div class="page_footer">
            <Page :total="paging.total" :current="paging.index" @on-change="pagingChange"></Page>
        </div>    
    </div>  
  </div>
</template>

<script>
  export default {
      data(){
          return{
            areaList:[],
            fastList:[
                {title:'文化体育',desc1:'广播电视电影事业发展情况',desc2:'电影综合情况',desc3:'2018年第四季度部分城市公共就业服务机构市场供求状况'},
                {title:'交通运输',desc1:'2019年1-11月全国吸收外商直接投资快讯',desc2:'客运量',desc3:'旅客运输平均运距'},
                {title:'其他',desc1:'分地区城市建设情况 (2018年)',desc2:'新注册民用汽车数量',desc3:'卫生总费用'},
                {title:'公共管理、社会保障、社会组织',desc1:'公安机关立案的刑事案件及构成',desc2:'公安机关受理和查处治安案件数(2018年)',desc3:'各地区交通事故情况 (2018年)'},
                {title:'金融业',desc1:'社会融资规模增量及构成',desc2:'保险公司业务经济技术指标',desc3:'分地区原保险保费收入和赔付支出情况 (2018年)'},
                {title:'就业和工资',desc1:'就业基本情况',desc2:'按三次产业分就业人员数 (年底数)',desc3:'按行业分城镇非私营单位就业人员数(年底数)'},
            ],
            months:[1,2,3,4,5,6,7,8,9,10,11,12],
            showFast:false,
            isloading:false,
            showRes:false,
            formItem: {
                zhibiao:'',
                area:'',
                quarter:'',
                year:'',
                month1:'',
                month2:'',
                monStr:'',
                keyword:'',
            },
            ruleValidate:{
                name: [{ required: true, message: "内容不能为空", trigger: "blur" }],
            },
            paging: {
                index: 1,
                size: 10,
                total: 0
            },
            dataList:[],
            columns: [
                {
                    title: '序号',
                    width: 70,
                    align: 'center',
                    render: (h,params) => {
                        return h('span',params.index + (this.paging.index-1)*this.paging.size + 1 )
                    }
                },
                 {
                    title: '标题',
                    key: 'titleName'
                },
                {
                    title: '日期',
                    width: 250,
                    key: 'releaseTime'
                },
                {
                    title: '部委名称',
                    width: 150,
                    key: 'departmentName'
                }
            ],
            dataCar: [{
                value: 'beijing',
                label: '北京',
                children: [
                    {
                        value: 'gugong',
                        label: '故宫'
                    },
                    {
                        value: 'tiantan',
                        label: '天坛'
                    },
                    {
                        value: 'wangfujing',
                        label: '王府井'
                    }
                ]
            }, {
                value: 'jiangsu',
                label: '江苏',
                children: [
                    {
                        value: 'nanjing',
                        label: '南京',
                    },
                    {
                        value: 'suzhou',
                        label: '苏州',
                    }
                ],
            }]    
        }
      },
      created(){
          this.initfastList()
      },
      methods:{
        initfastList(){
            this.$axios({
                method: "get",
                url: window.config.url+"/search/statistics/indexclass",
            }).then(res => {
                if (res.data.code == 200000) {
                    this.paging.total=res.data.data.totalNum;
                    this.fastList=res.data.data;
                }
            }).catch(err => {
                 this.isloading=false;
            });

        },
        fastSearch(item){
            //this.formItem.keyword=item.tableLable;
            this.initFastData(item.tableName)
            this.showFast=false;
            this.showRes=true;
            this.initPaging();
           
        },
        search(){
           this.$refs["formItem"].validate(valid => {
            if (valid) {
                this.formItem.year=this.$dateUtil.formatTime(this.formItem.year,'yy')
                if(this.formItem.month1||this.formItem.month2){
                    if(this.formItem.month2<this.formItem.month1){
                        this.$Message.warning('请输入正确的月份');
                        return;
                    }else{
                        let startMon=this.formItem.month1;
                        let endMon=this.formItem.month2;
                        if(startMon==endMon){
                            this.formItem.monStr=startMon+'月'
                        }else{
                            for(var i=startMon;i<=endMon;i++){
                                if(i==endMon){
                                    this.formItem.monStr+=i+'月'
                                }else{
                                    this.formItem.monStr+=i+'月,'
                                }
                            }
                        }
                    }
                }
                this.showFast=false;
                this.showRes=true;
                this.initPaging();
            }
          });
        },
        initFastData(val){
            this.isloading=true;
            let params={
                tableName :val,
                pageIndex:this.paging.index,
                pageSize:this.paging.size
            }
            this.$axios({
                method: "get",
                url: window.config.url+"/search/statistics/quicksearch",
                params:params
            }).then(res => {
                if (res.data.code == 200000) {
                    this.isloading=false;
                    this.paging.total=res.data.data.totalNum;
                    this.dataList=res.data.data.data;
                }
            }).catch(err => {
                 this.isloading=false;
            });
        },
        initData(){
            this.isloading=true;
            let params={
                firstClass:'国家',
                keyword:this.formItem.keyword,//关键词
                // area:this.formItem.area,
                year:this.formItem.year,//年份
                quarter:this.formItem.quarter,//季度
                month:this.formItem.monStr,//年代
                // category:this.formItem.category,//年代
                // subCategory:this.formItem.subCategory,//年代
                pageIndex:this.paging.index,
                pageSize:this.paging.size
            }
            this.$axios({
                method: "get",
                url: window.config.url+"/search/statistics/search",
                params:params
            }).then(res => {
                if (res.data.code == 200000) {
                    this.isloading=false;
                    this.paging.total=res.data.data.totalNum;
                    this.dataList=res.data.data.data;
                }
            }).catch(err => {
                 this.isloading=false;
            });
        },
        pagingChange(val){
            this.paging.index = val;
            document.documentElement.scrollTop=500;
            this.initData();
        },
        initPaging() {
            this.paging.index = 1;
            this.paging.size = 10;
            this.initData();
        },
      }
  }
</script>

<style scoped lang='less'>
.formBox{
  display: flex;
  align-items: center;
}
.fankui_container{
    width: 100%;
    background: #F7F8FA;
    padding-top: 60px;
    padding-bottom: 60px;
    .fankui_content{
        width: 1200px;
        margin:auto;
        background: #fff;
         .banner{
            width: 100%;
            height: 95px;
            background-image: url('../../assets/images/jiansuo/banner.png');
            background-size: cover;
            background-position: center;
            margin-bottom: 80px;
            .title{
                font-size: 30px;
                color: #FFFFFF;
                text-align: center;
                line-height: 95px;
            }
        }
        .content_container{
            width: 460px;
            background-color: #fff;
            margin:auto;
            .btnSearch{
                margin-left: 95px;
                margin-top: 40px;
                padding-bottom: 40px;
                .search1{
                    width:140px;
                    height: 42px;
                    padding:0;
                    font-size: 16px;
                    color: #FFFFFF;
                    text-align: center;
                    border: none;
                    background-color: #03A971;
                    border-radius: 3px;
                    margin-right: 30px;
                }
                .search2{
                    width:140px;
                    height: 42px;
                    padding:0;
                    font-size: 16px;
                    color: #03A971;
                    text-align: center;
                    border: 1px solid #03A971;
                    border-radius: 3px;
                }
            }
        }
    }
    .fast_content{
        width: 1200px;
        margin:auto;
        background: #fff;
        margin-top:40px;
        padding-left:30px;
        padding-top:30px;
        cursor: pointer;
        .result_title{
            font-size: 20px;
            color: #121C33;
            text-align: center;
            height: 46px;
        }
        .result_list{
            display: flex;
            flex-wrap: wrap;
            .fast_item{
                width: 360px;
                height: 138px;
                border: 1px solid #F2F4F7;
                border-radius: 4px;
                margin-right: 30px;
                margin-bottom: 30px;
                font-size: 12px;
                color: #3D4966;
                padding:20px;
                box-sizing: border-box;
                .fast_title{
                    border-left:3px solid #03A971;
                    padding-left:10px;
                    font-size: 16px;
                    color: #121C33;
                    margin-bottom: 10px;
                }
                .fast_desc{
                   margin-bottom: 8px;
                   margin-left: 13px;
                }
            }
        }
        
    }
    .result_content{
        width: 1200px;
        margin:auto;
        background: #fff;
        margin-top:40px;
        padding:30px;
        position: relative;
        /deep/.ivu-table-wrapper{
            /deep/.ivu-table-stripe{
                /deep/.ivu-table-header{
                    table{
                        border-spacing: 0px 0px !important;
                    }
                }
                /deep/.ivu-table-body{
                    table{
                        border-spacing: 0px 0px !important;
                    }
                }
                /deep/.ivu-table-tip{
                    table{
                        border-spacing: 0px 0px !important;
                    }
                }
            }
        }
        .result_title{
            font-size: 20px;
            color: #121C33;
            text-align: center;
            height: 46px;
        }
        .page_footer{
            text-align: center;
            margin-top: 37px;
            margin-bottom: 60px;
        }
        .empty{
            position: absolute;
            top:200px;
            left:0;
            width:100%;
            z-index: 9999;
        }
    }
}
</style>
<style lang="less">
  .ivu-page-item:hover {
      border-color: none;
      background: #03A971;
  }
  .ivu-page-item-active a, .ivu-page-item-active:hover a {
    color: #fff;
  }
  .ivu-page-item:hover a {
      color: #fff;
  }
  .ivu-page-item-active {
      border-color: #03A971;
      background: #03A971;
  }
  .ivu-page-item:hover {
      border-color: #03A971;
  }
  .ivu-page-next:hover, .ivu-page-prev:hover {
      border-color: #03A971;
      background: #03A971;
  }
  .ivu-page-next:hover a, .ivu-page-prev:hover a {
      color: #fff;
  }
</style>
