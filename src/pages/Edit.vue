<template>
  <div class="header">
    <MyHeader title="编辑资料"></MyHeader>
    <div class="user_img">
      <img :src="file.head_img" alt />

      <van-uploader :after-read="afterRead" class="uploader" />
    </div>

    <CellBar label="昵称" :text="file.nickname" @click="show1 = !show1" />
    <van-dialog v-model="show1" title="编辑昵称" show-cancel-button @confirm="handleNickname">
      <van-field :value="file.nickname" placeholder="请输入用户名" ref="nickname" />
    </van-dialog>

    <CellBar label="密码" :text="file.password" type="password" @click="show2 = !show2" />
    <van-dialog v-model="show2" title="编辑密码" show-cancel-button @confirm="handlePassword">
      <van-field :value="file.password" placeholder="请输入密码" ref="password" />
    </van-dialog>

    <CellBar label="性别" :text="file.gender === 1? '男':'女'" @click="show3 = !show3" />
    <van-action-sheet v-model="show3" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import CellBar from "@/components/CellBar.vue";
export default {
  data() {
    return {
      file: {},
      show1: false,
      show2: false,
      show3: false,
      actions: [{ name: "男" }, { name: "女" }]
    };
  },
  components: {
    MyHeader,
    CellBar
  },
  methods: {
    editFile(data, callback) {
      if (!data) return;
      this.$axios({
        url: "/user_update/" + localStorage.getItem("id"),
        method: "POST",
        headers: { Authorization: localStorage.getItem("token") },
        data
      }).then(res => {
        const { message } = res.data;
        if (message === "修改成功") {
          if (callback) {
            callback();
          }
          this.$toast.success(message);
        }
      });
    },
    afterRead(file) {
      const formData = new FormData();
      formData.append("file", file.file);

      this.$axios({
        url: "/upload",
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: formData
      }).then(res => {
        const { data } = res.data;
        this.file.head_img = this.$axios.defaults.baseURL + data.url;
        this.editFile({ head_img: data.url });
      });
    },
    handleNickname() {
      const value = this.$refs.nickname.$refs.input.value;
      this.editFile({ nickname: value }, () => {
        this.file.nickname = value;
      });
    },
    handlePassword() {
      const value = this.$refs.password.$refs.input.value;
      this.editFile({ password: value }, () => {
        this.file.password = value;
      });
    },
    onSelect(item) {
      // console.log(item.name);
      var name = item.name;
      var gender = "";
      if (name === "男") {
        gender = 1;
      } else {
        gender = 0;
      }
      this.editFile({ gender }, () => {
        this.file.gender = gender;
      });

      this.show3 = false;
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

<style lang="less" scoped>
.user_img {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  .uploader {
    position: absolute;
    opacity: 0;
  }
  img {
    display: block;
    width: 100 /360 * 100vw;
    height: 100 /360 * 100vw;
    border-radius: 50%;
  }
}
/deep/ .van-uploader__upload {
  width: 100 / 360 * 100vw;
  height: 100 / 360 * 100vw;
  border-radius: 50%;
  margin: 0;
}
</style>>

