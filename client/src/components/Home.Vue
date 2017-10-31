<template>
  <div class="Default">
    <el-row>
      <div class="header">
        <h1>Home</h1>
      </div>
    </el-row>
    <el-row>
      <el-col :span="6">
        <pie-chart :chartData="billByCustomer" :options="customerChartOptions"></pie-chart>
      </el-col>
      <el-col :span="6">
        <pie-chart :chartData="billByCurrency" :options="currencyChartOptions"></pie-chart>
      </el-col>
      <el-col :span="6">
        <pie-chart :chartData="billByClass" :options="classChartOptions"></pie-chart>
      </el-col>
      <el-col :span="6">
        <pie-chart :chartData="billByProduct" :options="productChartOptions"></pie-chart>
      </el-col>
    </el-row>
    <el-row>
      <line-chart :chartData="billByBillingMonth" :options="billingMonthChartOptions"></line-chart>
    </el-row>
  </div>
</template>

<script>
  import PieChart from '../charts/PieChart.js'
  import LineChart from '../charts/LineChart.js'
  import axios from 'Axios'
  import _ from 'lodash'
  const urlBase = "http://localhost:3030"
  const colors = {
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
  }
  export default {
    name: 'default',
    components: {
      PieChart,
      LineChart
    },
    data() {
      return {
        billByCustomer: {},
        customerChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Bill by Customer'
          },
        },
        billByClass: [],
        classChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Bill by Class'
          }
        },
        billByCurrency: {},
        currencyChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Bill by Currency'
          }
        },
        billByProduct: {},
        productChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Bill by Product'
          }
        },
        billByBillingMonth: {
          datasets: [{
            yAxisID:'A',
            data: [{
              x: new Date(2017, 4),
              y: 10
            }, {
              x: new Date(2017, 8),
              y: 7
            }]
          },
          {
            yAxisID:'B',
            data: [{x:new Date(2017, 5), y: 4 }, {x:new Date(2017, 9), y: 6 }]
          }]
        },
        billingMonthChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Bill by Billing Month'
          },
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
            yAxes:[{
              id:'A',
              type:'linear',
              position:'left'
            },{
              id:'B',
              type:'linear',
              position:'right'
            }]
          }
        },
      }
    },
    methods: {
      GetBillByCustomer() {
        const url = urlBase + "/api/v1/graph/billByCustomer"
        console.log(url)
        axios.get(url).then(res => {
          console.log(res.data)
          const result = res.data
          var temp = {}
          temp['labels'] = result.map(i => i.customerName)
          const countData = {
            label: 'Number of Invoice By Customer',
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          }
          const sumData = {
            label: 'Total Invoice By Customer',
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          }
          temp["datasets"] = [sumData, countData]

          this.billByCustomer = temp
        })
      },
      GetBillByCurrency() {
        const url = urlBase + "/api/v1/graph/billByCurrency"
        console.log(url)
        axios.get(url).then(res => {
          console.log(res.data)
          const result = res.data
          var temp = {}
          temp['labels'] = result.map(i => i.currency_enum.data)
          const countData = {
            label: 'Number of Invoice By Customer',
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          }
          const sumData = {
            label: 'Total Invoice By Customer',
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          }
          temp["datasets"] = [sumData, countData]

          this.billByCurrency = temp
        })
      },
      GetBillByClass() {
        const url = urlBase + "/api/v1/graph/billByClass"
        console.log(url)
        axios.get(url).then(res => {
          console.log(res.data)
          const result = res.data
          var temp = {}
          temp['labels'] = result.map(i => i.class_enum.data)
          const countData = {
            label: 'Number of Invoice By Customer',
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          }
          const sumData = {
            label: 'Total Invoice By Customer',
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          }
          temp["datasets"] = [sumData, countData]

          this.billByClass = temp
        })
      },
      GetBillByProduct() {
        const url = urlBase + "/api/v1/graph/billByProduct"
        console.log(url)
        axios.get(url).then(res => {
          console.log(res.data)
          const result = res.data
          var temp = {}
          temp['labels'] = result.map(i => i.product_enum.data)
          const countData = {
            label: 'Number of Invoice By Customer',
            data: result.map(i => i.numberInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          }
          const sumData = {
            label: 'Total Invoice By Customer',
            data: result.map(i => i.totalInvoice),
            borderWidth: 1,
            backgroundColor: colors.backgroundColor.slice(0, result.length),
            borderColor: colors.borderColor.slice(0, result.length)
          }
          temp["datasets"] = [sumData, countData]

          this.billByProduct = temp
        })
      },
    },
    created() {
      this.GetBillByCurrency()
      this.GetBillByCustomer()
      this.GetBillByProduct()
      this.GetBillByClass()

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
