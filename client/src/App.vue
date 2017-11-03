<template>
  <div id="app">

</el-container>
    <el-container>
      <el-header height="90px">
        <div id="header">
          
          <img id="image" src="./assets/viz_logo.png">
          <h1 id="title">INVOICES</h1>
          <router-link to="/setting"><el-button id="setting" type="info" round :v-link='{name:setting}'><i class="el-icon-setting"></i></el-button></router-link>
          
        </div>
      </el-header>
      <el-container>
        <el-aside width="160px">
          <el-menu id="sideBar" default-active="Home" :router="true">
            <el-menu-item index="Home">
              <i class="el-icon-menu"></i>Home</el-menu-item>
            <el-menu-item index="Invoice">
              <i class="el-icon-document"></i>Invoices</el-menu-item>
            <el-menu-item index="Report">
              <i class="el-icon-search"></i>Reports</el-menu-item>
            <el-menu-item index="Add">
              <i class="el-icon-circle-check"></i>Add Invoice</el-menu-item>
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
  export default {
    name: 'app'
  }

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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #header {
    background: #545454;
    color: snow;
  }
  .el-header{
    padding: 0px
  }
  #sideBar{
    height: 100%;
    position: relative;
  }

  #setting{
    margin-top: 25px;
    margin-right:10px;
    float: right ;
  }
  #image{
    margin-left: 20px;
  }
  

</style>
