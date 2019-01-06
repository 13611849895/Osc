<template>
  <div class="created">
    <v-header></v-header>
    <div class="main" v-show="page == 0">
      <div class="main-inner">
        <div class="mian-left">
          <div class="main-header">创建新的钱包</div>
          <div class="innerList">
            <p>创建帐户密钥对</p>
            <p>要开始使用open wallet 钱包，您必须首先创建一个密钥对（除非您有Ledger Nano）。 密钥对由两部分组成：</p>
            <strong class="wei">公钥</strong>

            <p>公钥用于标识帐户。 它也被称为帐户。 该公钥用于接收资金。</p>
            <strong class="wei">密钥</strong>
            <p>密钥用于访问您的帐户并进行交易。 保持此代码的安全。 拥有该代码的任何人都可以完全访问该帐户和资金。 如果您丢失了密钥，您将无法再访问资金，也没有恢复机制。</p>
            <div class="service">
              <img
                src="../../static/img/set.png"
                alt
                width="22"
                height="22"
                class="img"
                @click="setType"
                v-show="number2 ==0"
              >
              <img
                src="../../static/img/set1.png"
                alt
                width="22"
                height="22"
                class="img"
                @click="setType"
                v-show="number2 ==1"
              >
              <span>我已仔细阅读并同意
                <router-link to="/service" tag="a" class="set">服务及隐私条款</router-link>
              </span>
            </div>
          </div>

          <div class="butn">
            <button
              :class="{btn:number2==0,btn2:number2 ==1}"
              @click="changePage"
              v-bind:disabled="number2==0"
            >创建钱包</button>
            <span class="wellat" @click="show1">已有钱包</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-show="page==1">
      <div class="main-inner">
        <div class="mian-left">
          <div class="main-header">备份钱包</div>
          <div class="innerList">
            <p>1、钱包秘钥用于恢复钱包资产，拥有秘钥即可完全控制钱包资产，请将它准确抄写在纸上，并保存在安全的地方，丢失秘钥即丢失钱包资产，无法提供找回</p>
            <p>2、请务必小心确保您的计算机是安全的，不要在不信任的计算机上运行</p>
            <span class="impor">保持密钥安全。 这个密钥只会向您显示一次。 Open wallet不保存它，如果丢失则无法帮助您恢复它。</span>
          </div>

          <div class="key">
            <span class="address">公钥:</span>
            <div class="shuru">
              <input type="text" class="pube" v-model="publicKey" id="gongyao" title="显示/隐藏">
              <img
                src="../../static/img/copy@2x.png"
                width="22"
                height="22"
                class="keyImg"
                @click="copy('.keyImg')"
                data-clipboard-target="#gongyao"
                title="复制"
              >
            </div>
          </div>

          <div class="key">
            <span class="address">私钥:</span>
            <div class="shuru">
              <input :type="arrt" class="pube" id="siyao" v-model="secret1">
              <img
                src="../../static/img/copy@2x.png"
                width="22"
                height="22"
                class="keyImg1"
                @click="copy('.keyImg1')"
                data-clipboard-target="#siyao"
                title="复制"
              >
              <img :src="dianji" width="22" height="22" alt class="eye" @click="show">
            </div>
          </div>
          <div class="code">
            <div class="pub">
              <div class="code-pading">
                <div class="code2" id="qrcode1"></div>
              </div>
              <span class="er">公钥二维码</span>
            </div>
            <div class="prev">
              <div>
                  <div class="mask" v-show="number == 0"></div>

                <div class="code-pading">
                  <div class="code2" id="qrcode2"></div>
                </div>

                <span class="er">私钥二维码</span>
              </div>
            </div>
          </div>
          <div class="jump">
            <button @click="show1" class="backups">我已备份</button>
            <!-- <button @click="show">显示/隐藏</button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-show="page==2">
      <div class="main-inner">
        <div class="mian-left">
          <div class="main-header">秘钥登录</div>
          <div class="innerList">
            <p>请务必小心确保您的计算机是安全的，不要在不信任的计算机上输入私钥，以防丢失钱包资产</p>
            <div class="shuru">
              <input :type="arrt" class="pube" id="siyao" v-model="secret" placeholder="输入钱包秘钥">
              <img :src="dianji" alt width="22" height="22" class="keyImg1" @click="show">
            </div>

            <div class="service">
              <img
                src="../../static/img/set.png"
                alt
                width="22"
                height="22"
                class="img"
                @click="setType"
                v-show="number2 ==0"
              >
              <img
                src="../../static/img/set1.png"
                alt
                width="22"
                height="22"
                class="img"
                @click="setType"
                v-show="number2 ==1"
              >
              <span>我已仔细阅读并同意
                <router-link to="/service" class="set">服务及隐私条款</router-link>
              </span>
            </div>
            <button
              :class="{btn:number2==0,btn2:number2 ==1}"
              v-bind:disabled="number2==0"
              @click="login"
            >登录</button>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import Clipboard from "clipboard";
