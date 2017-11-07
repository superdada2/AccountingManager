<template>
  <div id='Add'>
    <el-row>
      <div class="header">
        <h1>Add Invoice </h1>
      </div>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="Company Name" v-model="formValue.companyName"></el-input>
        <br>
        <el-select v-model="formValue.product" placeholder="Product">
          <el-option v-for="item in productEnum" :key="item.id" :label="item.data" :value="item.id">
          </el-option>
        </el-select>

        <el-select v-model="formValue.Class" placeholder="Class">
          <el-option v-for="item in classEnum" :key="item.id" :label="item.data" :value="item.id">
          </el-option>
        </el-select>

        <el-input placeholder="Invoice Number" type="number" v-model="formValue.invoiceNumber"></el-input>
        <el-input @change="invoiceAmountOnChange" placeholder="Invoice Amount" type="number" v-model="formValue.invoiceAmount"></el-input>
        <el-date-picker v-model="formValue.invoiceDate" type="date" placeholder="Invoice Date">
        </el-date-picker>
        <el-select v-model="formValue.type" placeholder="Type">
          <el-option v-for="item in typeEnum" :key="item.id" :label="item.data" :value="item.id">
          </el-option>
        </el-select>
        <el-select @change="currencyOnchange" v-model="formValue.currency" placeholder="Currency">
          <el-option v-for="item in currencyEnum" :key="item.id" :label="item.data" :value="item.id">
          </el-option>
        </el-select>

        <el-date-picker v-model="formValue.billMonth" type="month" placeholder="Bill Month">
        </el-date-picker>
        <el-select v-model="formValue.status" placeholder="Status">
          <el-option v-for="item in statusEnum" :key="item.id" :label="item.data" :value="item.id">
          </el-option>
        </el-select>
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Description" v-model="formValue.description">
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-date-picker v-model="formValue.recognitionStrMonth" type="month" placeholder="Recognition Start Month">
        </el-date-picker>
        <el-input placeholder="Length of Recognition(Months)" @change="lengthRecOnChange" type="number" v-model="formValue.lengthRec"></el-input>
        <el-input placeholder="Invoice Amount(USD)" @change="invoiceAmountUsdOnChange" type="number" v-model="formValue.invoiceAmountUsd"></el-input>
        <el-input placeholder="Fx rate" type="number" @change="fxRateOnChange" v-model="formValue.fxRate"></el-input>
        <el-input placeholder="Monthly Recognition(USD)" type="number" v-model="formValue.monthlyRec"></el-input>
        <br>
        <div class="select">
          <a>Annual Increase Eligible </a>
          <el-switch v-model="formValue.annualIncreaseBool" on-text="" off-text="">
          </el-switch>
        </div>
        <el-date-picker v-model="formValue.dateLastIncrease" type="date" placeholder="Date Last Increase">
        </el-date-picker>
        <el-input placeholder="Increase Percentage" type="number" v-model="formValue.increasePerc"></el-input>
        <el-select v-model="formValue.subscription" placeholder="Subscription Type">
          <el-option v-for="item in subscriptionEnum" :key="item.id" :label="item.data" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="formValue.revenueType" placeholder="Revenue Type">
          <el-option v-for="item in revenueEnum" :key="item.id" :label="item.data" :value="item.id">
          </el-option>
        </el-select>
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Comments" v-model="formValue.comments">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <div class="submit">
        <el-button @click="submit">Add Invoice</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import axios from 'Axios'
  const urlBase = "http://" + window.location.hostname + ":3030"
  export default {
    name: 'add',
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
          Class: '',
          product: '',
          type: '',
          currency: '',
          status: '',
          revenueType: '',
          companyName: '',
          invoiceNumber: '',
          invoiceAmount: '',
          invoiceDate: '',
          billMonth: '',
          description: '',
          recognitionStrMonth: '',
          lengthRec: '',
          invoiceAmount: '',
          fxRate: '',
          monthlyRec: '',
          dateLastIncrease: '',
          increasePerc: '',
          cancelationDate: '',
          comments: '',
          invoiceAmountUsd: '',
          annualIncreaseBool: true,
          subscription: ''
        }
      }
    },
    methods: {
      //TODO: auto fill fx rate, and usd fields
      loadData() {
        const url = urlBase + "/api/v1/enum/all"

        axios.get(url).then((res) => {
          this.classEnum = res.data.Class
          this.productEnum = res.data.product
          this.typeEnum = res.data.type
          this.currencyEnum = res.data.currency
          this.monthEnum = res.data.month
          this.statusEnum = res.data.status
          this.revenueEnum = res.data.revenueType
          this.monthEnum = res.data.month
          this.subscriptionEnum = res.data.subscription
        })
      },

      validate() {
        return true;
      },
      async submit() {
        const url = urlBase + "/api/v1/reports/createInvoice"
        const formValues = this.formValue
        if (this.validate()) {
          const message = { ...formValues
          }
          try {
            const data = await axios.post(url, message)
            this.$message({
              type: 'success',
              message: "Success!"
            })
          } catch (err) {
            this.$message({
              message: err.message,
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: "invalid inputs",
            type: 'error'
          })
        }
      },
      invoiceAmountOnChange(value) {
        if (this.formValue.lengthRec == '') {
          this.formValue.lengthRec = 12
        }
        if (this.formValue.fxRate != '') {
          this.formValue.invoiceAmountUsd = this.formValue.fxRate * value
        }
        if (this.formValue.increasePerc == '') {
          this.formValue.increasePerc = 0.05
        }
        this.lengthRecOnChange(this.formValue.lengthRec)
      },
      currencyOnchange(value, value2) {
        var url = 'http://apilayer.net/api/live?access_key=a85aa84971650d26dc61c8932a548e31&currencies=AUD'
        const currency = this.currencyEnum.find(i => i.id == value).data
        url = url.replace('AUD', currency)
        axios.get(url).then(res => {
          this.formValue.fxRate = 1 / res.data.quotes["USD" + currency]

          if (this.formValue.invoiceAmount != '') {
            this.formValue.invoiceAmountUsd = this.formValue.fxRate * this.formValue.invoiceAmount
          }
          if (this.formValue.lengthRec == '') {
            this.formValue.lengthRec = 12
          }
          this.lengthRecOnChange(this.formValue.lengthRec)
        })
      },
      fxRateOnChange(value) {
        if (this.formValue.invoiceAmount != '') {
          this.formValue.invoiceAmountUsd = this.formValue.invoiceAmount * value
        }
        if (this.formValue.lengthRec == '') {
          this.formValue.lengthRec = 12
        }
        this.lengthRecOnChange(this.formValue.lengthRec)
      },
      lengthRecOnChange(value) {
        if (this.formValue.invoiceAmountUsd != '') {
          this.formValue.monthlyRec = this.formValue.invoiceAmountUsd / value
        }
      },
      invoiceAmountUsdOnChange(value) {
        if (this.formValue.lengthRec == '') {
          this.formValue.lengthRec = 12
        }
        this.lengthRecOnChange(this.formValue.lengthRec)
      }

    },
    created() {
      this.loadData()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-select,
  .el-input,
  .el-textarea,
  .select,
  .header,
  .submit {
    margin: 10px;
    margin-left: 20px;
    width: 70%;
    border: 10px;
  }

</style>
