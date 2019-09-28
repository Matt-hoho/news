<template>
  <div>
    <!-- 搜索栏 -->
    <div class="index-header">
      <span class="iconfont iconnew logo"></span>
      <div class="index-search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </div>
      <router-link to="/admin">
        <span class="iconfont iconwode personal"></span>
      </router-link>
    </div>
    <!-- 导航条 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <PostCard v-for="(item,index) in item.posts" :post="item" :key="index" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";

export default {
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0,
      categories: [],
      cid: 999,
      pageIndex: 1,
      pageSize: 5
    };
  },
  watch: {
    active() {
      this.cid = this.categories[this.active].id;
      this.onLoad();
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        const categories = this.categories[this.active];

        this.$axios({
          url: `/post?pageIndex=${categories.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
        }).then(res => {
          const { data } = res.data;
          if (data.length < this.pageSize) {
            categories.finished = true;
          }
          categories.posts = [...categories.posts, ...data];
          categories.pageIndex++;
          categories.loading = false;
        });
      }, 2000);
    }
  },
  components: {
    PostCard
  },
  mounted() {
    const config = { url: "/category" };
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }
    this.$axios(config).then(res => {
      const { data } = res.data;
      //   console.log(data);
      const newData = [];
      data.forEach(item => {
        item.posts = [];
        item.loading = false;
        item.finished = false;
        item.pageIndex = 1;
        newData.push(item);
      });
      this.categories = newData;

      this.$axios({
        url: `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
      }).then(res => {
        const { data } = res.data;

        this.categories[this.active].posts = data;
        // console.log(data);

        this.categories[this.active].pageIndex++;
      });
    });
  }
};
</script>

<style scoped lang="less">
.index-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f00;
  color: #fff;
  padding: 0 20px;
  .logo {
    font-size: 40px;
  }
  .index-search {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background: rgba(255, 255, 255, 0.5);
    height: 30 /360 * 100vw;
    border-radius: 50px;
    margin: 0 20px;
    font-size: 12px;
  }
  .personal {
    font-size: 25px;
  }
}
/deep/ .van-tabs__nav {
  background: #e4e4e4;
}
</style>