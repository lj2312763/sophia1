<template>
  <div class="downLoad">
    <div class="title">{{title}}文件下载</div>
    <div class="contaienr">
      <div class="left">
        <img src="../../assets/images/new_nav/pc.png" alt="">
        <div class="left_container" v-if="result">
          <img :src="result.imageUrl" alt="">
        </div>
      </div>
       <div class="right">
        <div class="right_box">
          <div class="title">文件例表</div>
          <div class="right_list">
            <div class="right_item">
             <span>文件名</span><span>大小</span>
            </div>
            <div class="right_item"  v-for="(item,index) in list" :key="index">
              <span>{{item.fileName}}</span><span>{{item.compressedSize}}kb</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="progress">
      <Progress :percent="percent" status="success" :stroke-width="20" text-inside/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      result:null,
      percent:0,
      list:[],
      title:''
    }
  },
  created(){
    this.title = this.$route.query.title;
  },
  mounted(){
   
    this.initData();
  },
  methods:{
    initData(){
      this.$axios({
        method: "get",
        url: window.config.url+"/ai/fileDirectory/getFileDirectory?fileName="+this.$route.query.downLoadParm,
      }).then(res => {
        if (res.data.code == 200000) {
          this.result=res.data.data;
          this.list=JSON.parse(res.data.data.directoryJson);
          //let url=window.config.url+"/open_source_services/"+this.$route.query.downLoadParm;
          let url="https://yuanzhi-data.oss-cn-beijing.aliyuncs.com/open_source_services/"+this.$route.query.downLoadParm;;
          //let url=window.config.url+"/sophia/1001itstyle-xufei_msc-master.zip";
           setTimeout(()=>{
            this.progressDownLoad(url,this.result.fileName)
          },500)
        }
      }).catch(err => {

      });
    },
    progressDownLoad(url,filename,params,progress,success){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      //监听进度事件
      xhr.addEventListener("progress",  (event)=> {
           if (event.lengthComputable) {
            let result = event.loaded / event.total*100;
            this.percent=parseInt(result);
          }
      }, false);

      xhr.responseType = "blob";
      // xhr.withCredentials = true;
      // xhr.setRequestHeader("Access-Control-Allow-Origin","*");
      //xhr.responseType = 'arraybuffer';
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              if (typeof window.chrome !== 'undefined') {
                  // Chrome version
                  var link = document.createElement('a');
                  link.href = window.URL.createObjectURL(xhr.response);
                  link.download = filename;
                 console.log(xhr.response)
                  link.click();
              } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                  // IE version
                  var blob = new Blob([xhr.response], { type: 'application/force-download' });
                  window.navigator.msSaveBlob(blob, filename);
              } else {
                  // Firefox version
                  var file = new File([xhr.response], filename, { type: 'application/force-download' });
                  window.open(URL.createObjectURL(file));
              }
              if(success) try{ success.call(xhr); }catch(e){}
          }
      };
      xhr.send();
  }
  }
}
</script>
<style scoped lang='less'>
img{
  width: 100%;
  display: block;
}
.downLoad{
  padding-top: 40px;
  .title{
    font-size: 22px;
    color: #121C33;
    text-align: center;
    margin: 40px;
  }
  .contaienr{
    width: 1100px;
    margin: auto;
    display: flex;
    .left{
      margin-left:100px;
      width: 613px;
      position: relative;
      .left_container{
        position: absolute;
        width: 464px;
        height: 294px;
        left: 74px;
        top: 19px;
        overflow: hidden;
      }
    }
    .right{
      flex:1;
      position: relative;
      .right_box{
        position: absolute;
        width:291px;
        height: 264px;
        background: #FFFFFF;
        box-shadow: 0 2px 14px 0 rgba(184,190,204,0.67);
        border-radius: 2px;
        left: -57px;
        top: 40px;
        padding:0 23px;
        .title{
          margin: 0;
          font-size: 14px;
          color: #3D4966;
          margin-top:12px;
          margin-bottom: 5px;
        }
        .right_list{
          border: 8px solid #464442;
          height: 212px;
          overflow: auto;
          .right_item{
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
             font-size: 10px;
            span:nth-child(1){
              width:70%;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              word-break:break-all;
              padding-left:10px;
            }
            span:nth-child(2){
              width:30%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              padding-right: 10px;
            }
          }
        }
      }
    }
  }
  .progress{
    width: 440px;
    margin: 50px auto;
    margin-bottom: 50px;
  }
}
</style>


