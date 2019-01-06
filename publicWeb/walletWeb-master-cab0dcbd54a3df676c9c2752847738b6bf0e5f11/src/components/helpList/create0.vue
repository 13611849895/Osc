<template>
  <div class="us">
    <div class="about-us">
      <div class="Breadcrumb">
        <span class="color" @click="back">帮助中心</span>
        <span>> 如何创建钱包</span>
      </div>
      <div class="service-inner">
        <div class="title">如何创建钱包</div>
        <div class="inner">
          <p>目前Open Wallet只支持单钱包，初次登入可以创建钱包或在删除原有钱包后可以创建新钱包</p>
                    <p>钱包名（必填）——> 密码（非常重要！这也是交易密码，如果遗忘则不能找回）——> 确认密码 ——> 创建钱包</p>
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
.bot {
  display: inline-block;
  margin: 8px 0 8px 0;
}
</style>