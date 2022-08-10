<template>
  <div class="preview">
    <topology preview="true" :data="data" />
    <div class="tools" v-if="showTools">
      <a-button type="primary" @click="onBack">
        <a-icon type="left" /> 返回
      </a-button>
      <div></div>
      <a-button type="primary" style="margin-right: 0" @click="onSizeWindow">
        <a-icon type="border" />
        适合窗口大小
      </a-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Topology from '@/assets/topology-vue';
Vue.use(Topology);
export default {
  name: 'PreviewView',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: {},
      locked: 0,
      showTools: true
    };
  },
  created() {
    //获取存储数据

      this.data = JSON.parse(this.content);


    this.showTools = true;
  },
  watch: {
    content(newVal){
      this.data = JSON.parse(newVal)
    }
  },
  methods: {
    onSizeWindow() {
      window.topology.fitView(16);
    },

    onSizeOri() {
      window.topology.open(this.data.data);
    },

    onBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.preview {
  position: relative;
  height: 93vh;

  margin-left: 30vh;

  margin-top: -93vh;

  .tools {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    & > div {
      flex-grow: 1;
    }

    button {
      margin: 12px 16px;
    }
  }
}
</style>
