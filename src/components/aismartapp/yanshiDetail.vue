<template>
    <div class="container">
        <div class="banner_container">
            <div class="title1">Sophia产品</div>
            <div class="title2">为您提供全面的人工智能及大数据产品体系，助力您的产业升级</div>
            <div class="search">
                <Select v-model="model1" placeholder='搜索产品' filterable>
                    <Option value="热门产品">
                        <div style="font-size: 16px;border-bottom: 1px solid rgb(172, 172, 172);padding: 10px 0px;精彩即逝:color:rgb(181, 188, 198);">热门产品</div>
                    </Option>
                    <Option value="人脸识别" label="人脸识别">
                        <p class="pTitle" style="font-size: 16px;margin-bottom: 10px;margin-top: 5px;">人脸识别</p>
                        <p style="font-size: 12px;">对图像中的人脸及其五官关键点信息进行检测</p>
                    </Option>
                    <Option value="图像识别" label="图像识别">
                        <p class="pTitle" style="font-size: 16px;margin-bottom: 10px;margin-top: 20px;">图像识别</p>
                        <p style="font-size: 12px;">对图片的内容进行打标识别，可识别上千种标签</p>
                    </Option>
                    <Option value="实时语音识别" label="实时语音识别">
                        <p class="pTitle" style="font-size: 16px;margin-bottom: 10px;margin-top: 20px;">实时语音识别</p>
                        <p style="font-size: 12px;">对音频流做实时转写，达到“边说边出文字”的效果</p>
                    </Option>
                    <Option value="卡证文字识别" label="卡证文字识别">
                        <p class="pTitle" style="font-size: 16px;margin-bottom: 10px;margin-top: 20px;">卡证文字识别</p>
                        <p style="font-size: 12px;">可以解决通用卡证类的文字识别及识别信息结构化的问题</p>
                    </Option>
                </Select>
                <img :src="seachBtn" alt="" srcset="">
            </div>
            <div class="title3">
                <div class="item" v-for="(item,index) in exampleArr" :key="index">{{item}}</div>
            </div>
            <div class="img_container" @click="jump">
                <img :src="img1">
            </div>
        </div>
        <div class="img2_container">
            <div class="image_container">
                <img :src="img2">
            </div>
        </div>
        <div class="img3_container">
            <div class="image_container">
                <img :src="img3">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        exampleArr:['文本审核','机器翻译','语音合成','人脸识别','智能推荐'],
        img1:require('../../assets/images/yanShi/2.png'),
        img2:require('../../assets/images/yanShi/222.png'),
        img3:require('../../assets/images/yanShi/dashuj.png'),
        seachBtn:require('../../assets/images/search/searchIcon.png'),
        cityList: [
            {
                value: 'New York',
                label: 'New York'
            },
            {
                value: 'London',
                label: 'London'
            },
            {
                value: 'Sydney',
                label: 'Sydney'
            },
            {
                value: 'Ottawa',
                label: 'Ottawa'
            },
            {
                value: 'Paris',
                label: 'Paris'
            },
            {
                value: 'Canberra',
                label: 'Canberra'
            }
        ],
        model1:''
    };
  },
  mounted(){
      var topArg = this.$route.query.top;
      setTimeout(()=>{
        if(topArg == 0){
            document.documentElement.scrollTop = 900;
        }
        else{
            document.documentElement.scrollTop = 2900;
        }
      },500)
  },
  methods:{
      jump(){
          this.$router.push({
            path:'/experienceColl2',
            query:{
              oneId:'5',
              twoRouteId:'5.1',
              routeId:'5.1.1',
              type:1,
            }
        });
      }
  }
};
</script>

<style scoped lang='less'>
.container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .banner_container{
        width: 100%;
        height: 450px;
        background-image: url('../../assets/images/yanShi/1.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        .title1{
            font-size: 36px;
            color: #FFFFFF;
            text-align: center;
            margin-top: 65px;
            margin-bottom: 20px;
        }
        .search{
            width: 600px;
            height: 45px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            position: relative;
            /deep/.ivu-select-default{
                width: 100% !important;
                height: 100% !important;
                .ivu-select-selection{
                    height: 100%;
                    .ivu-select-selected-value{
                        line-height: 44px;
                    }
                    .ivu-select-placeholder{
                        line-height: 44px;
                        padding-left: 20px;
                    }
                    .ivu-select-arrow{
                        display: none;
                    }
                }
                /deep/.ivu-select-dropdown{
                    /deep/.ivu-select-dropdown-list{
                        .ivu-select-item{
                            color: #7A8499;
                            .pTitle{
                                color:#3D4966;
                            }
                        }
                        .ivu-select-item:hover{
                            .pTitle{
                                color: #03A971;
                            }
                            background: none;
                        } 
                    }
                }
            }
            img{
                width: 20px;
                position: absolute;
                right: 10px;
            }
        }
        .title2{
            font-size: 18px;
            color: #FFFFFF;
            margin-bottom: 20px;
        }
        .title3{
            display: flex;
            margin-bottom: 53px;
            .item{
                margin-right: 30px;
                font-size: 14px;
                color: #FFFFFF;
            }
        }
        .img_container{
            width: 1200px;
            height: 443px;
            position: absolute;
            top: 320px;
            cursor: pointer;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .img2_container{
        width: 100%;
        display: flex;
        justify-content: center;
        .image_container{
            width: 1200px;
            img{
                width: 100%;
            }
        }
        margin-top: 330px;
    }
    .img3_container{
        .image_container{
            width: 1200px;
            img{
                width: 100%;
            }
        }
        margin-bottom: 80px;
    }
}
</style>
