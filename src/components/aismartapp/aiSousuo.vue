<template>
<div class="container_search" ref="contentContainer">
    <div class="banner_container" v-if="!ifShowSearchResult">
        <div class="input">
            <input type="text"  v-model="inputText"  placeholder="请输入您想要搜索的内容"  @keyup.enter="aiSearch1"/>
            <div class="button" @click="aiSearch1"><Icon type="ios-search" /> 智能搜索</div>
        </div>
        <div class="commlist_container">
            <div class="commlist_item" v-for="(item,index) in commlistArr" :key="index" @click="searchItem(item)">
                {{item}} 
            </div>
        </div>
    </div>
    <div class="sousuo_container" v-if="ifShowContent">
        <div class="table_container" v-if="ifShowSearchResult">
            <div class="input">
                <input type="text"  placeholder="请输入您想要搜索的内容" v-model="inputText"    @keyup.enter="aiSearch"/>
                <div class="button"  @click="aiSearch"><Icon type="ios-search"/> 智能搜索</div>
            </div>
            <div class="search_container">
                <div class="left">
                    <div class="li" :class="{'active' :option == item.value}" v-for="(item,index) in navMenuArr" :key="index" @click="changeMenu(item)">{{item.name}}</div>
                </div>
                <div class="right">
                    <div class="empty_container" v-if="ifShowEmptyInfo">
                        <div class="img_container">
                            <img :src="emptyImg">
                        </div>
                        <div class="empty_text">
                            抱歉，没有搜索到相关结果。
                        </div>
                    </div>
                    <template   v-if="ifShowguojia">
                        <div class="list country_list" v-for="item in guojiaTableData" :key="item.id" >
                            <div class="book">
                                <img :src="item.thumbImg" alt="">
                            </div>
                            <div class="res_detail">
                                <div class="res_one">
                                    <div class="res_one_title">{{item.standard}}</div>
                                    <div class="res_one_Num">{{item.id}}【{{item.active}}】</div>
                                </div>
                                <div class="res_two">
                                    {{item.title}}
                                </div>
                                <div class="res_three">
                                    <div class="fanwei">
                                        <span class="fanwei_title">【适用范围】</span>
                                        <span class="fanwei_desc">{{item.description}}</span>
                                    </div>
                                    <div class="riqi">
                                        <div class="fabu">
                                                <span class="fabu_title">【发布日期】</span>
                                                <span class="fabu_date">{{item.publishDate}}</span>
                                        </div>
                                        <div class="shishi">
                                                <span class="shishi_title">【实施日期】</span>
                                                <span class="shishi_date">{{item.dealDate}}</span>
                                        </div>
                                        <div class="shishi">
                                                <span class="shishi_title">【所属行业】</span>
                                                <span class="shishi_date">{{item.industryStandard}}</span>
                                        </div>
                                        <div class="zhonguobiaozhun">
                                                <span class="zhonguobiaozhun_title">【中国标准分类】</span>
                                                <span class="zhonguobiaozhun_date" v-html="item.category"></span>
                                        </div>
                                    </div>
                                    <div class="biaozhunfenlei">
                                        <span class="biaozhunfenlei_title">【国际标准分类】</span>
                                        <span class="biaozhunfenlei_desc">{{item.interStandCategory}}</span>
                                    </div>
                                </div>
                                <div class="zhengwen_title">正文前内容</div>
                                <div class="zhengwen_desc" v-html="item.content" ref="zhengwenDesc">
                                </div>
                            </div>
                            <div class="look_detail" @click="zixun">咨询详情</div>
                        </div>
                        <div style="text-align:center;margin: 40px auto;">
                            <Page :total="guojiaTotalNum" :page-size='PageSize' @on-change="changePageGuojia"></Page>
                        </div>
                    </template>
                    <template   v-if="ifShowkeji">
                        <div class="list tech_list" v-for="item in kejiTableData" :key="item.id">
                            <div class="left">
                                <div class="title_bar">
                                    <span class="title">{{item.title}}</span>
                                    <span class="code">{{item.id}}</span>
                                </div>
                                <div class="content">
                                   {{item.description}}
                                </div>
                            </div>
                            <div class="right">
                                <div class="que_btn" @click="zixun">咨询详情</div>
                            </div>
                        </div>
                        <div style="text-align:center;margin: 40px auto;">
                             <Page :total="kejiTotalNum" :page-size='PageSize' @on-change="changePageKeji"></Page>
                        </div>
                    </template>
                    <template   v-if="ifShowzhuanli">
                        <div class="list zl_list" v-for="item in zhuanliData" :key="item.id">
                            <div class="book"><img :src="item.thumbImg" alt=""></div>
                            <div class="res_detail">
                                <div class="res_one">
                                    <div class="res_one_title">{{item.category}}</div>
                                    <div class="res_one_Num">{{item.id}} {{item.title}}</div>
                                    <div class="res_two_Num">{{item.active}}</div>
                                </div>
                                <div class="res_three">
                                    <div class="riqi">
                                        <div class="fabu">
                                                <span class="fabu_title">公开（公告）号：</span>
                                                <span class="fabu_date">{{item.openCode}}</span>
                                        </div>
                                        <div class="shishi">
                                                <span class="shishi_title">公开（公告）日：</span>
                                                <span class="shishi_date">{{item.dealDate}}</span>
                                        </div>
                                        <div class="shishi">
                                                <span class="shishi_title">申请日：</span>
                                                <span class="shishi_date">{{item.publishDate}}</span>
                                        </div>
                                        <div class="zhonguobiaozhun">
                                                <span class="zhonguobiaozhun_title">主分类号：</span>
                                                <span class="zhonguobiaozhun_date">{{item.interStandCategory}}</span>
                                        </div>
                                    </div>
                                    <div class="biaozhunfenlei">
                                        <span class="biaozhunfenlei_title">当前权利人</span>
                                        <span class="biaozhunfenlei_desc">{{item.owner}}</span>
                                    </div>
                                </div>
                                <div class="zhengwen_desc">
                                    <span class="zhengwen_title">【摘要】：</span>
                                    {{item.description}}
                                </div>
                                <div class="look_detail" @click="zixun">咨询详情</div>
                            </div>
                        </div>
                        <div style="text-align:center;margin: 40px auto;">
                           <Page :total="zhuanliTotalNum" :page-size='PageSize' @on-change="changePageZhuanli"></Page>
                        </div>
                    </template>    
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
                orderBy:'',
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
                ifShowContent:true
            }
        },
        updated(){
            let zhengwenDescDom = this.$refs.zhengwenDesc;
            if(zhengwenDescDom){
                for(var j=0;j<zhengwenDescDom.length;j++){
                    let zhengwenDescDomchildren = zhengwenDescDom[j].children || [];
                    for(var i=0;i<zhengwenDescDomchildren.length;i++){
                        zhengwenDescDomchildren[i].style = 'display:block;height: 25px;line-height: 25px;';
                    }
                }
            }
        },
        created(){
          //this.changeMenu() 
        },
        methods:{
            zixun(){
                let routerUrl = this.$router.resolve({
                    path:'/fankui',
                    // query:{
                    //  title:1,
                    //  subTitle:'合作咨询'
                    // }
                });
                window.open(routerUrl.href,'_blank')
            },
            changePageGuojia (val) {
                console.log(val)
                this.pageNum = val;
                this.changeMenu()
            },
            changePageKeji (val) {
                this.pageNum = val;
                this.changeMenu()
            },
            changePageZhuanli (val) {
                this.pageNum = val;
                this.changeMenu()
            },
            aiSearch1(){
                if(!this.inputText){
                    this.$Message.warn('请输入关键词')
                    return;
                }
                this.ifShowSearchResult=true;
                this.changeMenu()
            },
            aiSearch(){
                this.changeMenu()
            },
            changeMenu(item){
                if(item){
                    this.option=item.value;
                }
                //显示隐藏切换
                if(this.option == 1){
                    this.ifShowguojia = true;
                    this.ifShowkeji = false;
                    this.ifShowzhuanli = false;
                }
                else if(this.option == 2){
                    this.ifShowguojia = false;
                    this.ifShowkeji = true;
                    this.ifShowzhuanli = false;
                }
                else if(this.option == 3){
                    this.ifShowguojia = false;
                    this.ifShowkeji = false;
                    this.ifShowzhuanli = true;
                }
                console.log(this.option+"9999999")
                let url='';
                //切换数据获取
                if(this.option == 1){
                     url = window.config.url+'/search/intel/standard';    //POST /api/search/kjcg
                }
                else if(this.option == 2){
                    url = window.config.url+'/search/intel/achievement';    //POST /api/search/kjcg
                }
                else if(this.option == 3){
                    url = window.config.url+'/search/intel/patent';    //POST /api/search/kjcg
                }
                this.ifShowLoading=true;
                this.$axios({
                    url:url,
                    method:'get',
                    params:{
                        keyword:this.inputText,
                        orderBy:this.orderBy,
                        pageIndex:this.pageNum,
                        pageSize: this.PageSize
                    }
                }).then(res=>{
                    this.ifShowLoading=false;
                    if(res.data.code == 200000){
                         console.log(res.data);
                         if(res.data.data.dataList.length<1){
                             this.ifShowEmptyInfo=true;
                         }else{
                             this.ifShowEmptyInfo=false;
                         }
                        if(this.option == 1){
                            this.guojiaTableData =res.data.data.dataList;
                            this.guojiaTotalNum = res.data.data.totalRecords;
                        }
                        else if(this.option == 2){
                            this.kejiTableData = res.data.data.dataList;
                            this.kejiTotalNum = res.data.data.totalRecords;
                        }
                        else if(this.option == 3){
                            this.zhuanliData = res.data.data.dataList;
                            this.zhuanliTotalNum = res.data.data.totalRecords;
                        }
                    }
                }).catch(err=>{
                    this.ifShowLoading=false;
                    console.log(err)
                })
            },
            searchItem(item){
                this.inputText = item;
                this.aiSearch();
                this.ifShowSearchResult=true;
            }
        }
    }
