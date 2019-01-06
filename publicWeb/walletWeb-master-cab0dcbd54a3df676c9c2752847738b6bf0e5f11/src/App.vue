<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
/* 饿了么插件 */
.el-button-group .el-button {
  white-space: pre-wrap;
}
.el-tabs__nav-wrap {
  background: #171d26;
  border-bottom: 1px solid #283242;
  border-top: 1px solid #283242;
}
.el-table__empty-block {
  background: #171d26;
}
.el-tabs--border-card {
  /* background: #fff; */
  -webkit-box-shadow: none;
  box-shadow: none;
  border-top: 1px solid #283242;
}
.el-tabs--top {
  border-top: 1px solid #283242;
}
.element .el-tabs,
.el-tabs--border-cardd {
  border: none;
}
.el-table th.is-leaf {
  border: none;
}
.el-tabs__nav-wrap {
  border-bottom: 1px solid #283242;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border-color: #2c3e50;
  color: rgba(204, 204, 204, 1);
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  background: #2c3e50;
}
.el-tabs--border-card > .el-tabs__content {
  background: #171d26;
}
.el-table th,
.el-table tr {
  background: #171d26;
}

.el-table .el-table__row--striped {
  background: #171d26;
}
.el-table .el-table__row {
  background: #171d26;
}
.el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0) !important;
}
.el-table__body {
  width: 100%;
}
.el-button--default {
  background: rgba(0, 0, 0, 0);
  border: none;
  line-height: 25px;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(202, 208, 219, 1);
  text-decoration: underline;
}
.el-table td {
  border: none;
}
.el-table .warning-row {
  background: #171d26 !important;
}

.el-table .success-row {
  background: #1f2733 !important;
}
.el-table th,
.el-table tr {
  background: #171d26;
}
.el-table tr {
  background: #171d26 !important;
}
.el-pager li {
  background: #171d26;
}
.el-pagination__editor.el-input .el-input__inner {
  background: #171d26;
}
.el-pagination .btn-next {
  background: #171d26;
}
.el-pagination .btn-prev {
  background: #171d26;
}
.el-pagination button:disabled {
  background: #171d26;
}
.el-pagination__editor.el-input .el-input__inner {
  border: none;
}
.el-table::before {
  height: 0;
}
.el-table__body-wrapper {
  background: #171d26;
}
.el-table__footer-wrapper,
.el-table__header-wrapper {
  background: #171d26;
}
.el-table .cell {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  /* color:rgba(202,208,219,1); */
  text-align: center;
}
/* .element .el-table */

.element .el-table td:nth-child(1),td:nth-child(3),td:nth-child(4),td:nth-child(6),td:nth-child(7),td:nth-child(8) {
  color: rgba(202, 208, 219, 1)
}
.el-table th {
  padding: 0;
}
.el-table td {
  padding: 0;
}
.el-pagination {
  padding: 15px 5px 0;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 15px 0;
}
.element .el-table td:nth-child(2) {
  color: rgba(1, 227, 181, 1) !important;
}
.el-table thead {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color:rgba(202,208,219,1);
  text-align: center;
}
.el-table td:nth-child(1){
  color: #fff
}
.el-table td:nth-child(2){
  color: #fff;
  color: rgba(1, 227, 181, 1) ;

}
</style>
