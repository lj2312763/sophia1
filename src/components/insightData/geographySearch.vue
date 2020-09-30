<template>
  <div class="brandSentiment_container">
    <div class="banner_container">
        <div class="text_container">
            <div class="pinpaiTitle">地理  气象  人文</div>
            <div class="pinpaiDesc">专业的全球地理、气象、人文数据，为新能源行业提供全产业链以及全周期的数据服务</div>
            <div class="use_btn_container">
                <div class="one" @click="useFn">功能体验</div>
                <div class="two" @click="useNow">立即使用</div>
                <div class="three" @click="viewTecFile">技术文档</div>
            </div>
        </div>
    </div>

    <div class="shuju_container">
        <div>地理数据</div>
        <div>基于全球地理大数据平台，运用空间统计分析与建模方法，复杂性与系统科学等方法，开展自然灾害评价与风险、地缘关系分析、土地资源健康安全认知与管控等研究工作</div>
    </div>

    <div class="qudao_picter_container">
        <div class="one">
            <div></div>
            <div>海拔</div>
            <div>拥有全球行政区域海拔高度数据，为您提供查询服务。</div>
        </div>
        <div class="two">
            <div></div>
            <div>土壤</div>
            <div>提供专业而准确的土壤墒情信息，辅助农业种植决策，为减灾抗旱提供了重要的基础信息。</div>
        </div>
        <div class="three">
            <div></div>
            <div>地质构造</div>
            <div>提供专业而准确的地址构造信息，辅助工业选址。</div>
        </div>
    </div>

    <div class="shuju_container">
        <div>气象数据</div>
        <div>将气象数据与不同领域资源相融合，开拓交通运输、新能源、农业、移动互联软件开发和服务、公共管理及基于大数据技术的智慧城市、智慧交通、智慧粮食等领域的开发建设中应用</div>
    </div>

    <div class="qixiangshuju_datu">
        <img :src="qixiangImg" alt="" srcset="">
    </div>

    <div class="zhibiao_container">
        <div class="fengli">
            <div></div>
            <div>风力</div>
        </div>
        <div class="wendu">
            <div></div>
            <div>温度</div>
        </div>
        <div class="qiya">
            <div></div>
            <div>气压</div>
        </div>
        <div class="jiangshui">
            <div></div>
            <div>降水</div>
        </div>
    </div>
    <div class="shuju_container">
        <div>人文数据</div>
        <div>人文大数据应用于空间规划方法和技术、居民个体行为决策优化、企业运营决策、政府宏观政策制定与管理等方面的应用方向</div>
    </div>
    <div class="qudao_picter_container1">
        <div class="one1">
            <div></div>
            <div>保护区</div>
        </div>
        <div class="two1">
            <div></div>
            <div>全球交通</div>
        </div>
        <div class="three1">
            <div></div>
            <div>人口密布分布</div>
        </div>
    </div>

    <div class="fun_use_container">
        <div class="function">即刻获得地理、气象、人文能力</div>
        <div class="zixun">快速与我们取得联系，请点击下方的合作咨询</div>
        <div class="use_btn" @click="jump1">合作咨询</div>
    </div>

    <vLogin v-show="isShow" @closeLoginWin="closeDialog"></vLogin>  
  </div>
</template>

<script>
import vLogin from "@/components/login/login";
export default {
  props:{
  },
  data () {
    return {
        qixiangImg:require('../../assets/images/insightData/qixiang.png'),
        isShow:false
    }
  },
  components:{
      vLogin
  },
  mounted(){
      document.documentElement.scrollTop = 0;
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
    useFn(){
        this.$router.push({
            path:'/geograpInfoQuery',
            query:{
                type:2,
            } 
        });
    },
    viewTecFile(){
        this.$router.push({
            path:'/document',
            query:{
                type:2,
                id:3
            }
        });
    },
    useNow(){
        this.isShow=true;
    },
    closeDialog(){
        this.isShow=false;
    }
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
        background: url('../../assets/images/insightData/dili.png') no-repeat center center;
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
                margin-top: 28px;
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
                .two:hover{
                    border: 1px solid #57a3f3;
                    color:#57a3f3;
                }
                .three:hover{
                    border: 1px solid #57a3f3;
                    color:#57a3f3;
                }
                .two,.three{
                    border: 1px solid #FFFFFF;
                    border-radius: 3px; 
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
    .shuju_container{
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
            width: 625px;
            font-size: 14px;
            color: #7A8499;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
        }
    }
    .qudao_picter_container,.qudao_picter_container1{
        display: flex;
        align-items: flex-start;
        width: 1200px;
        height: 477px;
        .one,.two,.three,.one1,.two1,.three1{
            width: 380px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            margin-right: 30px;
            div:nth-child(1){
                width: 380px;
                height: 373px;
            }
            div:nth-child(2){
                font-size: 17px;
                font-weight: bold;
                color:black;
                text-align: justify;
                line-height: 24px;
                margin-top: 10px;
            }
            div:nth-child(3){
                font-size: 14px;
                color: #7A8499;
                letter-spacing: 0;
                text-align: center;
                line-height: 22px;
            }
        }
        .one{
            div:nth-child(1){
                background-image: url('../../assets/images/insightData/haiba.png');
                background-size: 100% 100%;
            }
        }
        .two{
            div:nth-child(1){
                background-image: url('../../assets/images/insightData/turang.png');
                background-size: 100% 100%;
            }
        }
        .three{
            div:nth-child(1){
                background-image: url('../../assets/images/insightData/dizhi.png');
                background-size: 100% 100%;   
            }
        }
        .one1{
            div:nth-child(1){
                background-image: url('../../assets/images/insightData/baohuqu.png');
                background-size: 100% 100%;
            }
        }
        .two1{
            div:nth-child(1){
                background-image: url('../../assets/images/insightData/quanqiu.png');
                background-size: 100% 100%;
            }
        }
        .three1{
            div:nth-child(1){
                background-image: url('../../assets/images/insightData/renkou.png');
                background-size: 100% 100%;   
            }
        }
    }
    .qixiangshuju_datu{
        width: 1200px;
        height: 480px;
        img{
            width: 100%;
            height: 100%;
        }
    }

    .zhibiao_container{
        width: 1200px;
        height: 210px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .fengli,.wendu,.qiya,.jiangshui{
            width: 277px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            div:nth-child(2){
                font-size: 22px;
                color: #121C33;
                text-align: center;
            }
        }
        .fengli{
            div:nth-child(1){
                width: 80px;
                height: 80px;
                background-image: url('../../assets/images/new_index/icon/keshihua.png');
                background-size: 100% 100%;
                margin-bottom: 15px;
            }
        }
        .wendu{
            div:nth-child(1){
                width: 80px;
                height: 80px;
                background-image: url('../../assets/images/new_index/icon/neirong.png');
                background-size: 100% 100%;
                margin-bottom: 15px;
            }
        }
        .qiya{
            div:nth-child(1){
                width:80px;
                height: 80px;
                background-image: url('../../assets/images/new_index/icon/yuyin.png');
                background-size: 100% 100%;
                margin-bottom: 15px;
            }
        }
        .jiangshui{
            div:nth-child(1){
                width: 80px;
                height: 80px;
                background-image: url('../../assets/images/new_index/icon/yingyong.png');
                background-size: 100% 100%;
                margin-bottom: 15px;
            }
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
