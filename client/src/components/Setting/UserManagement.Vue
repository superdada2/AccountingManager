<template>
  <div class="user">
    <el-row>
      <el-select ref="form" v-model="currentUser" placeholder="User" @change="changeUser">
        <el-option v-for="user in users" :key="user.username" :label="user.username" :value="user.username">
        </el-option>
      </el-select>
      <br>
      <br>
    </el-row>
    <el-form label-position="left" label-width="120px">
      <el-form-item label="Status">
        <el-radio-group v-model="status">
          <el-radio v-for="option in userStatusOptions" :label="option.name" :key="option.key">{{option.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="ChangeStatus">Change Status</el-button>
      </el-form-item>
    </el-form>
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
const userStatusOptions = [
  {
    name: "Active",
    key: 1
  },
  {
    name: "Deleted",
    key: 2
  }
];
import UserMixin from "../../functions/Authentication";
import { urlBase } from "../../settings.js";
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
      users: [],
      currentUser: "",
      userStatusOptions: userStatusOptions,
      status: "",
      ruleForm2: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    GetUserList() {
      const url = urlBase + "/auth/user";
      this.Get(url).then(res => {
        this.users = res.data;
      });
    },
    changeUser(newUser) {
      const user = [...this.users];
      var temp = user.find(i => i.username == newUser);
      this.status = temp.status;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ChangeStatus() {
      if (this.currentUser === "") {
        this.$message({
          type: "error",
          message: "User can not be empty!"
        });
        return;
      }
      const url = urlBase + "/auth/changeStatus";
      this.Post(url, {
        status: this.status,
        username: this.currentUser
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
    },
    ResetPassword() {
      if (this.currentUser === "") {
        this.$message({
          type: "error",
          message: "User can not be empty!"
        });
        return;
      }
      const url = urlBase + "/auth/resetPassword";
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          this.$confirm("Are you sure to reset this password?").then(_ => {
            this.Post(url, {
              password: this.ruleForm2.pass,
              username: this.currentUser
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
  created() {
    this.GetUserList();
  }
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
