<template>
  <div id='Add'>
    <el-row>
      <div class="header">
        <h1>Add Invoice </h1>
      </div>
    </el-row>
    <el-form :model="formValue" :rules="rules" ref="formValue" label-width="200px" align="left" >
      <el-row>
        <el-col :span="12">
          <el-form-item prop="companyName" label='Company Name'>
            <el-input placeholder="Company Name" v-model="formValue.companyName"></el-input>
            <br>
          </el-form-item>
          <el-form-item prop="product" label='Product'>
            <el-select v-model="formValue.product" placeholder="Product">
              <el-option v-for="item in productEnum" :key="item.id" :label="item.data" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="Class" label='Class'>
            <el-select v-model="formValue.Class" placeholder="Class">
              <el-option v-for="item in classEnum" :key="item.id" :label="item.data" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="invoiceNumber" label='Invoice Number'>
            <el-input placeholder="Invoice Number" type="number" v-model="formValue.invoiceNumber"></el-input>
          </el-form-item>
          <el-form-item prop="invoiceAmount" label='Invoice Amount'>
            <el-input @change="invoiceAmountOnChange" placeholder="Invoice Amount" type="number" v-model="formValue.invoiceAmount"></el-input>
          </el-form-item>
          <el-form-item prop="invoiceDate" label='Invoice Date'>
            <el-date-picker v-model="formValue.invoiceDate" type="date" placeholder="Invoice Date">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="type" label='Type'>
            <el-select v-model="formValue.type" placeholder="Type">
              <el-option v-for="item in typeEnum" :key="item.id" :label="item.data" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="currency" label='Currency'>
            <el-select @change="currencyOnchange" v-model="formValue.currency" placeholder="Currency">
              <el-option v-for="item in currencyEnum" :key="item.id" :label="item.data" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="billMonth" label='Billing Month'>
            <el-date-picker v-model="formValue.billMonth" type="month" placeholder="Bill Month">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="status" label='Status'>
            <el-select v-model="formValue.status" placeholder="Status">
              <el-option v-for="item in statusEnum" :key="item.id" :label="item.data" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="description" label='Description'>
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Description" v-model="formValue.description">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="recognitionStrMonth" label='Recognition Start Month'>
            <el-date-picker v-model="formValue.recognitionStrMonth" type="month" placeholder="Recognition Start Month">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="lengthRec" label='Recognition Length'>
            <el-input placeholder="Length of Recognition(Months)" @change="lengthRecOnChange" type="number" v-model="formValue.lengthRec"
              ref="lengthRec"></el-input>
          </el-form-item>
          <el-form-item prop="invoiceAmountUsd" label='Invoice Amount USD'>
            <el-input placeholder="Invoice Amount(USD)" @change="invoiceAmountUsdOnChange" type="number" v-model="formValue.invoiceAmountUsd"></el-input>
          </el-form-item>
          <el-form-item prop="fxRate" label='FxRate'>
            <el-input placeholder="Fx rate" type="number" @change="fxRateOnChange" v-model="formValue.fxRate"></el-input>
          </el-form-item>
          <el-form-item prop="monthlyRec"  label='Monthly Recognition USD'>
            <el-input placeholder="Monthly Recognition(USD)" type="number" v-model="formValue.monthlyRec"></el-input>
          </el-form-item>
          <el-form-item prop="annualIncreaseBool" label="Annual Increase Eligible">            
            <el-switch v-model="formValue.annualIncreaseBool" on-text="" off-text="">
            </el-switch>
          </el-form-item>
          <el-form-item prop="dateLastIncrease"  label='Date Since Last Increase'>
            <el-date-picker v-model="formValue.dateLastIncrease" type="date" placeholder="Date Last Increase">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="increasePerc"  label='Increase Percentage'>
            <el-input placeholder="Increase Percentage" type="number" v-model="formValue.increasePerc"></el-input>
          </el-form-item>
          <el-form-item prop="subscription" label='Subscription'>
            <el-select v-model="formValue.subscription" placeholder="Subscription Type">
              <el-option v-for="item in subscriptionEnum" :key="item.id" :label="item.data" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="revenueType" label='Revenue Type'>
            <el-select v-model="formValue.revenueType" placeholder="Revenue Type">
              <el-option v-for="item in revenueEnum" :key="item.id" :label="item.data" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="comments" label='Comments'>
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Comments" v-model="formValue.comments">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="submit">
          <el-button type="primary" @click="submit('formValue')">Add Invoice</el-button>
          <el-button type="success" @click="SaveForm">Save</el-button>
          <el-button @click="resetForm('formValue')">Reset</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from "Axios";
