<template>
  <div class="chart" ref = "chart"></div>
</template>

<script>
import { GoogleCharts } from "google-charts";
export default {
  name: "GeoChart",
  components: {},
  props: ["chartData"],
  data() {
    return {
      chartOption: {},
      data: []
    };
  },
  methods: {
    drawGeoChart() {
      /* Geo Chart */
      // const geo_1_data = GoogleCharts.api.visualization.arrayToDataTable([
      //   ["State", "Spend"],
      //   ["ID", { v: 120000, f: "$120,000" }],
      //   ["CO", { v: 567135, f: "$567,135" }],
      //   ["FL", { v: 220000, f: "$220,000" }],
      //   ["NY", { v: 1120000, f: "$1,120,000" }],
      //   ["CA", { v: 5120000, f: "$5,120,000" }],
      //   ["AK", { v: 101000, f: "$101,000" }],
      //   ["AZ", { v: 311030, f: "$311,030" }]
      // ]);
      const geo_1_data = GoogleCharts.api.visualization.arrayToDataTable(
        this.data
      );

      const geo_1_chart = new GoogleCharts.api.visualization.GeoChart(
        // document.getElementById("geo_1_chart")
        this.$refs.chart
      );
      geo_1_chart.draw(geo_1_data, this.chartOption);
    },
    convertData(data) {
      var temp = [];
      temp = data.map(i => {
        return [i.country_enum.code, i.totalInvoice * 1, i.numberInvoice];
      });
      temp.unshift(["Country", "Total Invoice", "Number of Invoice"]);
      this.data = temp;
    }
  },
  watch: {
    chartData: function(newVal, old) {
      this.convertData(newVal);
      this.drawGeoChart();
    }
  },
  created() {
    GoogleCharts.load(this.drawGeoChart, "geochart");
    this.convertData(this.chartData);
    this.drawGeoChart();
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