</script>

<style scoped lang='less'>
.container_search{
    width: 100%;
    .banner_container{
        width: 443px;
        margin:auto;
        .input{
            margin-top: 120px;
            display: flex;
            height: 40px;
            border: 1px solid #03A971;
            border-radius: 4px;
            overflow: hidden;
             input{
                flex:1;
                height: 100%;
                padding-left: 15px;
            }
            .button{
                width: 102px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #03A971 ;
                color:#fff;
                font-size: 14px;
                cursor: pointer;
                .ivu-icon{
                    font-size: 18px;
                    margin-right: 2px;
                }
            }
        }
        .commlist_container{
            display: flex;
            margin-top: 10px;
            font-size: 12px;
            color: #03A971;
            .commlist_item{
                cursor: pointer;
                border-right: 1px solid #03A971;
                padding-right: 15px;
                padding-left: 15px;
                &:last-child{
                    border:none;
                }
                &:first-child{
                    padding-left: 0px;
                }
            }
        }
    }
    .sousuo_container{
        margin:auto;
        width: 1200px;
       
        .table_container{
            width: 100%;
            .input{
                width:443px;
                margin-top: 60px;
                margin-left:205px;
                margin-bottom: 35px;
                display: flex;
                height: 40px;
                border: 1px solid #03A971;
                border-radius: 4px;
                overflow: hidden;
                input{
                    flex:1;
                    height: 100%;
                    padding-left: 15px;
                }
                .button{
                    width: 102px;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #03A971 ;
                    color:#fff;
                    font-size: 14px;
                    cursor: pointer;
                    .ivu-icon{
                        font-size: 18px;
                        margin-right: 2px;
                    }
                }
            }
            .search_container{
                width: 100%;
                display: flex;
                .left{
                    width: 205px;
                    .li{
                        font-size: 16px;
                        color: #121C33;
                        margin-bottom: 20px;
                        padding-left: 10px;
                        cursor: pointer;
                        &.active{
                            border-left: 3px solid #03A971;
                            color:#03A971;
                        }
                    }
                }
                .right{
                    flex:1;
                     .empty_container{
                          width: 100%;
                        .img_container{
                            width:200px;
                            margin:auto;
                            margin-bottom: 20px;
                            margin-top: 20px;
                            img{
                                width: 100%;
                                display: block;
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
                    .list{
                        border: 1px solid #EBECF0;
                        border-radius: 4px;
                        margin-bottom: 20px;
                        padding:24px 40px;
                        &.tech_list{
                            height: 156px;
                            display: flex;
                            box-sizing: border-box;
                            .left{
                                width: 750px;
                                .title_bar{
                                    margin-bottom: 13px;
                                    .title{
                                        font-size: 14px;
                                        color: #3D4966;
                                        font-weight: bold;
                                    }
                                    .code{
                                        margin-left: 10px;
                                        font-size: 12px;
                                        color: #3D4966;
                                    }
                                }
                                .content{
                                    display: -webkit-box;
                                    -webkit-line-clamp: 3;
                                    -webkit-box-orient: vertical;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                }
                            }
                            .right{
                                flex:1;
                                display: flex;
                                justify-content: flex-end;
                                align-items: center;
                                .que_btn{
                                    height: 36px;
                                    width:120px;
                                    border: 1px solid #03A971;
                                    border-radius: 3px;
                                    color:#03A971;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                     cursor: pointer;
                                }
                            }
                        }
                        &.zl_list{
                            height: 242px;
                            display: flex;
                            box-sizing: border-box;
                            align-items: center;
                            position: relative;
                            .book{
                                width: 67px;
                                margin-right: 20px;
                                border: 1px solid #B8BECC;
                                img{
                                    width: 100%;
                                    display: block;
                                }
                            }
                            .res_detail{
                                flex:1;
                                height: 100%;
                                .res_one{
                                    width: 100%;
                                    margin-bottom: 16px;
                                    display: flex;
                                    align-items: center;
                                    .res_one_title{
                                        background: #03A971;
                                        font-family: PingFangSC-Regular;
                                        font-size: 14px;
                                        color: #FFFFFF;
                                        letter-spacing: 0;
                                        text-align: center;
                                        margin-right: 10px;
                                        padding: 2px 4px;
                                    }
                                    .res_one_Num{
                                        font-family: PingFangSC-Medium;
                                        font-size: 14px;
                                        color: #3D4966;
                                        letter-spacing: 0;
                                    }
                                    .res_two_Num{
                                        font-family: PingFangSC-Regular;
                                        font-size: 12px;
                                        color: #03A971;
                                        letter-spacing: 0;
                                        text-align: center;
                                        border:1px solid #03A971;
                                        margin-left: 10px;
                                        padding:2px 4px;
                                    }
                                }
                                .res_three{
                                    width: 100%;
                                    .riqi{
                                        width: 100%;
                                        display: flex;
                                        align-items: center;
                                        font-family: PingFangSC-Regular;
                                        font-size: 12px;
                                        color: #00363F;
                                        letter-spacing: 0;
                                        line-height: 24px;
                                        .fabu,.shishi{
                                            margin-right: 10px;
                                        }
                                        .fabu,.shishi,.zhonguobiaozhun{
                                            .fabu_title,.shishi_title,.zhonguobiaozhun_title{
                                                font-weight: 550;
                                            }
                                        }
                                    }
                                    .biaozhunfenlei{
                                        width: 100%;
                                        text-align: left;
                                        font-family: PingFangSC-Regular;
                                        font-size: 12px;
                                        color: #00363F;
                                        letter-spacing: 0;
                                        line-height: 24px;
                                        .biaozhunfenlei_title{
                                            font-weight: 550;
                                        }
                                    }
                                }
                                .zhengwen_desc{
                                    width: 100%;
                                    text-align: left;
                                    font-family: PingFangSC-Regular;
                                    font-size: 12px;
                                    color: #00363F;
                                    letter-spacing: 0;
                                    line-height: 24px;
                                    overflow: hidden;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    display: -webkit-box;
                                    .zhengwen_title{
                                        font-weight: 550;
                                        font-size: 12px;
                                        color: #00363F;
                                    }
                                }
                                .look_detail{
                                    width: 120px;
                                    height: 36px;
                                    border: 1px solid #03A971;
                                    border-radius: 3px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: #03A971;
                                    position: absolute;
                                    bottom:20px;
                                    right: 40px;
                                    cursor: pointer;
                                }
                               
                            }
                            
                        }
                        &.country_list{
                            height: 272px;
                            display: flex;
                            box-sizing: border-box;
                            align-items: center;
                            position: relative;
                            overflow: hidden;
                            .book{
                                width: 67px;
                                margin-right: 20px;
                                border: 1px solid #B8BECC;
                                img{
                                    width: 100%;
                                    display: block;
                                }
                            }
                            .res_detail{
                                flex:1;
                                height: 100%;
                                .res_one{
                                    width: 100%;
                                    margin-bottom: 10px;
                                    display: flex;
                                    align-items: center;
                                    .res_one_title{
                                        background: #03A971;
                                        font-family: PingFangSC-Regular;
                                        font-size: 14px;
                                        color: #FFFFFF;
                                        letter-spacing: 0;
                                        text-align: center;
                                        margin-right: 10px;
                                        padding: 2px 4px;
                                    }
                                    .res_one_Num{
                                        font-family: PingFangSC-Medium;
                                        font-size: 14px;
                                        color: #3D4966;
                                        letter-spacing: 0;
                                    }
                                }
                                .res_two{
                                    width: 100%;
                                    overflow: hidden;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    font-family: PingFangSC-Medium;
                                    font-size: 14px;
                                    color: #3D4966;
                                    letter-spacing: 0;
                                    text-align: left;
                                    margin-bottom: 16px;
                                    font-weight: 550;
                                }
                                .res_three{
                                    width: 100%;
                                    .fanwei{
                                        width: 100%;
                                        text-align: left;
                                        font-family: PingFangSC-Regular;
                                        font-size: 12px;
                                        color: #00363F;
                                        letter-spacing: 0;
                                        line-height: 24px;
                                        overflow: hidden;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 2;
                                        .fanwei_title{
                                            font-weight: 550;
                                        }
                                    }
                                    .riqi{
                                        width: 100%;
                                        display: flex;
                                        align-items: center;
                                        font-family: PingFangSC-Regular;
                                        font-size: 12px;
                                        color: #00363F;
                                        letter-spacing: 0;
                                        line-height: 24px;
                                        .fabu,.shishi{
                                            margin-right: 10px;
                                        }
                                        .fabu,.shishi,.zhonguobiaozhun{
                                            .fabu_title,.shishi_title,.zhonguobiaozhun_title{
                                                font-weight: 550;
                                            }
                                        }
                                    }
                                    .biaozhunfenlei{
                                        width: 100%;
                                        text-align: left;
                                        font-family: PingFangSC-Regular;
                                        font-size: 12px;
                                        color: #00363F;
                                        letter-spacing: 0;
                                        line-height: 24px;
                                        .biaozhunfenlei_title{
                                            font-weight: 550;
                                        }
                                    }
                                }
                                .zhengwen_title,.zhengwen_desc{
                                    text-align: left;
                                    font-family: PingFangSC-Regular;
                                    font-size: 12px;
                                    color: #00363F;
                                    letter-spacing: 0;
                                    overflow: hidden;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 1;
                                    width: 620px;
                                    height: 22px;
                                    display: flex;
                                    flex-wrap: wrap;
                                }
                                .zhengwen_title{
                                    font-weight: 550;
                                }
                            }
                            .look_detail{
                                width: 120px;
                                height: 36px;
                                border: 1px solid #03A971;
                                border-radius: 3px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: #03A971;
                                position: absolute;
                                bottom:20px;
                                right: 40px;
                                cursor: pointer;
                            }
                        }
                        
                    }
                }
            }

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
