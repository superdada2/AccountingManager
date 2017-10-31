// BarChart.js
import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['options'],
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
