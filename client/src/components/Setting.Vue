<template>
  <div id='Setting'>
    <div id="version">
      {{"Version: " + version}}
    </div>
    <el-row>
      <div class='header'>
        <h1>Settings </h1>
      </div>
    </el-row>
    <div class='content'>
      <el-tabs  value='add'>
        <el-tab-pane label='Add' name='add' v-if="addTabVisibility">
          <el-row>
            <el-col :span='12'>
              <el-input placeholder='Add Class' v-model='Class'></el-input>
              <el-button type='primary' @click="()=>addClick('class')">Add</el-button>
              <br>
              <el-input placeholder='Add Currency' v-model='currency'></el-input>
              <el-button type='primary' @click="()=>addClick('currency')">Add</el-button>
              <br>
              <el-input placeholder='Add Product' v-model='product'></el-input>
              <el-button type='primary' @click="()=>addClick('product')">Add</el-button>
              <br>
              <el-input placeholder='Add Type' v-model='type'></el-input>
              <el-button type='primary' @click="()=>addClick('type')">Add</el-button>
              <br>
            </el-col>
            <el-col :span='12'>
              <el-input placeholder='Add Revenue Type' v-model='revenueType'></el-input>
              <el-button type='primary' @click="()=>addClick('revenueType')">Add</el-button>
              <br>
              <el-input placeholder='Add Status Type' v-model='status'></el-input>
              <el-button type='primary' @click="()=>addClick('status')">Add</el-button>
              <br>
              <el-input placeholder='Add Subscription Type' v-model='subscription'></el-input>
              <el-button type='primary' @click="()=>addClick('subscription')">Add</el-button>
              <br>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label='Update' name='update' v-if="updatedTabVisibility">
          <el-row>
            <el-col :span='12'>
              <el-select v-model='idClass' placeholder='Class'>
                <el-option v-for='item in classEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              <el-input placeholder='Modify Class' v-model='Class'></el-input>
              <el-button type='primary' @click="()=>updateClick('class')">Modify</el-button>
              <br>
              <el-select v-model='idCurrency' placeholder='Currency'>
                <el-option v-for='item in currencyEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              <el-input placeholder='Modify Currency' v-model='currency'></el-input>
              <el-button type='primary' @click="()=>updateClick('currency')">Modify</el-button>
              <br>
              <el-select v-model='idProduct' placeholder='Product'>
                <el-option v-for='item in productEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              <el-input placeholder='Modify Product' v-model='product'></el-input>
              <el-button type='primary' @click="()=>updateClick('product')">Modify</el-button>
              <br>
              <el-select v-model='idType' placeholder='Type'>
                <el-option v-for='item in typeEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              <el-input placeholder='Modify Type' v-model='type'></el-input>
              <el-button type='primary' @click="()=>updateClick('type')">Modify</el-button>
              <br>
            </el-col>
            <el-col :span='12'>
              <el-select v-model='idRevenueType' placeholder='Revenue Type'>
                <el-option v-for='item in classEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              <el-input placeholder='Modify Revenue Type' v-model='revenueType'></el-input>
              <el-button type='primary' @click="()=>updateClick('revenueType')">Modify</el-button>
              <br>
              <el-select v-model='idStatus' placeholder='Status'>
                <el-option v-for='item in statusEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              <el-input placeholder='Modify Status Type' v-model='status'></el-input>
              <el-button type='primary' @click="()=>updateClick('status')">Modify</el-button>
              <br>
              <el-select v-model='idSubscription' placeholder='Subscription'>
                <el-option v-for='item in subscriptionEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              <el-input placeholder='Modify Subscription Type' v-model='subscription'></el-input>
              <el-button type='primary' @click="()=>updateClick('subscription')">Modify</el-button>
              <br>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label='Delete' name='delete' v-if="deleteTabVisibility">
          <el-row>
            <el-col :span='12'>
              <el-select v-model='idClass' placeholder='Class'>
                <el-option v-for='item in classEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              
              <el-button type='primary' @click="()=>deleteClick('class')">Delete</el-button>
              <br>
              <el-select v-model='idCurrency' placeholder='Currency'>
                <el-option v-for='item in currencyEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              
              <el-button type='primary' @click="()=>deleteClick('currency')">Delete</el-button>
              <br>
              <el-select v-model='idProduct' placeholder='Product'>
                <el-option v-for='item in productEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              
              <el-button type='primary' @click="()=>deleteClick('product')">Delete</el-button>
              <br>
              <el-select v-model='idType' placeholder='Type'>
                <el-option v-for='item in typeEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              
              <el-button type='primary' @click="()=>deleteClick('type')">Delete</el-button>
              <br>
            </el-col>
            <el-col :span='12'>
              <el-select v-model='idRevenueType' placeholder='Revenue Type'>
                <el-option v-for='item in classEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              
              <el-button type='primary' @click="()=>deleteClick('revenueType')">Delete</el-button>
              <br>
              <el-select v-model='idStatus' placeholder='Status'>
                <el-option v-for='item in statusEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              
              <el-button type='primary' @click="()=>deleteClick('status')">Delete</el-button>
              <br>
              <el-select v-model='idSubscription' placeholder='Subscription'>
                <el-option v-for='item in subscriptionEnum' :key='item.id' :label='item.data' :value='item.id'>
                </el-option>
              </el-select>
              
              <el-button type='primary' @click="()=>deleteClick('subscription')">Delete</el-button>
              <br>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label='Users Permission' name='userPermission' v-if="usersTabVisibility">
          <UserPermission/>
        </el-tab-pane>
        <el-tab-pane label='User Management' name='userManagement' v-if="usersTabVisibility">
          <UserManagement/>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import axios from "Axios";
