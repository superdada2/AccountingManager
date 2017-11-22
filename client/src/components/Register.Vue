<template>
  <div class="register">
    <h1> Register </h1>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="username" label="User Name">
        <el-input placeholder="User Name" v-model="form.username">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input placeholder="Password" v-model="form.username" type="password">
        </el-input>
      </el-form-item>
    </el-form>
    <br>
    <el-button type="success" @click="Register">Register</el-button>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "Please Input a UserName"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "Please Input a Password"
          }
        ]
      }
    };
  }
};
</script>
<style scoped>

</style>
