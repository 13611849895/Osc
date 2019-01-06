<template>
    <div class="main">
        
        <v-nav></v-nav>
        
        <div class="wallet-info">
            <h2 class="title">我的钱包信息</h2>
            <div class="key-pairs">
                <div>
                    <p class="info">我的地址:</p>
                    <!-- <input type="text" :value=publicKey class="w-inp"> -->
                     <p class="balance">{{publicKey}}</p>
                </div>
                <div>
                    <p class="info">我的余额</p>
                    <!-- <input type="text" :value="oschNum" class="w-inp"> -->
                    <p class="balance" v-show="validType ==true"><span>{{oschNum}}</span>&nbsp OSCH</p>
                    <p class="balance" v-show="validType == false"><span>当前地址未激活</span></p>
                </div>
            </div>
            <div class="key-code">
                    <p class="info">当前地址：</p>
                    <span class="info-id">{{publicKey}}</span>
                    <div class="img" id="qrcode"></div>
            </div>
        </div>
        <div class="search">
              <input type="text" v-model="transactionId">
        <button @click="search">搜索</button>
        </div>
      
        <div class="dvInner" v-show="validType ==true">
            <div class="main-left clear">
            <div class="leftMenu">
                <div>
                <h4 class="menu" >所持代币</h4>
                <p class="menuBranch" v-for="(item,index) of tabList" :key="index"  @click="changtab">{{item}}</p>
            </div>
            <div class="menu" @click="changtab">添加代币</div>
            <div class="menu" @click="changtab">代币余额</div>
            </div>
            
            </div>
            <div class="main-right">
                <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName" v-show="show==1">
                    <el-tab-pane label="全部交易记录"  name="second" >
                        <el-table
                            :data="wArrPage.slice((currpage - 1) * pagesize, currpage * pagesize)"
                            stripe
                            style="width: 100%"
                            >
                            <el-table-column
                            prop="time"
                            label="Create_Time"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="num"
                            label="Amount"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="to"
                            label="To"
                            width="230">
                            </el-table-column>
                            <el-table-column
                            label="Transaction ID"
                            width="400"
                            >
                            <template slot-scope="scope">
                                <el-button-group>
                                    <el-button @click.native="transactionInfo">{{scope.row.transaction}}</el-button>
                                </el-button-group>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="activeType"
                            label="ActiveType"
                            width="400"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="asset"
                            label="Currency"
                            width="400"
                            >
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="收入交易" name="first" >
                         <el-table
                            :data="input.slice((currpage - 1) * pagesize, currpage * pagesize)" 
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="time"
                            label="Create_Time"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="num"
                            label="Amount"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="to"
                            label="To"
                            width="230">
                            </el-table-column>
                            <el-table-column
                            prop="transaction"
                            label="Transaction ID">
                            <template slot-scope="scope">
                                <el-button-group @click.native ="transactionInfo">
                                    <el-button>{{scope.row.transaction}}</el-button>
                                </el-button-group>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="activeType"
                            label="ActiveType"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="asset"
                            label="Currency"
                            >
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="支出交易" >
                        <el-table
                            :data="output.slice((currpage - 1) * pagesize, currpage * pagesize)"
                            stripe
                            style="width: 100%"
                            >
                            <el-table-column
                            prop="time"
                            label="Create_Time"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="num"
                            label="Amount"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="to"
                            label="To"
                            width="230">
                            </el-table-column>
                            <el-table-column
                            label="Transaction ID"
                            >
                            <template slot-scope="scope">
                                <el-button-group @click.native ="transactionInfo">
                                    <el-button >{{scope.row.transaction}}</el-button>
                                </el-button-group>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="activeType"
                            label="ActiveType"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="asset"
                            label="Currency"
                            >
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="数据图">数据图</el-tab-pane>
                    <el-pagination
                    layout="prev, pager, next, sizes, total, jumper"
                    :page-sizes = "[5, 10, 15, 20, 25, 30]"
                    :page-size="pagesize"
                    :total= "tab"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange" 
                    >
                    </el-pagination>
                    <!-- <button @click="getPage">next</button> -->
                </el-tabs>
                <button @click="changeTrust"> 信任授权</button>
                <button @click="changeTrust1"> 取消授权</button>
                <div class="addCoin" v-show="show == 2">
                    <h1>添加代币</h1>
                    <el-transfer v-model="value1" :data="data2" @change="handleChange"></el-transfer>
                </div>
                <div class="otherBalance" v-show="show==3">
                    <div class="balanceBlock">
                        <h2>Osch</h2>
                        <p>余额为：{{oschNum}} Osch</p>
                    </div>
                    <div class="balanceBlock">
                        <h2>Time</h2>
                        <p>余额为：{{timeNum}} Time</p>
                    </div>
                    <div class="balanceBlock">
                        <h2>Hour</h2>
                        <p>余额为：{{hourNum}} Hour</p>    
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import VNav from '../vnav'
//引入rqcode 动态生成二维码
import QRCode from 'qrcodejs2'
export default {
    data () {
        const generateData = _ => {
        const data1 = [{disabled: true ,key: 0,label:'Osch'},{disabled: true ,key: 1,label:'Time'},{disabled: true ,key: 2,label:'Hour'}];
        for (let i = 4; i <= 15; i++) {
          data1.push({
            key: i,
            label: `代币 ${ i }`,
            // disabled: i % 4 === 0
          });
        }
        return data1;
      };
        return {
            server: "",//Stellar
            sercet: this.$route.params.id,//私钥
            publicKey: "XXX",
            oschNum: "0",//Osch余额
            timeNum:'0',
            hourNum:'0',
            toPublic: "",//发送地址
            toOschNum: "",//发送数量
            account: "",//每次请求stellar返回的账户详情
            tableData: [],
            currpage: 1,
            pagesize: 10,
            activeName: 'second',
            wPage: "",
            wArrPage: [],
            input: [], //正数放入收入
            output: [],//负数放入支出
            tab: 10,
            show: 1,
            data2: generateData(),  //穿梭框的源数据
            value1: [0,1,2,], //穿梭框的key值
            tabList: [], //添加代币数据列表
            validType: false,
            time:[],//time币
            hour:[],//huor币
            osch:[],//osch币
            transactionId: '', //检索交易ID
            limit:200,
            isTime: {},
            isHour:{},
            trustHour: false,
            trustTime:false

        }
    },
    methods: {
        //点击穿梭框事件
         handleChange(value, direction, movedKeys) {
           this.value1 = value
           this.tabList = []
            for(var i=0; i<this.value1.length;i++){
                let val = this.value1[i]
                this.tabList.push(this.data2[val].label)
            }
        },
        //通过交易ID搜索交易明细
        search(){
            var _this = this
            _this.server.transactions()
                .transaction(_this.transactionId)
                .call()
                .then(function(res){
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
        },
        //自动生成二维码
        qrcode() {
            let qrcode = new QRCode('qrcode', {
                width:150,
                height:150,
                text: this.publicKey,
                colorDark: '#000',
                colorLiht: '#fff'
            })
        },
        // 分页插件
        handleCurrentChange (cpage) {
            this.currpage = cpage
        },
        handleSizeChange (psize) {
            this.pagesize = psize
        },
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        },
        //点击信任
        changeTrust() {
            console.log(this.trustHour)
           

            if(this.trustHour === true){
                alert('您已经信任过了')
            }else{
                var transaction = new StellarSdk.TransactionBuilder(this.account,{
                    fee: "1000000000"
                })
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: this.isHour
                }))
                .build()
                transaction.sign(StellarSdk.Keypair.fromSecret(this.sercet))
                this.server.submitTransaction(transaction).then(function(res){
                    console.log("发送交易成功")
                    alert("发送成功");
                    location.reload() 
                }).catch(function(err){
                    alert('授权失败')
                    console.log(err.response)
                    console.log(err.response.data.extras.result_codes.transaction)
                })
            }
        },
        //取消受权
        changeTrust1() {
            console.log(this.trustHour)
            if(this.trustHour == false) {
                alert('您尚信任当前资产')
            }else {
                var transaction = new StellarSdk.TransactionBuilder(this.account,{
                fee: "1000000000"
            })
            .addOperation(StellarSdk.Operation.changeTrust({
                asset: this.isHour,
                source: this.publicKey,
                limit: "0"
            }))
            .build()
            transaction.sign(StellarSdk.Keypair.fromSecret(this.sercet))
            this.server.submitTransaction(transaction).then(function(res){
                console.log(res)
                console.log("发送交易成功")
                alert("发送成功");
                // location.reload() 
            })
            .catch(function(err){
                alert('授权失败')
                console.log(err.response)
                console.log(err.response.data.extras.result_codes.transaction)
            })
            }
            
        },
        //跳转交易详情页
        transactionInfo () {
            window.location.href =  'http://coast.oschain.io/transactions/' + event.target.innerHTML + "/operations"
            console.log(event.target.innerHTML)
        },
        //分类显示收入、支出
        getPage: async function(){
            for(var i=0;i<this.wArrPage.length;i++){
                var num = this.wArrPage[i].num
                if(num.substr(0,1) == "+"){
                    this.input.push(this.wArrPage[i])
                }
                if(num.substr(0,1) == "-"){
                    this.output.push(this.wArrPage[i])
                }
            }
            //拿到数据列表然后筛选出翻入各自币种之中
            for(var osc of this.wArrPage) {
                    if(osc.asset == 'Osch'){
                        this.osch.push(osc)
                    }else if(osc.asset == 'Time'){
                        this.time.push(osc)
                    }else if(osc.asset == 'Hour'){
                        this.hour.push(osc)
                    }
                }
        },
        // 循环遍历数组，并抽取6个参数，然后放入wArrPage
        render(page){
            this.tab = page.length
            console.log(page)
                for(var page1 of page){
                     var ob = {
                                time: page1.created_at, //交易时间
                                transaction: page1.transaction_hash, //交易哈希 
                                num: page1.amount, //交易数量
                                to: page1.to, //目标地址
                                asset:page1.asset_type, //交易币种
                                activeType:page1.type, //交易类型 （交易、创建账户等）
                                code:page1.asset_code //交易码：可以取到time跟hour
                            };
                    if(page1.type =="payment" ){
                        if(page1.from == this.publicKey){
                            ob.num ="-" + page1.amount
                        }else{
                            ob.num = "+" + page1.amount
                        }
                        this.wArrPage.push(ob)
                    }else if(page1.type == 'create_account'){
                        ob.num= page1.starting_balance, //交易数量
                        ob.to= page1.funder, //目标地址
                        ob.asset="Osch" //交易币种
                        if(page1.funder == this.publicKey){
                            ob.num = "-" + page1.starting_balance
                        }else {
                            ob.num = "+" + page1.starting_balance
                        }
                        this.wArrPage.push(ob)
                    }else if(page1.type == 'change_trust'){
                                ob.num = "-" + "100.0000000", //交易数量
                                ob.to = page1.asset_issuer, //目标地址
                                ob.asset = page1.asset_code, //交易币种
                                ob.activeType = page1.type, //交易类型 （交易、创建账户等）
                        this.wArrPage.push(ob)
                    }
                        if(ob.asset == "native") {
                            ob.asset = "Osch"
                        }else if(ob.code == 'hour'){
                            ob.asset = 'Hour'
                        }else if (ob.code == 'time'){
                            ob.asset = 'Time'
                        }
                }
            },
        handleClick(res,event) {
            if(event.target.innerHTML == "全部交易记录"){
                this.tab = this.wArrPage.length
            }else if(event.target.innerHTML == "收入交易"){
                this.tab = this.input.length
            }else if(event.target.innerHTML == "支出交易"){
                this.tab = this.output.length
            }
        },
        //切换状态栏
        changtab(event) {
            if(event.target.innerHTML == "Osch"){
                this.show = 1
                this.wArrPage = this.osch
                console.log(this.wArrPage)
            } else if (event.target.innerHTML == "Time") {
                this.show = 1
                this.wArrPage = this.time
            } else if (event.target.innerHTML == "Hour") {
                this.show = 1
                this.wArrPage = this.hour
                console.log(this.wArrPage)
            } else if (event.target.innerHTML == "添加代币") {
                this.show = 2
            } else if (event.target.innerHTML == "代币余额") {
                this.show = 3
            }
        },
        //初始化
        init: async function(){
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
            
                //找到账户信息
            _this.server
                .loadAccount(this.publicKey)
                .then(function(account){
                    _this.account = account;
                    //把账户信息保存在session中
                    let ueserInfo = JSON.stringify({
                        aco: account
                    })
                    sessionStorage.ueserInfo = ueserInfo
                    for(var num of account.balances){
                        if(num.asset_code=='hour'){
                            _this.hourNum = num.balance
                            _this.trustHour = true  //确认账户中信任过Huor资产
                        }else if(num.asset_code == 'time'){
                            _this.timeNum = num.balance
                            _this.trustTime = true//确认账户中信任过Time资产
                        }else if(num.asset_type == 'native'){
                            _this.oschNum = num.balance
                        }
                    let ueserInfo = JSON.stringify({
                        aco: account,
                    })
                    sessionStorage.ueserInfo = ueserInfo
                    }
                }).catch((err) => {
                    console.log(err)
                })
            //判断账户是否激活, 如果未激活,则不现实交易记录
            _this.server
                .loadAccount(this.publicKey)
                .then(function(account){
                    _this.validType = true
                })
                .catch( (err) => {
                    console.log(err)
                    _this.validType = false
                })    
            // 获取历史交易
           await  _this.server.operations()
                .forAccount(this.publicKey)
                .limit(this.limit)
                // .order("asc")
                .call()
                .then(function(page) {
                    console.log(page)
                    _this.wPage = page  
                    //调用render方法wPage传入进去
                    _this.render(_this.wPage.records)
                    console.log(_this.wArrPage)
                })
                    _this.getPage()
            _this.isTime = new StellarSdk.Asset("time","GDH2OGN3UJXKIVYELLPCJUSNG7KBNHYSA5QFIV2ZZWUJJAWYDQAAFJZW")
            _this.isHour = new StellarSdk.Asset("hour","GA2KXCLNAECHU37B66DZISGFZG73JUYFEDNS3U7Q2O7LJORDYWSZ4W74")
            //保存用户的私钥
            let user = JSON.stringify({
                pub: this.publicKey,
                priv: this.sercet
            })
            sessionStorage.user = user
        }
    },
    components: {   
        VNav
    },
    created(){
       for(var i=0; i<this.value1.length;i++){
            let val = this.value1[i]
            this.tabList.push(this.data2[val].label)
       }

    },
    mounted () {
        this.init()
        console.log('fafaf')
        this.qrcode()
    }
}
</script>

