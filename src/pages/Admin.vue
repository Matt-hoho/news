<template>
  <div>
    <div class="profile" @click="$router.push('/edit')">
      <img :src="file.head_img" alt />

      <div class="profile-center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          {{file.nickname}}
        </div>
        <div class="time">2019-9-24</div>
      </div>

      <span class="iconfont iconjiantou1"></span>
    </div>

    <!-- 调用条形组件 -->
    <CellBar label="我的关注" text="关注的用户" @click="$router.push('/myfollow')"/>
    <CellBar label="我的跟帖" text="跟帖/回复" @click="$router.push('/mycomment')"/>
    <CellBar label="我的收藏" text="文章/视频" />
    <div class="btn">
      <AuthButton text="退出" @click="handleLoginOut"></AuthButton>
    </div>
  </div>
</template>

<script>
import CellBar from "@/components/CellBar";
import AuthButton from "@/components/AuthButton";

export default {
  data() {
    return {
      file: {}
    };
  },
  components: {
    CellBar,
    AuthButton
  },
  methods: {
    handleLoginOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      this.$router.replace("/login");
    }
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("id"),
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      this.file = data;

      if (data.head_img) {
        this.file.head_img = this.$axios.defaults.baseURL + data.head_img;
      } else {
        this.file.head_img = "./static/chenhaojie.jpg";
      }
    });
  }
};
</script>

<style scoped lang="less">
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #eee solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.btn {
  margin-top: 20px;
}
</style>