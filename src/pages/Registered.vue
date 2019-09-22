<template>
  <div class="container">
    <!-- 关闭按钮 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>

    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户名 -->
    <div class="user_name">
      <AuthInput
        placeholder="请输入用户名/手机号码"
        v-model="form.username"
        :rule="/^1[0-9]{4,10}$/"
        err_message="请输入合法的用户名或手机"
      ></AuthInput>
    </div>

    <!-- 昵称> -->
    <div class="nickname">
      <AuthInput
        placeholder="请输入昵称"
        v-model="form.nickname"
        :rule="/[0-9a-zA-Z\u4e00-\u9fa5]{2,6}/"
        err_message="请输入合法的昵称"
      ></AuthInput>
    </div>

    <!-- 密码> -->
    <div class="password">
      <AuthInput
        placeholder="请输入密码"
        type="password"
        v-model="form.password"
        :rule="/[0-9a-zA-Z]{3,10}/"
        err_message="请输入合法的密码"
      ></AuthInput>
    </div>

    <!-- 提示信息 -->
    <p class="tips">
      没有账号？
      <router-link to="/login">去登录</router-link>
    </p>

    <!-- 登录按钮 -->
    <div class="btn">
      <AuthButton text="注册" @click="handleSubmit"></AuthButton>
    </div>
  </div>
</template>

<script>
// 导入请求库
import axios from "axios";

import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      axios({
        url: "/register",
        method: "POST", // method相当于type
        data: this.form
        // .then的回调函数相当于success
      }).then(res => {
        const { message } = res.data;

        if (message === "注册成功") {
          this.$router.push("/login");
        }
      });
    }
  },
  components: {
    AuthInput,
    AuthButton
  }
};
</script>

<style lang="less">
.container {
  padding: 20px;
  .close {
    span {
      font-size: 27 / 360 * 100vw;
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    span {
      font-size: 126 / 360 * 100vw;
      color: #d81e06;
    }
  }
  .tips {
    text-align: right;
    a {
      color: #3990dd;
    }
  }
}
</style>