<style>
   .main {
        margin: 30px;
        background-color: bisque;
        min-width: 960px;
        min-height: 700px;
    }
    .wallet-info {
        padding-bottom: 50px;
        width: 100%;
        background-color: aliceblue;
        margin-bottom: 20px;
    }
    .key-pairs {
        display: inline-block;
        left: 100px;;
        width: 1010px;
        height: 200px;
    }
    .key-code {
        padding-left: 30px;
        display: inline-block;
        height: 200px;
        vertical-align: top;
    }
    .balance {
        margin-left: 100px;
        font-size: 20px;
        font-weight: 700;
    }
    .el-button-group .el-button {
        white-space: pre-wrap;
    }
    .search {
        margin-bottom: 10px;
        min-width: 960px;
        min-height: 200px;
        background-color: #ccc;
    }
    .main-left {
        float: left;
        overflow: hidden;
    }
    .main-right {
        margin-left: 199px;
    }
    .el-col {
        width: 201px;
    }
    .el-tabs__content {
        min-height: 350px;
    }
    .info {
        text-align: left;
        font-size: 16px;
        padding: 15px;
    }
    .info-id {
        font-size: 16px;
        padding-left: 10px;
    }
    .w-inp {
        width: 900px;
        height: 40px;
        margin-left: 100px;
    }
    .title {
        padding-top: 15px;
        text-align: center
    }
    .img {
        margin-top: 30px;
        padding-left: 15px;
    }
    .otherBalance {
        padding: 30px;
        background-color: #888;
        min-height: 600px;
        text-align: center;
    }
    .balanceBlock {
        margin: 30px;
    }
    .leftMenu {
        padding: 20px;
        background: #666;

    }
    .menu {
        margin:20px 10px;
        width: 138px;
        text-align: center;
        color: aliceblue;
        font-weight: 700;
        font-size: 16px;
    }
    .menu:hover {
        background-color: #888;
    }
    .menuBranch {
        margin-top: 10px;
        font-weight: 200;
        text-align: center;
        color: aliceblue;
        font-size: 15px
    }
    .menuBranch:hover {
        background: #888
    }
    .addCoin {
        padding: 30px;
        background: #888;
        min-height: 600px;
        text-align: center; 
    }
    .el-checkbox__inner {
        float: left;
    }
    
</style>
