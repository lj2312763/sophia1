<template>
  <div class="obser_star_data_container">
      <div class="title">{{showData.title}}</div>
      <div class="desc">{{showData.desc}}</div>
      <div class="intro_container">
        <div class="intro" v-for="(item,index) in showData.contArr" :key="index" @click="goObserStarList1(index,item)">
            <div class="top">
                <img :src="item.img" alt="" srcset="">
            </div>
            <div class="bottom">
                {{item.intro}}
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        showData:{
            type:Object,
            required:true,
            default:{}
        }
    },
    data(){
        return {
        }
    },
    created(){
    },
    methods:{
        goObserStarList1(index,item){
            if(this.showData.dataType == 5){  //样本数据跳转列表
                let routerUrl = this.$router.resolve({
                    path:'/obserStarList',
                    query:{
                        type:3,
                        dataType:5,
                        pointType:index
                    }
                });
                window.open(routerUrl.href,'_blank')
            }else{
                window.open(item.url,'_blank')
            }
        },
        goObserStarList(index,item){
            if(this.showData.dataType == 1){   
                // this.$router.push({
                //     path:'/obserStarPoliticDetail',     //obserStarList列表页
                //     query:{
                //         type:3,
                //         dataType:1,
                //         pointType:index,
                //         subTitleCode:item.subTitleCode,
                //         subTitleName:item.subTitleName,
                //         parentTitle:2
                //     }
                // });
                let routerUrl = this.$router.resolve({
                    path:'/obserStarPoliticDetail',     
                    query:{
                        type:3,
                        dataType:1,
                        pointType:index,
                        subTitleCode:item.subTitleCode,
                        subTitleName:item.subTitleName,
                        parentTitle:2
                    }
                });
                window.open(routerUrl.href,'_blank')
            }
            else if(this.showData.dataType == 2){  //民生数据跳转列表
                // this.$router.push({
                //     path:'/obserStarLiveDetail',
                //     query:{
                //         type:3,
                //         dataType:2,
                //         parentTitle:3,
                //         pointType:index,
                //         subTitleCode:item.subTitleCode,
                //         subTitleName:item.subTitleName
                //     }
                // });
                let routerUrl = this.$router.resolve({
                    path:'/obserStarLiveDetail',
                    query:{
                        type:3,
                        dataType:2,
                        parentTitle:3,
                        pointType:index,
                        subTitleCode:item.subTitleCode,
                        subTitleName:item.subTitleName
                    }
                });
                window.open(routerUrl.href,'_blank')
            }
            else if(this.showData.dataType == 3){  //经济数据跳转列表
                // this.$router.push({
                //     path:'/obserStarEconoDetail',
                //     query:{
                //         type:3,
                //         dataType:3,
                //         parentTitle:4,
                //         pointType:index,
                //         subTitleCode:item.subTitleCode,
                //         subTitleName:item.subTitleName
                //     }
                // });
                let routerUrl = this.$router.resolve({
                    path:'/obserStarEconoDetail',
                    query:{
                        type:3,
                        dataType:3,
                        parentTitle:4,
                        pointType:index,
                        subTitleCode:item.subTitleCode,
                        subTitleName:item.subTitleName
                    }
                });
                window.open(routerUrl.href,'_blank')
            }
            else if(this.showData.dataType == 4){  //文化数据跳转列表
                // this.$router.push({
                //     path:'/obserStarCulturDetail',
                //     query:{
                //         type:3,
                //         dataType:4,
                //         parentTitle:1,
                //         pointType:index,
                //         subTitleCode:item.subTitleCode,
                //         subTitleName:item.subTitleName
                //     }
                // });
                let routerUrl = this.$router.resolve({
                    path:'/obserStarCulturDetail',
                    query:{
                        type:3,
                        dataType:4,
                        parentTitle:1,
                        pointType:index,
                        subTitleCode:item.subTitleCode,
                        subTitleName:item.subTitleName
                    }
                });
                window.open(routerUrl.href,'_blank')
            }
            else if(this.showData.dataType == 5){  //样本数据跳转列表
                // this.$router.push({
                //     path:'/obserStarList',
                //     query:{
                //         type:3,
                //         dataType:5,
                //         pointType:index
                //     }
                // });
                let routerUrl = this.$router.resolve({
                    path:'/obserStarList',
                    query:{
                        type:3,
                        dataType:5,
                        pointType:index
                    }
                });
                window.open(routerUrl.href,'_blank')
            }
        }
    }
}
</script>

<style scoped lang='less'>
.obser_star_data_container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title{
        font-size: 36px;
        color: #121C33;
        text-align: center;
        margin-bottom: 10px;
    }
    .desc{
        font-size: 18px;
        color: #B8BECC;
        text-align: center;
        margin-bottom: 30px;
    }
    .intro_container{
        display: flex;
        flex-wrap: wrap;
        .intro{
            width: 299px;
            height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .top{
                width: 80px;
                margin-bottom: 15px;
                img{
                   width: 100%;
                   display: block;
                }
            }
            .bottom{
                font-size: 22px;
                color: #121C33;
                text-align: center;
            }
        }
        .intro:hover{
            color: #2D8C6A;
            cursor: pointer;
            background: #FFFFFF;
            box-shadow: 0 2px 35px 0 #EBECF0;
        }
    }
}
</style>
