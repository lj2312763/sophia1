<template>
  <div>
    <div class="intro_contant" ref="introContant" @mouseleave="hideFnintro">
        <div class="point_container" v-for="(item,index) in introData" :key="index" @click="goDetails(item)" ref="point_container">
            <div class="title">{{item.title}}</div>
            <div class="desc">{{item.desc}}</div>
        </div>
        <div class="watch_more" @click="goAiList" v-show="introData.length != 0 ">查看更多</div>
    </div>
  </div>
</template>

<script>
  export default {
      props:{
          introData:{
              type:Array,
              default:[]
          },
          typeSymbol:{
              type:String
          }
      },
      updated(){
          if(this.$refs && this.$refs.point_container){
            var pointDomArr = this.$refs.point_container;
            if(pointDomArr[2]){
                pointDomArr[2].style = 'margin-right:0;'
            }
          }
      },
      methods:{
          hideFnintro(){
              this.$emit('clearTimer',false);
          },
          goDetails(val){
            this.$router.push({
                path:val.path,
                query:{
                    type:1,
                }
            });
          },
          goAiList(){
            var typeSymbol = this.typeSymbol;
            if(typeSymbol == 'yuyan'){
                this.$router.push({
                    path:'/aiSmartAppList',
                    query:{
                        type:1,
                        featurType:0
                    }
                });
            }
            else if(typeSymbol == 'yuyin'){
                this.$router.push({
                    path:'/aiSmartAppList',
                    query:{
                        type:1,
                        featurType:1
                    }
                }); 
            }
          }
      }
  }
</script>

<style scoped lang='less'>
.intro_contant{
    width: 1000px;
    padding: 40px;
    box-sizing: border-box;
    background: #F2F4F7;
    border-radius: 3px;
    border-radius: 3px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: -102px;
    margin-bottom: 75px;
    .point_container{
        width: 30%;
        margin-bottom: 44px;
        margin-right: 30px;
        .title{
            font-size: 18px;
            color: #3D4966;
            margin-bottom: 8px;
        }
        .title:hover{
            color: #03A971;
            font-weight: bold;
            cursor: pointer;
        }
        .desc{
            font-size: 14px;
            color: #7A8499;
            line-height: 22px;
            padding-right: 10px;
        }
    }
    .watch_more{
        width: 15%;
        text-align: center;
        border: 1px solid #03A971;
        border-radius: 3px;
        padding: 10px 38px;
        box-sizing: border-box;
        color: #03A971;
        margin-right: 0
    }
    .watch_more:hover{
        cursor: pointer;
    }
}
</style>
