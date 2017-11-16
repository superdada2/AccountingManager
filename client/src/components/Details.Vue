<template>
  <div id='sd'>
    <div class='header'>
      <h1>Details </h1>
    </div>
    <el-dialog title='Comments and Description' :visible.sync='commentDialogVisibility' width='50%'>
      <el-row>
        <el-col :span='11' class='input'>
          <span> Comments </span>
          <el-input type='textarea' :rows='5' v-model='currentComment'>
          </el-input>

        </el-col>
        <el-col :span='11' class='input'>
          <span> Description </span>
          <el-input type='textarea' :rows='5' v-model='currentDescription'>
          </el-input>
        </el-col>
      </el-row>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='commentDialogVisibility = false'>Cancel</el-button>
        <el-button type='primary' @click='updateComments'>Save</el-button>
      </span>
    </el-dialog>
    <el-dialog title='Modify' :visible.sync='modifyDialogVisibility' width='80%'>
      <Modify :invoice-data='currentRow' :close='closeModify' :refresh='refreshData' />
    </el-dialog>
    <el-dialog title='Modify' :visible.sync='detailVisibility' width='50%'>
      <ModifyDetail :detail-data='currentDetail' :close='()=>{this.detailVisibility = false}' :refresh='refreshData' />
    </el-dialog>
    <div id='filter'>



      <br>
      <el-select v-model='selector' placeholder='Selector' @change='selectorChange'>
        <el-option v-for='item in fieldOptions' :key='item' :label='item' :value='item'>
        </el-option>
      </el-select>
      <a> = </a>
      <el-autocomplete v-if='isCustomer' placeholder='Value' v-model='searchValue' :fetch-suggestions='querySearchCustName'></el-autocomplete>
      <el-autocomplete v-if='isInvoice' placeholder='Value' v-model='searchValue' :fetch-suggestions='querySearchInvoice'></el-autocomplete>
      <el-button type='primary' id='tagAdder' @click='addTagg'>Search</el-button>
      <el-button id='export' type='primary ' @click='handleExport'>Export</el-button>
    </div>
    <el-row>
      <div id='dataTable' v-if='invoices.length > 0'>
        <el-table :data='invoices' style='width: 100%' @row-click='openComments' @row-contextmenu='(row, e)=>{e.preventDefault(), modifyInvoice(row,e)}'>
          <el-table-column prop='type_enum.data' label='Type'>
          </el-table-column>
          <el-table-column prop='invoiceDate' label='Date' sortable>
          </el-table-column>
          <el-table-column prop='invoiceNumber' label='Number' sortable>
          </el-table-column>
          <el-table-column prop='customerName' label='Name' sortable>
          </el-table-column>
          <el-table-column prop='class_enum.data' label='Class' sortable>
          </el-table-column>
          <el-table-column prop='currency_enum.data' label='Currency' sortable>
          </el-table-column>
          <el-table-column prop='subscription_enum.data' label='Subscription' sortable>
          </el-table-column>
          <el-table-column prop='status_enum.data' label='Status' sortable>
          </el-table-column>
          <el-table-column prop='revenue_type_enum.data' label='Revenue Type' sortable>
          </el-table-column>
          <el-table-column prop='product_enum.data' label='Product' sortable>
          </el-table-column>
          <el-table-column prop='recognitionStartMonth' label='RecStart' sortable>
          </el-table-column>
          <el-table-column prop='lengthMonth' label='length' sortable>
          </el-table-column>
          <el-table-column align="right" prop='invoiceAmountUSD' label='amountUSD' sortable>
            <template slot-scope="scope">
              {{(scope.row.invoiceAmountUSD * 1).toLocaleString()}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <el-row>

      <el-col :span='6' v-for='detail in details' :key='detail.id'>
        <el-table :data='detail' @header-click="()=>handleHeaderClick(detail)" max-height="780" style='width: 95%; height:780px;'
          class='detailTable' border>
          <el-table-column :label="detail.customerName + ': '+ detail.product + ': '+detail.invoiceNumber">
            <el-table-column prop='year' label='Year'>
            </el-table-column>
            <el-table-column prop='month' label='Month'>
            </el-table-column>
            <el-table-column align="right" prop='income' label='Income'>
              <template slot-scope="scope">
                {{(scope.row.income * 1).toLocaleString()}}
              </template>
            </el-table-column>
            <el-table-column align="right" prop='deferred' label='Deferred'>
              <template slot-scope="scope">
                {{(scope.row.deferred * 1).toLocaleString()}}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "Axios";
import _ from "lodash";
import Modify from "./SubComponents/Modify";
import ModifyDetail from "./SubComponents/ModifyDetail";

import * as jsonexport from "jsonexport/dist";
import { urlBase } from "../settings.js";
export default {
  name: "details",
  components: {
    Modify,
    ModifyDetail
  },
  props: ["test"],
  data() {
    return {
      currentRow: {},
      currentDescription: "",
      currentComment: "",
      commentDialogVisibility: false,
      modifyDialogVisibility: false,
      invoices: [],
      selector: "",
      currentDetail: {},
      searchValue: "",
      fieldOptions: ["customerName", "invoiceNumber"],
      searchValueOptions: [],
      enumList: {},
      details: [],
      isCustomer: true,
      isInvoice: false,
      queryParam: {
        where: {}
      },
      customerNameList: [],
      invoiceNumberList: [],
      isNumber: true,
      detailVisibility: false
    };
  },
  methods: {
    handleHeaderClick(data) {
      this.currentDetail["data"] = data;
      this.currentDetail["id"] = data.id;
      this.currentDetail["customerName"] = data.customerName;
      this.currentDetail["product"] = data.product;
      this.detailVisibility = true;
    },
    refreshData() {
      this.getInvoice(this.queryParam);
    },

    async handleExport(command) {
      this.details.forEach(i => {
        jsonexport(i, (err, csv) => {
          if (err) return console.log(err);
          var uriContent =
            "data:application/octet-stream," + encodeURIComponent(csv);
          var link = document.createElement("a");
          link.setAttribute("href", uriContent);
          link.setAttribute(
            "download",
            i.customerName + "_" + i.invoiceNumber + ".csv"
          );
          document.body.appendChild(link); // Required for FF
          link.click();
        });
      });

      this.$message({
        type: "success",
        message: "Success"
      });
    },
    getInvoice(param) {
      const url = urlBase + "/api/v1/reports/getInvoice";
      const url2 = urlBase + "/api/v1/reports/getIncomeDeferred";
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading"
      });
      axios.post(url, param).then(res => {
        this.invoices = res.data;
      });
      axios.post(url2, param).then(res => {
        var details = [];
        res.data.forEach(entry => {
          var temp = this.merge(entry.incomes, entry.deferred_balances);
          temp["invoiceNumber"] = entry.invoiceNumber;
          temp["customerName"] = entry.customerName;
          temp["product"] = entry.product_enum.data;
          temp["id"] = entry.id;
          details.push(temp);
          loading.close();
        });
        this.details = details;
      });
    },

    merge(income1, deferred1) {
      var output = [];
      var incomeIndex = 0;
      var deferredIndex = 0;
      var income = _.sortBy(income1, ["year", "month"]);
      var deferred = _.sortBy(deferred1, ["year", "month"]);
      console.log(income, deferred);

      while (incomeIndex < income.length || deferredIndex < deferred.length) {
        switch (this.compareDate(
          income[incomeIndex],
          deferred[deferredIndex]
        )) {
          case 0:
            const current1 = deferred[deferredIndex];
            output.push({
              month: current1.month,
              year: current1.year,
              income: 0,
              deferred: current1.amount
            });
            deferredIndex++;
            break;
          case 1:
            const current2 = income[incomeIndex];
            output.push({
              month: current2.month,
              year: current2.year,
              income: current2.amount,
              deferred: 0
            });
            incomeIndex++;
            break;
          case 2:
            const currentIncome = income[incomeIndex];
            const currentDeffered = deferred[deferredIndex];
            output.push({
              month: currentIncome.month,
              year: currentIncome.year,
              income: currentIncome.amount,
              deferred: currentDeffered.amount
            });
            incomeIndex++;
            deferredIndex++;
            break;
        }
      }
      return output;
    },

    compareDate(entry1, entry2) {
      if (entry1 == null) {
        return 0;
      }
      if (entry2 == null) {
        return 1;
      }
      if (entry1.year > entry2.year) {
        return 0;
      }
      if (entry2.year > entry1.year) {
        return 1;
      }
      if (entry1.month > entry2.month) {
        return 0;
      }
      if (entry1.month < entry2.month) {
        return 1;
      }
      return 2;
    },

    selectorChange(value) {
      if (value == "customerName") {
        this.isSelect = false;
        this.isCustomer = true;
        this.isInvoice = false;
      }
      if (value == "invoiceNumber") {
        this.isSelect = false;
        this.isCustomer = false;
        this.isInvoice = true;
      }
    },
    addTagg() {
      const currentParam = {};
      currentParam[this.selector] = this.searchValue;

      this.queryParam.where = currentParam;
      this.getInvoice(this.queryParam);
      this.selector = "";
      this.searchValue = "";
    },
    querySearchCustName(queryString, cb) {
      var list = this.customerNameList;
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list;
      cb(results);
    },
    querySearchInvoice(queryString, cb) {
      var list = this.invoiceNumberList;
      var results = queryString
        ? list.filter(this.createFilterNumber(queryString))
        : list;
      cb(results);
    },
    createFilter(queryString) {
      return link => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    createFilterNumber(queryString) {
      return link => {
        return link.value.toString().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    getCustomerName() {
      const url = urlBase + "/api/v1/reports/getCustomerName";
      axios.get(url).then(res => {
        this.customerNameList = res.data;
      });
    },
    getInvoiceNumber() {
      const url = urlBase + "/api/v1/reports/getInvoiceNumber";
      axios.get(url).then(res => {
        this.invoiceNumberList = res.data;
      });
    },
    openComments(row) {
      this.commentDialogVisibility = true;
      this.currentDescription = row.description;
      this.currentComment = row.comments;
      this.currentRow = row;
    },
    updateComments() {
      if (
        this.currentComment != this.currentRow.comments ||
        this.currentDescription != this.currentRow.description
      ) {
        const url = urlBase + "/api/v1/reports/updateDescription";

        axios.post(url, {
          description: this.currentDescription,
          comments: this.currentComment,
          id: this.currentRow.id
        });
      }
      this.commentDialogVisibility = false;
      this.refreshData();
    },
    modifyInvoice(row, e) {
      this.modifyDialogVisibility = true;
      this.currentRow = row;
      e.stopPropagation();
    },
    closeModify() {
      this.modifyDialogVisibility = false;
    }
  },
  created() {
    this.getCustomerName();
    this.getInvoiceNumber();
    if (this.$route.params.invoiceId != undefined) {
      this.getInvoice({
        where: {
          id: this.$route.params.invoiceId
        }
      });
      this.queryParam = {
        where: {
          id: this.$route.params.invoiceId
        }
      };
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.header,
.submit,
.el-table,
#filter,
#tags {
  margin: 10px;
  margin-left: 20px;
  border: 10px;
}

.el-input,
.el-select,
.el-autocomplete {
  width: 250px;
  margin: 10px;
  margin-left: 0px;
}

a {
  margin-right: 10px;
}

.el-tag {
  margin-right: 10px;
}

.el-dropdown {
  float: right;
}

#export {
  float: right;
}
</style>
