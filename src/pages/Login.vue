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
        err_message="用户名或手机号错误"
      ></AuthInput>
    </div>

    <!-- 密码> -->
    <div class="password">
      <AuthInput
        placeholder="请输入密码"
        type="password"
        v-model="form.password"
        :rule="/^[\w]{3,16}$/"
        err_message="密码错误"
      ></AuthInput>
    </div>

    <p class="tips">
      没有账号？
      <router-link to="/register">去注册</router-link>
    </p>

    <!-- 登录按钮 -->
    <div class="btn">
      <AuthButton text="登录" @click="handleSubmit"></AuthButton>
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
        password: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      axios({
        url: "/login",
        method: "POST",
        data: this.form
      }).then(res => {
        const { message, data } = res.data;
        if (data &&data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user.id);
        }
        if (message === "登录成功") {
          this.$router.back();
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
  .btn {
    margin-top: 20px;
  }
  .tips {
    text-align: right;
    // margin: 20px;
    a {
      color: #3990dd;
    }
  }
}
</style>