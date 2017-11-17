<template>
  <div class='Default'>
    <el-row>
      <div class='header'>
        <h1>Home</h1>
      </div>
    </el-row>
    <el-row class='chart'>
      <el-select v-model='form1.filter' placeholder='Active'>
        <el-option label='Total' value='total'>
        </el-option>
        <el-option label='Active' value='active'>
        </el-option>
        <el-option label='BillingMonth' value='billingMonth'>
        </el-option>
        <el-option label='RecMonth' value='recognitionStartMonth'>
        </el-option>
      </el-select>
      <el-date-picker v-if="form1.filter == 'recognitionStartMonth'|| form1.filter == 'billingMonth' ? true: false" v-model='form1.startMonth' type='month' placeholder='Start Date'></el-date-picker>
      <el-date-picker v-if="form1.filter == 'recognitionStartMonth'|| form1.filter == 'billingMonth' ? true: false" v-model='form1.endMonth' type='month' placeholder='End Date'></el-date-picker>
      <el-button type='primary' @click='GetPieData'>Go</el-button>
      <br>
    </el-row>
    <el-row>
      <div class='chart'>
        <el-col :span='8'>
          <pie-chart :chartData='billByCurrency' :options='currencyChartOptions'></pie-chart>
        </el-col>
        <el-col :span='8'>
          <pie-chart :chartData='billByClass' :options='classChartOptions'></pie-chart>
        </el-col>
        <el-col :span='8'>
          <pie-chart :chartData='billByProduct' :options='productChartOptions'></pie-chart>
        </el-col>

      </div>
    </el-row>
    <el-row>
      <el-col :span='8'>
        <pie-chart :chartData='billByRevenueType' :options='revenueTypeChartOptions'></pie-chart>
      </el-col>
      <el-col :span='8'>
        <pie-chart :chartData='billByType' :options='typeChartOptions'></pie-chart>
      </el-col>
      <el-col :span='8'>
        <pie-chart :chartData='billByStatus' :options='statusChartOptions'></pie-chart>
      </el-col>
    </el-row>
    <el-row>
      <div class='chart'>
        <br>
        <bar-chart :chartData='billByCustomer' :options='customerChartOptions'></bar-chart>
      </div>
    </el-row>
    <el-row>
      <div class='chart'>
        <br>
        <GeoChart :chartData="billByCountry"/>
      </div>
    </el-row>
    
    <el-row>
      <br>
      <div class='chart'>
        <el-date-picker v-model='startDate' type='month' placeholder='Start Date'></el-date-picker>
        <el-date-picker v-model='endDate' type='month' placeholder='End Date'></el-date-picker>
        <el-button type='primary' @click='GetBillByBillingMonth'>Go</el-button>
        <line-chart :chartData='billByBillingMonth' :options='billingMonthChartOptions'></line-chart>
      </div>
    </el-row>
  </div>
</template>

<script>
import PieChart from "../charts/PieChart.js";
import LineChart from "../charts/LineChart.js";
import DoughnutChart from "../charts/DoughnutChart.js";
import GeoChart from "../charts/GeoChart";
import BarChart from "../charts/BarChart.js";
import axios from "Axios";
import _ from "lodash";
import chartjs from "chart.piecelabel.js";
import { urlBase } from "../settings.js";

