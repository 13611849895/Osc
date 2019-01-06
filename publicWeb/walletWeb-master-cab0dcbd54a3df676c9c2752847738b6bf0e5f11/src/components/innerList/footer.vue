<template>
  <div class="footer">
    <div class="footerList">
      <ul class="list">
        <li>
          <router-link to="/help" class="foot">关于我们</router-link>
        </li>
        <li>
          <router-link to="/help" class="foot">常见问题</router-link>
        </li>
        <li>
          <router-link to="/service" class="foot">隐私及服务条款</router-link>
        </li>
        <li>
          <router-link to="/help" class="foot">关于私钥</router-link>

        </li>
        <li>
          <router-link to="/help" class="foot">关于公钥</router-link>
        </li>
      </ul>
    </div>
    <div class="lower">
      <img src="../../../static/img/foot_logo@2x.png" width="18" height="18">
       <span>Smart wallet for OSCH assets</span>
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
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.footer {
  z-index: 9;
  width: 100%;
  height: 119px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  background:#1A202B
}
.footerList {
  padding-top: 28px;
  width: 100%;
}
.list {
  display: block;
  width: 600px;
  margin: 0 auto ;
}
.list li {
  margin-right: 37px;
  color: #999999;
  display: inline-block;
  font-size: 16px;
}
.footer .lower {
  width: 300px;
  margin:  23px auto;
  font-size: 14px;
  color: #808080;
}
.foot {
  font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(153,153,153,1);
}
</style>