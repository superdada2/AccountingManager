<template>
  <div class="Report">
    <el-row>
      <div class="header">
        <h1> Reports</h1>
      </div>
    </el-row>
    <el-tabs value='default'>
      <el-tab-pane label="Default" name='default'>
        <el-row>
          <a class="inputRow">
            <el-select v-model="input.groupBy" placeholder="Group By">
              <el-option v-for="item in groupByEnum" :key="item.id" :label="item.data" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="input.balanceType" placeholder="Income Type">
              <el-option v-for="item in balanceTypeEnum" :key="item.id" :label="item.data" :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker v-model="input.startM" type="month" placeholder="Start Month">
            </el-date-picker>


            <el-date-picker v-model="input.endM" type="month" placeholder="End Month">
            </el-date-picker>

            <el-button id="submit" type="primary " @click="GetReport">Submit</el-button>
            <el-button id="export" type="primary " @click="()=>HandleExport(this.tableData)">Export</el-button>
            <SaveButton dataName="DefaultReport" :activeData="input" :Load="LoadInput" />
          </a>
        </el-row>

        <el-row>
          <line-chart v-if="showChart" :chartData="chartData" :options="chartOptions"></line-chart>
        </el-row>
        <el-row>
          <line-chart v-if="showChart" :chartData="chartDataCount" :options="chartOptions"></line-chart>
        </el-row>
        <el-row>
          <div class="dataTable">
            <el-table :data="tableData" style="width: 100%" v-if="tableVisibility">
              <el-table-column prop="year" label="Year" />
              <el-table-column prop="month" label="Month" />
              <el-table-column prop="count" label="Count" />
              <el-table-column v-for="item in columnEnum" :key="item.id" :prop="item.data" :label="item.data" align="right">
                <template slot-scope="scope">
                  {{(scope.row[item.data] * 1).toLocaleString(undefined, {style:'currency', currency:'USD'})}}
                </template>
              </el-table-column>
              <el-table-column prop="total" label="Total" align="right">
                <template slot-scope="scope">
                  {{(scope.row.total * 1).toLocaleString(undefined, {style:'currency', currency:'USD'})}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label='Customers' name="customer">
        <CustomerReport/>
      </el-tab-pane>
      <el-tab-pane label='Billing' name='billing'>
        <BillingReport/>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import axios from "Axios";
import BillingReport from "./Report/BillingReport";
import CustomerReport from "./Report/CustomerReport";
import LineChart from "../charts/LineChart.js";
import * as jsonexport from "jsonexport/dist";
import SaveButton from "./SubComponents/SaveButton";
import _ from "lodash";

import { urlBase } from "../settings.js";
import UserMixin from "../functions/Authentication";
import colors from "../assets/colors";
export default {
  name: "report",
  components: {
    LineChart,
    BillingReport,
    CustomerReport,
    SaveButton
  },
  data() {
    return {
      input: {
        balanceType: "",
        groupBy: "",
        startM: "",
        endM: ""
      },
      balanceTypeEnum: [
        {
          id: true,
          data: "Income"
        },
        {
          id: false,
          data: "Deferred"
        }
      ],
      groupByEnum: [
        {
          id: 1,
          data: "Class"
        },
        {
          id: 2,
          data: "Product"
        }
      ],
      tableData: [],

      columnEnum: [],
      tableVisibility: false,
      monthEnum: [],

      showChart: false,
      chartData: {},
      chartDataCount: {},

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                format: "MMM YYYY",
                tooltipFormat: "MMM YYYY",
                unit: "month"
              },
              scaleLabel: {
                display: true,
                labelString: "Date"
              }
            }
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "left",
              stacked: true
            }
          ]
        }
      }
    };
  },
  mixins: [UserMixin],
  methods: {
    LoadInput(input) {
      this.input = input;
      this.input.startM = new Date(input.startM);
      this.input.endM = new Date(input.endM);
    },
    GetReport() {
      var url = urlBase;
      if (this.input.groupBy == 2) {
        url += "/api/v1/reports/getProductTable";
        this.columnEnum = [...this.productEnum];
      } else {
        url += "/api/v1/reports/getClassTable";
        this.columnEnum = [...this.classEnum];
      }
      if (new Date(this.input.startM) > new Date(this.input.endM)) {
        this.$message({
          type: "error",
          message: "Invalid date range"
        });
        return null;
      }

      const data = {
        startY: this.input.startM.getFullYear(),
        endY: this.input.endM.getFullYear(),
        startM: this.input.startM.getMonth() + 1,
        endM: this.input.endM.getMonth() + 1,
        isIncome: this.input.balanceType
      };
      this.Post(url, data).then(res => {
        this.tableData = res.data;
        this.tableVisibility = true;
        this.CreateChartData(res.data);
      });
    },
    CreateChartData(tableData) {
      var chartData = {
        ...this.chartData
      };
      var chartDataCount = {
        ...this.chartDataCount
      };
      var sumDataSet = this.columnEnum.map((i, index) => {
        var singleSet = {
          yAxisID: "A",
          label: i.data,
          data: [],
          backgroundColor: colors.backgroundColor[index],
          borderColor: colors.borderColor[index],
          borderCapStyle: "butt"
        };

        singleSet.data = tableData.map(j => {
          return {
            x: new Date(j.year, j.month - 1),
            y: j[i.data]
          };
        });
        return singleSet;
      });
      var countDataSet = this.columnEnum.map((i, index) => {
        var singleSet = {
          yAxisID: "A",
          label: i.data,
          data: [],
          backgroundColor: colors.backgroundColor[index],
          borderColor: colors.borderColor[index],
          borderCapStyle: "butt"
        };

        singleSet.data = tableData.map(j => {
          return {
            x: new Date(j.year, j.month - 1),
            y: j[i.data + "_count"]
          };
        });
        return singleSet;
      });
      chartData["datasets"] = sumDataSet;
      chartDataCount["datasets"] = countDataSet;
      this.showChart = true;
      this.chartData = chartData;
      this.chartDataCount = chartDataCount;
    },

    GetProductEnum() {
      const url = urlBase + "/api/v1/enum/product";
      this.Get(url).then(res => {
        this.productEnum = res.data;
      });
    },

    GetClassEnum() {
      const url = urlBase + "/api/v1/enum/class";
      this.Get(url).then(res => {
        this.classEnum = res.data;
      });
    },
    HandleExport(data) {
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
    // this.GetCustomerReport()

    this.GetClassEnum();
    this.GetProductEnum();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input {
  width: 150px;
}

.inputRow,
.dataTable,
.header {
  margin: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

#submit {
  margin-left: 40px;
}

#export {
  float: right;
}
</style>