const colors = {
  backgroundColor: [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(36, 224, 84, 0.2)",
    "rgba(66, 99, 44, 0.2)",
    "rgba(196, 172, 88, 0.2)",
    "rgba(149, 169, 66, 0.2)",
    "rgba(236, 110, 12, 0.2)"
  ],
  borderColor: [
    "rgba(255,99,132,1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(36, 224, 84, 1)",
    "rgba(66, 99, 44, 1)",
    "rgba(196, 172, 88, 1)",
    "rgba(149, 169, 66, 1)",
    "rgba(236, 110, 12, 1)"
  ]
};
export default {
  name: "home",
  components: {
    PieChart,
    LineChart,
    DoughnutChart,
    BarChart,
    GeoChart
  },
  data() {
    return {
      form1: {
        filter: "active",
        startMonth: new Date(2015, 1),
        endMonth: new Date()
      },
      startDate: "",
      endDate: "",
      billByCountry: [],
      billByType: [],
      typeChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Bill By Type"
        },
        pieceLabel: {
          render: "value"
        }
      },
      billByRevenueType: [],
      revenueTypeChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Bill By Revenue Type"
        },
        pieceLabel: {
          render: "value"
        }
      },
      billByStatus: [],
      statusChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Bill By Status"
        },
        pieceLabel: {
          render: "value"
        }
      },
      billByCustomer: {},
      customerChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Bill by Customer"
        },
        scales: {
          xAxes: [
            {
              barPercentage: 0.7,
              categoryPercentage: 0.7
            }
          ],
          yAxes: [
            {
              display: "true",
              type: "linear",
              position: "left",
              id: "1"
            },
            {
              display: "true",
              type: "linear",
              position: "right",
              id: "2",
              startValue: 0,
              stacked: true
            }
          ]
        }
      },
      billByClass: [],
      classChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Bill by Class"
        },
        pieceLabel: {
          render: "value"
        }
      },
      billByCurrency: {},
      currencyChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Bill by Currency"
        },
        pieceLabel: {
          render: "value"
        }
      },
      billByProduct: {},
      productChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Bill by Product"
        },
        pieceLabel: {
          render: "value"
        }
      },
      billByBillingMonth: {
        datasets: [
          {
            yAxisID: "A",
            label: "Total Invoiced",
            data: [
              {
                x: new Date(2016, 3),
                y: 10
              },
              {
                x: new Date(2016, 5),
                y: 7
              }
            ]
          },
          {
            label: "Number of Invoice",
            yAxisID: "B",
            data: [
              {
                x: new Date(2016, 5),
                y: 4
              },
              {
                x: new Date(2016, 9),
                y: 6
              }
            ]
          }
        ]
      },
      billingMonthChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Bill by Billing Month"
        },
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
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              startValue: 0,
              stacked: true
            }
          ]
        }
      }
    };
  },
  methods: {
    GetPieData() {
      this.GetBillByCurrency();
      this.GetBillByCustomer();
      this.GetBillByProduct();
      this.GetBillByClass();
      this.GetBillByBillingMonth();
      this.GetBillByRevenueType();
      this.GetBillByType();
      this.GetBillByStatus();
      this.GetBillByCountry();
    },
    GetBillByCustomer() {
      const url = urlBase + "/api/v1/graph/billByCustomer";
      axios
        .post(url, {
          ...this.form1
        })
        .then(res => {
          const result = res.data;
          var temp = {};
          temp["labels"] = result.map(i => i.customerName);
          const countData = {
            label: "Number of Invoice By Customer",
            data: result.map(i => i.numberInvoice),
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length),
            yAxisID: "2",
            borderWidth: 1
          };
          const sumData = {
            label: "Total Invoice By Customer",
            data: result.map(i => i.totalInvoice),
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length),
            yAxisID: "1",
            borderWidth: 1
          };
          temp["datasets"] = [sumData, countData];

          this.billByCustomer = temp;
        });
    },
    GetBillByCurrency() {
      const url = urlBase + "/api/v1/graph/billByCurrency";

      axios
        .post(url, {
          ...this.form1
        })
        .then(res => {
          const result = res.data;
          var temp = {};
          temp["labels"] = result.map(i => i.currency_enum.data);
          const countData = {
            label: "Number of Invoice By Customer",
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          const sumData = {
            label: "Total Invoice By Customer",
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          temp["datasets"] = [sumData, countData];

          this.billByCurrency = temp;
        });
    },
    GetBillByCountry() {
      const url = urlBase + "/api/v1/graph/billByCountry";

      axios
        .post(url, {
          ...this.form1
        })
        .then(res => {
          console.log(res.data);
          this.billByCountry = res.data;
        });
    },
    GetBillByStatus() {
      const url = urlBase + "/api/v1/graph/billByStatus";

      axios
        .post(url, {
          ...this.form1
        })
        .then(res => {
          const result = res.data;
          var temp = {};
          temp["labels"] = result.map(i => i.status_enum.data);
          const countData = {
            label: "Number of Invoice By Status",
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          const sumData = {
            label: "Total Invoice By Status",
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          temp["datasets"] = [sumData, countData];

          this.billByStatus = temp;
        });
    },
    GetBillByType() {
      const url = urlBase + "/api/v1/graph/billByType";

      axios
        .post(url, {
          ...this.form1
        })
        .then(res => {
          const result = res.data;
          var temp = {};
          temp["labels"] = result.map(i => i.type_enum.data);
          const countData = {
            label: "Number of Invoice By Type",
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          const sumData = {
            label: "Total Invoice By Type",
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          temp["datasets"] = [sumData, countData];

          this.billByType = temp;
        });
    },
    GetBillByRevenueType() {
      const url = urlBase + "/api/v1/graph/billByRevenueType";

      axios
        .post(url, {
          ...this.form1
        })
        .then(res => {
          const result = res.data;
          var temp = {};
          temp["labels"] = result.map(i => i.revenue_type_enum.data);
          const countData = {
            label: "Number of Invoice By Revenue Type",
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          const sumData = {
            label: "Total Invoice By Revenue Type",
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          temp["datasets"] = [sumData, countData];

          this.billByRevenueType = temp;
        });
    },
    GetBillByClass() {
      const url = urlBase + "/api/v1/graph/billByClass";

      axios
        .post(url, {
          ...this.form1
        })
        .then(res => {
          const result = res.data;
          var temp = {};
          temp["labels"] = result.map(i => i.class_enum.data);
          const countData = {
            label: "Number of Invoice By Customer",
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          const sumData = {
            label: "Total Invoice By Customer",
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          temp["datasets"] = [sumData, countData];

          this.billByClass = temp;
        });
    },
    GetBillByProduct() {
      const url = urlBase + "/api/v1/graph/billByProduct";
      axios
        .post(url, {
          ...this.form1
        })
        .then(res => {
          const result = res.data;
          var temp = {};
          temp["labels"] = result.map(i => i.product_enum.data);
          const countData = {
            label: "Number of Invoice By Customer",
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          const sumData = {
            label: "Total Invoice By Customer",
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          };
          temp["datasets"] = [sumData, countData];

          this.billByProduct = temp;
        });
    },
    GetBillByBillingMonth() {
      const url = urlBase + "/api/v1/graph/billByBillingMonth";
      var payload = {};
      if (this.startDate != "" && this.endDate != "")
        payload = {
          startM: new Date(this.startDate),
          endM: new Date(this.endDate)
        };
      axios.post(url, payload).then(res => {
        const sumSet = res.data.map(i => {
          return {
            x: new Date(i.billingMonth + "1"),
            y: i.totalInvoice
          };
        });
        const countSet = res.data.map(i => {
          return {
            x: new Date(i.billingMonth + "1"),
            y: i.numberInvoice
          };
        });
        var temp = {
          ...this.billByBillingMonth
        };
        temp.datasets[0]["backgroundColor"] = colors.backgroundColor[1];
        temp.datasets[0]["borderColor"] = colors.backgroundColor[1];
        temp.datasets[0].data = sumSet;
        temp.datasets[0]["lineTension"] = 0;
        temp.datasets[1].data = countSet;
        temp.datasets[1]["backgroundColor"] = colors.backgroundColor[0];
        temp.datasets[1]["borderColor"] = colors.backgroundColor[0];
        temp.datasets[1]["lineTension"] = 0;
        this.billByBillingMonth = temp;
      });
    }
  },
  created() {
    this.GetPieData();
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.header,
.chart {
  margin: 10px;
  margin-left: 20px;
  border: 10px;
}
</style>
