<template>
  <div class="user">
    <el-select v-model="currentUser" placeholder="User" @change="changeUser">
      <el-option v-for="user in users" :key="user.username" :label="user.username" :value="user.username">
      </el-option>
    </el-select>
    <div class="permission">
      <el-form label-position="left">
        <el-form-item label='Invoice Permsions: '>
          <el-checkbox-group v-model="permission.invoicePermissions">
            <el-checkbox v-for="option in options.invoiceOptions" :label="option.key" :key="option.key">{{option.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label='Setting Permsions: '>
          <el-checkbox-group v-model="permission.settingPermissions">
            <el-checkbox v-for="option in options.settingOptions" :label="option.key" :key="option.key">{{option.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label='Home Permsions: '>
          <el-checkbox-group v-model="permission.homePermissions">
            <el-checkbox v-for="option in options.homeOptions" :label="option.key" :key="option.key">{{option.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label='User Permsions: '>
          <el-checkbox-group v-model="permission.userPermissions">
            <el-checkbox v-for="option in options.userOptions" :label="option.key" :key="option.key">{{option.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label='Report Permsions: '>
          <el-checkbox-group v-model="permission.reportPermissions">
            <el-checkbox v-for="option in options.reportOptions" :label="option.key" :key="option.key">{{option.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="Submit">Submit</el-button>
    </div>


  </div>
</template>

<script>
const invoiceOptions = [
  {
    name: "Add",
    key: 1
  },
  {
    name: "Modify",
    key: 2
  },
  {
    name: "Delete",
    key: 3
  },
  {
    name: "View",
    key: 4
  }
];

const settingOptions = [
  {
    name: "Add",
    key: 1
  },
  {
    name: "Modify",
    key: 2
  },
  {
    name: "Delete",
    key: 3
  }
];

const homeOptions = [
  {
    name: "View",
    key: 1
  }
];
const userOptions = [
  {
    name: "Admin",
    key: 1
  },
  {
    name: "View History",
    key: 2
  }
];
const reportOptions = [
  {
    name: "View",
    key: 1
  }
];
import UserMixin from "../../functions/Authentication";
import { urlBase } from "../../settings.js";
export default {
  name: "userPermission",
  mixins: [UserMixin],
  data() {
    return {
      users: [],
      currentUser: "",
      permissionList: [],
      options: {
        invoiceOptions: invoiceOptions,
        settingOptions: settingOptions,
        homeOptions: homeOptions,
        userOptions: userOptions,
        reportOptions: reportOptions
      },
      permission: {
        invoicePermissions: [],
        settingPermissions: [],
        homePermissions: [],
        userPermissions: [],
        reportPermissions: []
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
      this.LoadPermissions(temp.user_permissions);
    },
    LoadPermissions(permissionList = []) {
      this.permission.invoicePermissions = permissionList
        .filter(i => i.module == 1)
        .map(j => {
          return j.role;
        });
      this.permission.settingPermissions = permissionList
        .filter(i => i.module == 2)
        .map(j => {
          return j.role;
        });
      this.permission.homePermissions = permissionList
        .filter(i => i.module == 3)
        .map(j => {
          return j.role;
        });
      this.permission.userPermissions = permissionList
        .filter(i => i.module == 4)
        .map(j => {
          return j.role;
        });
      this.permission.reportPermissions = permissionList
        .filter(i => i.module == 5)
        .map(j => {
          return j.role;
        });
    },
    Submit() {
      var permissionArray = [];
      //Add Invoice permission
      this.permission.invoicePermissions.forEach(i => {
        permissionArray.push({
          username: this.currentUser,
          module: 1,
          role: i
        });
      });
      this.permission.settingPermissions.forEach(i => {
        permissionArray.push({
          username: this.currentUser,
          module: 2,
          role: i
        });
      });
      this.permission.homePermissions.forEach(i => {
        permissionArray.push({
          username: this.currentUser,
          module: 3,
          role: i
        });
      });
      this.permission.userPermissions.forEach(i => {
        permissionArray.push({
          username: this.currentUser,
          module: 4,
          role: i
        });
      });
      this.permission.reportPermissions.forEach(i => {
        permissionArray.push({
          username: this.currentUser,
          module: 5,
          role: i
        });
      });
      const url = urlBase + "/auth/updatePermissions";
      console.log(permissionArray);
      this.Post(url, {
        username: this.currentUser,
        permissions: permissionArray
      }).then(res => {
        this.$message({
          type: "success",
          message: "Updated"
        });
        this.GetUserList();
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
