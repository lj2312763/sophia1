<template>
  <div class="fankui_container">
    <div class="fankui_content">  
        <div class="banner">
            <div class="title">标准搜索</div>
        </div>
        <div class="content_container">
            <Form :model="formItem" :label-width="95" ref="formItem" :rules="ruleValidate">
                <FormItem label="标准名称：" prop="name">
                    <Input v-model="formItem.name" size="large" placeholder=""></Input>
                </FormItem>
                <FormItem label="标准号：" prop="number">
                    <Input v-model="formItem.number" size="large" placeholder=""></Input>
                </FormItem>
            </Form>
            <div class="btnSearch">
               <Button type="success" class="search1" @click="search">检索</Button> <Button type="success" @click="moreSearch" class="search2" ghost>高级检索</Button>
            </div>
        </div> 
      <popUp v-if="isShow" @closeDialog="closeDialog" @jiansuo="jiansuo"></popUp>
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
import popUp from './popUp1.vue';
  export default {
    components:{popUp},
      data(){
          return{
            isloading:false,
            showRes:false,
            isShow:false,
            agree:true,
            formItem: {
              number: "",
              name: "",
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
                    width: 100,
                    align: 'center',
                    render: (h,params) => {
                        return h('span',params.index + (this.paging.index-1)*this.paging.size + 1 )
                    }
                },
                {
                    title: '标题',
                    width: 400,
                    key: 'title',
                    ellipsis:true,
                    tooltip:true,
                },
                {
                    title: '标准号',
                    key: 'standardno'
                },
                {
                    title: '日期',
                    key: 'publishdate'
                },
                {
                    title: '类型',
                    key: 'origin'
                }
            ],
        }
      },
      methods:{
        moreSearch(){
            this.isShow=true;
        },
        jiansuo(val){
            this.formItem.number='';//标准号
            this.formItem.name='';//标准中文名称
            this.paging.index = 1;
            this.paging.size = 10;
            this.isShow=false;
            this.showRes=true;
            this.initData(val)
        },
        search(){
           this.$refs["formItem"].validate(valid => {
            if (valid) {
                this.showRes=true;
                this.initPaging();
            }
          });
        },
        initData(val){
            this.isloading=true;
            this.$axios({
                method: "get",
                url: window.config.url+"/search/bz/search",
                params:{
                    bzh:this.formItem.number,//标准号
                    title:val?val.keywords:this.formItem.name,//标准中文名称
                    status:val?val.status:'',//标准状态
                    categories:val?val.category.join(","):'',//年代
                    year:val?val.year:'',//年代
                    pageIndex:this.paging.index,
                    pageSize:this.paging.size
                }
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
        closeDialog(){
          this.isShow=false;
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
                margin-top: 80px;
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
