<template>
  <el-card class="help" v-if="message" :body-style="{padding:'10px'}">
    <div ><b>Help:</b> </div>
    <p>{{message}}</p>
  </el-card>
</template>

<script>
export default {
  name: "help",
  props: ["message"]
};
</script>

<style scoped>
.help {
  position: fixed;
  bottom: 30px;
  left: 5px;
  width: 140px;
  font-size: 14px;
}
</style>
