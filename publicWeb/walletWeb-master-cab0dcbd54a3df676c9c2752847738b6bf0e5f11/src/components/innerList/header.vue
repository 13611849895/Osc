<template>
  <div  v-bind:class="{header:backgound1==1,header1:backgound1 ==2}">
    <div class="mask" v-show="number == 0">
      <div class="maskBackground">
        <div class="close" @click="close">X</div>
        <p class="code-title">下载App</p>
        <div class="code" id="qrcode3"></div>
      </div>
    </div>
    <img class="logo" src="../../../static/img/logo.png" width="180" height="40">
    <div class="headerList">
      <ul>
        <li v-bind:class="{butn:clas==4}" @click="come" v-show="login ==2">
          <span :class="{font:true,co:clas == 4}">首页</span>
        </li>
        <!-- <li v-bind:class="{butn:clas==3}" @click="numb(3)"> -->
        <li @click="numb(3)">
          <span @click="download">下载App</span>
        </li>

        <li v-bind:class="{butn:li1==1}" @click="numb(1)">
          <router-link to="/help" :class="{font:true,co:clas ==1}">帮助</router-link>
        </li>
        <li v-bind:class="{butn:clas==2}" @click="numb(2)" v-if="this.login == 3">
          <router-link to="/created" :class="{font:true,co:clas == 2}">创建/登录</router-link>
        </li>
        <li v-bind:class="{butn:li1==2}" @click="out" v-if="login == 2">
          <router-link to="/" :class="{font:true}">退出</router-link>
          <!-- <span  :class="{font:true}" >退出</span> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  components: {},
  props: {},
  data() {
    return {
      backgound1:1,
      number: 2,
      li1: 0,
      login: 1,
      clas: 0,
      path: this.$route.fullPath
      // user:JSON.parse(sessionStorage.user)
    };
  },
  methods: {
    qrcode3() {
      let qrcode3 = new QRCode("qrcode3", {
        width: 200,
        height: 200,
        text: "asd528sdx8th2jk82cx",
        colorDark: "#000",
        colorLiht: "#fff"
      });
    },
    getHelp() {
      this.li = 1;
    },
    come() {
      let user = JSON.parse(sessionStorage.user);
      this.$router.push("/inner/" + user.priv);
      this.clas = 4;
    },
    out() {
      sessionStorage.clear();
      this.li1 = 2;
    },
    numb(num) {
      this.li = num;
    },
    download() {
      this.number = 0;
      // this.clas = 3;
    },
    close() {
      this.number = 1;
      // location.reload();
    }
  },
  created() {},
  watch: {
    uesr: function(newString, oldString) {}
  },
  mounted() {
    this.qrcode3();
    // console.log(user);
    if (this.path == "/help") {
      this.li1 = 1;
      this.clas = 1;
      const f = () => JSON.parse(sessionStorage.user);
      Promise.resolve().then(f).catch((err)=>{
        this.li1  = 1
        this.login = 3
        this.clas = 1
      });
      let user = JSON.parse(sessionStorage.user);
      if (user == "") {
        this.clas = 2;
        this.li1 = 2;
      } else {
        this.login = 2;
        // this.clas = 4;
      }
    } else if (this.path == "/created") {
      this.clas = 2;
      this.login = 3
      this.backgound1 = 1
    } else {
      this.login = 2;
      this.clas = 4;
      this.backgound1 = 2;
    }
  }
};
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 22px;
  z-index: 999;
}
.header1 {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #141921;
  text-align: center;
  font-size: 22px;
}
.logo {
  position: absolute;
  left: 18px;
  top: 9px;
}
.headerList {
  margin-right: 68px;
  text-align: center;
  float: right;
  overflow: hidden;
}
.headerList ul li {
  height: 55px;
  line-height: 55px;
  margin: 0 16px;
  padding: 0 4px 0 4px;
  display: inline-block;
}
.headerList ul li span {
  font-size: 16px;
  text-align: center;
  color: #b3b3b3;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0.5, 0.5, 0.5, 0.5);
}
.code {
  /* top: 30%; */
  z-index: 9999;
  background-repeat: no-repeat;
}
.butn {
  border-bottom: 2px solid #01e3b5;
}
.font {
  font-size: 16px;
  text-align: center;
  color: #b3b3b3;
}
.co {
  color: #01e3b5;
}
.close {
  position: absolute;
  padding: 2px;
  top: -20px;
  left: 60px;
  color: #ffffff;
  cursor:default;
  height: 20px;
  line-height: 20px;
  width: 20px;
  margin-left: 179px;
  border-radius: 50%;
  font-size: 13px;
  background: #979191;
  border: 1px solid darkgray;
}
.maskBackground {
  padding: 14px;
  /* position: relative; */
  position: absolute;
  left: 45%;
  top: 40%;
  margin: -50px 0 0 -50px;
  width: 200px;
  height: 200px;
  background: #ffffff;
}
.code-title {
  padding-left: 70px;
  float: left;
  margin-top: -70px;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
</style>