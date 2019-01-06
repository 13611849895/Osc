<template>
  <div class="help">
    <v-header></v-header>
    <v-about v-show="number==1"></v-about>
    <v-backup v-show="number==2"></v-backup>
    <v-creat v-show="number==3"></v-creat>
    <v-paymen v-show="number==4"></v-paymen>
    <div class="main" v-show="number==0">
      <div class="inner">
        <div class="inner-header">帮助中心</div>
        <div class="inner-list">
          <div class="page" @click="show(1)">
            <div class="page-header" >关于我们</div>
            <div
              class="page-inner"
            >指您在创建openwallet钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或瀚决的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</div>
          </div>
          <div class="page" @click="show(2)">
            <div class="page-header" >如何备份钱包？</div>
            <div
              class="page-inner"
            >指您在创建openwallet钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或瀚决的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</div>
          </div>
          <div class="page" @click="show(3)">
            <div class="page-header" >如何创建钱包</div>
            <div
              class="page-inner"
            >指您在创建openwallet钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或瀚决的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</div>
          </div>
          <div class="page">
            <div class="page-header">如何导入明文私钥</div>
            <div
              class="page-inner"
            >指您在创建openwallet钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或瀚决的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</div>
          </div>
          <div class="page">
            <div class="page-header">如何导入助记词</div>
            <div
              class="page-inner"
            >指您在创建openwallet钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或瀚决的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</div>
          </div>
          <div class="page" @click="show(4)">
            <div class="page-header" >如何进行转账、收款？</div>
            <div
              class="page-inner"
            >指您在创建openwallet钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或瀚决的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</div>
          </div>
          <div class="page">
            <div class="page-header">如何删除钱包？</div>
            <div
              class="page-inner"
            >指您在创建openwallet钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或瀚决的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</div>
          </div>
          <div class="page">
            <div class="page-header">为什么有些 Token 不显示价格</div>
            <div
              class="page-inner"
            >指您在创建openwallet钱包过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或瀚决的服务器，一旦丢失你需要借助明文私钥或助记词重置新密码。</div>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from "./innerList/header";
import VFooter from "./innerList/footer";
import VService from "./helpList/service1";
import VAbout from "./helpList/abooutus";
import VBackup from "./helpList/backups";
import VPaymen from "./helpList/paymen";
import VCreat from "./helpList/create0";
export default {
  components: {
    VHeader,
    VFooter,
    VService,
    VAbout,
    VBackup,
    VPaymen,
    VCreat
  },
  props: {},
  data() {
    return {
        number:0
    };
  },
  methods: {
      show(num) {
          this.number = num
          console.log(this.number)
      }
  },
  created() {
      this.number = 0
  },
  mounted() {}
};
</script>
<style scoped>
.help {
  height: 100%;
  background: linear-gradient(#11151c, #222a38);
  z-index: 1;
}
.main {
  padding-top: 69px;
  /* margin: 0 auto; */
  /* width: 80%; */
  min-height: 700px;
  background-image: url("../../static/img/diandian.png");
  background-size: 140% 100%;
  z-index: 2;
}
.inner {
  width: 1180px;
  margin: 0 auto;
  padding-bottom: 20px;
}
.inner-header {
  font-size: 32px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
.page {
  display: inline-block;
  margin-right: 10px;
  margin-top: 50px;
  padding-left: 18px;
  padding-right: 10px;
  /* width: 388px; */
  height: 129px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left: 2px solid #10c796;
  background: #232a38;
}
.page-header {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
.page-inner {
  font-size: 14px;
  color: rgba(179, 179, 179, 1);
  width: 350px;
  height: 38px;
  overflow: hidden;
}
</style>