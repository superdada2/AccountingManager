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

        <el-date-picker v-model="startY" type="year" placeholder="Start Year">
        </el-date-picker>
        <el-date-picker v-model="endM" type="month" placeholder="End Month">
        </el-date-picker>

        <el-date-picker v-model="endY" type="year" placeholder="End Year">
        </el-date-picker>
        <el-button id="submit" @click="GetReport">Submit</el-button>
      </a>
    </el-row>
    <el-row>
      <div id="dataTable">
        <el-table :data="tableData" style="width: 100%" v-if="tableVisibility">
          <el-table-column prop="year" label="Year" />
          <el-table-column prop="month" label="Month" />
          <el-table-column prop="count" label="Count" />
          <el-table-column v-for="item in columnEnum" :key="item.id" :prop="item.data" :label="item.data" />
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
  import axios from 'Axios'
  const urlBase = "http://localhost:3030"
  export default {

    name: 'search',
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
            data: "Deffered"
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

        const data = {
          startY: this.startY.getFullYear(),
          endY: this.endY.getFullYear(),
          startM: this.startM.getMonth() + 1,
          endM: this.endM.getMonth() + 1,
          isIncome: this.balanceType
        }
        axios.post(url, data).then(res => {
          this.tableData = res.data
          this.tableVisibility = true
        })
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
  
  #submit{
    float: right;
  }

</style>
