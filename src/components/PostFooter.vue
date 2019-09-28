<template>
  <div class="foot-all">
    <div class="foot-nomal" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handleFocus" />

      <span class="post-comment">
        <em>1020</em>
        <i class="iconfont iconpinglun-"></i>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{ star_active: post.has_star }"
        @click="$emit('handleStar')"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>

    <div class="foot-area" v-show="isFocus">
      <textarea rows="4" @blur="handleFocus" :autofocus="isFocus"></textarea>
      <span>发送</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFocus: false
    };
  },
  props: ["post"],
  methods: {
    handleFocus() {
      this.isFocus = !this.isFocus;
    }
  }
};
</script>

<style scoped lang="less">
.foot-all {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px #eee solid;
  padding: 0 10px;
  box-sizing: border-box;
  background: #fff;
}
.foot-area {
  padding: 20px 0 5px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  border-top: 1px #eee solid;
  textarea {
    border-radius: 10px;
    width: 260 / 360 * 100vw;
    box-sizing: border-box;
    background: #eee;
    border: none;
    resize: none;
    padding: 5px 10px;
  }
  span {
    font-size: 12px;
    background: red;
    width: 60 / 360 * 100vw;
    height: 26 / 360 * 100vw;
    line-height: 26 / 360 * 100vw;
    color: #fff;
    text-align: center;
    border-radius: 50px;
  }
}
.foot-nomal {
  display: flex;
  height: 60 / 360 * 100vw;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  .iconfont {
    font-size: 25px;
  }
  input {
    width: 50%;
    background: #eee;
    height: 30 / 360 * 100vw;
    border-radius: 50px;
    font-size: 12px;
    text-indent: 2em;
  }
  .post-comment {
    display: block;
    position: relative;
    em {
      display: block;
      position: absolute;
      font-size: 10px;
      height: 14px;
      line-height: 14px;
      border-radius: 50px;
      background: #f00;
      padding: 0 5px;
      color: #fff;
      top: -5px;
      left: 5px;
    }
  }
  .star_active {
    color: red;
  }
}
</style>