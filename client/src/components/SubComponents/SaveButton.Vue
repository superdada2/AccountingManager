<template>
  <a>
    <el-dialog
			:visible.sync="dialogVisibility"
			width="30%"
		>
      <div>				
        <el-input placeholder="Name" v-model="newName"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>this.dialogVisibility = false">Cancel</el-button>
        <el-button type="primary" @click="Save">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dropdown class="save" split-button type="primary" @click="()=>this.dialogVisibility = true" @command="Command">
      Save
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in dropDown" :command="item.id" :key="item.id">{{item.name}}
					<el-button type="text" @click="(e)=>{e.stopPropagation(), DeleteClick(item.id)}">x</el-button>
				</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </a>
</template>

<script>
import _ from "lodash";
export default {
  name: "saveDropDown",
  props: ["dataName", "activeData", "Load"],
  data() {
    return {
      dialogVisibility: false,
      newName: "",
      dropDown: [
        {
          id: 1,
          name: "test",
          data: {}
        },
        {
          id: 2,
          name: "test2",
          data: {}
        }
      ]
    };
  },
  methods: {
    DeleteClick(id) {
      this.$confirm("Are you sure to close this dialog?")
        .then(E => {
          var temp = [...this.dropDown];
          _.remove(temp, function(n) {
            return n.id == id;
          });
          this.dropDown = temp;
          this.$localStorage.set(this.dataName, JSON.stringify(this.dropDown));
        })
        .catch(E => {});
    },
    Save() {
      console.log("abs");
      if (this.newName == "") {
        this.$message({
          type: "error",
          message: "Name cannot be empty"
        });
      } else {
        var temp = [...this.dropDown];
        temp.push({
          id: temp.length > 0 ? temp[temp.length - 1].id + 1 : 1,
          name: this.newName,
          data: { ...this.activeData }
        });
        this.dropDown = temp;
        console.log(temp);
        this.$localStorage.remove(this.dataName);
        this.$localStorage.set(this.dataName, JSON.stringify(this.dropDown));
        this.newName = "";
        this.dialogVisibility = false;
      }
    },
    Command(id) {
      // console.log(id);
      const entry = this.dropDown.find(i => {
        return i.id == id;
      });
      // console.log(entry);
      this.Load(entry.data);
    }
  },
  created() {
    const temp = this.$localStorage.get(this.dataName);
    this.dropDown = JSON.parse(temp);
    if (this.dropDown == null) {
      this.dropDown = [];
    }
  }
};
</script>

<style scoped>
.save {
  float: right;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
