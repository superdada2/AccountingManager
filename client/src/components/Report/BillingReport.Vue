<template>
  <div className="billingReport">
    <el-dialog title="Modify" :visible.sync="modifyDialogVisibility" width="80%">
      <Modify :invoice-data="currentRow" :close="()=>{this.modifyDialogVisibility = false}" :refresh="GetInvoice" />
    </el-dialog>
    <el-dialog title="Modify Comments" :visible.sync="commentDialogVisibility" width="70%">
      <ModifyComments :currentRow="currentRow" :close="()=>{this.commentDialogVisibility = false}" :refresh="GetInvoice" />
    </el-dialog>
    <el-row>
      <el-date-picker v-model="input.billingMonth" type="month" placeholder="Billing Month">
      </el-date-picker>
      <el-button type="primary" @click="GetInvoice">Go</el-Button>
      <SaveButton dataName="BillingReport" :activeData="input" :Load="LoadInput"/>
      <el-button id="export" type="primary " @click="()=>handleExport(this.tableData)">Export</el-button>      
    </el-row>
    <el-row>
      <el-table v-if="tableData.length > 0?true:false" :data="tableData" v-loading="tableLoading" style="width: 100%" @row-click="openComments "
        @row-contextmenu="(row, e)=>{e.preventDefault(), modifyInvoice(row,e)}" show-summary :summary-method="GetSummaries">
        <el-table-column prop="customerName" label="CustomerName" sortable>
        </el-table-column>
        <el-table-column prop="invoiceNumber" label="Invoice Number" sortable>
        </el-table-column>
        <el-table-column prop="invoiceDate" label="InvoiceDate" sortable>
        </el-table-column>
        <el-table-column prop="billingMonth" label="BillingMonth" sortable>
        </el-table-column>
        <el-table-column prop="status_enum.data" label="Status" sortable>
        </el-table-column>
        <el-table-column prop="product_enum.data" label="Product" sortable>
        </el-table-column>
        <el-table-column prop="recognitionStartMonth" label="RecStart" sortable>
        </el-table-column>
        <el-table-column align="right" prop="invoiceAmountUSD" label="amountUSD">
          <template slot-scope="scope">
            {{(scope.row.invoiceAmountUSD * 1).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column prop="increasePercentage" label="Percentage" sortable>
        </el-table-column>
        <el-table-column prop='annualIncreaseEli' label="Eligible">
          <template slot-scope="scope">
            <el-tag>{{scope.row.annualIncreaseEli}}</el-tag>
          </template>
        </el-table-column>

      </el-table>
    </el-row>

  </div>
</template>

<script>
import axios from "Axios";
import * as jsonexport from "jsonexport/dist";
import _ from "lodash";
import Modify from "../SubComponents/Modify";
import ModifyComments from "../SubComponents/ModifyComments";
import SaveButton from "../SubComponents/SaveButton";
import { urlBase } from "../../settings.js";
export default {
  name: "billiingReport",
  data() {
    return {
      input: {
        billingMonth: ""
      },
      tableData: [],
      tableLoading: false,
      modifyDialogVisibility: false,
      currentRow: {},
      currentComment: "",
      currentDescription: "",
      commentDialogVisibility: false
    };
  },
  components: {
    Modify,
    ModifyComments,
    SaveButton
  },
  methods: {
    LoadInput({ billingMonth }) {
      this.input.billingMonth = billingMonth;
    },
    ToDetail(row) {
      this.$router.push({
        name: "Details",
        params: {
          invoiceId: row.id
        }
      });
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
        if (index === 7) {
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
    },

    GetInvoice() {
      const url = urlBase + "/api/v1/reports/getInvoice";
      this.tableLoading = true;
      try {
        axios
          .post(url, {
            where: {
              billingMonth: this.input.billingMonth
            }
          })
          .then(res => {
            this.tableData = res.data;
            this.$message({
              type: "success",
              message: "Success"
            });
            this.tableLoading = false;
          });
      } catch (err) {
        this.tableLoading = false;
        this.$message({
          type: "error",
          message: err.message
        });
      }
    },
    modifyInvoice(row, e) {
      this.modifyDialogVisibility = true;
      this.currentRow = row;
    },
    openComments(row) {
      this.commentDialogVisibility = true;
      this.currentRow = row;
    }
  },
  created() {}
};
</script>

<style scoped>
#export {
  float: right;
}
</style>
