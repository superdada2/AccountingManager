<template>
  <div>
    <h1>{{detail.customerName + " : " + detail.product}}</h1>
    <br>
    <div class="table">
      <el-button class="add"size="small" @click="AddTop">Add Top</el-button>
      <br>
      <table>
        <tr>
          <th>Year</th>
          <th>Month</th>
          <th>Income</th>
          <th>Deferred</th>
          <th>Action</th>
        </tr>
        <tr v-for="(row, index) in detail.data" :key='row.month'>
          <td>
            <input type="text" v-model="row.year" /> </td>
          <td>
            <input type="text" v-model="row.month" /> </td>
          <td>
            <input type="text" v-model="row.income" /> </td>
          <td>
            <input type="text" v-model="row.deferred" /> </td>
          <td>
            <el-button size="small" @click="()=>DeleteRow(index)">Delete</el-button>
          </td>
        </tr>
      </table>
      <br>
      <el-button class="add" size="small" @click="AddBottom">Add Bottom</el-button>
      <br>
    </div>
    <el-button type="primary" class="form" @click="Save">Save</el-button>
    <el-button  class="form" @click="close">Cancel</el-button>
  </div>
</template>

<script>
import axios from "Axios";
import { urlBase } from "../../settings.js";
import UserMixin from "../../functions/Authentication";
export default {
  name: "ModifyDetail",
  props: ["detailData", "close", "refresh"],
  data() {
    return {
      detail: {}
    };
  },
  mixins: [UserMixin],
  methods: {
    AddTop() {
      var temp = [...this.detail.data];

      temp.unshift({
        year: 0,
        month: 0,
        income: 0,
        deferred: 0
      });
      this.detail.data = temp;
    },
    AddBottom() {
      var temp = [...this.detail.data];
      temp.push({
        year: 0,
        month: 0,
        income: 0,
        deferred: 0
      });
      this.detail.data = temp;
    },
    DeleteRow(index) {
      var temp = [...this.detail.data];
      temp.splice(index, 1);
      this.detail.data = temp;
    },
    Save() {
      const url = urlBase + "/api/v1/reports/modifyIncomeDeferred";
      try {
        this.Post(url, {
          invoiceId: this.detail.id,
          data: this.detail.data
        }).then(res => {
          this.$message({
            type: "success",
            message: "Saved!"
          });
          this.refresh();
          this.close();
        });
      } catch (err) {
        this.$message({
          type: "error",
          message: "Something went wrong!"
        });
      }
    }
  },
  created() {
    this.detail = {
      ...this.detailData
    };
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.table {
  margin: 10px;
}
.add {
  margin: 10px;
  margin-left: 0px;
  margin-top: 0px;
}
</style>
