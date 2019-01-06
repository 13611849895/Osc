<template>
    <div class="main">
        <v-nav></v-nav>
        <h1 class="title">创建新的钱包</h1>
        <!-- 输入密生成账户 -->
        <!-- <div v-if="!ifKeyBox">
            <h3 class="tips">请输入一组强密码（至少9位）</h3>
            <input type="text" placeholder="请保存好您的密码" class="inp">
        </div> -->
        <!-- ---------------- -->
        <p></p>
        <div class="keysBox" v-if="ifKeyBox">
            <h2>public key:</h2>    
            <p>{{newPublicKey}}</p>
            <h2>private key:</h2>
            <p>{{newPrivateKey}}</p>
        </div>
        <!-- _______________     -->
        <!-- <div class="chose">
            <input type="checkbox">
            <span>我已经阅读并同意
                <a  href="javascript:void(0)">服务条款</a>
            </span>
        </div> -->
        <input type="submit" value="一键生成" class="sub" @click="check">
    </div>
</template>

<script>
import VNav from '../vnav'
export default {
    data () {
        return {
            secret: "",
            ifKeyBox: false,
            newPublicKey: "",
            newPrivateKey: "",
        }
    },
    components: {
        VNav
    },
    methods: {
        //点击生成 秘钥对
        check () {
            var keypair = StellarSdk.Keypair.random();  
            var strkey = StellarSdk.StrKey;
            this.newPublicKey = strkey.encodeEd25519PublicKey(keypair._publicKey);
            this.newPrivateKey = strkey.encodeEd25519SecretSeed(keypair._secretSeed);
            this.ifKeyBox = true
        }
    }
}
</script>

<style>
   /* .main {
        margin: 30px;
        background-color: bisque;
        min-width: 960px;
        min-height: 500px;
        text-align: center;
    
    }
    .title {
        margin-top: 25px;
    }
    .tips,.keysBox {
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
        background: skyblue;
        width: 150px;
        height: 30px;
    } */
 
</style>
