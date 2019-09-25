<template>
  <div>
    <MyHeader title="我的关注" />

    <div class="follow_list" v-for="(item,index) in list" :key="index">
      <div class="follow_item">
        <img :src="$axios.defaults.baseURL + item.head_img" alt />
        <div class="item-center">
          <p>{{item.nickname}}</p>
          <span>2019-9-25</span>
        </div>
        <span class="cancel" @click="handleUnfollow(index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";

export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    MyHeader
  },
  methods: {
    handleUnfollow(index) {
      const id = this.list[index].id;
      this.$axios({
        url: "/user_unfollow/" + id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "取消关注成功") {
            this.list.splice(index,1)
            this.$toast.success(message);
        }
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      // console.log(data);
      this.list = data;
    });
  }
};
</script>
<style lang="less" scoped>
.follow_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 60 /360 * 100vw;
    height: 60 /360 * 100vw;
    border-radius: 50%;
  }
  .item-center {
    flex: 1;
    padding: 20px;
    span {
      font-size: 12px;
      color: #bbb;
    }
  }
  .cancel {
    font-size: 12px;
    display: block;
    padding: 0 10px;
    height: 26px;
    line-height: 26px;
    background: #ddd;
    border-radius: 50px;
  }
}
</style>