import VHeader from "./innerList/header";
import VFooter from "./innerList/footer";
import xianshi from "../../static/img/xianshi.png";
import yc from "../../static/img/yingchang.png";
export default {
  components: {
    VHeader,
    VFooter
  },
  props: {},
  data() {
    return {
      arrt: "password",
      showPre: "password",
      number: 0,
      number1: 0,
      page: 0,
      secret1: "",
      secret: "",
      tips: false, //提示
      com: 1,
      publicKey: "",
      server: "",
      number2: 0,
      dianji: xianshi
    };
  },
  methods: {
    copy(weilei) {
      console.log("hha");
      let clipboard = new Clipboard(weilei);
      clipboard.on("success", e => {
        console.log("1111111");
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        console.log("2222");
        clipboard.destroy();
      });
    },
    setType() {
      console.log(this.number2);
      if (this.number2 == 0) {
        this.number2 = 1;
        console.log(this.number2);
      } else if (this.number2 == 1) {
        this.number2 = 0;
        console.log(this.number2);
      }
    },
    login() {
      try {
        let strkey = StellarSdk.StrKey;
        let arrPrivate = strkey.decodeEd25519SecretSeed(this.secret);
      } catch (err) {
        console.log(err);
        this.tips = true;
      }

      if (this.secret === "") {
        alert("请输入私钥");
        location.reload();
      } else if (this.tips == true) {
        alert("提示:您输入的私钥格式不正确或不符合格式，请确认后输入）");
        location.reload();
      } else if (this.tips == false) {
        var _this = this;
        StellarSdk.Config.setAllowHttp(true);
        StellarSdk.Network.use(new StellarSdk.Network(_this.horizonSecret));
        _this.server = new StellarSdk.Server(_this.horizonUrl);
        var strkey = StellarSdk.StrKey;
        var arrPrivate = strkey.decodeEd25519SecretSeed(_this.secret);
        var keypair = new StellarSdk.Keypair({
          type: "ed25519",
          secretKey: arrPrivate
        });
        _this.publicKey = strkey.encodeEd25519PublicKey(keypair.rawPublicKey());
        console.log(_this.secret);
        console.log(_this.publicKey);
        _this.server
          .loadAccount(_this.publicKey)
          .then(function(account) {
            _this.$router.push("/inner/" + _this.secret);
            console.log("xixixi");
          })
          .catch(err => {
            console.log("hahah");
            _this.$router.push("/inner/" + _this.secret);

            // alert('当前账户未激活，请激活后执行操作')
            // location.reload()
          });
      }
    },
    show1() {
      this.page = 2;
    },
    showPrev() {
      if (this.number1 == 0) {
        this.showPre = "text";
        this.number1 = 1;
      }
    },
    show() {
      if (this.number == 0) {
        this.dianji = yc;
        this.arrt = "text";
        this.number = 1;
      } else if (this.number == 1) {
        this.dianji = xianshi;
        this.arrt = "password";
        this.number = 0;
      }
    },
    //生成二维码
    qrcode1() {
      let qrcode1 = new QRCode("qrcode1", {
        width: 150,
        height: 150,
        text: this.publicKey,
        colorDark: "#000",
        colorLiht: "#fff"
      });
    },
    qrcode2() {
      let qrcode2 = new QRCode("qrcode2", {
        width: 150,
        height: 150,
        text: this.secret1,
        colorDark: "#000",
        colorLiht: "#fff"
      });
    },
    changePage(event) {
      //  this.qrcode();
      if (event.target.innerHTML == "创建钱包") {
        this.page = 1;

        console.log(this.page);
      } else if (event.target.innerHTML == "登录钱包") {
        this.page = 2;
        console.log(this.page);
      }
      this.qrcode1();
      this.qrcode2();
    }
  },
  created() {
    var keypair = StellarSdk.Keypair.random();
    var strkey = StellarSdk.StrKey;
    this.publicKey = strkey.encodeEd25519PublicKey(keypair._publicKey);
    this.secret1 = strkey.encodeEd25519SecretSeed(keypair._secretSeed);
  },
  mounted() {
    this.page = 0;
    console.log(this.publicKey);
  }
};
</script>
<style scoped>
.created {
  width: 100%;
  height: 100%;
  background: linear-gradient(#11151c, #222a38);
}
.main {
  padding: 30px;
  height: 900px;
  background-image: url("../../static/img/background.png");
  background-size: 100% 100%;
}
.main-header {
  height: 32px;
  line-height: 32px;
  font-weight: bold;
  font-size: 32px;
  color: #f5f5f5;
}
.main-inner {
  margin-top: 150px;
  margin-left: 129px;
  max-width: 1009px;
  /* background: antiquewhite; */
}
.mian-left {
  padding-left: 171px;
  padding-top: 20px;
}
.main-inner p {
  font-size: 16px;
  margin-bottom: 10px;
}
.innerList {
  margin-top: 56px;
  color: #dbdbdb;
}
.btn {
  color: #f5f5f5;
  margin-top: 53px;
  height: 43px;
  width: 212px;
  background: rgba(99, 98, 102, 1);
  border-radius: 4px;
  border: none
}
.btn2 {
  color: #f5f5f5;
  margin-top: 53px;
  height: 43px;
  width: 212px;
  background: #10c796;
  border-radius: 4px;
  border: none

}
.impor {
  display: inline-block;
  margin: 30px 0;
  color: red;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(232, 73, 73, 1);
}
.wei {
  display: inline-block;
  margin-bottom: 10px;
}
.service {
  margin-top: 35px;
}
.wellat {
  margin-left: 86px;
  color: #ccc;
}
.inpu {
  padding-left: 5px;
  letter-spacing: 1px;
  width: 715px;
  height: 36px;
  background: #4e4e4e;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 1);
  border: none;
  border-radius: 4px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(16, 199, 150, 1);
}

.prev {
  margin-top: 32px;
  display: inline-block;
}
.pub {
  margin-top: 32px;
  margin-right: 50px;
  display: inline-block;
}
.mask {
  position: absolute;
  z-index: 100;
  width: 180px;
  height: 180px;;
  background: rgba(35, 35, 36, 0.9);
}
.set {
  color: #01e3b5;
}
.img:hover {
  cursor: pointer;
}
.address {
  margin-right: 10px;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(245, 245, 245, 1);
}
.er {
  display: inline-block;
  margin-top: 10px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
}
.backups {
  font-weight: 400;
  color: rgba(245, 245, 245, 1);
  margin-top: 50px;
  width: 212px;
  height: 44px;
  background: rgba(16, 199, 150, 1);
  border-radius: 4px;
  border: none
}
.inpu1 {
  margin-top: 24px;
  padding-left: 5px;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(16, 199, 150, 1);
  width: 690px;
  height: 48px;
  line-height: 48px;
  border: 1px solid rgba(16, 199, 150, 1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}
.Sign {
  margin-top: 55px;
  width: 212px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  background: rgba(16, 199, 150, 1);
  border-radius: 4px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(245, 245, 245, 1);
}
.key {
  margin-top: 5px;
}

.shuru {
  display: inline-block;
  width: 715px;
  height: 36px;
  background: #212121;
}
.pube {
  margin: 0;
  padding-left: 3px;
  width: 679px;
  height: 36px;
  background: #4e4e4e;
  border: none;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #01e3b5;
}
.keyImg {
  padding-top: 9px;
  padding-right: 5px;
  float: right;
  overflow: hidden;
}
.keyImg1 {
  padding-top: 9px;
  padding-right: 5px;
  float: right;
  overflow: hidden;
}
.eye {
  position: absolute;
  margin-left: -35px;
  margin-top: 8px;
}
.code-pading {
  padding: 15px;
  background: #f5f5f5;
}
</style>