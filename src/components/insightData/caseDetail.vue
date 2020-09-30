<template>
  <div class="pop_window_container">
      <div class="pop_window_content">
          <div class="header">
              <div class="left">案件查询</div>
              <div class="right" @click="closePopWindow">X</div>
          </div>
          <div class="case_content" v-for="(item,index) in caseDetailArr" :key="index">
              <div class="title_container">
                  <div class="title_left">{{item.caseNum}}</div>
                  <div class="view">查看</div>
              </div>
              <div class="date_parties_container">
                  <div class="date_parties_left">
                      <div class="date_parties_left_left">立案日期</div>
                      <div class="date_parties_left_right">{{item.caseDate}}</div>
                  </div>
                  <div class="cate_parties_right">
                      <div class="cate_parties_right_left">当事人</div>
                      <div class="cate_parties_right_right">{{item.caseParties}}</div>
                  </div>
              </div>
              <div class="progress_case_container">
                  <div class="progress_case_left">
                      <div class="progress_case_left_left">当前进度</div>
                      <div class="progress_case_left_right">{{item.caseProgress}}</div>
                  </div>
                  <div class="progress_case_right">
                      <div class="progress_case_right_left">案由</div>
                      <div class="progress_case_right_right">{{item.caseReason}}</div>
                  </div>      
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'caseDetail',
  props:{
      caseDetailArr:{
        type:Array,
        required:true
      }
  },
  data () {
    return {
    }
  },
  methods:{
      closePopWindow(){
          this.$emit('close',false);
      }
  }
}
</script>

<style scoped lang='less'>
.pop_window_container{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color:rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    .pop_window_content{
        width: 1200px;
        height: 577px;
        background-color: #ffffff;
        padding: 40px;
        box-sizing: border-box;
        opacity: 1;
        overflow-y: scroll;
        .header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            .left{
                font-size: 17px;
                font-weight: bold;
                color: #000;
                line-height: 40px;
            }
            .right{
                font-size: 17px;
                line-height: 40px;
                color: gray;
                :hover{
                    cursor: pointer;
                }
            }
        }
        .case_content{
            width: 100%;
            margin-bottom: 10px;
            .title_container{
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: cadetblue;
                padding-left: 20px;
                padding-right: 20px;
                box-sizing: border-box;
                .title_left{
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 50px;
                }
                .view{
                    color: #03A971;
                    font-size: 16px;
                }
            }
            .date_parties_container,.progress_case_container{
                border-bottom: gray 1px solid;
                display: flex;
                align-items: center;
                height: 50px;
                .date_parties_left,.progress_case_left{
                    width: 30%;
                    display: flex;
                    align-items: center;
                    .date_parties_left_left,.progress_case_left_left{
                        width: 70px;
                        margin-right: 50px;
                        font-size: 16px;
                        color: #000;
                    }
                    .date_parties_left_right,.progress_case_left_right{
                        flex-grow: 1;
                        color: gray;
                        opacity: 0.8;
                    }
                }
                .cate_parties_right,.progress_case_right{
                    width: 70%;
                    display: flex;
                    align-items: center;
                    .cate_parties_right_left,.progress_case_right_left{
                        width: 70px;
                        margin-right: 50px;
                        font-size: 16px;
                        color: #000;
                    }
                    .cate_parties_right_right,.progress_case_right_right{
                        flex-grow: 1;
                        color: gray;
                        opacity: 0.8;
                    }
                }
            }
        }
    }
}
</style>
