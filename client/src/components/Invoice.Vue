<template>
  <div id="sd">
    <Help :message="helpMessage"/>
    <div class="header">
      <h1>Invoice </h1>
    </div>
    <el-dialog title="Comments and Description" :visible.sync="commentDialogVisibility" width="50%">
      <ModifyComments :close="()=>{this.commentDialogVisibility = false}" :currentRow="currentRow" :refresh="RefreshData"/>
    </el-dialog>
    <el-dialog title="Modify" :visible.sync="modifyDialogVisibility" width="80%">
      <Modify :invoice-data="currentRow" :close="CloseModify" :refresh="RefreshData" />
    </el-dialog>
    <div id="filter">

      <el-dropdown @command="HandleExport">
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

      <el-select v-model="selector2" placeholder="Selector" @change="Selector2Change">
        <el-option key="invoiceAmount" label="invoiceAmount" value="invoiceAmount">
        </el-option>
        <el-option key="invoiceAmountUSD" label="invoiceAmountUSD" value="invoiceAmountUSD">
        </el-option>
        <el-option key="invoiceDate" label="invoiceDate" value="invoiceDate">
        </el-option>
        <el-option key="billingMonth" label="billingMonth" value="billingMonth">
        </el-option>
        <el-option key="recognitionStartMonth" label="recognitionStartMonth" value="recognitionStartMonth">
        </el-option>
      </el-select>
      <a> = </a>
      <el-input v-if="isNumber" placeholder="Min" v-model="min" type="number"></el-input>
      <el-input v-if="isNumber" placeholder="Max" v-model="max" type="number"></el-input>
      <el-date-picker v-if="!isNumber" v-model="min" type="date" placeholder="Start Date">
      </el-date-picker>
      <el-date-picker v-if="!isNumber" v-model="max" type="date" placeholder="End Date">
      </el-date-picker>
      <el-button type="primary" id="tagAdder" @click="AddTagg2">Add</el-button>
      <br>
      <el-select v-model="selector" placeholder="Selector" @change="SelectorChange">
        <el-option v-for="item in fieldOptions" :key="item.toString()" :label="item.toString()" :value="item">
        </el-option>
      </el-select>
      <a> = </a>
      <el-autocomplete v-if="isCustomer" placeholder="Value" v-model="searchValue" :fetch-suggestions="QuerySearchCustName"></el-autocomplete>
      <el-autocomplete v-if="isInvoice" placeholder="Value" v-model="searchValue" :fetch-suggestions="QuerySearchInvoice"></el-autocomplete>
      <el-select v-if="isSelect" v-model="searchValue" placeholder="Value">
        <el-option v-for="item in searchValueOptions" :key="item.id" :label="item.data" :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" id="tagAdder" @click="AddTagg">Add</el-button>
    </div>
    <div id="tags">
      <el-tag v-for="tag in tags" :key="tag.id" @close="RemoveTagg(tag)" closable type="success">
        {{tag.value}}
      </el-tag>
    </div>
    <div id="dataTable">
      <el-table :data="invoices" v-loading="loading" style="width: 100%" @row-click="OpenComments" @row-contextmenu="(row, e)=>{e.preventDefault(), ModifyInvoice(row,e)}">
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
        <el-table-column prop='product_enum.data' label="Product" sortable>
        </el-table-column>
        <el-table-column prop="recognitionStartMonth" label="RecStart" sortable>
        </el-table-column>
        <el-table-column prop="lengthMonth" label="Recognition Lenth" sortable>
        </el-table-column>
        <el-table-column align="right" prop="invoiceAmountUSD" label="AmountUSD" >
          <template slot-scope="scope">
            {{(scope.row.invoiceAmountUSD * 1).toLocaleString(undefined, {style:'currency', currency:'USD'})}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "Axios";
import _ from "lodash";
import Modify from "./SubComponents/Modify";
import Help from "./SubComponents/Help";
import ModifyComments from "./SubComponents/ModifyComments";
import * as jsonexport from "jsonexport/dist";
import { urlBase } from "../settings.js";
import UserMixin from "../functions/Authentication";
import EnumApi from "../functions/EnumApi";
export default {
  name: "invoice",
  components: {
    Modify,
    ModifyComments,
    Help
  },
  data() {
    return {
      currentRow: {},
      helpMessage:
        "Left Click on a invoice view/modify comments and description. Right click to view invoice in detail",
      commentDialogVisibility: false,
      modifyDialogVisibility: false,
      tags: [],
      invoices: [],
      selector: "",
      searchValue: "",
      fieldOptions: [
        {
          id: 1,
          data: 12
        }
      ],
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
      isNumber: true,
      selector2: "",
      min: "",
      max: "",
      loading: true
    };
  },
  mixins: [UserMixin],
  methods: {
    RefreshData() {
      this.GetInvoice(this.queryParam);
    },
    async HandleExport(command) {
      var tempInvoice = [];
      if (command == "all") {
        const url = urlBase + "/api/v1/reports/getInvoice";
        tempInvoice = (await this.Post(url, {
          all: true
        })).data;
      } else {
        tempInvoice = [...this.invoices];
      }
      const tempInvoice2 = tempInvoice.map(temp => {
        var invoice = {
          ...temp
        };
        invoice.class = temp.class_enum.data;
        invoice.currency = temp.currency_enum.data;
        invoice.product = temp.product_enum.data;
        invoice.revenueType = temp.revenue_type_enum.data;
        invoice.status = temp.status_enum.data;
        invoice.subscriptionType = temp.subscription_enum.data;
        invoice.type = temp.type_enum.data;
        delete invoice.class_enum;
        delete invoice.currency_enum;
        delete invoice.product_enum;
        delete invoice.revenue_type_enum;
        delete invoice.status_enum;
        delete invoice.subscription_enum;
        delete invoice.type_enum;
        return invoice;
      });
      jsonexport(tempInvoice2, (err, csv) => {
        if (err) return console.log(err);
        var uriContent =
          "data:application/octet-stream," + encodeURIComponent(csv);
        var link = document.createElement("a");
        link.setAttribute("href", uriContent);
        link.setAttribute("download", "Invoices.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
        this.$message({
          type: "success",
          message: command
        });
      });
    },
    GetInvoice(param) {
      const url = urlBase + "/api/v1/reports/getInvoice";
      this.loading = true;
      this.Post(url, param).then(res => {
        this.invoices = res.data;
        this.loading = false;
      });
    },
    GetEnum() {
      EnumApi.GetAllEnum(this.auth.token).then(res => {
        this.enumList = res.data;
        const keys = Object.keys(this.enumList);
        var enumListTemp = keys;
        enumListTemp.push("customerName");
        enumListTemp.push("invoiceNumber");
        this.fieldOptions = enumListTemp;
      });
    },

    Selector2Change(value) {
      if (value == "invoiceAmountUSD" || value == "invoiceAmount") {
        this.isNumber = true;
      } else {
        this.isNumber = false;
      }
    },
    SelectorChange(value) {
      if (this.enumList[value] != undefined) {
        this.searchValueOptions = this.enumList[value];
        this.isSelect = true;
        this.isCustomer = false;
        this.isInvoice = false;
      }
      if (value == "customerName") {
        this.isSelect = false;
        this.isCustomer = true;
        this.isInvoice = false;
      }
      if (value == "invoiceNumber") {
        this.isSelect = false;
        this.isCustomer = false;
        this.isInvoice = true;
      }
    },

    AddTagg2() {
      // if(this.selector2 == "" || (this.))
      var currentParam = {
        ...this.queryParam.where
      };
      if (this.max == "") {
        currentParam[this.selector2] = {
          $gte: this.min
        };
      } else {
        currentParam[this.selector2] = {
          $and: {
            $gte: this.min,
            $lte: this.max
          }
        };
      }

      this.queryParam.where = currentParam;
      this.GetInvoice(this.queryParam);
      if (
        _.findIndex(this.tags, i => {
          return i.id == this.selector2;
        }) != -1
      ) {
        this.tags[
          _.findIndex(this.tags, i => {
            return i.id == this.selector2;
          })
        ].value =
          (this.min.toString().length == 57
            ? this.min.toString().slice(8, 15)
            : this.min) +
          "<" +
          this.selector2 +
          "<" +
          (this.max.toString().length == 57
            ? this.min.toString().slice(8, 15)
            : this.max);
      } else {
        this.tags.push({
          id: this.selector2,
          value:
            (this.min.toString().length == 57
              ? this.min.toString().slice(8, 15)
              : this.min) +
            "<" +
            this.selector2 +
            "<" +
            (this.max.toString().length == 57
              ? this.min.toString().slice(8, 15)
              : this.max)
        });
      }
    },
    AddTagg() {
      const currentParam = {
        ...this.queryParam.where
      };
      currentParam[this.selector] = this.searchValue;

      this.queryParam.where = currentParam;
      this.GetInvoice(this.queryParam);
      if (
        _.findIndex(this.tags, i => {
          return i.id == this.selector;
        }) != -1
      ) {
        this.tags[
          _.findIndex(this.tags, i => {
            return i.id == this.selector;
          })
        ].value =
          this.selector + " = " + this.searchValue;
      } else {
        this.tags.push({
          id: this.selector,
          value: this.selector + " = " + this.searchValue
        });
      }
    },
    RemoveTagg(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      delete this.queryParam.where[tag.id];
      this.GetInvoice(this.queryParam);
    },
    QuerySearchCustName(queryString, cb) {
      var list = this.customerNameList;
      var results = queryString
        ? list.filter(this.CreateFilter(queryString))
        : list;
      cb(results);
    },
    QuerySearchInvoice(queryString, cb) {
      var list = this.invoiceNumberList;
      var results = queryString
        ? list.filter(this.CreateFilterNumber(queryString))
        : list;
      cb(results);
    },
    CreateFilter(queryString) {
      return link => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    CreateFilterNumber(queryString) {
      return link => {
        return link.value.toString().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    GetCustomerName() {
      const url = urlBase + "/api/v1/reports/getCustomerName";
      this.Get(url).then(res => {
        this.customerNameList = res.data;
      });
    },
    GetInvoiceNumber() {
      const url = urlBase + "/api/v1/reports/getInvoiceNumber";
      this.Get(url).then(res => {
        this.invoiceNumberList = res.data;
      });
    },
    OpenComments(row) {
      this.currentRow = row;
      this.commentDialogVisibility = true;
    },
    ModifyInvoice(row, e) {
      this.modifyDialogVisibility = true;
      this.currentRow = row;
    },
    CloseModify() {
      this.modifyDialogVisibility = false;
    }
  },
  created() {
    this.GetInvoice();
    this.GetEnum();
    this.GetCustomerName();
    this.GetInvoiceNumber();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header,
.submit,
.el-table,
#filter,
#tags {
  margin: 10px;
  margin-left: 20px;
  border: 10px;
}

.el-input,
.el-select,
.el-autocomplete {
  width: 250px;
  margin: 10px;
  margin-left: 0px;
}

a {
  margin-right: 10px;
}

.el-tag {
  margin-right: 10px;
}

.el-dropdown {
  float: right;
}
</style>
