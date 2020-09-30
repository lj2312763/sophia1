<template>
<div class="container" ref="contentContainer">
    <div class="banner_container">
        <Input v-model="inputText" placeholder="请输入您想要搜索的内容" @on-keyup.enter="aiSearch">
            <Button slot="append" icon="ios-search" @click="aiSearch"></Button>
        </Input>
        <div class="commlist_container">
            <div class="commlist_item" v-for="(item,index) in commlistArr" :key="index" @click="searchItem(item)">
                {{item}} 
            </div>
        </div>
    </div>
    <div class="sousuo_container" v-if="ifShowContent">
        <div class="empty_container" v-if="ifShowEmptyInfo">
            <div class="img_container">
                <img :src="emptyImg">
            </div>
            <div class="empty_text">
                抱歉，没有搜索到相关结果。
            </div>
        </div>
        <div class="table_container" v-if="ifShowSearchResult">
            <div class="anv_menu_container" ref="anv_menu_container">
                <div class="anv_menu" :class="{'activeStyle' :option == item.value}" v-for="(item,index) in navMenuArr" :key="index" @click="changeMenu(index,item)">{{item.name}}</div>
            </div>
            <div class="guojia" v-if="ifShowguojia">
                <Table :data="guojiaTableData" :columns="guojiaColumns" stripe style="width:100%"></Table>
                <div style="margin: 10px;overflow: hidden;text-align: center;">
                    <div style="float:center;margin-top: 40px;">
                        <Page :total="guojiaTotalNum" :page-size='PageSize' @on-change="changePageGuojia"></Page>
                    </div>
                </div>
            </div>
            <div class="keji" v-if="ifShowkeji">
                <Table :data="kejiTableData" :columns="kejiColumns" stripe style="width:100%"></Table>
                <div style="margin: 10px;overflow: hidden;text-align: center;">
                    <div style="float:center;margin-top: 40px;">
                        <Page :total="kejiTotalNum" :page-size='PageSize' @on-change="changePageKeji"></Page>
                    </div>
                </div>
            </div>
            <div class="zhuanli" v-if="ifShowzhuanli">
                <Table :data="zhuanliData" :columns="zhuanliColumns" stripe style="width:100%"></Table>
                <div style="margin: 10px;overflow: hidden;text-align: center;">
                    <div style="float:center;margin-top: 40px;">
                        <Page :total="zhuanliTotalNum" :page-size='PageSize' @on-change="changePageZhuanli"></Page>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="pop_up_container" v-if="ifShowLoading">  
        <div class="pop_up">
            <Col class="demo-spin-col">
                <Spin fix>
                    <Icon type="ios-loading" size=88 class="demo-spin-icon-load"></Icon>
                    <div>搜索中，请稍后...</div>
                </Spin>
            </Col>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data () {
            return {
                inputText:'',
                emptyImg:require('../../assets/images/icon/sorry.png'),
                ifShowEmptyInfo:false,
                ifShowSearchResult:false,
                ifShowLoading:false,
                guojiaTableData: [],
                kejiTableData:[],
                zhuanliData:[],
                option:'1',
                guojiaColumns: [
                    {
                        title: '序号',
                        key: 'index',
                        width:150
                    },
                    {
                        title: '标题',
                        key: 'title'   
                    },
                    {
                        title: '发布时间',
                        key: 'fabudate'
                    },
                    {
                        title: '标准号',  
                        key: 'id'
                    },
                    {
                        title: '实施时间',  
                        key: 'shishidate'
                    }
                ],
                kejiColumns: [
                    {
                        title: '序号',
                        key: 'index',
                        width:150
                    },
                    {
                        title: '标题',
                        key: 'title',   
                    },
                    {
                        title: '编号',
                        key: 'infoId',
                    },
                    {
                        title: '发布时间',
                        key:"pubTime"
                    }
                ],
                zhuanliColumns: [
                    {
                        title: '序号',
                        key: 'index',
                        width:150
                    },
                    {
                        title: '标题',  
                        key: 'title'
                    },
                    {
                        title: '专利号',
                        key: 'pubNumber'
                    },
                    {
                        title: '所属机构',
                        key: 'applicant'
                    }
                ],
                guojiaTotalNum:0,
                kejiTotalNum:0,
                zhuanliTotalNum:0,
                pageNum:1,
                PageSize:10,
                navMenuArr:[
                    {
                        name:'国家标准',
                        value:1
                    },
                    {
                        name:'科技成果',
                        value:2
                    },
                    {
                        name:'专利',
                        value:3
                    }
                ],
                ifShowguojia:true,
                ifShowkeji:false,
                ifShowzhuanli:false,
                commlistArr:['医疗','汽车','手机'],
                ifShowContent:false
            }
        },
        methods:{
            changePageGuojia (val) {
                this.pageNum = val;
                this.changeMenu(0,{value:1})
            },
            changePageKeji (val) {
                this.pageNum = val;
                this.changeMenu(1,{value:2})
            },
            changePageZhuanli (val) {
                this.pageNum = val;
                this.changeMenu(2,{value:3})
            },
            aiSearch(){
                var textKey = this.inputText;  
                this.ifShowLoading = true; 
                var formData = new FormData(); 
                var pageNum = this.pageNum;
                var PageSize = this.PageSize;
                formData.append('key',textKey);
                formData.append('pageNum',pageNum); 
                formData.append('pageSize',PageSize);   
                this.$axios({
                    url:window.config.url+'/sophiaManager/api/search/all ',
                    method:'post',
                    headers: {
                    'Accept': '*/*',
                    'Content-Type': 'multipart/form-data'
                    },
                    data:formData
                }).then(res=>{
                    if(res.status == 200){
                        this.ifShowLoading = false;
                        this.ifShowContent = true;
                        this.$nextTick(()=>{
                            var bodyDom = this.$refs.contentContainer;
                            bodyDom.style='background-color: #F7F8FA;';
                        });
                        var data = res.data;
                        var biaozhunArr = data.dataBZ;
                        var kejiArr = data.dataKJCG;
                        var zhuanliArr = data.dataZL;
                        var biaozhunDataArr = [];
                        var kejiDataArr = [];
                        var zhuanliDataArr = []
                        this.guojiaTotalNum = data.totalPageBZ;
                        if(Object.keys(data).length > 0){
                            this.ifShowSearchResult = true;
                            for(var i = 0;i < biaozhunArr.length;i++){
                                biaozhunDataArr.push({
                                    index:i + 1,  
                                    title:biaozhunArr[i].title,
                                    fabudate:biaozhunArr[i].fabudate,
                                    id:biaozhunArr[i].id,
                                    shishidate:biaozhunArr[i].shishidate
                                });
                            }
                            for(var i = 0;i < kejiArr.length;i++){
                                kejiDataArr.push({   
                                    index:i + 1,
                                    title:kejiArr[i].title,
                                    infoId:kejiArr[i].infoId,
                                    pubTime:kejiArr[i].pubTime
                                });
                            }
                            for(var i = 0;i < zhuanliArr.length;i++){
                                zhuanliDataArr.push({   
                                    index:i + 1,
                                    title:zhuanliArr[i].title,
                                    pubNumber:zhuanliArr[i].pubNumber,
                                    applicant:zhuanliArr[i].applicant
                                });
                            }
                            this.guojiaTableData = biaozhunDataArr;
                            this.kejiTableData = kejiDataArr;
                            this.zhuanliData = zhuanliDataArr;
                        }
                        else{
                            this.ifShowEmptyInfo = true;
                        }
                    }
                }).catch(err=>{
                    console.log(err)
                });
            },
            changeMenu(index,item){
                this.option = item.value;
                //显示隐藏切换
                if(index == 0){
                    this.ifShowguojia = true;
                    this.ifShowkeji = false;
                    this.ifShowzhuanli = false;
                }
                else if(index == 1){
                    this.ifShowguojia = false;
                    this.ifShowkeji = true;
                    this.ifShowzhuanli = false;
                }
                else if(index == 2){
                    this.ifShowguojia = false;
                    this.ifShowkeji = false;
                    this.ifShowzhuanli = true;
                }
                
                //切换数据获取
                var textKey = this.inputText;  
                var url;
                var formData = new FormData(); 
                var pageNum = this.pageNum;
                var PageSize = this.PageSize;
                formData.append('key',textKey);
                formData.append('pageNum',pageNum); 
                formData.append('pageSize',PageSize);
                if(index == 0){
                    url = window.config.url+'/sophiaManager/api/search/bz'   //POST /api/search/bz
                }
                else if(index == 1){
                    url = window.config.url+'/sophiaManager/api/search/kjcg';    //POST /api/search/kjcg
                }
                else if(index == 2){
                    url = window.config.url+'/sophiaManager/api/search/zl';  //POST /api/search/zl
                }
                this.$axios({
                    url:url,
                    method:'post',
                    headers: {
                    'Accept': '*/*',
                    'Content-Type': 'multipart/form-data'
                    },
                    data:formData
                }).then(res=>{
                    console.log(res,'res')
                    if(res.status == 200){
                        var data = res.data.data;
                        console.log(data,'data')
                        var biaozhunDataArr = [];
                        var kejiDataArr = [];
                        var zhuanliDataArr = []
                        if(index == 0){
                            for(var i = 0;i< data.length;i++){
                                biaozhunDataArr.push({
                                    index:i + 1,
                                    title:data[i].title,
                                    fabudate:data[i].fabudate,
                                    id:data[i].id,
                                    shishidate:data[i].shishidate
                                });
                            }
                            this.guojiaTableData = biaozhunDataArr;
                            this.guojiaTotalNum = res.data.totalPage;
                        }
                        else if(index == 1){
                            for(var i = 0;i< data.length;i++){
                                kejiDataArr.push({
                                    index:i + 1,
                                    title:data[i].title,
                                    infoId:data[i].infoId,
                                    pubTime:data[i].pubTime
                                });
                            }
                            this.kejiTableData = kejiDataArr;
                            this.kejiTotalNum = res.data.totalPage;
                        }
                        else if(index == 2){
                            for(var i = 0;i< data.length;i++){
                                zhuanliDataArr.push({
                                    index:i + 1,
                                    title:data[i].title,
                                    pubNumber:data[i].pubNumber,
                                    applicant:data[i].applicant
                                });
                            }
                            this.zhuanliData = zhuanliDataArr;
                            this.zhuanliTotalNum = res.data.totalPage;
                        }
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            searchItem(item){
                this.inputText = item;
                this.aiSearch();
                console.log(item)
            }
        }
    }
</script>

<style scoped lang='less'>
.container{
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    min-height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 80px;
    .banner_container{
        width: 100%;
        height: 240px;
        background-image: url('../../assets/images/aiSousuo/banner.png');
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
            margin-top: 60px;
            margin-bottom: 10px;
            font-size: 30px;
            color: #FFFFFF;
            text-align: center;
        }
        .ivu-input-hide-icon{
            width: 371px;
        }
        .commlist_container{
            display: flex;
            margin-top: 10px;
            font-size: 12px;
            color: #03A971;
            .commlist_item{
                margin-right: 23px;
                cursor: pointer;
            }
        }
    }
    .sousuo_container{
        width: 1200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #FFFFFF;
        padding: 40px 30px;
        .empty_container{
            margin-top: 95px;
            width: 200px;
            .img_container{
                width: 100%;
                height: 200px;
                margin-bottom: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .empty_text{
                font-size: 16px;
                color: #3D4966;
                text-align: center;
                white-space: normal;
                min-width: 210px;
            }
        }
        .table_container{
            margin-top: 40px;
            width: 100%;
            .guojia,.keji,.zhuanli{
                /deep/ .ivu-table-wrapper{
                    width: 100%;
                    /deep/ .ivu-table-stripe{
                        width: 100%;
                        /deep/ .ivu-table-body{
                            /deep/ table{
                                border-spacing: 0px 0px !important;
                                /deep/ tbody{
                                    /deep/ td{
                                        width: auto !important;
                                    }
                                }
                            }
                        }
                        /deep/.ivu-table-header{
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
            }
        }
        .anv_menu_container{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 30px;
            .anv_menu{
                width: 165px;
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 16px;
                color: #3d4966;
                border: #b8becc 1px solid;
                &.activeStyle{
                    background-color: #03a971;color: #ffffff;
                }
            }
            div:nth-child(1),div:nth-child(2){
                border-right: none;
            }
            div:nth-child(1){
                border-radius: 100px 0px 0px 100px;
            }
            div:nth-child(3){
                border-radius: 0px 100px 100px 0px;
            }
        }
    }
    .pop_up_container{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.5);
        z-index: 999999;
        .pop_up{
            width: 400px;
            height: 230px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .demo-spin-icon-load{
                animation: ani-demo-spin 1s linear infinite;
            }
            @keyframes ani-demo-spin {
                from { transform: rotate(0deg);}
                50%  { transform: rotate(180deg);}
                to   { transform: rotate(360deg);}
            }
            .demo-spin-col{
                position: relative;
                border: 1px solid #eee;
            }
            .demo-spin-col{
                margin-top: 100px;
                /deep/.ivu-spin-main{
                    width: 200px;
                }
            }
        }
    }
}
</style>
