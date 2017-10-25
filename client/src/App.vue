<template>
  <div id="app">
    <el-row>
      <el-col :span="24" >
        <div id="header">
          <h1 id="title">INVOICES</h1>
          <img src="./assets/viz_logo.png">
        </div>
      </el-col>
    </el-row>
        
    <el-row id="content">    
      <el-col :span="4" >
        <el-menu id="sideBar" default-active="1" router="true" >
          <el-menu-item index="Default"><i class="el-icon-menu"></i>Main</el-menu-item>
          <el-menu-item index="Invoice"><i class="el-icon-document"></i>Invoices</el-menu-item>
          <el-menu-item index="Search"><i class="el-icon-search"></i>Invoices by Number</el-menu-item>
          <el-menu-item index="Add"><i class="el-icon-circle-check"></i>Add Invoice</el-menu-item>
        </el-menu>
      </el-col>    
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>    
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{
    height: 100%;
    width: 100%;
    margin: 0;
}
#title{
    padding-top: 20px;
    display:inline-block;
    padding-left: 30px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#header{
  position: fixed;
  height: 100px;
  background: #545454;
  color: snow;
  width: 100%;
  z-index: 1;
}
#content{
  position: relative;;
  top:100px;
  height: 100%;
}
#sideBar{
  position: relative;
  min-height: 880px;
}


</style>
