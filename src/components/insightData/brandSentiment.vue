<template>
  <div class="brandSentiment_container">
    <div class="banner_container">
        <div class="text_container">
            <div class="pinpaiTitle">品牌洞察</div>
            <div class="pinpaiDesc">利用大数据工具，帮助品牌方快速知己知彼。</div>
            <div class="use_btn_container">
                <div class="one" @click="fnExperice">功能体验</div>
                <div class="two" @click="useNow">立即使用</div>
                <div class="three" @click="viewTecFile">技术文档</div>
            </div>
        </div>
    </div>

    <div class="qudao_container">
        <div>渠道监控</div>
        <div>管渠道，管价格，管品牌形象</div>
    </div>

    <vBrandfn :brandFnArr='qudaoArrData' :fnType='1'></vBrandfn>

    <div class="qudao_container">
        <div>行业分析</div>
        <div>看行业、看对手、看自己</div>
    </div>

    <vBrandfn :brandFnArr='hangyeArrData' :fnType='2'></vBrandfn>

    <div class="qudao_container">
        <div>消费者聆听</div>
        <div>收集顾客评论，提炼价值</div>
    </div>

    <vBrandfn :brandFnArr='xiaofeizheArrData' :fnType='3'></vBrandfn>

    <div class="fun_use_container">
        <div class="function">即刻获得品牌洞察能力</div>
        <div class="zixun">快速与我们取得联系，请点击下方的合作咨询</div>
        <div class="use_btn" @click="jump1">合作咨询</div>
    </div>

    <vLogin v-show="isShow" @closeLoginWin="closeDialog"></vLogin>   
  </div>
</template>

<script>
import vBrandfn from './brandFn'
import vLogin from "@/components/login/login";
export default {
  name:'brandSentiment',
  data () {
    return {
        qudaoArrData:[
            {
                title:'价格、标题、授权等监测',
                desc:'监测电商平台是否乱价，标题是否违规，店铺是否授权等满足多样化巡检场景需求'
            },
            {
                title:'多维度汇总经营信息',
                desc:'按照小时/天/周/月等多种维度巡检结果汇总分析，突出巡检要点，保留违规证据，通过报告等多种形式，满足客户需求。'
            },
            {
                title:'高频监测预警违规行为',
                desc:'24小时高频无遗漏的巡检违规行为，一旦发现价格、标题、授权信息等违规行为，可以通过微信、邮件等方式预警。'
            },
            {
                title:'多种数据导出方式',
                desc:'支持SaaS、API接口、Excel表格、分析报告等多种数据导出方式。'
            }
        ],
        hangyeArrData:[
            {
                title:'7*24小时高频监测',
                desc:'7×24小时高频无遗漏地为您提供实时、专业、精准的电商零售数据监测和分析服务，并根据客户定制需求，定时输出行业数据，为品牌、电商运营提供安全保障。'
            },
            {
                title:'覆盖全网电商平台',
                desc:'覆盖全网主流电商平台，通过对电商平台数据抓取，全面了解各产品在电商平台销售状况，帮助企业全面了解各平台在不同品类上的销售能力、影响因素等，并根据相应维度制成报告，为您在决策的时候提供强有力的支持。'
            },
            {
                title:'多维度，多角度数据分析',
                desc:'可以根据品类、平台、品牌等维度，进行全面的数据分析，可以将数据细化到SKU级别，为品牌商提供行业发展趋势、竞品分析与跟踪、渠道表现等数据分析服务。'
            },
            {
                title:'支持特色定制报告',
                desc:'可以根据客户需求定制相应服务，如电商平台，数据维度、报告内容等，此外还可以帮助客户制作报告，维权等服务。'
            }
        ],
        xiaofeizheArrData:[
            {
                title:'覆盖主流电商和社交平台',
                desc:'主流电商平台和微信、微博、贴吧等社交媒体的评论数量、分布、类型等明细查看。'
            },
            {
                title:'多维度情感划分差评',
                desc:'对于产品或服务评论按照产品、服务等维度集中处理，并自动划分成好评、中评和差评，帮助企业了解产品状况和服务情况，提高企业服务质量和帮助产品进行迭代更新。'
            },
            {
                title:'评论概况一览无余',
                desc:'差评数、差评率、处理率，以及产品评论等，分多种状况展示，方便观看差评数、差评率、处理率，以及产品评论等，分多种状况展示，方便观看。'
            },
            {
                title:'提升产品用户体验、感受',
                desc:'多个平台差评在后台统一查看、处理，提高电商人员工作效率。'
            }
        ],
        isShow:false,
    }
  },
  methods:{
    fnExperice(){
    this.$router.push({
        path:'/brandSentConsumerListen',
        query:{
            type:2
        }
    });
    },
    viewTecFile(){
    this.$router.push({
        path:'/document',
        query:{
            type:2,
            id:2
        }
    });
    },
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
    closeDialog(){
        this.isShow=false;
    }
  },
  components:{
      vBrandfn,
      vLogin
  }
}
</script>

<style scoped lang='less'>
.brandSentiment_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .banner_container{
        width: 100%;
        height: 450px;
        position: relative;
        background: url('../../assets/images/insightData/pinpai.png') no-repeat center center;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 125px;
        padding-bottom: 223px;
        box-sizing: border-box;
        .text_container{
            width: 1200px;
            .pinpaiTitle{
                margin-bottom: 20px;
                font-size: 36px;
                color: #FFFFFF;
            }
            .pinpaiDesc{
                font-size: 16px;
                color: #FFFFFF;
                line-height: 32px;
            }
            .use_btn_container{
                display: flex;
                align-items: center;
                margin-top: 60px;
                .one,.two,.three{
                    padding: 8px 32px;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #FFFFFF;
                }
                .one{
                    background: #03A971;
                    border-radius: 3px;
                    margin-right: 40px;
                }
                .two,.three{
                    border: 1px solid #FFFFFF;
                    border-radius: 3px;
                    
                }
                .two:hover{
                    border: 1px solid #57a3f3;
                    color:#57a3f3;
                }
                .three:hover{
                    border: 1px solid #57a3f3;
                    color:#57a3f3;
                }
                .two{
                    margin-right: 40px;
                }
                .one,.two,.three:hover{
                    cursor: pointer;
                }
            }
        }
    }
    .qudao_container{
        width: 1200px;
        height: 204px;
        padding-top: 80px;
        padding-bottom: 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        div:nth-child(1){
            font-size: 36px;
            color: #121C33;
            line-height: 48px;
            margin-bottom: 5px;
        }
        div:nth-child(2){
            font-size: 14px;
            color: #7A8499;
        }
    }
    .fun_use_container{
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top: 80px;
        padding-bottom: 80px;
        .function{
            font-size: 36px;
            color: #121C33;
            // margin-bottom: 40px;
        }
        .zixun{
            color: #7A8499;
            margin: 10px 0 25px 0;
            font-size: 20px;
            text-align: center;
        }
        .use_btn{
            width: 140px;
            height: 42px;
            background: #03A971;
            border-radius: 3px;
            line-height: 42px;
            text-align: center;
            font-size: 16px;
            color: #FFFFFF;
        }
    }
}
</style>
