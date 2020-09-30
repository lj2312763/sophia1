<template>
  <div class="obser_star_list_container">

    <!--头部banner图-->
    <div class="banner">
      <div class="banner_contant">
        <div class="left">
          <div class="desc">
            <div class="desc1">全行业大数据系统</div>
            <div class="desc2">分析和预测</div>
          </div>
        </div>
        <div class="right">
          <img :src="bannerimg" alt="" srcset="">
        </div>
      </div>
    </div>

    <!--内容数据展示区域-->
    <div class="data_show_container">
        <div class="data_show">
            <div class="left">
                <div class="political" @click="goShowData(0)">
                    <div class="political_left_line" v-show="ifshow_poli_line"></div>
                    <div class="political_right" ref="poli">政治数据</div>
                </div>
                <div class="Liveli_hood"  @click="goShowData(1)">
                    <div class="Liveli_hood_left_line" v-show="ifshow_liveli_line"></div>
                    <div class="Liveli_hood_right" ref="liveli">民生数据</div>
                </div>
                <div class="economic"  @click="goShowData(2)">
                    <div class="economic_left_line" v-show="ifshow_econo_line"></div>
                    <div class="economic_right" ref="econo">经济数据</div>
                </div>
                <div class="culture"  @click="goShowData(3)">
                    <div class="culture_left_line" v-show="ifshow_culture_line"></div>
                    <div class="culture_right" ref="culture">文化数据</div>
                </div>
                <div class="yangben"  @click="goShowData(4)">
                    <div class="yangben_left_line" v-show="ifshow_yangben_line"></div>
                    <div class="yangben_right" ref="yangben">训练数据</div>
                </div>
            </div>
            <div class="right">
                <vShowData :showData='obserShowData'></vShowData>
            </div>
        </div>
    </div>
    

  </div>
</template>

