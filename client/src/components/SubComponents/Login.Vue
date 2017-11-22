<template>
  <a className="login">
    <a v-if="!loggedIn">
      <el-input placeholder="UserName" v-model="user.username">
      </el-input>
      <el-input placeholder="Password" v-model="user.password">
      </el-input>
      <el-button type="primary" @click="Login">Login</el-button>
      <el-button type="success" @click="Register">Register</el-button>
    </a>
    <a v-if="loggedIn">
      <a>Welcome {{user.username}}</a>
      <el-button type="error" @click="Logout">Log Out</el-button>
    </a>
  </a>
</template>
<script>
import axios from "Axios";
import { urlBase } from "../../settings.js";
export default {
  name: "Login",
  data() {
    return {
      user: {
        password: "",
        username: ""
      },
      loggedIn: false
    };
  },
  methods: {
    Login() {
      const url = urlBase + "/auth/login";
      axios
        .post(url, this.user)
        .then(res => {
          (this.user = res.data), (this.loggedIn = true);
          this.$cookie.set("user", JSON.stringify({ ...res.data }));
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "login failed"
          });
          console.log(err);
        });
    },
    Register() {}
  }
};
</script>
<style scoped>
.login {
  float: right;
}

.el-input {
  width: 200px;
}
</style>
