<template>
<div class="wuye_container">
  <div class="travel_info_container">
    <div class="travel_box">
      <div class="search">
        <p>物业公司洞察分析</p>
        <!-- <Input  v-model="name" search enter-button placeholder="请输入关键词" size="large" /> -->

        <!-- <Input v-model="name" placeholder="请输入关键词" search='true' size="large" @on-search="search" @click='search'>
            <Button slot="append" icon="ios-search"></Button>
        </Input> -->

        <Input placeholder="请输入您想要查询的物业公司" 
            v-model="name" 
            @on-enter="search"
            style="width: auto">
            <Icon type="ios-search" slot="prefix" @click.prevent="search" />
        </Input>

        <div class="wuye_text_container">
          <span @click="changeName('万科物业')">万科物业</span>  ｜  <span @click="changeName('绿地物业')">绿地物业</span>  ｜  <span @click="changeName('中海物业')">中海物业</span>
        </div>

        <div class="empty_container" v-show="ifShowEmpty">
          <div class="empty_img">
            <img :src="wuyeEmptyImg" alt="" srcset="">
          </div>
          <div class="empty_text">
            抱歉，没有搜索到相关结果。
          </div>
        </div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      name:'',
      result:'',
      wuyeEmptyImg:require('../../assets/images/insightData/sorry.png'),
      ifShowEmpty:false
    }
  },
  methods: {
     search(){
       if(this.name==''){
         this.$Message.warning('请输入关键词');
         return
       }
        this.$axios({
            method: "get",
            url: window.config.url+"/insight/es/searchEstate?companyName="+this.name,
        }).then(res => {
            if(res.data.code==200000){
                if(!res.data.data){
                  this.ifShowEmpty = true;
                  return;
                }
                localStorage.data=JSON.stringify(res.data.data);
                this.ifShowEmpty = false;
                this.$router.push({
                  path:"/wuyeInsightDetail",
                  query:{
                    type:2
                  }
                })
            }
        }).catch(err=>{
            console.log(err);
        });
     },
     changeName(wuyeText){
       this.name = wuyeText;
       this.search();
     }
  }
 
};
</script>
<style scoped lang='less'>
.wuye_container{
  width: 100%;
  height: 100%;
  .travel_info_container {
    width: 100%;
    height: 100%;
    background-color: #F2F4F7;
    display: flex;
    justify-content: center;
    .travel_box{
      width: 1200px;
      height: 100vh;
      display: flex;
      justify-content: center;
      .search{
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
          margin-bottom: 10px;
          font-size: 30px;
          color: #121C33;
          text-align: center;
          margin-top: 70px;
        }
        /deep/.ivu-input-type-text{
          width: 371px !important;
          margin-bottom: 10px;
          /deep/.ivu-input-with-prefix{
            padding-left: 10px !important;
          }
          /deep/.ivu-input-prefix{
            left: auto;
            right: 0;
            transform: scaleX(-1);
            background: #F2F4F7;
            border: 1px solid #B8BECC;
            border-radius: 4px 0 0 4px;
          }
        }
        .wuye_text_container{
          font-size: 12px;
          color: #B8BECC;
          margin-bottom: 90px;
          span:hover{
            cursor: pointer;
          }
        }
        .empty_container{
          .empty_img{
            width: 200px;
            height: 200px;
            margin-bottom: 20px;
            img{
              width: 100%;
            }
          }
          .empty_text{
            font-size: 16px;
            color: #3D4966;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>