<script>
import vShowData from './obserStarDataShow';
export default {
    data(){
        return {
            bannerimg:require('@/assets/images/obserStar/obserDataBanner.png'),
            ifshow_poli_line:false,
            ifshow_liveli_line:false,
            ifshow_econo_line:false,
            ifshow_culture_line:false,
            ifshow_yangben_line:false,
            obserShowData:{},
            navType:3,
            politicalData:{
                title:'政治数据',
                desc:'提供政府机构与社会团体、环境与资源等政治类数据搜索以及数据可视化服务。',
                dataType:1,
                contArr:[]
            },
            liveliData:{
                title:'民生数据',
                desc:'提供医疗、社保、就业、安全、交通等民生类数据搜索以及数据可视化服务。',
                dataType:2,
                contArr:[]    
            },
            econoData:{
                title:'经济数据',
                desc:'提供信用、财税、消费、房屋等经济类数据搜索以及数据可视化服务',
                dataType:3,
                contArr:[]    
            },
            cultureData:{
                title:'文化数据',
                desc:'提供旅游、文体、教育、宗教、饮食等文化类数据搜索以及数据可视化服务。',
                dataType:4,
                contArr:[]    
            },
            yangbenData:{
                title:'训练数据',
                desc:'提供用于视频、图像、文本、语音算法训练的开源数据集',
                dataType:5,
                contArr:[
                    {
                        img:require('@/assets/images/new_index/icon/neirong.png'),
                        intro:'视频数据集'
                    },
                    {
                        img:require('@/assets/images/new_index/icon/keshihua.png'),
                        intro:'图像数据集'
                    },
                    {
                        img:require('@/assets/images/new_index/icon/jiqi.png'),
                        intro:'文本数据集'
                    },
                    {
                        img:require('@/assets/images/new_index/icon/tuijian.png'),
                        intro:'语音数据集'
                    }
                ]    
            },
            imgArr:[
                require('@/assets/images/new_index/icon/dashuju.png'),
                require('@/assets/images/new_index/icon/jiqi.png'),
                require('@/assets/images/new_index/icon/keshihua.png'),
                require('@/assets/images/new_index/icon/neirong.png'),
                require('@/assets/images/new_index/icon/qukuailian.png'),
                require('@/assets/images/new_index/icon/yingyong.png'),
                require('@/assets/images/new_index/icon/wenzi.png'),
                require('@/assets/images/new_index/icon/yuyin.png'),
                require('@/assets/images/new_index/icon/tuijian.png'),
            ]
        }
    },
    components:{
        vShowData,
    },
    methods:{
        goShowData(num){
            var baseUrl = window.config.url+''; 
            var that = this;
            if(num == 0){
                this.ifshow_poli_line = true;
                this.ifshow_liveli_line = false;
                this.ifshow_econo_line=false;
                this.ifshow_culture_line=false;
                this.ifshow_yangben_line = false;
                var liveliActive = this.$refs.liveli.getAttribute('class');
                var econoActive = this.$refs.econo.getAttribute('class');
                var cultureActive = this.$refs.culture.getAttribute('class');
                var yangbenActive = this.$refs.yangben.getAttribute('class');
                if(liveliActive == 'yes_active'){
                    this.$refs.liveli.setAttribute('class','no_active');
                }
                if(econoActive == 'yes_active'){
                    this.$refs.econo.setAttribute('class','no_active');
                }
                if(cultureActive == 'yes_active'){
                    this.$refs.culture.setAttribute('class','no_active');
                }
                if(yangbenActive == 'yes_active'){
                    this.$refs.yangben.setAttribute('class','no_active');
                }
                this.$refs.poli.setAttribute('class','yes_active');
                that.politicalData.contArr = []; //清理缓存
                this.$axios({
                    method: "post",
                    url: baseUrl + "/stargaze/stargazaMenu/getMenuList",
                    params: {
                        parentTitle:2
                    }
                }).then(res => {
                    if(res.status == 200){
                        var menuTextArr = res.data.data;
                        console.log(menuTextArr);
                        for(var i = 0; i < menuTextArr.length;i++){
                            that.politicalData.contArr.push({
                                img:this.imgArr[parseInt(Math.random()*this.imgArr.length)],
                                intro:menuTextArr[i].subTitleName,
                                subTitleCode:menuTextArr[i].subTitleCode,
                                subTitleName:menuTextArr[i].subTitleName,
                                url:menuTextArr[i].thirdBiPage,
                            });
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
                this.obserShowData = that.politicalData;
            }
            else if(num == 1){
                this.ifshow_poli_line = false;
                this.ifshow_liveli_line = true;
                this.ifshow_econo_line=false;
                this.ifshow_culture_line=false;
                this.ifshow_yangben_line = false;
                var poliActive = this.$refs.poli.getAttribute('class');
                var econoActive = this.$refs.econo.getAttribute('class');
                var cultureActive = this.$refs.culture.getAttribute('class');
                var yangbenActive = this.$refs.yangben.getAttribute('class');
                if(poliActive == 'yes_active'){
                    this.$refs.poli.setAttribute('class','no_active');
                }
                if(econoActive== 'yes_active'){
                    this.$refs.econo.setAttribute('class','no_active');
                }
                if(cultureActive== 'yes_active'){
                    this.$refs.culture.setAttribute('class','no_active');
                }
                if(yangbenActive== 'yes_active'){
                    this.$refs.yangben.setAttribute('class','no_active');
                }
                this.$refs.liveli.setAttribute('class','yes_active');
                that.liveliData.contArr = []; //清理缓存
                this.$axios({
                    method: "post",
                    url: baseUrl + "/stargaze/stargazaMenu/getMenuList",
                    params: {
                        parentTitle:3
                    }
                }).then(res => {
                    if(res.status == 200){
                        var menuTextArr = res.data.data;
                        console.log(menuTextArr);
                        for(var i = 0; i < menuTextArr.length;i++){
                            that.liveliData.contArr.push({
                                img:this.imgArr[parseInt(Math.random()*this.imgArr.length)],
                                intro:menuTextArr[i].subTitleName,
                                subTitleCode:menuTextArr[i].subTitleCode,
                                subTitleName:menuTextArr[i].subTitleName,
                                url:menuTextArr[i].thirdBiPage,
                            });
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
                this.obserShowData = that.liveliData;
            }
            else if(num == 2){
                this.ifshow_poli_line = false;
                this.ifshow_liveli_line = false;
                this.ifshow_econo_line=true;
                this.ifshow_culture_line=false;
                this.ifshow_yangben_line = false;
                var poliActive = this.$refs.poli.getAttribute('class');
                var LiveliActive = this.$refs.liveli.getAttribute('class');
                var cultureActive = this.$refs.culture.getAttribute('class');
                var yangbenActive = this.$refs.yangben.getAttribute('class');
                if(poliActive == 'yes_active'){
                    this.$refs.poli.setAttribute('class','no_active');
                }
                if(LiveliActive== 'yes_active'){
                    this.$refs.liveli.setAttribute('class','no_active');
                }
                if(cultureActive== 'yes_active'){
                    this.$refs.culture.setAttribute('class','no_active');
                }
                if(yangbenActive== 'yes_active'){
                    this.$refs.yangben.setAttribute('class','no_active');
                }
                this.$refs.econo.setAttribute('class','yes_active');
                that.econoData.contArr = []; //清理缓存
                this.$axios({
                    method: "post",
                    url: baseUrl + "/stargaze/stargazaMenu/getMenuList",
                    params: {
                        parentTitle:4
                    }
                }).then(res => {
                    if(res.status == 200){
                        var menuTextArr = res.data.data;
                        for(var i = 0; i < menuTextArr.length;i++){
                            that.econoData.contArr.push({
                                img:this.imgArr[parseInt(Math.random()*this.imgArr.length)],
                                intro:menuTextArr[i].subTitleName,
                                subTitleCode:menuTextArr[i].subTitleCode,
                                subTitleName:menuTextArr[i].subTitleName,
                                 url:menuTextArr[i].thirdBiPage,
                            });
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
                this.obserShowData = that.econoData;
            }
            else if(num == 3){
                this.ifshow_poli_line = false;
                this.ifshow_liveli_line = false;
                this.ifshow_econo_line=false;
                this.ifshow_culture_line=true;
                this.ifshow_yangben_line = false;
                var poliActive = this.$refs.poli.getAttribute('class');
                var LiveliActive = this.$refs.liveli.getAttribute('class');
                var econoActive = this.$refs.econo.getAttribute('class');
                var yangbenActive = this.$refs.yangben.getAttribute('class');
                if(poliActive == 'yes_active'){
                    this.$refs.poli.setAttribute('class','no_active');
                }
                if(LiveliActive== 'yes_active'){
                    this.$refs.liveli.setAttribute('class','no_active');
                }
                if(econoActive== 'yes_active'){
                    this.$refs.econo.setAttribute('class','no_active');
                }
                if(yangbenActive== 'yes_active'){
                    this.$refs.yangben.setAttribute('class','no_active');
                }
                this.$refs.culture.setAttribute('class','yes_active');
                that.cultureData.contArr = []; //清理缓存
                this.$axios({
                    method: "post",
                    url: baseUrl + "/stargaze/stargazaMenu/getMenuList",
                    params: {
                        parentTitle:1
                    }
                }).then(res => {
                    if(res.status == 200){
                        var menuTextArr = res.data.data;
                        console.log(menuTextArr);
                        for(var i = 0; i < menuTextArr.length;i++){
                            that.cultureData.contArr.push({
                                img:this.imgArr[parseInt(Math.random()*this.imgArr.length)],
                                intro:menuTextArr[i].subTitleName,
                                subTitleCode:menuTextArr[i].subTitleCode,
                                subTitleName:menuTextArr[i].subTitleName,
                                 url:menuTextArr[i].thirdBiPage,
                            });
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                });
                this.obserShowData = that.cultureData;
            }
            else{
                this.ifshow_poli_line = false;
                this.ifshow_liveli_line = false;
                this.ifshow_econo_line=false;
                this.ifshow_culture_line=false;
                this.ifshow_yangben_line = true;
                var poliActive = this.$refs.poli.getAttribute('class');
                var LiveliActive = this.$refs.liveli.getAttribute('class');
                var econoActive = this.$refs.econo.getAttribute('class');
                var cultureActive = this.$refs.culture.getAttribute('class');
                if(poliActive == 'yes_active'){
                    this.$refs.poli.setAttribute('class','no_active');
                }
                if(LiveliActive== 'yes_active'){
                    this.$refs.liveli.setAttribute('class','no_active');
                }
                if(econoActive== 'yes_active'){
                    this.$refs.econo.setAttribute('class','no_active');
                }
                if(cultureActive== 'yes_active'){
                    this.$refs.culture.setAttribute('class','no_active');
                }
                this.$refs.yangben.setAttribute('class','yes_active');
                this.obserShowData = this.yangbenData;
            }
        },
    },
    watch:{
        '$route' (to, from) {
            var featurType = this.$route.query.featurType;
            this.goShowData(featurType);
        }
    },
    mounted(){
        var featurType = this.$route.query.featurType;
        this.goShowData(featurType);
    }
}
</script>

<style scoped lang='less'>
.banner{
  width: 100%;
  height: 450px;
  background: #3F3F4B;
  display: flex;
  align-items: center;
  justify-content: center;
  .banner_contant{
    width: 1000px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      height: 100%;
      width: 50%;
      .desc{
        box-sizing: border-box;
        padding-top: 138px;
        padding-bottom: 54px;
        font-size: 48px;
        color: #FFFFFF;
      }
    }
    .right{
      height: 90%;
      width: 50%;
      img{
        height: 100%;
      }
    }
  }
}
.data_show_container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    .data_show{
        width: 1200px;
        display: flex;
        // align-items: center;
        align-items: flex-start;
        padding: 80px 0;
        box-sizing: border-box;
        .left{
            width: 206px;
            margin-right: 32px;
            .political,.Liveli_hood,.economic,.culture,.yangben{
                display: flex;
                align-items: center;
                .political_left_line,.Liveli_hood_left_line,.economic_left_line,.culture_left_line,.yangben_left_line{
                    width: 6px;
                    height: 70px;
                    background-color:#03A971;
                }
                .political_right,.Liveli_hood_right,.economic_right,.culture_right,.yangben_right{
                    width: 200px;
                    height: 70px;
                    line-height: 70px;
                    font-size: 18px;
                    color: #3D4966;
                    text-align: center;
                }
                .culture_right:hover{
                    background-color: #FFFFFF;
                    box-shadow: 0 0 35px 0 #EBECF0;
                    color: #03A971;
                }
                .yangben_right:hover{
                    background-color: #FFFFFF;
                    box-shadow: 0 0 35px 0 #EBECF0;
                    color: #03A971; 
                }
                .political_right:hover{
                    background-color: #FFFFFF;
                    box-shadow: 0 0 35px 0 #EBECF0;
                    color: #03A971;
                }
                .Liveli_hood_right:hover{
                    background-color: #FFFFFF;
                    box-shadow: 0 0 35px 0 #EBECF0;
                    color: #03A971;
                }
                .economic_right:hover{
                    background-color: #FFFFFF;
                    box-shadow: 0 0 35px 0 #EBECF0;
                    color: #03A971;
                }
            }
        }
        .right{
            width: 962px;
        }
    }
}
.yes_active{
    width: 200px;
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    text-align: center;
    background: #FFFFFF;
    box-shadow: 0 0 35px 0 #EBECF0;
    color:#03A971;
}
.no_active{
    width: 200px;
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    color: #3D4966;
    text-align: center;
}
</style>
