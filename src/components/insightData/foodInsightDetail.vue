<template>
  <div class="food_insight_detial_container">
      <div class="model_detail_content" v-show="ifShowComp">
          <div class="close_icon" @click="closeDetailWindow">
              <img :src="closeIcon" alt="" srcset="">
          </div>
          <div class="company_name_info">
              <div class="left">
                  <div class="leftImg">
                      <img :src="companyDetailData.logoUrl" alt="" srcset="">  
                  </div>
                  <div class="rightCompanyNmae">
                      <div class="companyName">{{companyDetailData.restaurantBrand}}</div>
                      <div class="tese">{{companyDetailData.restaurantBrand}}</div>
                  </div>
              </div>
              <div class="right">
                  <div class="pingpaizhishu_text">品牌指数</div>
                  <div class="pingpaizhishu">{{companyDetailData.redListIndex}}</div>
              </div>
          </div>
          <div class="brand_Information_container">
              <div class="brand_title_Information">品牌信息</div>
              <div class="brand_desc_Information">
                {{companyDetailData.companyProfile}}
              </div>
          </div>
          <div class="pinpai_renzheng_container">
              <div class="leftPingpai">
                  <div class="pinpaiTitle">品牌信息</div>
                  <div class="span_container">
                      <span>
                        品牌名称： 
                      </span>
                      <span>{{companyDetailData.restaurantBrand}}</span>  <!--确认是否正确-->
                  </div>
                  <div class="span_container">
                      <span>官网网址：</span>
                      <span>{{companyDetailData.website}}</span>
                  </div>
                  <div class="span_container">
                      <span>联系电话：</span>
                      <span>{{companyDetailData.telephone}}</span>
                  </div>
                  <div class="span_container">
                      <span>餐饮分类：</span>
                      <span>{{companyDetailData.restaurantType}}</span>
                  </div>
              </div>
              <div class="rightRenzheng">
                  <div class="pinpaiTitle">认证信息</div>
                  <div class="span_container">
                      <span>
                        公司名称： 
                      </span>
                      <span>{{companyDetailData.companyName}}</span>
                  </div>
                  <div class="span_container">
                      <span>经营地址：</span>
                      <span>{{companyDetailData.address}}</span>
                  </div>
                  <div class="span_container">
                      <span>经营范围：</span>
                      <span>{{companyDetailData.businessScope}}</span>  
                  </div>
                  <!-- <div class="span_container">
                      <span>营业执照号：</span>
                      <span>911101068011872903</span> 
                  </div> -->
              </div> 
          </div>
      </div>
      <div class="model_detail_content1" v-show="ifshowEmpty">
          <div class="close_icon1" @click="closeDetailWindow">
              <img :src="closeIcon" alt="" srcset="">
          </div>
          <div class="empty_text">暂时只支持中国餐饮品牌查询</div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
      companyDetailData:{
        type:Object,
        required:true
      }
  },
  data() {
    return {
        closeIcon:require('../../assets/images/insightData/dialog_button_close_normal copy.png'),
        ifShowComp:false,
        ifshowEmpty:false
    };
  },
  mounted(){
    var companyDetailData = this.companyDetailData;
    var keyArr = Object.keys(companyDetailData);
    if(keyArr.length == 0){
        this.ifshowEmpty = true;
        this.ifShowComp = false;
    }
    else{
        this.ifshowEmpty = false;
        this.ifShowComp = true;
    }
  },
  methods:{
      closeDetailWindow(){
        this.$emit('closeDetailWindow',false);
      }
  }
}
</script>

<style scoped lang='less'>
.food_insight_detial_container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    .model_detail_content{
        width: 1200px;
        height: 500px;
        padding: 31.7px;
        overflow:auto;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 4px;
        z-index: 9990;
        .close_icon{
            width: 100%;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            img{
                width: 13.3px;
                height: 13.3px;
            }
        }
        .close_icon:hover{
            cursor: pointer;
        }
        .company_name_info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40px;
            .left{
                width: 260px;
                display: flex;
                align-items: center;
                .leftImg{
                    width: 100px;
                    height: 81px;
                    margin-right: 30px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .rightCompanyNmae{
                    .companyName{
                        font-size: 26px;
                        color: #121C33;
                        margin-bottom: 7px;
                    }
                }
            }
            .right{
                width: 81px;
                .pingpaizhishu_text{
                    font-size: 18px;
                    color: #3D4966;
                    text-align: right;
                }
                .pingpaizhishu{
                    font-size: 46px;
                    color: #121C33;
                    text-align: right;
                }
            }
        }
        .brand_Information_container{
            width: 100%;
            margin-bottom: 50px;
            .brand_title_Information{
                width: 100%;
                font-size: 22px;
                color: #121C33;
                margin-bottom: 11px;
            }
            .brand_desc_Information{
                font-size: 14px;
                color: #3D4966;
                line-height: 26px;
            }
        }
        .pinpai_renzheng_container{
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            .leftPingpai,.rightRenzheng{
                width: 50%;
                .pinpaiTitle{
                    font-size: 22px;
                    color: #121C33;
                    margin-bottom: 11px;
                }
                .span_container{
                    span{
                        font-size: 14px;
                        color: #3D4966;
                        line-height: 26px;
                    }
                }
            }
        }
    }
    .model_detail_content1{
        width: 1200px;
        height: 200px;
        padding: 31.7px;
        overflow:auto;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 4px;
        z-index: 9990;
        .close_icon1{
            width: 100%;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            img{
                width: 13.3px;
                height: 13.3px;
            }
        }
        .close_icon1:hover{
            cursor: pointer;
        }
        .empty_text{
            text-align: center;
            font-size: 25px;
        }
    }
}
</style>
