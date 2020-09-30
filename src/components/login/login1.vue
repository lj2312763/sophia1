<template>
  <div class="main">
    <div class="left">
      <div class="logo">
        <img src="../../assets/images/public/Sophia.png" alt="" />
      </div>
      <div class="title">
        Artificial intelligence
      </div>
      <div class="desc">
        © 2020 元知智能研究院 版权所有 | 京ICP备19041462号-3
      </div>
    </div>
    <div class="right">
      <div class="link">
        <span
          onclick="javascript:window.open('https://www.yzsophia.com/#/index')"
          >首页</span
        >
        |
        <span
          onclick="javascript:window.open('https://www.yzsophia.com/#/experienceColl?oneId=5&twoRouteId=5.1&routeId=5.1.1')"
          >功能体验</span
        >
      </div>
      <div class="login_content">
        <div class="login_title">欢迎登陆Sophia行为图谱</div>
        <div class="email">
          <img
            src="../../assets/images/public/user.png"
            class="user_img"
            style="width: 16px;height: 16px;"
          /><input
            type="email"
            placeholder="邮箱/用户名/登录手机"
            id="account"
          />
        </div>
        <div class="password">
          <img
            src="../../assets/images/public/pws.png"
            class="pws_img"
            style="width: 16px;height: 16px;"
          /><input type="password" placeholder="密码" id="password" />
        </div>
        <div class="save_pws" style="margin-bottom: 21px;">
          <input type="checkbox" id="checkbox" />&nbsp;记住密码
        </div>
        <div class="submit" @click="login()">
          登录&nbsp;<img
            src="../../assets/images/public/Shape.png"
            style="width: 16px;height: 12.8px;"
          />
        </div>
      </div>
      <div class="text_content">
        <div class="login_text">关于Sophia平台登录</div>
        <div class="zixun_text">
          Sophia平台不支持用户注册，您可以通过&nbsp;<span
            class="option"
            onclick="javascript:window.open('https://www.yzsophia.com/#/zixun')"
            >合作咨询</span
          >&nbsp;进行申请
        </div>
        <div class="help_text">
          了解AI应用管理控制台功能，可查阅&nbsp;<span
            class="option"
            onclick="javascript:window.open('https://www.yzsophia.com/#/allDocument')"
            >帮助文档</span
          >&nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //   name: "",
    //   password: "",
        fromPath:''
    };
  },
  created(){
     this.fromPath=this.$route.query.to;
  },
  mounted() {
    
  },
  methods: {
    login() {
      var account = $("#account").val();
      var password = $("#password").val();
      this.$axios({
        method: "post",
        url: window.config.url + "/sophiaManager/sys/login",
        params: {
          username: account,
          password: password,
          captcha:'1234'
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$Message.success("登录成功");
            console.log('rrrrrrrrrrrrrrrr')
            localStorage.username=res.data.user.username;
            this.$store.commit(
                'setUserName',
                {
                    username:res.data.user.username
                }
            );
           // window.ifReload = true;
            this.$router.push({
                path:'/'+this.fromPath
            });
            // setTimeout(()=>{
            //   this.$router.go(0);
            //    //this.$root.isReload=true;
            // },500)
           
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<style scoped lang="less">
img{width: 100%;display: block;}
.main{
    display: flex;
    height: 100%;
    width: 100%;
}
.main .left{
    width:31%;
    height: 100%;
    background: url(../../assets/images/public/bg2.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
}
.main .right{
    width: 69%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.main .right .login_content{
    width:324px;
}
.main .right .login_content .login_title{
    font-family: 'PingFangSC-Regular';
    font-size: 22px;
    color: #121C33;
    letter-spacing: 0;
    text-align: center;
    line-height: 16px;
    margin-bottom: 28px;
}
.main .right .login_content .email,.password{
    background: #FFFFFF;
    border: 1px solid #B8BECC;
    border-radius: 2px;
    width: 324px;
    height: 42px;
    margin-bottom: 15px;
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.main .right .login_content .save_pws{
    font-family:'PingFangSC-Regular';
    font-size: 12px;
    color: #3D4966;
    letter-spacing: 0.08px;
    display: flex;
    align-items: center;
}
.main .right .login_content .submit{
    width: 100%;
    height: 40px;
    background: #03A971;
    border-radius: 3px;
    font-family: 'PingFangSC-Medium';
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0.08px;
    margin-right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.main .right .login_content .email input{
    border: none !important;
    width: 90%;
    height: 90%;
    outline:none;
    margin-left: 10px;
}
.main .right .login_content .password input{
    border: none !important;
    width: 90%;
    height: 90%;
    outline:none;
    margin-left: 10px;
}
.main .right .text_content{
    margin-top: 105px;
}
.main .right .option{
    font-family: 'PingFangSC-Regular';
    font-size: 12px;
    color: #03A971;
    letter-spacing: 0;
    text-align: center;
    line-height: 22px;
    cursor: pointer;
}
.main .right .login_text{
    font-family:'PingFangSC-Regular';
    font-size: 16px;
    color: #3D4966;
    letter-spacing: 0;
    text-align: center;
    margin-bottom: 8px;
}
.main .right .zixun_text,.help_text{
    font-family: 'PingFangSC-Regular';
    font-size: 12px;
    color: #B8BECC;
    letter-spacing: 0;
    text-align: center;
    line-height: 22px;
}
.logo{
    position: absolute;
    top:22px;
    left:28px;
    width: 78px;
}
.title{
    position: absolute;
    bottom:67px;
    left:28px;
    font-size: 16px;
    color: #FFFFFF;
}
.desc{
    position: absolute;
    bottom:40px;
    left:28px;
    font-size: 12px;
    color: rgba(255,255,255,0.8);
}
.link{
    font-family: 'PingFangSC-Regular';
    position: absolute;
    top:30px;
    right:30px;
    font-size: 14px;
    color: #3D4966;
    cursor: pointer;
    font-size: 14px;
}
</style>
