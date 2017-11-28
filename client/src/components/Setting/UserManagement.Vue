<template>
  <div class="user">
    <el-select v-model="currentUser" placeholder="User" @change="changeUser">
      <el-option v-for="user in users" :key="user.username" :label="user.username" :value="user.username">
      </el-option>
    </el-select>   
    </div>


  </div>
</template>

<script>
import UserMixin from "../../functions/Authentication";
import { urlBase } from "../../settings.js";
export default {
  name: "userManagement",
  mixins: [UserMixin],
  data() {
    return {
      users: [],
      currentUser: ""
    };
  },
  methods: {
    GetUserList() {
      const url = urlBase + "/auth/user";
      this.Get(url).then(res => {
        this.users = res.data;
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
