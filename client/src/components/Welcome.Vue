<template>
    <div>
      <img id="image" src="../assets/welcome.png" height="100%" width="100%"/>
    </div>
</template>

<script>
import UserMixin from "../functions/Authentication";

export default {
  name: "app",
  mixins: [UserMixin]
};
</script>

<style>

</style>
