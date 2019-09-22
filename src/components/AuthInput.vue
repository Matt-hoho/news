<template>
  <input
    type="text"
    class="input"
    :class="{
            success:status ==='success',
            error:status === 'error'
        }"
    :placeholder="placeholder"
    :value="value"
    @input="handleUsername"
    @change="handleChange"
  />
</template>

<script>
export default {
  data() {
    return {
      status: ""
    };
  },
  props: ["placeholder", "value", "rule", "err_message"],
  methods: {
    handleUsername(event) {
      const { value } = event.target;
      this.$emit("input", value);
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = "success";
        } else {
          this.status = "error";
        }
      }
    },
    handleChange() {
      if (this.err_message && this.status === "error") {
        // alert(this.err_message);
        this.$toast.fail(this.err_message)
      }
    }
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
  height: 38 / 360 * 100vw;
  font-size: 18px;
  padding: 20px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px #666 solid;
  outline: none;
  margin: 10px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>