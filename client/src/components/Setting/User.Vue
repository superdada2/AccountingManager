<template>
  <div class="user">
    <div v-for="person in userList" :key="person.username">
      <a  class="nameColumn">{{person.username}}</a>
      <el-input v-model="person.accessLevel"></el-input>
    </div>
  </div>
</template>

<script>
import UserMixin from "../../functions/Authentication";
import { urlBase } from "../../settings.js";
export default {
  name: "user",
  mixins: [UserMixin],
  data() {
    return {
      userList: []
    };
  },
  methods: {
    GetUserList() {
      const url = urlBase + "/auth/user";
      this.Get(url).then(res => {
        this.userList = res.data;
      });
    }
  },
  created() {
    this.GetUserList();
  }
};
</script>

<style>
.el-input {
  width: 200px;
}
.nameColumn {
  width: 100px;
}
</style>
