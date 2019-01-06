<template>
  <div class="us">
    <div class="about-us">
      <div class="Breadcrumb">
        <span class="color" @click="back">帮助中心</span>
        <span>> 关于我们</span>
      </div>

      <div class="service-inner">
        <div class="title">关于我们</div>
        <div class="inner">
          <strong class="bot">关于 openwallet</strong>
          <br>
          <p>openwallet 作为专业数字资产钱包，安全放心、简单易用；</p>
          <p>支持多链、多币种管理与兑换，让区块链技术更好地融入你的生活。</p>
          <strong class="bot">关于Open Source Chain</strong>
          <br>
          <p>
            开源链（OSCH）是第一个把电子行业的广义IP以智能合约的方法进行量化的平台。开源链平台对区块基础设施中性 （包括以太坊 ，星云链等），来构建电子行业的IP应用层。开源链平台用区块链技术驱动传统电子行业的技术开发流程、供应链、IP交易、媒体及网络社区的变革。
            把电子行业IP定量化，让数字资产能够自我演化，自我增值，增强参与者信任，从而把价值回馈给所有开源链的参与者。
          </p>
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
  display: inline-block;
  color: antiquewhite;
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