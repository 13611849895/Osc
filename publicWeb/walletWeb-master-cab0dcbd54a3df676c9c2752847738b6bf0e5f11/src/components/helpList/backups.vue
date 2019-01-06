<template>
  <div class="us">
    <div class="about-us">
      <div class="Breadcrumb">
        <span class="color" @click="back">帮助中心</span>

        <span>> 备份</span>
      </div>
      <div class="service-inner">
        <div class="title">关于我们</div>

        <div class="inner">
          <strong class="bot">导出助记词</strong>
          <br>
          <p>
            点击 “我” 中管理钱包 ——> 选择你自己创建的 HD 钱包（分层确定性钱包，使用 imToken 生成的即是这种类型的钱包）
            导出助记词 ——> 输入钱包密码
            备份助记词（按顺序记录）并点击 “下一步” ——> 按顺序输入你刚才备份的助记词用以二次确认 ——> 确认
          </p>
          <p>注意：助记词移除之前一定要确保已经备份，移除之后，当前钱包已经没有助记词，但是用户可以通过导入助记词功能重新导入该钱包！</p>
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