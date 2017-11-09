<template>
  <div id="sd">
    <div class="header">
      <h1>Invoice </h1>
    </div>
    <el-dialog title="Comments and Description" :visible.sync="commentDialogVisibility" width="50%">
      <el-row>
        <el-col :span="11" class="input">
          <span> Comments </span>
          <el-input type="textarea" :rows="5" v-model="currentComment">
          </el-input>

        </el-col>
        <el-col :span="11" class="input">
          <span> Description </span>
          <el-input type="textarea" :rows="5" v-model="currentDescription">
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentDialogVisibility = false">Cancel</el-button>
        <el-button type="primary" @click="updateComments">Save</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Modify" :visible.sync="modifyDialogVisibility" width="80%">
      <Modify :invoice-data="currentRow" :close="closeModify" />
    </el-dialog>
    <div id="filter">
      <el-select v-model="selector" placeholder="Selector" @change="selectorChange">
        <el-option v-for="item in fieldOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <a> = </a>
      <el-autocomplete v-if="isCustomer" placeholder="Value" v-model="searchValue" :fetch-suggestions="querySearchCustName"></el-autocomplete>
      <el-autocomplete v-if="isInvoice" placeholder="Value" v-model="searchValue" :fetch-suggestions="querySearchInvoice"></el-autocomplete>
      <el-select v-if="isSelect" v-model="searchValue" placeholder="Value">
        <el-option v-for="item in searchValueOptions" :key="item.id" :label="item.data" :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" id="tagAdder" @click="addTagg">Add</el-button>
      <el-dropdown @command="handleExport">
        <el-button type="primary" class="export">
          Export
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">All</el-dropdown-item>
          <el-dropdown-item command="selected">Selected</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <br>
    </div>
    <div id="tags">
      <el-tag v-for="tag in tags" :key="tag.id" @close="removeTagg(tag)" closable :type="success">
        {{tag.value}}
      </el-tag>
    </div>
    <div id="dataTable">
      <el-table :data="invoices" style="width: 100%" @row-click="openComments" @row-contextmenu="(row, e)=>{e.stopPropagation(), modifyInvoice(row,e)}">
        <el-table-column prop="type_enum.data" label="Type">
        </el-table-column>
        <el-table-column prop="invoiceDate" label="Date" sortable>
        </el-table-column>
        <el-table-column prop="invoiceNumber" label="Number" sortable>
        </el-table-column>
        <el-table-column prop="customerName" label="Name" sortable>
        </el-table-column>
        <el-table-column prop="class_enum.data" label="Class" sortable>
        </el-table-column>
        <el-table-column prop="currency_enum.data" label="Currency" sortable>
        </el-table-column>
        <el-table-column prop="subscription_enum.data" label="Subscription" sortable>
        </el-table-column>
        <el-table-column prop="status_enum.data" label="Status" sortable>
        </el-table-column>
        <el-table-column prop="revenue_type_enum.data" label="Revenue Type" sortable>
        </el-table-column>
        <el-table-column prop="product_enum.data" label="Product" sortable>
        </el-table-column>
        <el-table-column prop="recognitionStartMonth" label="RecStart" sortable>
        </el-table-column>
        <el-table-column prop="lengthMonth" label="length" sortable>
        </el-table-column>
        <el-table-column prop="invoiceAmountUSD" label="amountUSD" sortable>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import axios from 'Axios'
  import _ from 'lodash'
  import Modify from './Modify'
  import * as jsonexport from 'jsonexport/dist'
  const urlBase = "http://" + window.location.hostname + ":3030"
  export default {
    name: 'invoice',
    components: {
      Modify
    },
    data() {
      return {
        currentRow: {},
        currentDescription: "",
        currentComment: "",
        commentDialogVisibility: false,
        modifyDialogVisibility: false,
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
        isCustomer: false,
        isInvoice: false,
        queryParam: {
          where: {}
        },
        customerNameList: [],
        invoiceNumberList: [],
      }
    },
    methods: {
      async handleExport(command) {

        var tempInvoice = []
        if (command == "all") {
          const url = urlBase + '/api/v1/reports/getInvoice'
          tempInvoice = (await axios.post(url, {
            all: true
          })).data
          console.log("test", tempInvoice)
        } else {
          tempInvoice = [...this.invoices]
        }
        const tempInvoice2 = tempInvoice.map(temp => {
          var invoice = { ...temp
          }
          invoice.class = temp.class_enum.data
          invoice.currency = temp.currency_enum.data
          invoice.product = temp.product_enum.data
          invoice.revenueType = temp.revenue_type_enum.data
          invoice.status = temp.status_enum.data
          invoice.subscriptionType = temp.subscription_enum.data
          invoice.type = temp.type_enum.data
          delete invoice.class_enum
          delete invoice.currency_enum
          delete invoice.product_enum
          delete invoice.revenue_type_enum
          delete invoice.status_enum
          delete invoice.subscription_enum
          delete invoice.type_enum
          return invoice
        })
        jsonexport(tempInvoice2, (err, csv) => {
          if (err) return console.log(err)
          var uriContent = "data:application/octet-stream," + encodeURIComponent(csv);
          var link = document.createElement("a");
          link.setAttribute("href", uriContent);
          link.setAttribute("download", "Invoices.csv");
          document.body.appendChild(link); // Required for FF

          link.click();
          this.$message({
            type: "success",
            message: command
          })
        })


      },
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
          enumListTemp.push("invoiceNumber")
          this.fieldOptions = enumListTemp
        })
      },
      selectorChange(value) {
        if (this.enumList[value] != undefined) {
          this.searchValueOptions = this.enumList[value]
          this.isSelect = true
          this.isCustomer = false
          this.isInvoice = false
        }
        if (value == "customerName") {
          this.isSelect = false
          this.isCustomer = true
          this.isInvoice = false
        }
        if (value == "invoiceNumber") {
          this.isSelect = false
          this.isCustomer = false
          this.isInvoice = true
        }


      },
      addTagg() {
        const currentParam = this.queryParam.where
        currentParam[this.selector] = this.searchValue

        this.queryParam.where = currentParam
        this.getInvoice(this.queryParam)
        if (_.findIndex(this.tags, i => {
            return i.id == this.selector
          }) != -1) {
          this.tags[_.findIndex(this.tags, i => {
            return i.id == this.selector
          })].value = (this.selector + " = " + this.searchValue)
        } else {
          this.tags.push({
            id: this.selector,
            value: (this.selector + " = " + this.searchValue)
          })
        }
      },
      removeTagg(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1)
        delete this.queryParam.where[tag.id]
        this.getInvoice(this.queryParam)
      },
      querySearchCustName(queryString, cb) {
        var list = this.customerNameList
        var results = queryString ? list.filter((this.createFilter(queryString))) : list;
        cb(results)
      },
      querySearchInvoice(queryString, cb) {
        var list = this.invoiceNumberList
        var results = queryString ? list.filter((this.createFilter(queryString))) : list;
        cb(results)
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      getCustomerName() {
        const url = urlBase + '/api/v1/reports/getCustomerName'
        axios.get(url).then(res => {
          this.customerNameList = res.data
        })
      },
      getInvoiceNumber() {
        const url = urlBase + '/api/v1/reports/getInvoiceNumber'
        axios.get(url).then(res => {
          this.invoiceNumberList = res.data
        })
      },
      openComments(row) {
        this.commentDialogVisibility = true
        this.currentDescription = row.description
        this.currentComment = row.comments
        this.currentRow = row
      },
      updateComments() {
        if (this.currentComment != this.currentRow.comments || this.currentDescription != this.currentRow.description) {
          const url = urlBase + '/api/v1/reports/updateDescription'

          axios.post(url, {
            description: this.currentDescription,
            comments: this.currentComment,
            id: this.currentRow.id
          })
        }
        this.commentDialogVisibility = false
      },
      modifyInvoice(row, e) {
        this.modifyDialogVisibility = true
        this.currentRow = row
        console.log(e)
        e.stopPropagation()
      },
      closeModify() {
        this.modifyDialogVisibility = false
      }
    },
    created() {
      this.getInvoice()
      this.getEnum()
      this.getCustomerName()
      this.getInvoiceNumber()
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

  .el-tag {

    margin-right: 10px
  }

  .input {
    margin: 10px;
  }

  .el-dropdown {
    float: right;
  }

</style>
