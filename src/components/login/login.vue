<template>
  <div class="login_container" id="particles-js">
      <div class="login_content">
          <div class="close" @click="closeWindow"></div>
          <div class="login">登录</div>
          <input type="text" class="user_name" placeholder="邮箱/用户名/登录手机" v-model="name" @change="hideAlert">
          <input type="password" class="pwd" placeholder="密码" v-model="password" @change="hidePwdAlert">
          <div class="rember_pwd">
              <input type="checkbox" class="rem_checkbox">
              <span class="rem_text">记住密码</span>
          </div>
          <div class="login_btn" @click="submit">登录</div>
          <div class="alert_container" v-if="ifShowInfoName">
              <Alert type="warning" show-icon>请输入用户名</Alert>
          </div>
         <div class="alert_container" v-else-if="ifShowInfoPwd">
              <Alert type="warning" show-icon>请输入密码</Alert>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
      props:{},
      name:'login',
      data(){
        return{
            name:'',
            password:'',
            info:'',
            ifShowInfoName:false,
            ifShowInfoPwd:false
        }
      },
      mounted(){
         //particlesJS.load('particles-js','./static/particles.json');
      },
      methods:{
        submit(){
            if(!this.name){
                this.ifShowInfoName = true;
            }
            if(!this.password){
                this.ifShowInfoPwd = true;
            }
            this.$axios({
                method: "post",
                //url: window.config.url+"/sitemgr/user/loginByUsername",
                 url: window.config.url + "/sophiaManager/sys/login",
                // params:{
                //     username:this.name,
                //     password:this.password
                // }
                 params: {
                    username: this.name,
                    password:this.password,
                    captcha:'1234'
                    }
            }).then(res => {
               if (res.data.code == 0) {
                    this.$Message.success("登录成功");
                    localStorage.username=res.data.user.username;
                    this.$store.commit(
                        'setUserName',
                        {
                            username:res.data.user.username
                        }
                    );
                    this.$emit('closeLoginWin',false);
                }
            }).catch(err => {
                console.log(err)
            });
        },
        closeWindow(){
            this.$emit('closeLoginWin',false);
        },
        hideAlert(){
            this.ifShowInfoName = false;
        },
        hidePwdAlert(){
            this.ifShowInfoPwd = false;
        }
      }
  }
</script>

<style scoped lang='less'>
.login_container{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999999;
    .login_content{
        width: 380px;
        min-height: 330px;
        background:  url('../../assets/images/login/diqiu.png') no-repeat center center;
        background-size: 100% 100%;
        box-shadow: 0 1px 20px 0 rgba(0,0,0,0.15);
        border-radius: 3px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        position: absolute;
        .close{
            position: absolute;
            width: 14px;
            height: 14px;
            right: 10px;
            top: 10px;
            background-image: url('../../assets/images/login/close.png');
            background-size: 100% 100%;
        }
        .close:hover{
            cursor: pointer;
        }
        .login{
            margin-top: 25px;
            font-size: 28px;
            color: #FFFFFF;
            letter-spacing: 0.13px;
            margin-bottom: 26px;
        }
        .user_name,.pwd{
            width: 324px;
            height: 42px;
            padding-left: 30px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            ::placeholder{
                font-size: 14px;
                color: #B8BECC;
                letter-spacing: 0;
            }
            :-moz-placeholder{
                font-size: 14px;
                color: #B8BECC;
                letter-spacing: 0;
            }
            :-ms-input-placeholder{
                font-size: 14px;
                color: #B8BECC;
                letter-spacing: 0;
            }
            ::-moz-placeholder{
                font-size: 14px;
                color: #B8BECC;
                letter-spacing: 0;
            }
            ::-webkit-input-placeholder{
                font-size: 14px;
                color: #B8BECC;
                letter-spacing: 0;
            }
        }
        .user_name{
            margin-bottom: 10px;
            background-image: url('../../assets/images/login/login_icon_input_user.png');
            background-repeat: no-repeat;
            background-size: 4% 38%;
            background-position: center;
            background-position-x: 10px;
        }
        .pwd{
            margin-bottom: 12px;
            background-image: url('../../assets/images/login/pwd.png');
            background-repeat: no-repeat;
            background-size: 4% 38%;
            background-position: center;
            background-position-x: 10px;
        }
        .rember_pwd{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 21px;
            width: 324px;
            .rem_checkbox{
                width: 10px;
                height: 10px;
                margin-right: 10px;
            }
            .rem_text{
                font-size: 12px;
                color: #7A8499;
                letter-spacing: 0.08px;
            }
        }
        .login_btn{
            width: 324px;
            height: 40px;
            background: #03A971;
            border-radius: 3px;
            font-size: 18px;
            color: #FFFFFF;
            letter-spacing: 0.08px;
            text-align: center;
            line-height: 40px;
        }
        .alert_container{
            margin-top: 20px;
        }
        .login_btn:hover{
            cursor: pointer;
        }
    }
}
</style>
