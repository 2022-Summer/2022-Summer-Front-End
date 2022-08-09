<template>
  <div>
    <h1>绘制图</h1>
    <button @click="gotoEditPage">点我去drawio</button>
  </div>
</template>

<script>
export default {
  methods: {
    gotoEditPage(item) {
      this.$router.push('/drawpage');
    }
  }
};
</script>
