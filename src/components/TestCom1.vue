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
        // 定义默认的查询条件。
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
      // 删除组件方法
      this.$el.remove();
      // 调用父组件的函数。修改父组件中的 leftComList 数组的数据。
      this.$emit("handleDelete", this.comDetail);
    },
  },
};
</script>
<style scoped>
.widget-wrapper {
  background: #ff7b7b;
  border-radius: 12px;
  overflow: hidden;
  width: 200px;
}
.header {
  height: 50px;
  padding: 0 15px;
}
</style>
