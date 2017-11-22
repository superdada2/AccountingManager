<template>
  <div class="customerReport">
    <a class="inputRow">
      <el-autocomplete placeholder="Customer" v-model="input.customerSearchValue" :fetch-suggestions="querySearchCustName"></el-autocomplete>
      <el-date-picker v-model="input.customerQueryDate" type="month" placeholder="Month">
      </el-date-picker>
      <el-select v-model="input.productFilter" placeholder="Product">
        <el-option v-for="item in productEnum" :key="item.id" :label="item.data" :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" id="tagAdder" @click="GetCustomerReport">Go</el-button>
			<el-button type="success" id="tagAdder" @click="ResetInput">Reset</el-button>
      <el-button id="export" type="primary " @click="()=>{handleExport([].concat.apply([],this.customerDetails))}">Export</el-button>
      <SaveButton dataName="CustomerReport" :activeData="input" :Load="LoadInput"/>
      <br>
    </a>
    <div class="dataTable">
      <el-table v-for="detail in customerDetails" :key="detail.id" @row-click="ToDetail" v-loading="customerLoading" :data="detail"
        style="width: 100%" show-summary :summary-method="GetSummaries">
        <el-table-column prop="customerName" label="Customer Name" sortable />
        <el-table-column prop="invoiceNumber" label="Invoice Number" sortable />
        <el-table-column prop="product_enum.data" label="Product" sortable/>
        <el-table-column prop="income" label="Income" align="right" sortable>
          <template slot-scope="scope">
            {{(scope.row.income * 1).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column prop="deferred" label="Deferred" align="right" sortable>
          <template slot-scope="scope">
            {{(scope.row.deferred * 1).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column prop="month" label="Month" />
        <el-table-column prop="year" label="Year" />
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from "Axios";
import * as jsonexport from "jsonexport/dist";
import _ from "lodash";
import SaveButton from "../SubComponents/SaveButton";
import { urlBase } from "../../settings.js";
import UserMixin from "../../functions/Authentication";
export default {
  name: "customerReport",
  components: {
    SaveButton
  },
  data() {
    return {
      input: {
        productFilter: "",
        customerQueryDate: "",
        customerSearchValue: ""
      },

      customerLoading: false,
      customerTableVisibility: false,
      productEnum: [],

      customerDetails: [],
      customerNameList: []
    };
  },
  mixins: [UserMixin],
  methods: {
    ResetInput() {
      this.input = {
        productFilter: "",
        customerQueryDate: "",
        customerSearchValue: ""
      };
    },
    LoadInput(input) {
      this.input = { ...input };
      this.input.customerQueryDate = new Date(input.customerQueryDate);
    },
    GetProductEnum() {
      const url = urlBase + "/api/v1/enum/product";
      this.Get(url).then(res => {
        this.productEnum = res.data;
      });
    },
    ToDetail(row) {
      this.$router.push({
        name: "Details",
        params: {
          invoiceId: row.id
        }
      });
    },
    getCustomerName() {
      const url = urlBase + "/api/v1/reports/getCustomerName";
      this.Get(url).then(res => {
        this.customerNameList = res.data;
      });
    },
    querySearchCustName(queryString, cb) {
      var list = this.customerNameList;
      var results = queryString
        ? list.filter(this.createFilter(queryString))
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
    GetCustomerReport() {
      var loading = {};
      if (this.customerDetails.length == 0) {
        loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading"
        });
      }
      const url = urlBase + "/api/v1/reports/getIncomeDeferred";
      this.customerTableVisibility = true;
      this.customerLoading = true;
      var where = {};
      this.input.customerSearchValue != ""
        ? (where["customerName"] = this.input.customerSearchValue)
        : null;
      this.input.productFilter != ""
        ? (where["product"] = this.input.productFilter)
        : null;
      try {
        this.Post(url, {
          where: where
        }).then(res => {
          try {
            const month = this.input.customerQueryDate.getMonth() + 1;
            const year = this.input.customerQueryDate.getFullYear();
            var temp = [...res.data];
            var customerDetails = temp.filter(i => {
              const income = i.incomes.find(j => {
                return j.month == month && j.year == year;
              });
              const deferred = i.deferred_balances.find(j => {
                return j.month == month && j.year == year;
              });
              if (income != undefined || deferred != undefined) {
                return true;
              } else {
                return false;
              }
            });
            customerDetails.forEach((k, index) => {
              var temp2 = {
                ...k
              };
              temp2["month"] = month;
              temp2["year"] = year;
              const holder = temp2.incomes.find(j => {
                return j.month == month && j.year == year;
              });
              temp2["income"] = holder != undefined ? holder.amount : 0;
              const holder2 = temp2.deferred_balances.find(j => {
                return j.month == month && j.year == year;
              });
              temp2["deferred"] = holder2 != undefined ? holder2.amount : 0;
              customerDetails[index] = temp2;
            });

            //split detail into smaller tables
            const customerDetails2 = this.productEnum.map(l => {
              const detail = customerDetails.filter(f => {
                return f.product == l.id;
              });
              if (detail.length == 0) {
                return undefined;
              }
              return detail;
            });
            this.customerDetails = _.compact(customerDetails2);
            this.customerLoading = false;
            this.$message({
              type: "success",
              message: "Success"
            });
            loading.close();
          } catch (err) {
            this.customerLoading = false;
          }
        });
      } catch (err) {
        console.log(err);
        this.customerLoading = false;
        this.$message({
          type: "error",
          message: err.message
        });
      }
    },
    GetSummaries(param) {
      console.log(param);
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Total";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (index === 3 || index === 4) {
          sums[index] =
            "$ " +
            values
              .reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0)
              .toFixed(2);
        } else {
          sums[index] = "";
        }
      });

      return sums;
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
    }
  },
  created() {
    this.getCustomerName();
    this.GetProductEnum();
  }
};
</script>

<style scoped>
#export {
  float: right;
}
</style>
