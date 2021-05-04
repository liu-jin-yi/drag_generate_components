<template>
  <div class="widget-wrapper">
    <header class="header">{{ comDetail.name }}--{{ comDetail.id }}</header>
    <h1>查询条件：{{ queryObj }}</h1>
    <button @click="handleDelete">清除</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comDetail: this.comItem,
      _queryObj: this.queryObj,
    };
  },
  props: {
    comItem: {
      type: Object,
      default() {
        return {
          id: 0,
          name: "",
        };
      },
    },
    queryObj: {
      // 可以接收父组件传递的晒选条件，必须是Object
      type: Object,
      default() {
        return {
          num: 0,
        };
      },
    },
  },
  watch: {
    comItem(val) {
      this.comDetail = val;
      return val;
    },
    queryObj(val) {
      this._queryObj = val;
      return val;
    },
  },
  created() {
    console.log("data -> this.comItem", this.comItem);
  },
  methods: {
    handleDelete() {
      this.$el.remove();
      this.$emit("handleDelete", this.comDetail);
    },
  },
};
</script>
<style scoped>
.widget-wrapper {
  background: #60acfc;
  border-radius: 12px;
  overflow: hidden;
  width: 200px;
}
.header {
  height: 50px;
  padding: 0 15px;
}
</style>
