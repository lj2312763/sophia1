<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>

*{
  /* font-family:'PingFangSC-Semibold'; */
  font-family: 'Helvetica Neue','Helvetica','PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑','Arial','sans-serif','PingFangSC-Medium';
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
}
#app{
  height: 100%;
}
textarea{overflow:auto;resize: none;word-break: break-all;word-wrap: break-word;}
input,textarea,button,select,a{outline:0 none;border: none;}
select{appearance: none;}
button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}
li{list-style: none;}
::-webkit-scrollbar {
    position: absolute;
    height: 8px;
    width: 6px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
}
::-webkit-scrollbar-button {
    display: none;
}
::-webkit-scrollbar-thumb {
   position: absolute;
    width: 8px;
    min-height: 15px;
    background: rgba(50,50,50,0.6) !important;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
}
.amap-info-content{
  background: rgba(0,0,0,0.8);
  border-radius: 3px;
  padding: 8px 18px 8px 10px;
}
.amap-info-close{
  right: 5px !important;
}
.bottom-center .amap-info-sharp{
    border-top: 8px solid rgba(0,0,0,0.8);
}
.ivu-radio-inner{
   /* transition:none; */
}
.ivu-radio-inner:after{
  width:8px !important;
  height:8px !important;
  left:0 !important;
  top:0 !important;
  border-radius: 50% !important;
  right:0;
  bottom:0;
  margin:auto;
  display: block !important;
  /* transition:none;
  transform:none */
}
/* .bottom-center .amap-info-sharp:after {
    border-left: 8px solid rgba(0,0,0,0.8);;
    border-right: 8px solid rgba(0,0,0,0.8);;
    border-top: 8px solid rgba(255,255,255,0.7);
}  */
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
