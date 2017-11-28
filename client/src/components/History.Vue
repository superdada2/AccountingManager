<template>
  <div class="history">
    <Help :message="helpMessage"/>
    <div class="header">
      <h1>History </h1>
    </div>
    <el-dialog title="Comments and Description" :visible.sync="detailDialogVisibility" width="50%">
      <HistoryDetail :close="()=>{this.detailDialogVisibility = false}" :currentRow="currentRow" />
    </el-dialog>
    <el-row>
      
      <el-select v-model="operationSelect" placeholder="Operation" >
        <el-option key="Create" label="Create" value="Create">
        </el-option>
        <el-option key="Modify" label="Modify" value="Modify">
        </el-option>
        <el-option key="ModifyIncomeDeferred" label="ModifyIncomeDeferred" value="ModifyIncomeDeferred">
        </el-option>
        <el-option key="Delete" label="Delete" value="Delete">
        </el-option>
      </el-select>
      <el-button type="primary" @click="()=>addTagg('operationType')">Add</el-button>
      <el-autocomplete placeholder="User" v-model="userSearch" :fetch-suggestions="querySearchUser"></el-autocomplete>
      <el-button type="primary" @click="()=>addTagg('user')">Add</el-button>
      <el-button id="export" type="primary " @click="()=>{handleExport(this.historyData)}">Export</el-button>
    </el-row>
    <el-row>
      <div id="tags">
        <el-tag v-for="tag in tags" :key="tag.id" @close="removeTagg(tag)" closable :type="success">
          {{tag.value}}
        </el-tag>
      </div>
    </el-row>
    <el-row>
      <el-table :data="historyData" v-loading="loading" style="width: 60%" @row-click="HandleRowClick">
        <el-table-column prop="invoiceId" label="Invoice Number">
        </el-table-column>
        <el-table-column prop="user" label="User">
        </el-table-column>
        <el-table-column prop="timestamp" label="Time Stamp">
          <template slot-scope="scope">
            {{scope.row.timestamp | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="operationType" label="Operation Type">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { urlBase } from "../settings.js";
import UserMixin from "../functions/Authentication";
import Help from "./SubComponents/Help";
import HistoryDetail from "./SubComponents/HistoryDetail";
import * as jsonexport from "jsonexport/dist";
import moment from "moment";
export default {
  name: "history",
  mixins: [UserMixin],
  components: {
    Help,
    HistoryDetail
  },
  data() {
    return {
      operationSelect: "",
      userSearch: "",
      detailDialogVisibility: false,
      usernameList: [],
      tags: [],
      helpMessage: "Left click on a entry to show details",
      queryParam: {
        where: {}
      },
      historyData: [],
      currentRow: {}
    };
  },
  methods: {
    HandleRowClick(row) {
      this.currentRow = row;
      this.detailDialogVisibility = true;
    },
    GetUsername() {
      const url = urlBase + "/reports/getUsername";
      this.Get(url).then(res => {
        this.usernameList = res.data;
      });
    },
    createFilter(queryString) {
      return link => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    querySearchUser(queryString, cb) {
      var list = this.usernameList;
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list;
      cb(results);
    },
    addTagg(selector) {
      const currentParam = {
        ...this.queryParam.where
      };
      var searchValue = "";
      switch (selector) {
        case "user":
          currentParam[selector] = this.userSearch;
          searchValue = this.userSearch;
          break;
        case "operationType":
          currentParam[selector] = this.operationSelect;
          searchValue = this.operationSelect;
          break;
      }
      this.queryParam.where = currentParam;
      this.getHistory(this.queryParam);
      if (
        _.findIndex(this.tags, i => {
          return i.id == selector;
        }) != -1
      ) {
        this.tags[
          _.findIndex(this.tags, i => {
            return i.id == selector;
          })
        ].value =
          selector + " = " + searchValue;
      } else {
        this.tags.push({
          id: selector,
          value: selector + " = " + searchValue
        });
      }
    },
    handleExport(data) {
      jsonexport(data, (err, csv) => {
        if (err) return console.log(err);
        var uriContent =
          "data:application/octet-stream," + encodeURIComponent(csv);
        var link = document.createElement("a");
        link.setAttribute("href", uriContent);
        link.setAttribute("download", "Report.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
        this.$message({
          type: "success",
          message: "Success"
        });
      });
    },
    removeTagg(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      delete this.queryParam.where[tag.id];
      this.getHistory(this.queryParam);
    },
    getHistory(param) {
      const url = urlBase + "/api/v1/reports/getHistory";
      this.loading = true;
      this.Post(url, param).then(res => {
        this.historyData = res.data;
        this.loading = false;
      });
    },
    getUserName() {
      const url = urlBase + "/api/v1/reports/getUsername";
      this.Get(url).then(res => {
        this.usernameList = res.data;
      });
    }
  },
  created() {
    this.getHistory();
    this.getUserName();
  },
  filters: {
    formatDate: function(dateString) {
      return moment(dateString).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>

<style scoped>
#export {
  float: right;
}
</style>
