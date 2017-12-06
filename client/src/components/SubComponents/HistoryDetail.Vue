<template>
  <div class="content">
    <el-row>
      <el-col :span='11' class='input'>
        <span> Original </span>
        <el-input type='textarea' :rows='5' v-model='originalString'>
        </el-input>

      </el-col>
      <el-col :span='11' class='input'>
        <span> Updated </span>
        <el-input type='textarea' :rows='5' v-model='updatedString'>
        </el-input>
      </el-col>

    </el-row>

    <span slot='footer' class='dialog-footer'>
      <el-button @click='close'>Cancel</el-button>
    </span>
  </div>
</template>
<script>
import axios from "axios";
import { urlBase } from "../../settings.js";
import UserMixin from "../../functions/Authentication";

export default {
  name: "HistoryDetail",
  props: ["currentRow", "close"],
  data() {
    return {
      row: {}
    };
  },
  mixins: [UserMixin],
  methods: {},
  watch: {
    currentRow: function(newVal, old) {
      this.row = JSON.parse(newVal.operation);
    }
  },
  created() {
    this.row = JSON.parse(this.currentRow.operation);
  },
  computed: {
    originalString() {
      return JSON.stringify(this.row.original);
    },
    updatedString() {
      return JSON.stringify(this.row.updated);
    }
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
