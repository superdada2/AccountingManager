<template>
  <div id="sd">
    <div class="header">
      <h1>Invoice </h1>
    </div>

    <div id="filter">
      <el-select v-model="selector" placeholder="Selector" @change="selectorChange">
        <el-option v-for="item in fieldOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <a> = </a>
      <el-input v-if="!isSelect" placeholder="Value" v-model="searchValue"></el-input>
      <el-select v-if="isSelect" v-model="searchValue" placeholder="Value">
        <el-option v-for="item in searchValueOptions" :key="item.id" :label="item.data" :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" id="tagAdder" @click="addTagg">Add</el-button>
      <br>
    </div>
    <div id="tags">
      <el-tag v-for="tag in tags" :key="tag.id" @close="removeTagg(tag)"closable :type="success">
        {{tag.value}}
      </el-tag>
    </div>
    <div id="dataTable">
      <el-table :data="invoices" style="width: 100%">
        <el-table-column prop="type_enum.data" label="Type">
        </el-table-column>
        <el-table-column prop="invoiceDate" label="Date">
        </el-table-column>
        <el-table-column prop="invoiceNumber" label="Number">
        </el-table-column>
        <el-table-column prop="customerName" label="Name">
        </el-table-column>
        <el-table-column prop="class_enum.data" label="Class">
        </el-table-column>
        <el-table-column prop="currency_enum.data" label="Currency">
        </el-table-column>
        <el-table-column prop="subscription_enum.data" label="Subscription">
        </el-table-column>
        <el-table-column prop="status_enum.data" label="Status">
        </el-table-column>
        <el-table-column prop="revenue_type_enum.data" label="Revenue Type">
        </el-table-column>
        <el-table-column prop="product_enum.data" label="Product">
        </el-table-column>
        <el-table-column prop="recognitionStrMonthEnum.data" label="RecStart">
        </el-table-column>
        <el-table-column prop="lengthMonth" label="length">
        </el-table-column>
        <el-table-column prop="invoiceAmountUSD" label="amountUSD">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import axios from 'Axios'
  import _ from 'lodash'
  const urlBase = "http://localhost:3030"
  export default {

    name: 'invoice',
    data() {
      return {
        tags: [

        ],
        invoices: [],
        selector: '',
        searchValue: '',
        fieldOptions: [{
          id: 1,
          data: 12
        }],
        searchValueOptions: [],
        enumList: {},
        isSelect: true,
        queryParam: {
          where: {}
        }
      }
    },
    methods: {
      getInvoice(param) {
        const url = urlBase + '/api/v1/reports/getInvoice'
        axios.post(url, param).then((res) => {
          this.invoices = res.data
        })
      },
      getEnum() {
        const url = urlBase + "/api/v1/enum/all"

        axios.get(url).then((res) => {
          this.enumList = res.data
          const keys = Object.keys(this.enumList)
          var enumListTemp = keys
          enumListTemp.push("customerName")
          this.fieldOptions = enumListTemp
        })
      },
      selectorChange(value) {
        if (this.enumList[value] != undefined) {
          console.log("value", this.enumList[value])
          this.searchValueOptions = this.enumList[value]
          this.isSelect = true
        } else {
          this.isSelect = false
        }


      },
      addTagg() {
        const currentParam = this.queryParam.where
        currentParam[this.selector] = this.searchValue
        
        this.queryParam.where = currentParam
        this.getInvoice(this.queryParam)
        if (_.findIndex(this.tags, i=>{ return i.id == this.selector}) != -1){
          this.tags[_.findIndex(this.tags, i=>{ return i.id == this.selector})].value = (this.selector + " = " + this.searchValue)
        } else {
          this.tags.push({
            id: this.selector,
            value: (this.selector + " = " + this.searchValue)
          })
        }
      },
      removeTagg(tag){
        console.log("remove tag", tag.id)
        this.tags.splice(this.tags.indexOf(tag), 1)
        delete this.queryParam.where[tag.id]
        this.getInvoice(this.queryParam)
      }
    },
    created() {
      this.getInvoice()
      this.getEnum()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header,
  .submit,
  .el-table,
  .el-select,
  #tags {
    margin: 10px;
    margin-left: 20px;
    border: 10px;
  }

  .el-input {
    width: 250px;
    margin-right: 50px
  }
  .el-tag{

    margin-right: 10px
  }

</style>
