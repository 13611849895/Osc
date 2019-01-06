<template>
  <div class="walletInfo">
    <div class="mask" v-show="maskCode == 2">
      <div class="maskBackground">
        <div class="close0" @click="close0">X</div>
        <p class="code-title">公钥地址</p>
        <div class="code1" id="qrcode6"></div>
      </div>
    </div>
    <div class="mask1" v-if="mask1Tips">
      <div class="mask1Box">
        <div class="mask1Title">
          <img src="../../../static/img/true.png" width="28px" height="28px">
        </div>
        <div class="mask1Inner">已复制</div>
      </div>
    </div>
    <h2 class="title">账户信息</h2>
    <div class="address">
      <div class="my">
        <span class="small">我的地址：</span>
        <span class="big" id="big">{{publicKey}}</span>
        <img
          class="copy"
          src="../../../static/img/index_code@2x.png"
          width="22"
          height="22"
          title="二维码"
          @click="showCode"
        >
        <img
          class="code"
          src="../../../static/img/biger.png"
          width="18"
          height="18"
          @click="copy('.code')"
          data-clipboard-target="#big"
          title="复制地址"
        >
      </div>

      <div class="state" v-show="validType">
        <span class="small">当前状态：</span>
        <span class="big">已激活</span>
      </div>
      <div class="state" v-show="!validType">
        <span class="small">当前状态：</span>
        <span class="big">未激活</span>
        
        <!-- <button class="activation">点击激活</button> -->
      </div>
      <div class="promise">
        <span class="small">保证金：</span>
        <span class="big">{{promiseFee}} Osch</span>
        
        <img class="question" src="../../../static/img/u897.png" alt>
      </div>
      <div class="coinList">
        <div class="coin">
          <div class="coinImg">
            <div class="bao">
              <img src="../../../static/img/u15.png" width="40" height="40">
            </div>
            <strong clas>Osch</strong>
          </div>
          <div class="coinInner">
            <p class="banlance">{{oschNum | numFilter}}</p>
            <p class="ren">≈￥{{oschPrice | numFilter}}</p>
          </div>
        </div>
        <div class="coin" v-show="isTime">
          <div class="coinImg">
            <div class="bao">
              <img src="../../../static/img/u269.png" width="40" height="40">
            </div>
            <strong>Time</strong>
          </div>
          <div class="coinInner">
            <p class="banlance">{{timeNum | numFilter}}</p>
            <p class="ren">≈￥0.01</p>
          </div>
        </div>
        <div class="coin" v-show="isHour">
          <div class="coinImg">
            <div class="bao">
              <img src="../../../static/img/u259.png" width="40" height="40">
            </div>
            <strong>Hour</strong>
          </div>
          <div class="coinInner">
            <p class="banlance">{{hourNum | numFilter}}</p>
            <p class="ren">≈￥ --</p>
          </div>
        </div>
      </div>
    </div>
    <div class="record">
      <div class="transac">交易记录</div>
      <div class="element">
        <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="全部交易记录" name="second">
            <el-table
              :data="wArrPage.slice((currpage - 1) * pagesize, currpage * pagesize)"
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column prop="time" label="交易时间" width="100"></el-table-column>
              <el-table-column prop="num" label="交易金额" width="140" id="color1" class="money">
                <template slot-scope="scope">
                  <span :class="{transactionMoney1:scope.row.num.slice(0, 1)=='-'}"
                  >{{scope.row.num}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="from" label="来源账户" width="296" class="from"></el-table-column>
              <el-table-column prop="to" label="目标账户" width="296"></el-table-column>
              <el-table-column label="交易号" width="388">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button @click.native="transactionInfo">{{scope.row.transaction}}</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
              <el-table-column prop="activeType" label="交易类型" width="130"></el-table-column>
              <el-table-column prop="asset" label="交易代币" width="100"></el-table-column>
              <el-table-column prop="memo" label="备忘录"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="收入交易" name="first">
            <el-table
              :data="input.slice((currpage - 1) * pagesize, currpage * pagesize)"
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column prop="time" label="交易时间" width="100"></el-table-column>
              <el-table-column prop="num" label="交易金额" width="140" class="color1"></el-table-column>
              <el-table-column prop="from" label="来源账户" width="296"></el-table-column>
              <el-table-column prop="to" label="目标账户" width="296"></el-table-column>
              <el-table-column label="交易号" width="388">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button @click.native="transactionInfo">{{scope.row.transaction}}</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
              <el-table-column prop="activeType" label="交易类型" width="130"></el-table-column>
              <el-table-column prop="asset" label="交易代币" width="100"></el-table-column>
              <el-table-column prop="memo" label="备忘录"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="支出交易">
            <el-table
              :data="output.slice((currpage - 1) * pagesize, currpage * pagesize)"
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column prop="time" label="交易时间" width="100"></el-table-column>
              <el-table-column label="交易金额" width="140">
                 <template slot-scope="scope">
                  <span style="color:#F55436">{{scope.row.num}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="from" label="来源账户" width="296"></el-table-column>
              <el-table-column prop="to" label="目标账户" width="296"></el-table-column>
              <el-table-column label="交易号" width="388">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button @click.native="transactionInfo">{{scope.row.transaction}}</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
              <el-table-column prop="activeType" label="交易类型" width="130"></el-table-column>
              <el-table-column prop="asset" label="交易代币" width="100"></el-table-column>
              <el-table-column prop="memo" label="备忘录"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-pagination
            layout="prev, pager, next, sizes, total, jumper"
            :page-sizes="[5, 10, 15, 20, 25, 30]"
            :page-size="pagesize"
            :total="tab"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import QRCode from "qrcodejs2";

export default {
  components: {},
  props: {},
  data() {
    return {
      server: "", //Stellar
      sercet: this.$route.params.id, //私钥
      publicKey: "XXX",
      oschNum: "0", //Osch余额
      timeNum: "0",
      hourNum: "0",
      oschPrice: 0, //汇率
      account: "", //每次请求stellar返回的账户详情
      tableData: [],
      currpage: 1,
      pagesize: 10,
      activeName: "second",
      wPage: "",
      wArrPage: [],
      input: [], //正数放入收入
      output: [], //负数放入支出
      tab: 10,
      tabList: [], //添加代币数据列表
      validType: false,
      time: [], //time币
      hour: [], //huor币
      osch: [], //osch币
      limit: 200,
      isHour: false,
      isTime: false,
      promiseFee: 0,
      mask1Tips: false,
      mask1Inner: "目标地址不正确，请确认后重试",
      maskCode: 0
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
    qrcode6() {
      let qrcode6 = new QRCode("qrcode6", {
        width: 200,
        height: 200,
        text: "5511551155115151515151",
        colorDark: "#000",
        colorLiht: "#fff"
      });
    },
    close0() {
      this.maskCode = 0;
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
      this.setMask();
    },
    showCode() {
      this.maskCode = 2
    },
    setMask() {
      this.mask1Tips = true;
      setTimeout(() => {
        this.mask1Tips = false;
      }, 2000);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },

    // 分页插件
    getPrice: async function() {
      // setInterval(function(){
      var _this = this;
      this.$axios
        .get("http://wallet.myoschain.com/oschPrice/v1/listOschPrice")
        .then(res => {
          let price = res.data.result.price;
          _this.oschPrice = price * this.oschNum;
          this.$emit("listenPrice", this.oschPrice);

          // console.log(_this.timePrice);
          // console.log(res.data.result.price);
        })
        .catch(err => {
          console.log(err);
        });
      // console.log("haha");
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleClick(res, event) {
      if (event.target.innerHTML == "全部交易记录") {
        this.tab = this.wArrPage.length;
      } else if (event.target.innerHTML == "收入交易") {
      this.currpage = 1;
        this.tab = this.input.length;
      } else if (event.target.innerHTML == "支出交易") {
      this.currpage = 1;
        this.tab = this.output.length;
      }
    },
    //跳转交易详情页
    transactionInfo() {
      window.location.href =
        "http://coast.oschain.io/transactions/" +
        event.target.innerHTML +
        "/operations";
      console.log(event.target.innerHTML);
    },
    // 循环遍历数组，并抽取6个参数，然后放入wArrPage
    render(page) {
      let num = "5120.651605150";
      console.log(parseFloat(num).toFixed(2));
      console.log(page);
      for (let page1 of page) {
        let ob = {
          time: page1.created_at, //交易时间
          transaction: page1.transaction_hash, //交易哈希
          num: parseFloat(page1.amount).toFixed(3), //交易数量
          from: page1.from, //来自账户
          to: page1.to, //目标地址
          asset: page1.asset_type, //交易币种
          activeType: page1.type, //交易类型 （交易、创建账户等）
          code: page1.asset_code, //交易码：可以取到time跟hour
          memo: "",
          from: page1.from
        };
        console.log(ob.memo);

        //请求到transaction中的memo

        // page1
        //   .transaction()
        //   .then(res => {
        //     ob.memo = res.memo;
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });

        if (ob.asset == "native") {
          ob.asset = "Osch";
        } else if (page1.asset_code == "hour") {
          ob.asset = "Hour";
        } else if (page1.asset_code == "time") {
          ob.asset = "Time";
        }
        if (page1.type == "payment") {
          if (page1.from == this.publicKey) {
            ob.num = "-" + parseFloat(page1.amount).toFixed(2);
          } else {
            ob.num = "+" + parseFloat(page1.amount).toFixed(2);
          }
          this.wArrPage.push(ob);
        } else if (page1.type == "create_account") {
          (ob.num = parseFloat(page1.starting_balance).toFixed(2)), //交易数量
            // (ob.memo = '无'),
            (ob.to = page1.funder), //目标地址
            (ob.asset = "Osch"); //交易币种
          ob.from = page1.account;
          if (page1.funder == this.publicKey) {
            ob.num = "-" + parseFloat(page1.starting_balance).toFixed(2);
          } else {
            ob.num = "+" + parseFloat(page1.starting_balance).toFixed(2);
          }
          this.wArrPage.push(ob);
        } else if (page1.type == "change_trust") {
          (ob.num = "-" + "10.00"), //交易数量
            // (ob.memo = "111"),
            (ob.to = page1.asset_issuer), //目标地址
            (ob.asset = page1.asset_code), //交易币种
            (ob.activeType = page1.type), //交易类型 （交易、创建账户等）
            (ob.from = page1.asset_issuer);
          this.wArrPage.push(ob);
        }
      }
      this.tab = this.wArrPage.length;
      // console.log(this.wArrPage);
    },
    //分类显示收入、支出
    getPage: async function() {
      for (var i = 0; i < this.wArrPage.length; i++) {
        var num = this.wArrPage[i].num;
        if (num.substr(0, 1) == "+") {
          this.input.push(this.wArrPage[i]);
          // console.log(this.input);
        }
        if (num.substr(0, 1) == "-") {
          this.output.push(this.wArrPage[i]);
        }
      }
      //拿到数据列表然后筛选出翻入各自币种之中
      for (var osc of this.wArrPage) {
        if (osc.asset == "Osch") {
          this.osch.push(osc);
        } else if (osc.asset == "Time") {
          this.time.push(osc);
        } else if (osc.asset == "Hour") {
          this.hour.push(osc);
        }
      }
    },
    //初始化
    init: async function() {
      var _this = this;
      StellarSdk.Config.setAllowHttp(true);
      StellarSdk.Network.use(new StellarSdk.Network(_this.horizonSecret));
      _this.server = new StellarSdk.Server(_this.horizonUrl);

      var strkey = StellarSdk.StrKey;
      var arrPrivate = strkey.decodeEd25519SecretSeed(_this.sercet);
      var keypair = new StellarSdk.Keypair({
        type: "ed25519",
        secretKey: arrPrivate
      });
      _this.publicKey = strkey.encodeEd25519PublicKey(keypair.rawPublicKey());
      //查看资产
      //判断账户是否激活, 如果未激活,则不现实交易记录
      _this.server
        .loadAccount(this.publicKey)
        .then(function(account) {
          _this.account = account;
          _this.validType = true;
          //把账户信息保存在session中
          let ueserInfo = JSON.stringify({
            aco: account
          });
          sessionStorage.ueserInfo = ueserInfo;
          for (var num of account.balances) {
            if (num.asset_code == "hour") {
              _this.hourNum = num.balance;
              _this.isHour = true; //确认账户中信任过Huor资产
            } else if (num.asset_code == "time") {
              _this.timeNum = num.balance;
              _this.isTime = true; //确认账户中信任过Time资产
            } else if (num.asset_type == "native") {
              _this.oschNum = num.balance;
            }
          }
          _this.promiseFee = _this.account.balances.length * 10; //最低保证金
        })
        .catch(err => {
          console.log(err);
          _this.validType = false;
        });
      // 获取历史交易
      await _this.server
        .operations()
        .forAccount(this.publicKey)
        .limit(this.limit)
        .call()
        .then(function(page) {
          console.log(page);
          _this.wPage = page;
          //调用render方法wPage传入进去
          _this.render(_this.wPage.records);
          console.log(_this.wArrPage);
        });
      _this.getPage();
      //保存用户的私钥
      let user = JSON.stringify({
        pub: this.publicKey,
        priv: this.sercet,
        fee: this.promiseFee
      });
      sessionStorage.user = user;

      //把Osch保存在session中
      let Osch1 = JSON.stringify({
        osch: this.osch
      });
      sessionStorage.Osch = Osch1;
      //把Time保存在session中
      let time1 = JSON.stringify({
        time: this.time
      });
      sessionStorage.Time = time1;
      //把Hour保存在session中
      let hour1 = JSON.stringify({
        hour: this.hour
      });
      sessionStorage.Hour = hour1;
    }
  },
  created() {},
  mounted() {
    this.init();
    console.log(this.hour);
    console.log(this.time);
    this.getPrice();
    this.qrcode6();
    setInterval(() => {
      this.getPrice();
      // console.log(this.getPrice());
    }, 15000);
  }
};
</script>
<style scoped>
/* 饿了么 */
.el-table .warning-row {
  background: red;
}
.from {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(202, 208, 219, 1);
}
.el-table .success-row {
  background: blue;
}

.walletInfo {
  min-height: 895px;
  background-color: #171d26;
  text-align: left;
}
.title {
  padding: 20px 0 0 20px;
  font-size: 22px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
.address {
  padding-top: 20px;
  padding-left: 20px;
  font-size: 20px;
}
.copy {
  margin-left: 0px;
  /* width: 20px; */
  /* height: 20px; */
  vertical-align: middle;
}
.code {
  /* padding-top: 4px; */
  margin-top: 4px;
  /* padding-left: 3px; */
  margin-left: 3px;
}
.question {
  margin-left: 15px;
  width: 20px;
  height: 20px;
}
.coin {
  margin-right: 20px;
  display: inline-block;
  width: 330px;
  height: 100px;
  background-image: url("../../../static/img/coin.png");
  background-size: 100% 100%;

  border-radius: 5px;
}
.coinImg {
  float: left;
  padding-left: 19px;
  margin-top: 29px;
  overflow: hidden;
}
.coinImg strong {
  margin-left: 9px;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
}
.coinImg img {
  vertical-align: middle;
  margin-top: 3px;
  margin-left: 3px;
}
.coinInner {
  float: right;
  margin-right: 16px;
  padding-left: 15px;
  padding-top: 31px;
  height: 100%;
  font-size: 17px;
}
.banlance {
  display: inline-block;
  color: #01e3b5;
}
.my {
  margin-bottom: 15px;
}
.promise {
  margin-bottom: 15px;
}
.state {
  margin-bottom: 15px;
}
.coinList {
  margin-bottom: 30px;
}
.record {
  padding-left: 20px;
  padding-bottom: 20px;
}
.transac {
  margin-bottom: 30px;
  width: 200px;
  font-size: 22px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
/* 交易号 */
.el-button-group .el-button {
  white-space: pre-wrap;
}
.small {
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.big {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(240, 240, 240, 1);
}
.ren {
  padding-top: 3px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
}
.bao {
  display: inline-block;
  width: 46px;
  height: 46px;

  border: 3px solid rgba(104, 104, 104, 0.2);
  border-radius: 50%;
}
.element #color1 {
  color: #01e3b5;
}
.el-table__row .el-table_1_column_2 {
  color: aqua;
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
.mask {
   position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
}
.close0 {
  position: absolute;
  padding: 2px;
  top: -20px;
  left: 60px;
  color: #ffffff;
  cursor: default;
  text-align: center;
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
  padding-left: 65px;
  float: left;
  margin-top: -55px;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.code1 {
  z-index: 9999;
  background-repeat: no-repeat;
}
.transactionMoney1 {
  color: #f55436;
}
/* .element .el-table td:nth-child(1),
td:nth-child(3),
td:nth-child(4),
td:nth-child(6),
td:nth-child(7),
td:nth-child(8) {
  color: rgba(202, 208, 219, 1);
}
 .element .el-table td:nth-child(2) {
   color: rgba(1,227,181,1) !important
 } */
 /* .el-table .cell {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-align: center;
} */
</style>