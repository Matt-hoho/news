<template>
  <div>
      <!-- 组件占位符 -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
@import url("http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css");
@import url("../node_modules/vant/lib/index.css");

/* 公共样式 */
*{
    margin:0;
    padding:0;
}
    
a{
    color: inherit;
}

a:hover{
    text-decoration: none;
}
input{
    outline: none;
    border: none;
}
ul,li,ol{
    list-style: none;
}

i,em{
   font-style: normal; 
}
</style>