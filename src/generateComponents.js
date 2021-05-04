import Vue from "vue";

// 想要动态生成的组件，先引入这个文件。
import components1 from "./components/TestCom1.vue";
import components2 from "./components/TestCom2.vue";

// 将组件的名称和组件做一个对应Map
const comMap = {
  components1,
  components2,
};

// 接收生成组件需要的组件名称，和想要传递给组件的
// props, 和 事件
const ReturnNewCom = function ({ props, on }) {
  const {
    comItem: { name },
  } = props;
  const newComponent = Vue.extend({
    render(createElement) {
      // 使用传进来的组件name来决定渲染哪一个组件。
      return createElement(comMap[name], {
        props,
        on,
      });
    },
  });
  return new newComponent();
};

export default ReturnNewCom;
