<template>
    <div>
        <v-header></v-header>
        <button @click="out">退出登录</button>
        <t-main></t-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
import VHeader from '../Header'
import TMain from './t-main'
import VFooter from '../footer'
export default {
    data () {
        return {

        }
    },
    methods: {
         out() {
            sessionStorage.clear()
            this.$router.push('/transactionlogin')
        }
    },
    components: {
        VHeader,
        TMain,
        VFooter
    }
}
</script>

<style>
    
 
</style>