import { urlBase, version } from "../settings.js";
import UserMixin from "../functions/Authentication";
import UserPermission from "./Setting/UserPermission";
import UserManagement from "./Setting/UserManagement";

export default {
  name: "Settings",
  props: ["id"],
  components: {
    UserPermission,
    UserManagement
  },
  data() {
    return {
      version: version,
      addTabVisibility: false,
      updatedTabVisibility: false,
      deleteTabVisibility: false,
      usersTabVisibility: false,
      temp: "",
      tab: "Add",
      Class: "",
      currency: "",
      product: "",
      revenueType: "",
      status: "",
      subscription: "",
      type: "",
      idClass: "",
      idCurrency: "",
      idProduct: "",
      idRevenueType: "",
      idStatus: "",
      idSubscription: "",
      idType: "",
      classEnum: [],
      currencyEnum: [],
      productEnum: [],
      revenueEnum: [],
      statusEnum: [],
      subscriptionEnum: [],
      typeEnum: []
    };
  },
  mixins: [UserMixin],
  methods: {
    addClick(value) {
      const url = urlBase + "/api/v1/enum/add";
      var payLoad = {};
      switch (value) {
        case "class":
          payLoad = {
            type: value,
            data: this.Class
          };
          break;
        case "currency":
          payLoad = {
            type: value,
            data: this.currency
          };
          break;
        case "product":
          payLoad = {
            type: value,
            data: this.product
          };
          break;
        case "revenueType":
          payLoad = {
            type: value,
            data: this.revenueType
          };
          break;
        case "status":
          payLoad = {
            type: value,
            data: this.status
          };
          break;
        case "subscription":
          payLoad = {
            type: value,
            data: this.subscription
          };
          break;
        case "type":
          payLoad = {
            type: value,
            data: this.type
          };
          break;
      }
      try {
        this.Post(url, payLoad).then(res => {
          this.$message({
            showClose: true,
            message: "Success!",
            type: "success"
          });
        });
      } catch (err) {
        console.log(err);
        this.$message({
          showClose: true,
          message: "Failed...",
          type: "error"
        });
      }
    },
    updateClick(value) {
      const url = urlBase + "/api/v1/enum/update";
      var payLoad = {};
      switch (value) {
        case "class":
          payLoad = {
            type: value,
            id: this.idClass,
            data: this.Class
          };
          break;
        case "currency":
          payLoad = {
            type: value,
            id: this.idCurrency,
            data: this.currency
          };
          break;
        case "product":
          payLoad = {
            type: value,
            id: this.idProduct,
            data: this.product
          };
          break;
        case "revenueType":
          payLoad = {
            type: value,
            id: this.idRevenueType,
            data: this.revenueType
          };
          break;
        case "status":
          payLoad = {
            type: value,
            id: this.idStatus,
            data: this.status
          };
          break;
        case "subscription":
          payLoad = {
            type: value,
            id: this.idSubscription,
            data: this.subscription
          };
          break;
        case "type":
          payLoad = {
            type: value,
            id: this.idType,
            data: this.type
          };
          break;
      }
      try {
        this.Post(url, payLoad).then(res => {
          this.$message({
            showClose: true,
            message: "Success!",
            type: "success"
          });
        });
      } catch (err) {
        console.log(err);
        this.$message({
          showClose: true,
          message: "Failed...",
          type: "error"
        });
      }
    },
    deleteClick(value) {
      const url = urlBase + "/api/v1/enum/delete";
      var payLoad = {};
      switch (value) {
        case "class":
          payLoad = {
            type: value,
            id: this.idClass
          };
          break;
        case "currency":
          payLoad = {
            type: value,
            id: this.idCurrency
          };
          break;
        case "product":
          payLoad = {
            type: value,
            id: this.idProduct
          };
          break;
        case "revenueType":
          payLoad = {
            type: value,
            id: this.idRevenueType
          };
          break;
        case "status":
          payLoad = {
            type: value,
            id: this.idStatus
          };
          break;
        case "subscription":
          payLoad = {
            type: value,
            id: this.idSubscription
          };
          break;
        case "type":
          payLoad = {
            type: value,
            id: this.idType
          };
          break;
      }
      try {
        this.Post(url, payLoad).then(res => {
          this.$message({
            showClose: true,
            message: "Success!",
            type: "success"
          });
        });
      } catch (err) {
        console.log(err);
        this.$message({
          showClose: true,
          message: err.message,
          type: "error"
        });
      }
    },
    renderTab() {
      if (this.Authorize({ type: 2, role: 1 })) {
        this.addTabVisibility = true;
      }
      if (this.Authorize({ type: 2, role: 2 })) {
        this.updatedTabVisibility = true;
      }
      if (this.Authorize({ type: 2, role: 3 })) {
        this.deleteTabVisibility = true;
      }
      if (this.Authorize({ type: 4, role: 1 })) {
        this.usersTabVisibility = true;
      }
    },
    loadData() {
      const url = urlBase + "/api/v1/enum/all";

      this.Get(url).then(res => {
        this.classEnum = res.data.Class;
        this.productEnum = res.data.product;
        this.typeEnum = res.data.type;
        this.currencyEnum = res.data.currency;
        this.statusEnum = res.data.status;
        this.revenueEnum = res.data.revenueType;
        this.subscriptionEnum = res.data.subscription;
      });
    }
  },
  created() {
    this.loadData();
    this.renderTab();
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.header {
  margin: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.el-input,
.el-select {
  width: 300px;
  margin: 20px;
  margin-top: 10px;
}
#version {
  position: fixed;
  bottom: 30px;
  right: 5px;
  width: 140px;
  font-size: 12px;
}
</style>
