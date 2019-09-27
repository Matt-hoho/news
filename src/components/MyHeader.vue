<template>
  <div class="header">
    <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    <h4>{{title}}</h4>
    <span class="iconfont iconjiantou2"></span>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped lang="less">
.header {
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  background: #3385ff;
  color: #fff;
  span {
    display: block;
  }
  span:last-child {
    font-size: 0;
  }
}
</style>