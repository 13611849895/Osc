<template>
    <div>
        <v-header></v-header>
        <button @click="out">退出登录</button>
        <w-main></w-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
import VHeader from '../Header'
import WMain from './w-main'
import VFooter from '../footer'
export default {
    data () {
        return {

        }
    },
    methods:{
        out() {
            sessionStorage.clear()
            this.$router.push('/login')
        }
    },
    components: {
        VHeader,
        WMain,
        VFooter,
    }
}
</script>

<style>
    
 
</style>