const urlBase = "http://" + window.location.hostname + ":3030";
export default {
  name: "add",
  data() {
    return {
      classEnum: [],
      productEnum: [],
      typeEnum: [],
      currencyEnum: [],
      monthEnum: [],
      statusEnum: [],
      revenueEnum: [],
      subscriptionEnum: [],
      formValue: {
        Class: "",
        product: "",
        type: "",
        currency: "",
        status: "",
        revenueType: "",
        companyName: "",
        invoiceNumber: "",
        invoiceAmount: "",
        invoiceDate: "",
        billMonth: "",
        description: "",
        recognitionStrMonth: "",
        lengthRec: "",
        invoiceAmount: "",
        fxRate: "",
        monthlyRec: "",
        dateLastIncrease: "",
        increasePerc: "",
        cancelationDate: "",
        comments: "",
        invoiceAmountUsd: "",
        annualIncreaseBool: true,
        subscription: ""
      },
      rules: {
        companyName: [
          {
            required: true,
            message: "Please input Company Name",
            trigger: "blur"
          }
        ],
        product: [
          {
            required: true,
            type: "number",
            message: "Please select a product",
            trigger: "change"
          }
        ],
        Class: [
          {
            required: true,
            type: "number",
            message: "Please select a class",
            trigger: "change"
          }
        ],
        invoiceNumber: [
          {
            required: true,
            message: "Please input an invoice number",
            trigger: "blur"
          }
        ],
        invoiceAmount: [
          {
            required: true,
            message: "Please input an invoice amount",
            trigger: "blur"
          }
        ],
        invoiceDate: [
          {
            required: true,
            type: "date",
            message: "Please select an invoice date",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            type: "number",
            message: "Please select a type",
            trigger: "change"
          }
        ],
        currency: [
          {
            required: true,
            type: "number",
            message: "Please select a currency",
            trigger: "change"
          }
        ],
        billMonth: [
          {
            required: true,
            type: "date",
            message: "Please select a billingMonth",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            type: "number",
            message: "Please select a status",
            trigger: "change"
          }
        ],
        description: [
          {
            max: 500,
            message: "Description too long",
            trigger: "blur"
          }
        ],
        recognitionStrMonth: [
          {
            required: true,
            type: "date",
            message: "Please select a Recognition Start Month",
            trigger: "blur"
          }
        ],
        // lengthRec: [{
        //   required: false,
        //   message: 'Please input a recognition length',
        //   trigger: 'blur'
        // }],
        subscription: [
          {
            required: true,
            type: "number",
            message: "Please select a subscription",
            trigger: "change"
          }
        ],
        revenueType: [
          {
            required: true,
            type: "number",
            message: "Please select a revenue type",
            trigger: "change"
          }
        ],
        comments: [
          {
            max: 500,
            message: "Comments too long",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //TODO: auto fill fx rate, and usd fields
    loadData() {
      const url = urlBase + "/api/v1/enum/all";

      axios.get(url).then(res => {
        this.classEnum = res.data.Class;
        this.productEnum = res.data.product;
        this.typeEnum = res.data.type;
        this.currencyEnum = res.data.currency;
        this.monthEnum = res.data.month;
        this.statusEnum = res.data.status;
        this.revenueEnum = res.data.revenueType;
        this.monthEnum = res.data.month;
        this.subscriptionEnum = res.data.subscription;
      });
    },

    validate() {
      return true;
    },
    resetForm(formName) {
      const result = JSON.parse(this.$cookie.get("blankForm"));
      this.formValue = result;
      console.log(result);
      this.$refs[formName].resetFields();
      this.$cookie.delete("form");
    },
    SaveForm() {
      console.log("Saving", { ...this.formValue });
      const save = JSON.stringify({ ...this.formValue });
      this.$cookie.set("form", save);
    },
    async submit(formName) {
      const url = urlBase + "/api/v1/reports/createInvoice";
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formValues = this.formValue;
          const message = {
            ...formValues
          };
          try {
            const data = axios.post(url, message).then(i => {
              this.$message({
                type: "success",
                message: "Success!"
              });
              this.resetForm(formName);
            });
          } catch (err) {
            this.$message({
              message: err.message,
              type: "error"
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "Invalid Inputs"
          });
          return false;
        }
      });
    },
    invoiceAmountOnChange(value) {
      if (this.formValue.lengthRec == "") {
        this.formValue.lengthRec = 12;
      }
      if (this.formValue.fxRate != "") {
        this.formValue.invoiceAmountUsd = this.formValue.fxRate * value;
      }
      if (this.formValue.increasePerc == "") {
        this.formValue.increasePerc = 0.05;
      }
      this.lengthRecOnChange(this.formValue.lengthRec);
    },
    currencyOnchange(value, value2) {
      var url =
        "http://apilayer.net/api/live?access_key=a85aa84971650d26dc61c8932a548e31&currencies=AUD";
      const currency = this.currencyEnum.find(i => i.id == value).data;
      url = url.replace("AUD", currency);
      axios.get(url).then(res => {
        this.formValue.fxRate = 1 / res.data.quotes["USD" + currency];

        if (this.formValue.invoiceAmount != "") {
          this.formValue.invoiceAmountUsd =
            this.formValue.fxRate * this.formValue.invoiceAmount;
        }
        if (this.formValue.lengthRec == "") {
          this.formValue.lengthRec = 12;
        }
        this.lengthRecOnChange(this.formValue.lengthRec);
      });
    },
    fxRateOnChange(value) {
      if (this.formValue.invoiceAmount != "") {
        this.formValue.invoiceAmountUsd = this.formValue.invoiceAmount * value;
      }
      if (this.formValue.lengthRec == "") {
        this.formValue.lengthRec = 12;
      }
      this.lengthRecOnChange(this.formValue.lengthRec);
    },
    lengthRecOnChange(value) {
      if (this.formValue.invoiceAmountUsd != "") {
        this.formValue.monthlyRec = this.formValue.invoiceAmountUsd / value;
      }
    },
    invoiceAmountUsdOnChange(value) {
      if (this.formValue.lengthRec == "") {
        this.formValue.lengthRec = 12;
      }
      this.lengthRecOnChange(this.formValue.lengthRec);
    }
  },
  created() {
    this.loadData();
    if (this.$cookie.get("blankForm") == undefined) {
      const save = JSON.stringify({ ...this.formValue });
      this.$cookie.set("blankForm", save);
    }
    if (this.$cookie.get("form") != undefined) {
      const result = JSON.parse(this.$cookie.get("form"));
      this.formValue = result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-select,
.el-input,
.el-textarea {
  width: 80%;
}

.header,
.el-switch,
.submit {
  margin: 10px;
  margin-left: 10px;
  width: 70%;
  border: 10px;
}
</style>
