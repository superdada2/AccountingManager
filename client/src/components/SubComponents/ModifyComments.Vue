<template>
  <div class="content">
    <el-row>
      <el-col :span='11' class='input'>
        <span> Comments </span>
        <el-input type='textarea' :rows='5' v-model='row.comments'>
        </el-input>

      </el-col>
      <el-col :span='11' class='input'>
        <span> Description </span>
        <el-input type='textarea' :rows='5' v-model='row.description'>
        </el-input>
      </el-col>

    </el-row>

    <span slot='footer' class='dialog-footer'>
      <el-button @click='close'>Cancel</el-button>
      <el-button type='primary' @click='updateComments'>Save</el-button>
    </span>
  </div>
</template>
<script>
import axios from "Axios";
import { urlBase } from "../../settings.js";
import UserMixin from "../../functions/Authentication";

export default {
  name: "ModifyComment",
  props: ["currentRow", "close", "refresh"],
  data() {
    return {
      row: {
        comments: "",
        description: ""
      }
    };
  },
  mixins: [UserMixin],
  methods: {
    updateComments() {
      if (!this.Authorize({ type: 1, role: 2 })) {
        this.$message({
          type: "error",
          message: "No Permission!"
        });
        return;
      }
      if (
        this.row.comments != this.currentRow.comments ||
        this.row.description != this.currentRow.description
      ) {
        const url = urlBase + "/api/v1/reports/updateDescription";

        this.Post(url, {
          description: this.row.description,
          comments: this.row.comments,
          id: this.row.id
        });
      }
      this.close();
      this.refresh();
    }
  },
  watch: {
    currentRow: function(newVal, old) {
      this.row = {
        ...newVal
      };
    }
  },
  created() {
    this.row = {
      ...this.currentRow
    };
  }
};
</script>

<style scoped>
.el-button {
  float: right;
  margin: 10px;
}

.content {
  height: 200px;
}
</style>
