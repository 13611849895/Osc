<template>
  <div class="us">
    <div class="about-us">
      <div class="Breadcrumb">
        <span class="color" @click="back">帮助中心</span>
        <span>> 如何进行转账、收款</span>
      </div>
      <div class="service-inner">
        <div class="title">如何进行转账、收款</div>
        <div class="inner">
          <strong class="bot">转账</strong><br>
                    <p>在资产列表页，点击你想转账的资产类型，如OSCH ——> 点击转账输入收款人地址（或者通过扫码） ——> 输入转账金额 ——> 输入转账的备注信息 ——> 确认转账注意 ： 转账的速度一般为5秒左右 输入交易密码（钱包密码） ——> 确认</p>
                    <strong class="bot">收款</strong>
                    <p>方法一： 在 “资产” 页面，点击钱包地址 ——> 填写收款金额</p>
                    <p>方法二： 在 “资产” 页面，点击你想收款的资产类型，如Osch ———> 点击收款按钮</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
       back() {
      location.reload()
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.about-us {
   padding-top: 84px;
  margin: 0 auto;
  width: 960px;
  min-height: 800px;
  z-index: 3;
  overflow: hidden;
}
.us {
  width: 100%;
  height: 100%;
  background-image: url("../../../static/img/diandian.png");
  background-size: 100% 70%;
  background-repeat: repeat-y;
}
.Breadcrumb {
  text-decoration: none;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-decoration: underline;
  color: rgba(230, 230, 230, 1);
}
.color {
  color: antiquewhite;
    display: inline-block;

}
.color:hover {
  cursor:pointer
}
.service-inner {
  margin-top: 24px;
  padding: 30px 20px 52px;
  height: 100%;
  background: rgba(35, 42, 56, 1);
  box-shadow: 0px 0px 4px 0px rgba(22, 27, 36, 1);
}
.inner {
  padding-bottom: 52px;
  margin-top: 37px;
  color: #f0f0f0;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #f0f0f0;
}
.title {
  text-align: center;
  font-size: 20px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
 .bot{
     display: inline-block;
     margin: 8px 0 8px 0
        }
</style>