<template>
    <div>
        <div class="mask" ref="change">
            <div class="mask-main" @click=closeMask >
                <div class="close">X</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
                <div class="mask-inner">请保管好您的私钥，私钥丢失，地址内财产损失不可挽回</div>
            </div>
        </div>
        <v-header></v-header>
        <c-main></c-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
import VHeader from '../Header'
import VFooter from '../footer'
import CMain from './c-main'
export default {
    data () {
        return {

        }
    },
    methods: {
        closeMask () {
            this.$refs.change.style.display = 'none';
        }

    },
    components: {
        VHeader,
        VFooter,
        CMain
    }
}
</script>

<style>
    .mask {
        position: absolute;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5)
    }
    .mask-main {
        position: absolute;
        margin: auto;
        width: 400px;
        text-align: center;
        border-radius: 3px;
        height: 600px;
        background: #fff;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0
    }
    .close {
        position: absolute;
        right: 10px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #000;
        border-radius: 3px;
        background: skyblue;
        text-align: center
    }
    .mask-inner {
        margin-top: 20px;
    }
 
</style>
