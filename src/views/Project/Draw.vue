<template>
<div id="draw">
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

<style scoped>
#draw {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/2.png");
  background-repeat:no-repeat;
  background-size: 30%;
  background-position:left top;
}
</style>>