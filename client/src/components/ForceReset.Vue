<template>
  <div class="Force Reset">
    <el-row>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="ResetPassword">Reset Password</el-button>
          <el-button @click="resetForm('ruleForm2')">Reset</el-button>
        </el-form-item>
      </el-form>

    </el-row>
  </div>


  </div>
</template>

<script>
import UserMixin from "../functions/Authentication";
import { urlBase } from "../settings.js";
export default {
  name: "userManagement",
  mixins: [UserMixin],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      forceReset: true,
      ruleForm2: {
        pass: "",
        checkPass: ""
      },
      rules2: {
        pass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ResetPassword() {
      if (this.currentUser === "") {
        this.$message({
          type: "error",
          message: "User can not be empty!"
        });
        return;
      }
      const url = urlBase + "/auth/resetOwnPassword";
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          this.$confirm("Are you sure to reset this password?").then(_ => {
            this.Post(url, {
              password: this.ruleForm2.pass,
              username: this.currentUser,
              forceReset: this.forceReset
            })
              .then(res => {
                this.$message({
                  type: "success",
                  message: "success"
                });
              })
              .catch(err => {
                this.$message({
                  type: "error",
                  message: err.message
                });
              });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {}
};
</script>

<style scoped>
.el-input {
  width: 200px;
}

.nameColumn {
  width: 100px;
}

.user {
  margin-bottom: 20px;
}
</style>
