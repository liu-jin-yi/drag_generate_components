<template>
  <div class="dragCom">
    <h1>{{ leftComList }}</h1>
    <button @click="queryObj.num++">改变查询条件</button>
    <div class="body">
      <div class="left">
        <draggable class="left" :list="leftComList" :group="'people'">
          <div
            ref="comBody"
            v-for="({ name, id }, index) in leftComList"
            :key="id"
            class="comCard"
          >
            <!-- 循环 leftComList 数组，利用数据来渲染组件， 将动态生成的数组添加到这个DOM元素当中。 -->
            {{
              handleAddCom({
                props: { comItem: { name, id }, queryObj },
                index,
              })
            }}
          </div>
        </draggable>
      </div>
      <div class="right">
        <draggable
          class="dragArea"
          :list="rightComList"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="handleCloneDog"
        >
          <div class="card" v-for="element in rightComList" :key="element.id">
            {{ element.name }}
          </div>
          <!-- 右侧的 卡片 数据， rightComList 数组对象中的name就对应了generateComponents.js
          中的ComMap中的属性 -->
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import CreateCom from "./generateComponents";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      rightComList: [
        {
          id: Math.random(),
          name: "components1",
        },
        {
          id: Math.random(),
          name: "components2",
        },
      ],
      leftComList: [], // 存储驱动动态生成组件的数据。
      comMap: new Map(), // 主要的作用就是用来记录 组件有没有渲染到 class="comCard" 这个DOM中,
      // 如果渲染了就不能再往进添加子元素了。
      queryObj: {
        // 主要的作用就是向子组件传递查询条件
        num: 0,
      },
    };
  },
  beforeDestroy() {
    // 清除 记录 的数据
    this.comMap.clear();
  },
  methods: {
    handleAddCom({ index, on = {}, props = { comItem: { name: "", id: 0 } } }) {
      const {
        comItem: { id, name },
      } = props;
      this.$nextTick(() => {
        // 获取该节点的子节点的长度
        const childNodesLength = this.$refs.comBody[index].childNodes.length;
        // 获取comBody 这个DOM 数组的长度
        const comLine = this.$refs.comBody.length;
        if (!this.comMap.get(id)) {
          // 如果没有渲染过组件

          // 1. 调用 CreateCom 方法 创建组件。 并传递 props 和 事件
          const com = CreateCom({
            name,
            props,
            on: {
              handleDelete: this.handleDeleteCom,
              ...on,
            },
          });
          // 2. 生成组件
          com.$mount();
          if (childNodesLength === 2) {
            // 如果要添加到两个组件中间。那么就将新生成的组件DOM位置进行修改放到中间。
            // 将最后的组件DOM添加到正确的位置
            this.$refs.comBody.splice(
              index,
              0,
              this.$refs.comBody[comLine - 1]
            );
          }
          // 3. 将生成的组件添加到改DOM中。
          this.$refs.comBody[index].appendChild(com.$el);
          // 4. 记录该组件实现了渲染。
          this.comMap.set(id, true);
        } else {
          // 该位置的组件已经渲染，不需要再次渲染直接返回
          return;
        }
      });
    },
    handleDeleteCom({ id }) {
      // 传递给子组件删除的方法，根据组件的id来删除数据
      const index = this.leftComList.findIndex((item) => item.id === id);
      if (~index) {
        // 如果存在这个id的组件，就删除
        this.leftComList.splice(index, 1);
      }
    },
    handleCloneDog(item) {
      // 给 leftComList 数组添加数据
      return {
        ...item,
        id: Math.random(),
      };
    },
  },
};
</script>

<style>
.dragCom {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.body {
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: space-between;
}
.left {
  flex: 1;
  height: 800px;
  border: 1px solid pink;
}
.right {
  width: 20%;
  height: 800px;
}
.card {
  height: 50px;
  background-color: #40cec7;
  margin: 12px 0;
  font-size: 12px;
  line-height: 50px;
  cursor: pointer;
}
.comCard {
  margin: 12px;
  display: inline-block;
}
</style>
