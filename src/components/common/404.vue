<template>
 <div class="empty">
      <div class="emptyPic">
           <img src="../../assets/images/new_index/404.png" alt="">
      </div>
      <p>非常抱歉，我们正在努力的更新中…</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>
<style scoped lang='less'>
.empty{
   width:1200px;
   margin:auto;
   display: flex;
   align-items: center;
   flex-direction: column;
   .emptyPic{
     width:200px;
     margin-top:80px;
     margin-bottom: 20px;
     img{
       width:100%;
       display: block;
     }
   }
    p{
        font-size: 16px;
        color: #3D4966;
     }
}
</style>


