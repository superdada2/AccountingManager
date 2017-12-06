<template>
  <div class="register">
    <h1> Register </h1>
    <el-form :model="form" :rules="rules" ref="form" label-position="left"  align="right">
      <el-form-item prop="username" label="User Name">
        <el-input placeholder="User Name" v-model="form.username">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input placeholder="Password" v-model="form.password" type="password">
        </el-input>
      </el-form-item>
      <el-form-item prop="email" label="Email">
        <el-input placeholder="Email" v-model="form.email" >
        </el-input>
      </el-form-item>
    </el-form>
    <br>
    <el-button type="success" @click="Register">Register</el-button>
  </div>
</template>
<script>
import axios from "axios";
import { urlBase } from "../settings.js";
export default {
  name: "register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: ""
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
        ],
        email: [
          {
            required: true,
            trigger: "blur",
            message: "Please input a Email",
            type: "email"
          }
        ]
      }
    };
  },
  methods: {
    ResetPassword() {
      const url = urlBase + "/auth/resetPassword";
      axios.post(url, { email: this.form.email });
      this.$message({
        type: "success",
        message: "A Password Reset Email has been sent to you!"
      });
    },
    Register() {
      const url = urlBase + "/auth/register";
      axios
        .post(url, this.form)
        .then(res => {
          this.$message({ type: "success", message: "Register Success" });
        })
        .catch(err => {
          // console.log("caught");
          this.$message({
            type: "error",
            message: "Registration Failed"
          });
        });
    }
  }
};
</script>
<style scoped>
.el-input {
  width: 200px;
}
.register {
  width: 300px;
}
</style>
