<template>
  <div class="obser_star_list_container">
    <div class="header_container" v-show="ifShowEcharts">
        <div class="header_menu">
            {{leftMenuText}} > {{rightPointMenuText}}
        </div>
        <div class="chart_stati">
            <img :src="chart_img" alt="">
        </div>
        <div class="desc_btn_container">
            <div class="desc_btn" @click="viewDetail">查看详情</div>
        </div>
    </div>

    <!--上市公司数组件-->
    <div class="content_container">
        <vListedCompan :obserStarData='obserStarListArr' :totalNum='totalNum' :pageSize='pageSize' @updateListData='updateListData'></vListedCompan>
    </div>
  </div>
</template>

<script>
import vListedCompan from '../listedCompan/listedCompan';
export default {
    name:'obserStarList',
    data(){
        return {
            ifShowEcharts:true,
            leftMenuText:'',
            rightPointMenuText:'',
            navType:3,
            chart_img:require('@/assets/images/obserStar/chart.jpg'),
            obserStarListArr:[],
            obserShipinArr:[
                {
                    title:'UCF Sport Action 运动视频数据',
                    desc:'UCF体育数据集包括从各种体育运动中收集的一系列动作，这些动作通常在广播电视频道（如BBC和ESPN）上播出。该集合代表了各种场景和视点中的自然行动池。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'1.66G'
                    }
                },
                {
                    title:'UCF101 Action Recognition Data Set/UCF101动作识别数据集',
                    desc:'UCF101是从13320个YouTube视频中，收集到的具有101个操作类别的真实动作识别数据集。此数据集是UCF50数据集的扩展，具有50个操作类别。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'6G'
                    }
                },
                {
                    title:'Traffic Lights Recognition (TLR) public benchmark/交通信号灯视频数据',
                    desc:'Traffic Lights Recognition (TLR) 是一个交通信号灯识别的视频数据，在真实的道路上采集的交通信号灯视频，分辨率为 640x480，由法国一所大学提供。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'1.77G'
                    }
                },
                {
                    title:'HMDB 人类动作视频',
                    desc:'HMDB 是一个人类动作视频数据，包含 6849段 视频剪辑，51个 人类动作类别，每类动作至少包含 101段视频剪辑。动作主要包括：面部动作、面部操作、身体动作、交互动作、人体动作等类别',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'3.86G'
                    }
                },
                {
                    title:'Intel Image Classification/英特尔图像分类数据集',
                    desc:'数据主要是世界各地自然风光的图像数据。此数据集包含大约25,000张大小为150x150的图像，分布在6个类别中。              ',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'840M'
                    }
                },
                {
                    title:'ETH Predestrian Dataset/ETH行人数据视频',
                    desc:'ETH Pedestrian dataset 是一个包含行人的视频数据，可用以进行行人检测和识别等机器视觉任务。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'9.83G'
                    }
                }
            ],
            obserTupianArr:[
                {
                    title:'斯坦福汽车数据集',
                    desc:'斯坦福汽车数据集包含196类汽车的16,185张图像。数据被分为8,144个训练图像和8,041个测试图像，其中每个类别已大致分为50-50个分割。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'2G'
                    }
                },
                {
                    title:'Caltech 256 Image Dataset/加州理工256图像数据集',
                    desc:'该数据集中有30,607张图像，涵盖257个对象类别。对象类别极其多样，从蚱hopper到音叉不等。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'2.12G'
                    }
                },
                {
                    title:'IMDB-WIKI 500k 人脸图像、年龄性别数据',
                    desc:'数据集包含名人人脸图像、年龄、性别等的数据，总计 524230 张名人人脸图像及对应的年龄和性别。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'10G'
                    }
                },
                {
                    title:'人脸图像数据集',
                    desc:'1500张人脸图像，包含不同区域的多个面部图像。数据集包含不同区域的多个面部图像。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'294M'
                    }
                },
                {
                    title:'Intel Image Classification/英特尔图像分类数据集',
                    desc:'数据主要是世界各地自然风光的图像数据。此数据集包含大约25,000张大小为150x150的图像，分布在6个类别中。              ',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'352M'
                    }
                },
                {
                    title:'字符识别数据集',
                    desc:'自然图像中的（0-9，A-Z，a-z）字符识别数据集包括：64节（0-9，AZ，az）。每个单个字符数据集有目录树。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'188M'
                    }
                }
            ],
            obserWenbenArr:[
                {
                    title:'中国空气质量数据集data2424',
                    desc:'中国各地空气质量检测数据，具体城市以及对于的监测点可以看文件中的站点列表。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'1.2G'
                    }
                },
                {
                    title:'Cloud_Theme_Click云主题点击数据',
                    desc:'数据集为淘宝APP中云主题场景的用户点击日志，用以对用户在多个不同场景、以及新场景下的推荐进行优化验证。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'1.65G'
                    }
                },
                {
                    title:'Product Description Dataset / 商品描述文案数据集',
                    desc:'数据集包含两份数据如下：item_desc_dataset.txt（商品文案描述数据）；content_tag_dataset.txt（用户点击内容的用户类型摘要）',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'760M'
                    }
                },
                {
                    title:'20new新闻数据集',
                    desc:'20news是一个英文新闻数据集，包含 20个 类别共 20000篇 新闻文档，可用以进行文档分类和自然语言处理等任务。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'95.3M'
                    }
                },
                {
                    title:'携程房型产品用户行为数据集',
                    desc:'数据主要包含以下几个部分：用户数据、酒店数据、房型数据,可以根据在用户的历史信息，挖掘出用户对于某些房型偏好',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'506M'
                    }
                },
                {
                    title:'OCR-DAS-DATASE/密集不规则文本行数据集',
                    desc:'目前的数据集包含很少密集和任意形状的文本，这些文本经常出现在商品细节图像上。密度来自于有限的引入空间，而不规则则来自于易起皱的包装。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'351M'
                    }
                }
            ],
            obserYuyinArr:[
                {
                    title:'Mozilla语音数据集',
                    desc:'288人进行标准录音的综合中文语音数据集，总验证时长达11小时，可用于中文语音机器学习训练。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'358M'
                    }
                },
                {
                    title:'data1784中文语音库',
                    desc:'1784名志愿者贡献的中文语音数据，总验证时长超过10小时，可用于中文语音算法训练。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'342M'
                    }
                },
                {
                    title:'美国CA＆NV的禽声',
                    desc:'该数据集包含来自美国加利福尼亚州和内华达州的记录子集，包括每个物种均衡数量的样本。记录按物种标记，包含呼叫类型的非标准化标签。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'1.31G'
                    }
                },
                {
                    title:'心跳声音-从听诊器音频分类心跳异常',
                    desc:'该数据集最初用来对心跳声音进行分类。数据是通过IOS程序从公众那里获得的数据，以及使用数字听诊器DigiScope的临床试验数据。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'152M'
                    }
                },
                {
                    title:'DARPA TIMIT连续语音语料库',
                    desc:'TIMIT可用于获取语音知识以及开发和评估自动语音识别系统。TIMIT共包含6300个句子，来自美国8个主要方言地区的630位讲话者每人说10个句子。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'1G'
                    }
                },
                {
                    title:'英文同声传异数据竞赛数据',
                    desc:'该数据集是AI Challenger 全球AI挑战赛中英文同声传译竞赛的数据。',
                    date:{
                        update:'2020-02-11',
                        downLoad:571,
                        invok:'1G'
                    }
                }
            ],
            pageClass:'pageClass',
            totalNum:0,
            pageSize:10,
        }
    },
    methods:{
        updateListData(arg){
            this.obserStarListArr = arg[0];
            this.totalNum = arg[1];
        },
        viewDetail(){
            var dataType = this.$route.query.dataType;
            var pointType = this.$route.query.pointType;
            var subTitleCode = this.$route.query.subTitleCode;
            var subTitleName = this.$route.query.subTitleName
            if(dataType == 1){
                this.$router.push({
                    path:'/obserStarPoliticDetail',
                    query:{
                        type:3,
                        parentTitle:2,
                        subTitleCode:subTitleCode,
                        subTitleName:subTitleName
                    }
                });
            }
            else if(dataType == 2){
                this.$router.push({
                    path:'/obserStarLiveDetail',
                    query:{
                        type:3,
                        parentTitle:3,
                        subTitleCode:subTitleCode,
                        subTitleName:subTitleName
                    }
                });
            }
            else if(dataType == 3){
                this.$router.push({
                    path:'/obserStarEconoDetail',
                    query:{
                        type:3,
                        parentTitle:4,
                        subTitleCode:subTitleCode,
                        subTitleName:subTitleName
                    }
                });
            }
            else if(dataType == 4){
                this.$router.push({
                    path:'/obserStarCulturDetail',
                    query:{
                        type:3,
                        parentTitle:1,
                        subTitleCode:subTitleCode,
                        subTitleName:subTitleName
                    }
                });
            }
        }
    },
    components:{
        vListedCompan,
    },
    mounted(){
        var dataType = this.$route.query.dataType;
        var pointType = this.$route.query.pointType;
        var rightPointMenuText = this.$route.query.subTitleName
        if(dataType == 1){
            this.leftMenuText = '政治';
            this.rightPointMenuText = rightPointMenuText;
        }
        else if(dataType == 2){
            this.leftMenuText = '民生';
            this.rightPointMenuText = rightPointMenuText;
        }
        else if(dataType == 3){
            this.leftMenuText = '经济';
            this.rightPointMenuText = rightPointMenuText;
        }
        else if(dataType == 4){
            this.leftMenuText = '文化';
            this.rightPointMenuText = rightPointMenuText;
        }
        else if(dataType == 5){
            this.ifShowEcharts = false;
            var baseUrl = window.config.url+'';
            let category="";
            if(pointType == 0){
                 category="视频"
            }else if(pointType == 1){
                 category="图像"
            }else if(pointType == 2){
                 category="文本"
            }else if(pointType == 3){
                 category="语音"
            }
            this.$axios({
                method: "get",
                url: baseUrl + "/insight/algorithm/listAlgorithmDataset",
                params: {
                    "category":category
                }
            }).then(res=>{
                if(res.status == 200){
                    var videoList = res.data.data;
                    var totalNum = videoList.totalNum;  
                    this.obserStarListArr = videoList.data;
                    this.totalNum = totalNum;
                }
            }).catch(err=>{
                console.log(err)
            });
        }
    }
}
</script>

<style scoped lang='less'>
.header_container{
    width: 100%;
    background-image: url('../../assets/images/obserStar/chart_bg_img.png');
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .header_menu{
        margin-top: 10px;
        width: 1200px;
        height: 60px;
        line-height: 60px;
        color: #FFFFFF;
        font-size: 16px;
    }
    .chart_stati{
        width: 1200px;
        height: 432px;
        padding-top: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 98%;
            height: 100%;
        }
    }
    .desc_btn_container{
        width: 1200px;
        height: 123px;
        padding-top: 37px;
        padding-bottom: 50px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        .desc_btn{
            width: 140px;
            height: 36px;
            background: #03A971;
            border-radius: 3px;
            font-size: 16px;
            color: #FFFFFF;
            text-align: center;
            line-height: 36px;
            :hover{
                cursor: pointer;
            }
        }
    }
}
.content_container{
    width: 100%;
    padding-top: 83px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}
.page_container{
    margin-bottom:40px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    .page{
        width: 1200px;
        display: flex;
        justify-content: center;
        .pageClass{
            width: 60%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            li{
                background-color: yellow !important;
                .active{
                    background-color: #03A971 !important;
                }
            }
        }
    }
}
</style>
