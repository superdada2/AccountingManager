<template>
  <div class="Report">
    <el-row>
      <div class="header">
        <h1> Reports</h1>
      </div>
    </el-row>
    <el-row>
      <a id="inputRow">
        <el-select v-model="groupBy" placeholder="Group By">
          <el-option v-for="item in groupByEnum" :key="item.id" :label="item.data" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="balanceType" placeholder="Income Type">
          <el-option v-for="item in balanceTypeEnum" :key="item.id" :label="item.data" :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker v-model="startM" type="month" placeholder="Start Month">
        </el-date-picker>


        <el-date-picker v-model="endM" type="month" placeholder="End Month">
        </el-date-picker>

        <el-button id="submit" type="primary "@click="GetReport">Submit</el-button>
        <el-button id="export" type="primary "@click="handleExport">Export</el-button>
      </a>
    </el-row>
    <el-row>
      <line-chart v-if="showChart" :chartData="chartData" :options="chartOptions"></line-chart>
    </el-row>
    <el-row>
      <line-chart v-if="showChart" :chartData="chartDataCount" :options="chartOptions"></line-chart>
    </el-row>
    <el-row>
      <div id="dataTable">
        <el-table :data="tableData" style="width: 100%" v-if="tableVisibility">
          <el-table-column prop="year" label="Year" />
          <el-table-column prop="month" label="Month" />
          <el-table-column prop="count" label="Count" />
          <el-table-column v-for="item in columnEnum" :key="item.id" :prop="item.data" :label="item.data" />
          <el-table-column prop="total" label="Total" />"
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
  import axios from 'Axios'
  import LineChart from '../charts/LineChart.js'
  import * as jsonexport from 'jsonexport/dist'
  const urlBase = "http://" + window.location.hostname + ":3030"
  const colors = {
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(36, 224, 84, 0.2)',
      'rgba(66, 99, 44, 0.2)',
      'rgba(196, 172, 88, 0.2)',
      'rgba(149, 169, 66, 0.2)',
      'rgba(236, 110, 12, 0.2)',
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(36, 224, 84, 1)',
      'rgba(66, 99, 44, 1)',
      'rgba(196, 172, 88, 1)',
      'rgba(149, 169, 66, 1)',
      'rgba(236, 110, 12, 1)',
    ],
  }
  export default {

    name: 'report',
    components: {
      LineChart,
    },
    data() {
      return {
        balanceType: '',
        groupBy: '',
        balanceTypeEnum: [{
            id: true,
            data: "Income"
          },
          {
            id: false,
            data: "Deferred"
          }
        ],
        groupByEnum: [{
            id: 1,
            data: "Class"
          },
          {
            id: 2,
            data: "Product"
          }
        ],
        tableData: [],
        startM: '',
        endM: '',
        startY: '',
        endY: '',
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
            xAxes: [{
              type: "time",
              time: {
                format: "MMM YYYY",
                tooltipFormat: 'MMM YYYY',
                unit: 'month'
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }],
            yAxes: [{
              id: 'A',
              type: 'linear',
              position: 'left',
              stacked: true
            }]
          }
        },
      }

    },
    methods: {

      GetReport() {
        var url = urlBase
        if (this.groupBy == 2) {
          url += '/api/v1/reports/getProductTable'
          this.GetProductEnum()
        } else {
          url += '/api/v1/reports/getClassTable'
          this.GetClassEnum()
        }
        if (new Date(this.startM) > new Date(this.endM)) {
          this.$message({
            type: 'error',
            message: "Invalid date range"
          })
          return null
        }

        const data = {
          startY: this.startM.getFullYear(),
          endY: this.endM.getFullYear(),
          startM: this.startM.getMonth() + 1,
          endM: this.endM.getMonth() + 1,
          isIncome: this.balanceType
        }
        axios.post(url, data).then(res => {
          this.tableData = res.data
          this.tableVisibility = true
          this.CreateChartData(res.data)
        })
      },

      CreateChartData(tableData) {
        var chartData = { ...this.chartData
        }
        var chartDataCount = { ...this.chartDataCount
        }
        var sumDataSet = this.columnEnum.map((i, index) => {

          var singleSet = {
            yAxisID: 'A',
            label: i.data,
            data: [],
            backgroundColor: colors.backgroundColor[index],
            borderColor: colors.borderColor[index],
            borderCapStyle: 'butt'
          }

          singleSet.data = tableData.map(j => {
            return {
              x: new Date(j.year, j.month - 1),
              y: j[i.data]
            }
          })
          return singleSet
        })
        var countDataSet = this.columnEnum.map((i, index) => {

          var singleSet = {
            yAxisID: 'A',
            label: i.data,
            data: [],
            backgroundColor: colors.backgroundColor[index],
            borderColor: colors.borderColor[index],
            borderCapStyle: 'butt'
          }

          singleSet.data = tableData.map(j => {
            return {
              x: new Date(j.year, j.month - 1),
              y: j[i.data + '_count']
            }
          })
          return singleSet
        })
        chartData['datasets'] = sumDataSet
        chartDataCount['datasets'] = countDataSet
        this.showChart = true
        this.chartData = chartData
        this.chartDataCount = chartDataCount
      },

      GetProductEnum() {
        const url = urlBase + '/api/v1/enum/product'
        axios.get(url).then(res => {
          this.columnEnum = res.data

        })
      },

      GetClassEnum() {
        const url = urlBase + '/api/v1/enum/class'
        axios.get(url).then(res => {
          this.columnEnum = res.data
        })
      },
      handleExport(){
        jsonexport(this.tableData, (err, csv) => {
          if (err) return console.log(err)
          var uriContent = "data:application/octet-stream," + encodeURIComponent(csv);
          var link = document.createElement("a");
          link.setAttribute("href", uriContent);
          link.setAttribute("download", "Report.csv");
          document.body.appendChild(link); // Required for FF

          link.click();
          this.$message({
            type: "success",
            message: "Success"
          })
        })
      }



    },
    created() {}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-input {
    width: 150px
  }

  #inputRow,
  #dataTable,
  .header {
    margin: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }

  #submit {
    margin-left: 40px
  }
  #export{
    float:right;
  }

</style>
