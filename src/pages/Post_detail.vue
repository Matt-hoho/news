<template>
  <div class="big">
    <!-- 文章 -->
    <div class="post-detail" v-if="detail.type ===1">
      <div class="post-header">
        <div class="header-left">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <span class="post-follow" v-if="!detail.has_follow" @click="handleFollow">关注</span>
        <span class="post-followed" v-if="detail.has_follow" @click="handleUnfollow">已关注</span>
      </div>

      <h3>{{detail.title}}</h3>

      <p class="post-info">{{detail.user.nickname}} 2019-10-10</p>
      <div class="post-content" v-html="detail.content"></div>
    </div>

    <!-- 视频 -->
    <div class="video-detail" v-if="detail.type ===2">
      <video
        src="https://video.pearvideo.com/mp4/adshort/20190927/cont-1607282-14432236_adpkg-ad_hd.mp4"
        class="video"
        controls
        :poster="detail.cover[0].url"
      ></video>

      <div class="video-info">
        <img :src="$axios.defaults.baseURL + detail.user.head_img" />
        <span>{{detail.user.nickname}}</span>
      </div>
      <div class="video-content">{{detail.title}}</div>
    </div>

    <!-- 按钮 -->
    <div class="post-btn">
      <span @click="handleLike" :class="{like_active : detail.has_like}">
        <i class="iconfont icondianzan"></i>
        {{detail.like_length}}
      </span>
      <span>
        <i class="iconfont iconweixin"></i> 微信
      </span>
    </div>

    <!-- 底部 -->
    <PostFooter :post="detail" @handleStar="handleStar" />
  </div>
</template>

<script>
import PostFooter from "@/components/PostFooter.vue";
export default {
  data() {
    return {
      detail: {
        user: {}
      }
    };
  },
  components: {
    PostFooter
  },
  methods: {
    handleFollow() {
      this.$axios({
        url: "/user_follows/" + this.detail.user.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        //   console.log(res.data);

        const { message } = res.data;
        if (message === "关注成功") {
          this.detail.has_follow = true;
          this.$toast.success(message);
        }
      });
    },
    handleUnfollow() {
      this.$axios({
        url: "/user_unfollow/" + this.detail.user.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "取消关注成功") {
          this.detail.has_follow = false;
          this.$toast.success(message);
        }
      });
    },
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.detail.id,
        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
        const { message } = res.data;
        if (message === "取消成功") {
          this.detail.like_length--;
          this.detail.has_like = false;
        }
        if (message === "点赞成功") {
          this.detail.like_length++;
          this.detail.has_like = true;
        }
        this.$toast.success(message);
      });
    },
    handleStar() {
      this.$axios({
        url: "/post_star/" + this.detail.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "收藏成功") {
          this.detail.has_star = true;
        }
        if (message === "取消成功") {
          this.detail.has_star = false;
        }
        this.$toast.success(message);
      });
    }
  },
  mounted() {
    const { id } = this.$route.params;
    const token = localStorage.getItem("token");
    const config = {
      url: "/post/" + id
    };
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    this.$axios(config).then(res => {
      const { data } = res.data;
      this.detail = data;
      console.log(data);
    });
  }
};
</script>

<style lang="less" scoped>
.post-follow {
  width: 62 / 360 * 100vw;
  height: 26 / 360 * 100vw;
  line-height: 26 / 360 * 100vw;
  text-align: center;
  font-size: 12px;
  background: red;
  color: #fff;
  border-radius: 50px;
  border: 1px red solid;
}

.post-followed {
  border: 1px #ccc solid;
  color: #333;
  background: none;
  border-radius: 50px;
  width: 62 / 360 * 100vw;
  height: 26 / 360 * 100vw;
  line-height: 26 / 360 * 100vw;
  text-align: center;
  font-size: 12px;
}
.video {
  width: 100%;
}
.video-content {
  padding: 0 10px;
}
.video-info {
  padding: 10px;
  display: flex;

  align-items: center;

  .video-user {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
  }

  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.post-detail {
  background: #fff;
  padding: 60/360 * 100vw 20px;
  .post-header {
    background: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
    * {
      vertical-align: middle;
    }
    .iconjiantou2 {
      font-size: 15px;
    }
    .iconnew {
      font-size: 50px;
    }
  }
  .post-info {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  /deep/ img {
    max-width: 100%;
    border-radius: 10px;
  }
}

.post-btn {
  background: #fff;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  padding-bottom: 150px;
  span {
    padding: 0 20px;
    height: 30 / 360 * 100vw;
    line-height: 30 / 360 * 100vw;
    font-size: 12px;
    border: 1px #333 solid;
    border-radius: 50px;
  }
  .iconweixin {
    color: #07c907;
  }
  .like_active {
    border: 1px red solid;
    i {
      color: red;
    }
  }
}
</style>