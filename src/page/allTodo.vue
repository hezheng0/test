<template>
  <div>
    <headerTop></headerTop>
    <div class="allTodo">
      <el-row :gutter="16">
        <el-col :span="16">
          <div class="grid-content bg-purple-dark">
            <h1>todolist</h1>
            <h2>还有{{x}}件事要完成</h2>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="16">
          <el-input placeholder="请输入内容" v-model="input" clearable @keyup.enter.native="add"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="18">
        <el-col :span="16">
          <el-table
            :data="tableData"
            style="width:100%;"
            ref="multipleTable"
            highlight-current-row
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column width="130" label="已完成/未完成">
              <template slot-scope="scope">
                <el-checkbox v-model="tableData[scope.$index].isSelected">
                  <span v-if="tableData[scope.$index].isSelected">已完成</span>
                  <span v-if="!tableData[scope.$index].isSelected">已完成</span>
                </el-checkbox>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column prop="data" label="日期" width="200"></el-table-column>
            <el-table-column prop="event" label="事件" width="200">
              <template slot-scope="scope">
                <div v-show="!tableData[scope.$index].isEdit">{{tableData[scope.$index].event}}</div>
                <div>
                  <el-input
                    v-model="tableData[scope.$index].event"
                    @keyup.enter.native="changeEvent(scope.$index)"
                    v-show="tableData[scope.$index].isEdit"
                    @blur="cancel(scope.$index)"
                    v-focus="tableData[scope.$index]"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="click(scope.$index)">编辑</el-button>
                <el-button size="mini" @click="top(scope.$index)">置顶</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click.native.prevent="remove(scope.$index,tableData)"
                  circle
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import headerTop from "../components/headerTop";
export default {
  data() {
    return {
      input: "",
      tableData: [
        {
          event: "第一天",
          data: "2019/10/15",
          isSelected: false,
          isEdit: false
        },
        {
          event: "第二天",
          data: "2019/10/16",
          isSelected: false,
          isEdit: false
        }
      ],
      multipleSelection: [],
      currentRow: null,
      hash: ""
    };
  },
  created() {
    this.hash = window.location.hash.slice(2) || "allTodo";
    this.tableData = JSON.parse(localStorage.getItem("data")) || this.tableData;
    window.addEventListener(
      "hashchange",
      () => {
        this.hash = window.location.hash.slice(2);
      },
      false
    );
  },
  computed: {
    newTableData() {
      if (this.hash === "allTodo") return this.tableData;
      if (this.hash === "finished")
        return this.tableData.filter(i => i.isSelected);
      if (this.hash === "unfinished")
        return this.tableData.filter(i => !i.isSelected);
    },
    x() {
      return this.tableData.filter(i => !i.isSelected).length;
    }
    // time() {
    //   const das = new Date();
    //   const year = das.getFullYear() + "年";
    //   const month = das.getMonth() + "月";
    //   const day = das.getDate() + "日";
    //   return year + month + day;
    // }
  },
  watch: {
    tableData: {
      handler() {
        localStorage.setItem("data", JSON.stringify(this.tableData));
      },
      deep: true
    }
  },
  components: {
    headerTop
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    add() {
      if (this.input.length !== 0) {
        const da = new Date();
        const year = da.getFullYear() + "/";
        const month = da.getMonth() + 1 + "/";
        const day = da.getDate();
        const hour = da.getHours() + ":";
        const minute = da.getMinutes();
        const nowaday = [year + month + day + " " + hour + minute];
        console.log(nowaday);
        this.tableData.push({
          event: this.input,
          data: nowaday,
          isSelected: false
        });
      } else {
        alert("please enter event");
      }
      this.input = "";
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.currentRow = val;
    },
    remove(index, rows) {
      rows.splice(index, 1);
    },
    click(index) {
      this.tableData[index].isEdit = true;
    },
    top(index) {
      let cache = this.tableData.splice(index, 1);
      this.tableData = cache.concat(this.tableData);
    },
    changeEvent(index) {
      console.log("TCL: changeEvent -> index", index);
      const da = new Date();
      const year = da.getFullYear() + "/";
      const month = da.getMonth() + 1 + "/";
      const day = da.getDate();
      const hour = da.getHours() + ":";
      const minute = da.getMinutes();
      const nowaday = [year + month + day + " " + hour + minute];
      console.log(nowaday);
      this.tableData[index].data = nowaday;
      this.tableData[index].event = this.tableData[index].event;
      this.tableData[index].isEdit = false;
    },
    cancel(index) {
      this.tableData[index].isEdit = false;
    }
  }
};
</script>

<style>
.bg-purple-dark {
  background: #993c99;
  padding: 5px;
  border-radius: 4px;
}
.grid-content {
  text-align: center;
}
</style>