<template>
  <div id="app">

    </el-container>
    <el-container>
      <el-header height="90px">
        <div id="header">

          <img id="image" src="./assets/viz_logo.png">
          <h1 id="title">Deferred Revenue Tracker</h1>

          <router-link to="/setting" v-if="settingVisibility">
            <el-button id="setting" type="info" round :v-link='{name:"Setting"}'>
              <i class="el-icon-setting"></i>
            </el-button>
          </router-link>
          <Login :refreshMenu="renderMenu" :clearMenu="clearMenu" />

        </div>
      </el-header>
      <el-container>
        <el-aside width="160px">
          <el-menu id="sideBar" default-active="Home" :router="true">
            <el-menu-item index="Home" v-if="homeVisibility">
              <i class="el-icon-menu"></i>Home</el-menu-item>
            <el-menu-item index="Invoice" v-if="invoiceVisibility">
              <i class="el-icon-document"></i>Invoices</el-menu-item>
            <el-menu-item index="details" v-if="invoiceVisibility">
              <i class="el-icon-zoom-in"></i>Details</el-menu-item>
            <el-menu-item index="Report" v-if="reportsVisibility">
              <i class="el-icon-search"></i>Reports</el-menu-item>
            <el-menu-item index="Add" v-if="addVisibility">
              <i class="el-icon-circle-check"></i>Add Invoice</el-menu-item>
            <el-menu-item index="History" v-if="historyVisibility">
              <i class="el-icon-time"></i>History</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main id="content">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import Login from "./components/SubComponents/Login";
import UserMixin from "./functions/Authentication";
import _ from "lodash";
export default {
  name: "app",
  mixins: [UserMixin],
  components: {
    Login
  },
  data() {
    return {
      homeVisibility: false,
      invoiceVisibility: false,
      settingVisibility: false,
      reportsVisibility: false,
      addVisibility: false,
      historyVisibility: false
    };
  },
  methods: {
    renderMenu() {
      this.GetUser();
      if (_.isEmpty(this.auth.user)) {
        this.clearMenu();
        return;
      } else {
        if (
          this.Authorize({
            type: 3,
            role: 1
          })
        ) {
          this.homeVisibility = true;
        }

        if (
          this.Authorize({
            type: 1,
            role: 4
          })
        ) {
          this.invoiceVisibility = true;
        }
        if (
          this.Authorize({
            type: 5,
            role: 1
          })
        ) {
          this.reportsVisibility = true;
        }
        if (
          this.Authorize({
            type: 1,
            role: 1
          })
        ) {
          this.addVisibility = true;
        }
        if (
          this.Authorize({
            type: 4,
            role: 2
          })
        ) {
          this.historyVisibility = true;
        }
        if (
          this.Authorize([
            {
              type: 2,
              role: 1
            },
            {
              type: 2,
              role: 2
            },
            {
              type: 2,
              role: 3
            },
            {
              type: 4,
              role: 1
            }
          ])
        ) {
          this.settingVisibility = true;
        }
      }
    },
    clearMenu() {
      (this.invoiceVisibility = false),
        (this.homeVisibility = false),
        (this.settingVisibility = false),
        (this.reportsVisibility = false),
        (this.addVisibility = false);
      this.historyVisibility = false;
    }
  },
  created() {
    this.renderMenu();
  }
};
</script>

<style>
body {
  height: 100%;
  width: 100%;
  margin: 0;
}

#title {
  padding-top: 20px;
  display: inline-block;
  padding-left: 30px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#header {
  background: #545454;
  color: snow;
}

.el-header {
  padding: 0px;
}

#sideBar {
  height: 100%;
  position: relative;
}

#setting {
  margin-top: 25px;
  margin-right: 10px;
  float: right;
}

#image {
  margin-left: 20px;
}
</style>
