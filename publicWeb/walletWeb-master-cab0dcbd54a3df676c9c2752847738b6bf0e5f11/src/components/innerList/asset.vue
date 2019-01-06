<template>
  <div class="asset">
    <div class="mask1" v-if="actionShow">
      <div class="mask1Box">
        <div class="mask1Title">
          <img src="../../../static/img/true.png" width="28px" height="28px">
        </div>
        <div class="mask1Inner">{{actionState}}</div>
      </div>
    </div>
    <div class="mask1" v-if="actionShow1">
      <div class="mask1Box1">
        <div class="mask1Title">
          <!-- <img src="../../../static/img/true.png" width="28px" height="28px"> -->
        </div>
        <div class="mask1Inner">操作失败，当前代币尚有余额，请稍后重试</div>
      </div>
    </div>
    <div class="mask" v-show="open">
      <div class="transactionMask">
        <div class="closeMask" @click="closeClick">X</div>
        <p class="addCoinTitle">添加资产</p>
        <div class="addTime" v-show="!hourNum" >
          <div class="coinImg">
            <img src="../../../static/img/u259.png" width="44" height="44">
          </div>
          <div class="coinInner">
            <h2 class="title">Hour</h2>
          </div>
          <button class="btn" type="primary" @click="changeTrust(isHour)">信任Hour</button>
        </div>
        <div class="addTime" v-show="!timeNum">
          <div class="coinImg">
            <img src="../../../static/img/u269.png" width="44" height="44">
          </div>
          <div class="coinInner">
            <h2 class="title">Time</h2>
          </div>
          <button class="btn" type="primary" @click="changeTrust(isTime)">信任Time</button>
        </div>
        <hr>
        <!-- <button class="maskBtn send" @click="closeClick">确认无误(关闭遮罩层)</button> -->
      </div>
    </div>
    <div class="coinList">
      <div v-bind:class="{coin:true,back:back1 == 1}" @click="getOsch($event)">
        <div class="coinImg">
          <img src="../../../static/img/u15.png" width="32" height="32">
        </div>
        <div class="coinInner">
          <span>Osch</span>
          <!-- <p>余额: {{oschNum | numFilter}} Osch</p> -->
        </div>
      </div>
      <div v-bind:class="{coin:true,back:back1 == 2}" v-show="timeNum" @click="getTime($event)">
        <div class="coinImg">
          <img src="../../../static/img/u269.png" width="32" height="32">
        </div>
        <div class="coinInner">
          <span>Time</span>
          <!-- <p>余额: {{timeNum | numFilter}} Time</p> -->
        </div>
      </div>
      <div v-bind:class="{coin:true,back:back1 == 3}" v-show="hourNum" @click="getHour($event)">
        <div class="coinImg">
          <img src="../../../static/img/u259.png" width="32" height="32">
        </div>
        <div class="coinInner">
          <span>Hour</span>
          <!-- <p>余额: {{hourNum | numFilter}} Hour</p> -->
        </div>
      </div>
      <div class="addCoin" @click="openMask" v-show="allCoin">
        <!-- <div class="add">+</div> -->
        <img src="../../../static/img/asd.png" width="15" height="15" class="add">
        
        <span>添加资产</span>
      </div>
    </div>
    <div class="main-right">
      <div class="mainHeader">
        <div class="headerImg">
          <span class="info">账户信息</span>
          <span class="balance">余额:</span>
        </div>
        <p class="mainFont">{{number | numFilter}}</p>
        <span class="word">{{unit}}</span>
        <div class="exchange">
          <span class="rmb">RMB</span>
          <span class="cash">≈ ￥ 0.01</span>
          <button v-show="showBtn" @click="cancelTrust" class="close">取消信任</button>
        </div>
        <span class="transaction1">交易记录</span>
      </div>
      <div class="history">
        <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="全部交易记录" name="second">
            <el-table
              :data="coin.slice((currpage - 1) * pagesize, currpage * pagesize)"
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column prop="time" label="交易时间" width="100"></el-table-column>
              <el-table-column label="交易金额" width="120">
                <template slot-scope="scope">
                  <span :class="{transactionMoney1:scope.row.num.slice(0, 1)=='-'}"
                  >{{scope.row.num}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="from" label="来源账户" width="286"></el-table-column>
              <el-table-column prop="to" label="目标账户" width="286"></el-table-column>
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
              <el-table-column label="交易金额" width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.num}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="from" label="来源账户" width="286"></el-table-column>
              <el-table-column prop="to" label="目标账户" width="286"></el-table-column>
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
              <el-table-column label="交易金额" width="120">
                <template slot-scope="scope">
                  <span style="color:#F55436">{{scope.row.num}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="from" label="来源账户" width="286"></el-table-column>
              <el-table-column prop="to" label="目标账户" width="286"></el-table-column>
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
          <!-- <! <button @click="getPage">next</button> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import timeCoin from "../../../static/img/u269.png";
import oschCoin from "../../../static/img/u15.png";
import hourCoin from "../../../static/img/u259.png";
export default {
  components: {},
  props: ["coinPrice"],
  data() {
    return {
      allCoin: true,
      coin: [],
      oschNum: "",
      timeNum: "",
      hourNum: "",
      open: false,
      isTime: {},
      activeName: "second",
      isHour: {},
      sercet: "",
      publick: "",
      account: "",
      server: "",
      tab: 10,
      osch: [], //osch代币
      time: [], //time代币
      hour: [], // hour 代币
      currpage: 1,
      pagesize: 10,
      input: [],
      output: [],
      number: 0,
      unit: "",
      oscImg: oschCoin,
      showBtn: false, //取消信任按钮
      back1: 1,
      loading: true,
      moneyColor: 1,
      actionState: "操作成功",
      actionShow: false,
      actionShow1: false
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
    //loading 插件
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    getOsch(event) {
      console.log(event.currentTarget);
      this.coin = this.osch;
      this.getPage(this.osch);
      this.tab = this.osch.length;
      this.number = this.oschNum;
      this.unit = "Osch";
      this.oscImg = oschCoin;
      this.showBtn = false;
      this.back1 = 1;
    },
    getTime(event) {
      console.log(event.currentTarget);
      this.coin = this.time;
      this.getPage(this.time);
      this.tab = this.time.length;
      this.number = this.timeNum;
      this.unit = "Time";
      this.oscImg = timeCoin;
      this.showBtn = true;
      this.back1 = 2;
    },
    getHour(event) {
      console.log(event.currentTarget);
      this.coin = this.hour;
      this.getPage(this.hour);
      this.tab = this.hour.length;
      this.number = this.hourNum;
      this.unit = "Hour";
      this.oscImg = hourCoin;
      this.showBtn = true;
      this.back1 = 3;
    },
    //分页
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
        this.currpage = 1
        this.tab = this.osch.length;
      } else if (event.target.innerHTML == "收入交易") {
        this.currpage = 1
        this.tab = this.input.length;
      } else if (event.target.innerHTML == "支出交易") {
        this.currpage = 1
        this.tab = this.output.length;
      }
    },
    getPage(osch) {
      this.input = [];
      this.output = [];
      for (var i = 0; i < osch.length; i++) {
        var num = osch[i].num;
        if (num.substr(0, 1) == "+") {
          this.input.push(osch[i]);
        }
        if (num.substr(0, 1) == "-") {
          this.output.push(osch[i]);
        }
      }
    },
    transactionInfo() {
      window.location.href =
        "http://coast.oschain.io/transactions/" +
        event.target.innerHTML +
        "/operations";
      console.log(event.target.innerHTML);
    },
    init() {
      let account1 = JSON.parse(sessionStorage.ueserInfo);
      let coin1 = account1.aco.balances;
      if (coin1.length >= 3) {
        this.allCoin = false;
      }
      for (var coin2 of coin1) {
        if (coin2.asset_code == "hour") {
          this.hourNum = coin2.balance;
        } else if (coin2.asset_code == "time") {
          this.timeNum = coin2.balance;
        } else if (coin2.asset_type == "native") {
          this.oschNum = coin2.balance;
        }
      }
      this.number = this.oschNum;
    },
    //点击信任
    changeTrust(coin) {
      this.open = false;
      const loading = this.$loading({
        lock: false,
        text: "玩命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let _this = this
      var transaction = new StellarSdk.TransactionBuilder(_this.account, {
        fee: "100000000"
      })
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: coin
          })
        )
        .build();
      transaction.sign(StellarSdk.Keypair.fromSecret(_this.sercet));
      _this.server
        .submitTransaction(transaction)
        .then(function(res) {
          // _this.fullscreenLoading = false;
          loading.close();
          _this.actionShow = true;
          setTimeout(()=>{
            location.reload()
          },2000)
        })
        .catch(function(err) {
          loading.close();
          _this.actionShow1 = true;
          setTimeout(()=>{
            location.reload()
         },2000)
          
        });
    },
    cancelTrust() {
      
      if (this.unit == "Time") {
        if (this.timeNum > 0) {
          this.actionShow1 = true
          setTimeout(()=>{
          this.actionShow1 = false
          },3000)
        } else {
          this.closeTrust(this.isTime);
        }
      }
      if (this.unit == "Hour") {
        if (this.hourNum > 0) {
          this.actionShow1 = true
          setTimeout(()=>{
          this.actionShow1 = false
          },3000)
        } else {
          this.closeTrust(this.isHour);
        }
      }
    },
    closeTrust(asCoin) {
      const loading = this.$loading({
        lock: false,
        text: "玩命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let _this =this
      var transaction = new StellarSdk.TransactionBuilder(this.account, {
        fee: "100000000"
      })
        .addOperation(
          StellarSdk.Operation.changeTrust({
            // asset: this.isHour,
            asset: asCoin,
            source: this.publicKey,
            limit: "0"
          })
        )
        .build();
      transaction.sign(StellarSdk.Keypair.fromSecret(this.sercet));
      this.server
        .submitTransaction(transaction)
        .then(function(res) {
          loading.close();
          _this.actionShow = true;
          setTimeout(()=>{
            location.reload()
         },2000)
        })
        .catch(function(err) {
          loading.close();
          _this.actionShow1 = true;
          setTimeout(()=>{
            location.reload()
         },2000)
          // alert("授权失败");
        });
    },
    //打开遮罩层
    openMask() {
      if (this.timeNum != "" && this.hourNum != "") {
        alert("暂无可添加的代币");
      } else {
        this.open = true;
      }
    },
    closeClick() {
      this.open = false;
    }
  },
  created() {
    let hour = JSON.parse(sessionStorage.Hour);
    for (var hour1 of hour.hour) {
      this.hour.push(hour1);
    }
    console.log(this.hour);
    let time = JSON.parse(sessionStorage.Time);
    for (var time1 of time.time) {
      this.time.push(time1);
    }
    console.log(this.time);
    let osch = JSON.parse(sessionStorage.Osch);
    for (var osch1 of osch.osch) {
      this.osch.push(osch1);
    }
    this.coin = this.osch;
    this.tab = this.osch.length;
    this.unit = " Osch";
    this.getPage(this.osch);

    let user = JSON.parse(sessionStorage.user);
    this.sercet = user.priv;
    this.publick = user.pub;
    var _this = this;
    StellarSdk.Config.setAllowHttp(true);
    StellarSdk.Network.use(new StellarSdk.Network(_this.horizonSecret));
    _this.server = new StellarSdk.Server(_this.horizonUrl);
    _this.server.loadAccount(this.publick).then(function(account) {
      _this.account = account;
      console.log(_this.account);
    });
  },
  mounted() {
    this.init();
    this.isTime = new StellarSdk.Asset(
      "time",
      "GDH2OGN3UJXKIVYELLPCJUSNG7KBNHYSA5QFIV2ZZWUJJAWYDQAAFJZW"
    );
    this.isHour = new StellarSdk.Asset(
      "hour",
      "GA2KXCLNAECHU37B66DZISGFZG73JUYFEDNS3U7Q2O7LJORDYWSZ4W74"
    );
    console.log(this.coinPrice);
    console.log(this.coin);
    for (var i of this.coin) {
      let semb = i.num.slice(0, 1);
      if (semb == "+") {
        this.moneyColor = 2;
      } else {
        this.moneyColor = 3;
      }
    }
  }
};
</script>
<style scoped>
.asset {
  width: 100%;
  /* height: 100%; */
  min-height: 895px;
  /* background: aliceblue; */
  background: #171d26;
}
.coinList {
  float: left;
  width: 145px;
  /* height: 100%; */
  background: rgb(151, 182, 151);
  overflow: hidden;
  background: #171d26;
}

.coin {
  border-bottom: 1px solid #283242;
}
.coin:hover {
  background: #283242;
}
.coinImg {
  float: left;
  margin-top: 10px;
  padding: 0 8px;
  overflow: hidden;
}
hr {
  margin-top: 24px;
  border: 1px solid rgba(240, 240, 240, 1);
}
.coinInner {
  display: inline-block;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
}
.addCoin span {
  line-height: 55px;
  /* padding-top: 24px; */
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.addCoin:hover {
  background: #283242;
}

.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
}
.transactionMask {
  position: relative;
  padding: 0.75rem;
  margin: 220px auto;
  width: 360px;
  /* height: 320px; */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.addTime {
  /* height: 120px; */
  margin-top: 20px;
  /* vertical-align: middle; */
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  height: 65px;
  /* line-height: 65px; */
}
.btn {
  float: right;
  margin-top: 20px;
  width: 80px;
  height: 28px;
  background: rgba(16, 199, 150, 1);
  border-radius: 14px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  border: none;
}
.maskBtn {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 40px;
  border-radius: 3px;
  background: rgb(163, 221, 221);
}
.main-right {
  margin-left: 145px;
  padding-left: 33px;
  padding-top: 24px;
  min-height: 871px;
  border-left: 1px solid #283242;
  background: #171d26;
}
.info {
  display: block;
  padding-bottom: 32px;
  font-size: 22px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
.mainFont {
  display: inline-block;
  margin-right: 16px;
  font-size: 40px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(1, 227, 181, 1);
}
.balance {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.word {
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
}
.exchange {
  margin-top: 10px;
}
.rmb {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.cash {
  padding-left: 15px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(219, 219, 219, 1);
}
.transaction1 {
  display: inline-block;
  margin: 20px 0;
  font-size: 22px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
/* 交易号 */
.el-button-group .el-button {
  white-space: pre-wrap;
}
.el-tabs--border-card {
  border: none;
}
.close {
  float: right;
  margin-right: 26px;
  width: 82px;
  height: 26px;
  background: rgba(31, 38, 51, 1);
  border: 1px solid rgba(40, 49, 66, 1);
  border-radius: 4px;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(164, 170, 179, 1);
}
.add {
  margin: 22px 7px 10px 27px;
}
.back {
  background: rgba(28, 35, 46, 1);
}
.addCoinTitle {
  text-align: center;
  font-size: 20px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.closeMask {
  float: right;
  margin-top: -35px;
  margin-right: -50px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: aliceblue;
  font-size: 18px;
  background: #585858;
  border-radius: 50%;
  text-align: center;
}
.transactionMoney {
  color: #01e3b5;
}
.transactionMoney1 {
  color: #f55436;
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
.mask1Box1 {
  position: relative;
  margin: 20% auto;
  width: 390px;
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