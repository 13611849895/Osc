<template>
    <div>
        <v-header></v-header>
        <div class="main">
            <v-nav></v-nav>
            <h1 class="title">输入私钥查看钱包信息</h1>
            <input type="text" value="请输入您的私钥" class="inp" v-model="secret">
            <!-- <p class="tips" v-show="tips">提示:您输入的私钥格式不正确或不符合格式，请确认后输入（私钥的长度为56位）</p> -->
            <input type="submit" value="确认" class="sub" @click="login">
        </div>
        <v-footer></v-footer>
    </div>
    
</template>

<script>
import VHeader from '../Header'
import VFooter from '../footer'
import VNav from '../vnav'
export default {
    data () {
        return {
            secret: '',
            tips: false, //提示
            com: 1,
            publicKey:"",
            server:""

        }
    },
    methods : {
        login () {
            try{
                let strkey = StellarSdk.StrKey;
                let arrPrivate = strkey.decodeEd25519SecretSeed(this.secret)
            }catch(err){
                console.log(err)
                this.tips = true
            }
            
            if (this.secret === '' ) {
                alert('请输入私钥')
                location.reload() 
            } else if(this.tips == true){
                alert('提示:您输入的私钥格式不正确或不符合格式，请确认后输入（私钥的长度为56位）')
                // location.reload() 
            // console.log(this.secret.length)
            } else if(this.tips == false) {
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
                console.log(_this.secret)
                console.log(_this.publicKey)
                _this.server
                    .loadAccount(_this.publicKey)
                    .then(function(account){
                        _this.$router.push('/inner/' + _this.secret)
                    }).catch((err) => {
                        console.log('hahah')
                        // alert('当前账户未激活，请激活后执行操作')
                        // location.reload()
                    })
            }
        }
    },
    components: {
        VNav,
        VHeader,
        VFooter
    },
    mounted () {
        let user = JSON.parse(sessionStorage.user)
        if(user !== false){
            this.$router.push('/wallet/' + user.priv)
        }

    }
}
</script>   

<style>
   .main {
        margin: 30px;
        background-color: bisque;
        min-width: 960px;
        min-height: 500px;
        text-align: center;
    
    }
    .title {
        margin-top: 25px;
    }
    .tips {
        margin-top: 50px;
        font-weight: 700;
    }
    .inp {
        margin-top: 25px;
        width: 500px;
        height: 30px;
    }
    .chose {
        margin-top: 120px;
        vertical-align: top;
    }
    .sub {
        display: block;
        margin: 30px auto 0;
        border-radius: 3px;
        /* border: none; */
        background: skyblue;
        width: 150px;
        height: 30px;
    }
 
</style>
