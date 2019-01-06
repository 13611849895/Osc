<template>
  <div class="inner">
    <v-header class="header"></v-header>
    <main class="main">
      <div class="main-left">
        <div class="img">
          <img src="../../static/img/index_tx@2x.png" width="48" height="48" alt="头像">
        </div>
        <div class="coinName">
          <span>钱包名字</span>
          <!-- <img class="coinImg" src="./img/u232.png" alt> -->
          <p class="cash">≈ ￥ {{price | numFilter}}</p>
        </div>
        <div class="operationList">
          <ul class="opList" @click="handleClick">
            <li  v-bind:class="{back:back1 == 1}" @click="num(1)">
              <div class="li1" >
                <img :src="come ==1? wallet1:wallet2" width="26" height="26" alt>
                <span v-bind:class="{spanColor:come != 1,span1Color:come ==1}">钱包信息</span>
              </div>
            </li>
            <li v-bind:class="{back:back1 == 2}" @click="num(2)">
              <div class="li1">
                <img :src="come ==2 ?asset1:asset2" width="26" height="26" alt>
                <span v-bind:class="{spanColor:come != 2,span1Color:come ==2}">资产</span>
              </div>
            </li>
            <li v-bind:class="{back:back1 == 3}" @click="num(3)">
              <div class="li1">
                <img :src="come == 3 ? payment1:payment2 " width="26" height="26" alt>
                <span v-bind:class="{spanColor:come != 3,span1Color:come ==3}">转账</span>
              </div>
            </li>
            <li v-bind:class="{back:back1 == 4}" @click="num(4)">
              <div class="li1">
                <img :src="come == 4 ? code1:code2" width="26" height="26" alt>
                <span v-bind:class="{spanColor:come != 4,span1Color:come ==4}">收款</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-right">
        <v-wallet v-if="come==1" v-on:listenPrice="showPrice"></v-wallet>
        <v-asset v-if="come==2" :coinPrice="price"></v-asset>
        <v-payments v-if="come==3"></v-payments>
        <v-receivables  v-if="come==4"></v-receivables>
      </div>
    </main>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from "./innerList/header";
import VFooter from "./innerList/footer";
import VWallet from "./innerList/wallet";
import VAsset from "./innerList/asset";
import VPayments from "./innerList/payments";
import VReceivables from "./innerList/receivables"
import wallet1 from '../../static/img/index_message@2x.png'
import wallet2 from '../../static/img/index_message_default@2x.png'
import asset1 from '../../static/img/index_pressed@2x.png'
import asset2 from '../../static/img/index_zc_default@2x.png'
import payment1 from '../../static/img/index_zz_@2x.png'
import payment2 from '../../static/img/index_zz_default@2x.png'
import code1 from '../../static/img/index_code_pressed@2x.png'
import code2 from '../../static/img/index_code_default@2x.png'

export default {
  components: {
    VHeader,
    VFooter,
    VWallet,
    VAsset,
    VPayments,
    VReceivables
  },
  data() {
    return {
      come: 1, //v-show
      price: 0,
      back1:1,
      wallet1,
      wallet2,
      asset1,
      asset2,
      payment1,
      payment2,
      code1,
      code2
      
    };
  },
  filters: {
    numFilter(value) {
      let transformVal = Number(value).toFixed(3);
      let realVal = transformVal.substring(0, transformVal.length - 1);
      return Number(realVal);
    }
  },
  methods: {
    num(val) {
      this.back1 = val
    },
    
    handleClick(event) {
      if (this.back1==1) {
        this.come = 1;
        console.log(this.show);
      } else if (this.back1==2) {
        this.come = 2;
        console.log(this.show);
      } else if (this.back1==3) {
        this.come = 3;
        console.log(this.show);
      } else if (this.back1==4) {
        this.come = 4;
      }   
    },
    showPrice(data) {
      this.price = data;
      this.price.toFixed(2);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.inner {
  margin: 0 auto;
}
.main {
  padding-bottom: 32px;
  min-height: 880px;
  padding-top: 72px;
  width: 100%;
  /* background: linear-gradient(#11151c, #222a38); */
  background: #1e2430;
}
.main-left {
  float: left;
  padding-top: 25px;
  width: 160px;
  height: 870px;
  background-color: #171d26;
  overflow: hidden;
}
.main-right {
  margin-left: 176px;
  /* margin-bottom: 250px; */
}
.img {
  padding-left: 60px;
}

.coinName {
  margin-top: 19px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-align: center;

  color: rgba(179, 179, 179, 1);
}
.coinImg {
  margin-left: 30px;
  width: 23px;
  height: 23px;
  vertical-align: middle;
}
.cash {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
}
.operationList {
  margin-top: 30px;
  padding-top: 10px;
  width: 100%;
  height: 70%;
  font-size: 30px;
}
.opList li {
  /* margin: 10px auto 20px; */
  height: 50px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
}
.opList li:hover {
  background-color: #283242;
}
.li1 {
  padding-top: 15px;
  margin-left: 16px;
}
.li1 img {
  float: left;
  overflow: hidden;
}
.li1 span {
  margin-left: 20px;
  /* color: #999999 */
}

.spanColor {
  margin-left: 20px;
  color: #999999
}
.span1Color{
  font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(230,230,230,1);
}
.back {
  background:rgba(28,35,46,1);
  color:rgba(229,229,229,1);
}
</style>