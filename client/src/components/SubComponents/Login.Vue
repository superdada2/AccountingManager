<template>
  <a class="login">
    <a v-if="!loggedIn">
      <el-input placeholder="UserName" v-model="user.username">
      </el-input>
      <el-input placeholder="Password" type="password" v-model="user.password">
      </el-input>
      <el-button type="primary" @click="Login">Login</el-button>
    </a>
    <a v-if="loggedIn">
      <a>Welcome {{auth.user.username}}</a>
      <el-button type="info" @click="Logout">Log Out</el-button>
    </a>
  </a>
</template>
<script>
import axios from "Axios";
import { urlBase } from "../../settings.js";
import UserMixin from "../../functions/Authentication";
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
  mixins: [UserMixin],
  props: ["refreshMenu", "clearMenu"],
  methods: {
    Login() {
      const url = urlBase + "/auth/login";
      axios
        .post(url, this.user)
        .then(res => {
          (this.auth = res.data), (this.loggedIn = true);
          this.SetUser(res.data);
          this.refreshMenu();
          this.$router.push({
            name: "Welcome"
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "login failed"
          });
          console.log(err);
        });
    },
    Logout() {
      this.auth = {};
      this.loggedIn = false;
      this.$cookie.delete("auth");
      const url = urlBase + "/auth/logout";
      this.$router.push({
        name: "Register"
      });
      this.user = { username: "", password: "" };
      this.clearMenu();
      this.Get(url, null).then(res => {
        this.$message({ type: success, message: "Logout Complete" });
      });
    }
  },
  async created() {
    if (await this.TestUser(this.auth.token)) {
      this.loggedIn = true;
    }
  }
};
</script>
<style scoped>
.login {
  float: right;
  margin-right: 10px;
  margin-top: 25px;
}

.el-input {
  width: 200px;
}
.el-button {
  margin-left: 10px;
}
</style>
