<template>
  <div className = "login">
    <el-input placeholder="UserName" v-model="user.username">
    </el-input>
    <el-input placeholder="Password" v-model="user.password">
    </el-input>
    <el-button type="primary" @click="Login">Login</el-button>
    <el-button type="success" @click="Register">Register</el-button>
  </div>
</template>
<script>
import axios from "Axios";
import { urlBase } from "../../settings.js";
export default {
  name: "login",
  data() {
    return {
      user: {
        password: "",
        username: ""
      }
    };
  },
  methods: {
    Login() {
      const url = urlBase + "/auth/login";
      axios.post(url, user).then(res => {});
    },
    Register() {}
  }
};
</script>
<style scoped>

</style>

