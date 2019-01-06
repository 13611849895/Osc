<template>
  <div class="rece">
    <div class="mask1" v-if="mask1Tips">
      <div class="mask1Box">
        <div class="mask1Title">
          <img src="../../../static/img/true.png" width="28px" height="28px">
        </div>
        <div class="mask1Inner">已复制</div>
      </div>
    </div>
    <span class="title">收款</span>
    <div class="address">
      <span class="add-left">钱包地址：</span>
      <span class="add-right" id="pub-address">{{user}}</span>
    </div>
    <div class="code">
      <div class="code2" id="qrcode1"></div>
    </div>
    <div class="tip">
      <div class="tips">对方可以通过钱包地址或扫描收款二维码，对您账户进行转账。</div>
    </div>
    <button class="btn" @click="copy('.btn')" data-clipboard-target="#pub-address" title="复制地址">复制地址</button>
    <div class="back"></div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import Clipboard from "clipboard";

export default {
  components: {},
  props: {},
  data() {
    return {
      user: "",
      mask1Tips: false,
      mask1Inner: "目标地址不正确，请确认后重试"
    };
  },
  methods: {
    setMask() {
      this.mask1Tips = true;
      setTimeout(() => {
        this.mask1Tips = false;
      }, 1000);
    },
    qrcode1() {
      let qrcode1 = new QRCode("qrcode1", {
        width: 211,
        height: 211,
        text: this.user,
        colorDark: "#000",
        colorLiht: "#fff"
      });
    },
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
      this.setMask()
    }
  },
  created() {},
  mounted() {
    let userInfo = JSON.parse(sessionStorage.user);
    this.user = userInfo.pub;
    this.qrcode1();
  }
};
</script>
<style scoped>
.rece {
  padding: 0 0 0 32px;
  min-height: 895px;
  background: rgba(23, 29, 38, 1);
}
.title {
  display: inline-block;
  margin-top: 24px;
  font-size: 22px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
.address {
  margin-top: 40px;
}
.add-left {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.add-right {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(240, 240, 240, 1);
}
.code {
  margin-top: 48px;
  padding: 16px;
  display: inline-block;
  background: #fff;
}
.tip {
  display: inline-block;
  margin-left: 32px;
}
.tips {
  display: inline-block;
  /* padding-bottom: 16px; */
  width: 210px;
  line-height: 30px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.btn {
  display: block;
  margin-top: 35px;
  width: 212px;
  height: 44px;
  background: rgba(16, 199, 150, 1);
  border-radius: 4px;
  border: none;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(245, 245, 245, 1);
}
.back {
  height: 350px;
  width: 100%;
  background-image: url("../../../static/img/sk_bg@2x.png");
  background-size: 100% 100%;
}
.mask1 {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
}
.mask1Box {
  position: relative;
  margin: 20% auto;
  width: 142px;
  height: 60px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.6;
  border-radius: 4px;
}
.mask1Title {
  float: left;
  overflow: hidden;
  margin: 16px 12px 16px 28px;
}
.mask1Inner {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(240, 240, 240, 1);
}
</style>