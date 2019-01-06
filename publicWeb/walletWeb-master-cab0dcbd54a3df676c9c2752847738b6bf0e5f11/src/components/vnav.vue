<template>
    <div>
        <ul class="v-nav">
            <router-link tag="li" :to="{path:'/create'}">生成新的钱包</router-link>
            <router-link tag="li" :to="{path:'/login'}">钱包信息</router-link>
            <router-link tag="li" :to="{path:'/transactionlogin'}">选择交易</router-link>
            <li>帮助</li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    components: {

    }
}
</script>

<style socped>
    .v-nav {
        background-color: #f55;
        text-align: left

    }
    .v-nav li {
        display: inline-block;
        font-size: 14px;
        font-weight: 700;
        padding:10px 150px 10px 150px; 
    }

 
</style>
