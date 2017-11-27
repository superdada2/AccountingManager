<template>
  <div class="history">
    <el-row>
      <el-select v-model="operationSelect" placeholder="Operation" @change="selector2Change">
        <el-option key="Create" label="Create" value="Create">
        </el-option>
        <el-option key="Modify" label="Modify" value="Modify">
        </el-option>
        <el-option key="ModifyIncomeDeferred" label="ModifyIncomeDeferred" value="ModifyIncomeDeferred">
        </el-option>
        <el-option key="Delete" label="Delete" value="Delete">
        </el-option>
      </el-select>
      <el-button type="primary" @click="AddOperation">Add</el-button>
      <el-autocomplete placeholder="User" v-model="userSearch" :fetch-suggestions="querySearchUser"></el-autocomplete>
      <el-button type="primary" @click="AddUser">Add</el-button>
    </el-row>
  </div>
</template>

<script>
import { urlBase } from "../settings.js";
import UserMixin from "../functions/Authentication";
export default {
  name: "history",
  mixins: [UserMixin],
  data() {
    return {
      operationSelect: "",
      userSearch: ""
    };
  },
  methods: {
    GetUsername() {
      this.Get;
    }
  }
};
</script>

<style scoped>

</style>
