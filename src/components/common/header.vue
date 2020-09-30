<template>
  <div class="header" :class="{'headerShadow':info==null}">
    <div class="header_content">
      <div class="logo">
          <div class="logoPic" @click="goHome">
              <img src="../../assets/images/new_index/logo.png" alt="" srcset="">
          </div>
      </div>
      <ul class="nav">
          <li class="navItem" v-for="item in nav" :key="item.id" :class="{'navItemActive':currentId==item.id}" @click="navClick(item)">
            <div class="nav_line" v-if="currentId==item.id"></div>
            {{item.name}}
          </li>
      </ul>
      <div class="nav_right">
          <div class="user" v-if="ifShowUser">
            <Dropdown @on-click='dropdownClick'>
                <a href="javascript:void(0)">
                    {{user}}
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name='checkOut'>退出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="nav_btn">
            <p class="name" @click="goMange()">控制台</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['info'],
  data () {
    return {
      currentId:'1',
      nav:[
        {name:'首页',path:'/index',id:1},
        {name:'技术服务',path:'/techIndex',id:2},
        {name:'大数据服务',path:'/dataIndex',id:3},
        {name:'试用中心',path:'/trialcenter',id:4},
      ]
    }
  },
  computed:{
    user:function(){
      return this.$store.state['username'].username ? this.$store.state['username'].username : localStorage.username;
    },
    ifShowUser:function(){
      return this.$store.state['username'].username || localStorage.username ? true : false;
    }
  },
  components:{
  },
  created(){
     if(this.$route.path=="/index"){
        this.currentId=1;
      }else if(this.$route.path=="/techIndex"||this.$route.path=="/searchIndex"){
        this.currentId=2;
      }else if(this.$route.path=="/dataIndex"||this.$route.path=="/searchDataIndex"){
        this.currentId=3;
      }else if(this.$route.path=="/trialcenter"||this.$route.path=="/liveSdk"){
        this.currentId=4;
      }
  },
  methods:{
    goHome(){
      this.$router.push({
        path:'/index'
      });
    },
    goMange(){
      window.open(window.config.url+'/sophiaManager/sysindex.html','_blank');
    },
    navClick(item){
      this.currentId=item.id;
      this.$router.push({
        path:item.path
      });
    },
    dropdownClick(e){
      console.log(e,'e')
      if(e == 'checkOut'){
        this.$store.commit('cleanUserName',{
          username:''
        });
        if(localStorage.username){
          localStorage.username = '';
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
.header{
  height: 60px;
  position: fixed;
  width:100%;
  left:0;
  top:0;
  background: #fff;
  z-index: 13;
  &.headerShadow{
   box-shadow: 0 2px 16px 0 rgba(184,190,204,0.30);
  }
  .header_content{
    width: 1200px;
    margin: auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
        width:127px;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 22px;
        color: #121C33;
        cursor: pointer;
        .logoPic{
          width:102px;
           img{
            width:100%;
            display: block;
          }
        }
    }
    .nav{
        margin-left:90px;
        flex:1;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #121C33;
        .navItem{
          margin-right: 40px;
          position: relative;
          cursor: pointer;
          &.navItemActive{
            color:#03A971;
            font-weight: bold;
          }
          .nav_line{
            position: absolute;
            width: 100%;
            height: 2px;
            background: #03A971;
            left:0;
            bottom:-8px;
          }
        }
    }
    .nav_right{
      display: flex;
       height: 100%;
      align-items: center;
      .user{
        margin-right: 40px;
        color:#7A8499;
        font-size: 14px;
        /deep/.ivu-dropdown{
          /deep/.ivu-dropdown-rel{
            a{
              color: #03A971;
            }
          }
          /deep/.ivu-select-dropdown{
            /deep/.ivu-dropdown-menu{
              min-width: auto;
            }
          }
        }        
      }
       .nav_btn{
          width: 70px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #03A971;
          border: 1px solid #03A971;
          border-radius: 2px;
          box-sizing: border-box;
          cursor: pointer;
        }
    }
   
  }
}

</style>
