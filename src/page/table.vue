<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-refresh-left"
          class="handle-del mr10"
          @click="handleRevoke"
        >撤销上一步删除</el-button>
        <!-- <el-select
					v-model="query.type"
					placeholder="类别"
					class="handle-select mr10"
				>
					<el-option
						v-for="item in typeList"
						:label="item.type"
						:value="item.type"
						:key="item.value"
					></el-option>
        </el-select>-->
        <el-input
          v-model="searchType"
          placeholder="名称"
          class="handle-input mr10"
          @keyup.enter.native="filterData"
          clearable
        ></el-input>
        <router-link to="/form">
          <el-button type="primary" icon="el-icon-circle-plus-outline" class="mr10">添加数据</el-button>
        </router-link>
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-model="filterPriceNumber"
          placeholder="请输入价格"
          class="handle-input mr10"
          @keyup.enter.native="filterData"
          clearable
        ></el-input>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          :default-time="['12:00:00', '08:00:00']"
          @change="filterDate"
        ></el-date-picker>
      </div>
      <el-table
        :data="
					data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
				"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">￥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="图片(可查看大图)" align="center">
          <template slot-scope="scope">
            <el-image class="table-td-img" :src="scope.row.img" :preview-src-list="[scope.row.img]"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="类别" align="center">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column label="详情" align="center">
          <template slot-scope="scope">{{ scope.row.info }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="handleDel(scope.$index, scope.row)"
            >删除</el-button>
            <!-- <el-dropdown type="primary" split-button
							>更多
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item
									@click="handleEdit(scope.$index, scope.row)"
									>编辑</el-dropdown-item
								>
								<el-dropdown-item
									@click="handleDel(scope.$index, scope.row)"
									>删除</el-dropdown-item
								>
							</el-dropdown-menu>
            </el-dropdown>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="pageTotal"
          :page-sizes="pageSizes"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="form.info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button @click="saveEdit" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from "../api/index";
export default {
  name: "tableTest",
  data() {
    return {
      query: {
        price: "",
        type: ""
      },
      filterPriceNumber: "",
      pageIndex: 1,
      data: [],
      originalData: [],
      pageSize: 3,
      pageSizes: [3, 5, 7, 9],
      typeList: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      searchType: "",
      value: "",
      options: [
        { value: "lessthan", label: "<" },
        { value: "greaterthan", label: ">" },
        { value: "equal", label: "=" }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: [new Date(2020, 0, 1, 8, 5, 20), new Date(2020, 0, 6, 17, 0, 30)]
    };
  },
  created() {
    this.getData();
  },
  async mounted() {
    const res = await getPassive();
    console.log("TCL: mounted -> res", res);
  },
  watch: {
    // searchType(newValue) {
    // 	console.log("TCL: searchType -> newValue", newValue);
    // 	this.data = this.data.filter(item => {
    // 		return item.name.includes(newValue);
    // 	});
    // }
    // pageTotal(newValue, oldValue) {
    // 	this.pageTotal = this.data.length;
    // 	console.log(
    // 		"TCL: pageTotal -> newValue, oldValue",
    // 		newValue,
    // 		oldValue
    // 	);
    // }
  },
  methods: {
    getData() {
      fetchData(this.query).then(res => {
        console.log("TCL: getData -> res", res);

        this.data = res.list;
        this.originalData = res.list;
        this.pageTotal = this.data.length;
      });
    },

    handleSizeChange(val) {
      console.log("TCL: handleSizeChange -> val", val);
    },

    // 删除
    handleDel(index, row) {
      this.$confirm("确定删除此信息吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除完成");
          this.data.splice(index, 1);
          this.pageTotal = this.data.length;
        })
        .catch(() => {});
    },

    // 多选
    handleSelectionChange(val) {
      console.log("TCL: handleSelectionChange -> val", val);
      this.multipleSelection = val;
    },

    // 批量删除
    delAllSelection() {
      const length1 = this.data.length;
      const length2 = this.multipleSelection.length;
      if (length2 === 0) {
        return this.$message.warning("未选择删除项");
      }
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length2; i++) {
        str += this.multipleSelection[i].name + "";
        for (let j = 0; j < length1; j++) {
          if (this.multipleSelection[i] == this.data[j]) {
            let indexs = this.data.indexOf(this.data[j]);
            this.data.splice(indexs, 1);
          }
        }
      }
      this.$message.error(`删除了${str}`);
      this.pageTotal = this.data.length;
      this.multipleSelection = [];
      return this.data;
    },

    // 撤销
    handleRevoke() {
      this.data = this.delList.concat(this.data);
      if (this.delList.length !== 0) {
        this.$message.success("还原成功");
      } else {
        this.$message.error("无删除数据");
      }

      this.delList = [];
    },

    // 编辑
    handleEdit(index, row) {
      this.idx = index;
      console.log("TCL: handleEdit -> idx", index);
      this.form = row;
      console.log("TCL: handleEdit -> row", row);
      this.editVisible = true;
    },

    // 保存
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第${this.idx + 1}行完成`);
      this.$set(this.data, this.idx, this.form);
    },

    // 分页
    handlePageChange(val) {
      // this.$set(this.query, "pageIndex", val);
      // this.getData();
      this.pageIndex = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },

    getObjectKeys(obj) {
      var keys = [];
      obj.forEach((v, i) => {
        Object.keys(v).forEach(v => {
          if (v == "type") {
            keys.push(obj[i][v]);
          }
        });
      });
      const set = new Set(keys);
      return [...set];
    },

    //过滤数据
    filterPrice() {
      // console.log(this.data);
      // let a = this.getObjectKeys(this.originalData);
      // console.log(a);
      if (!this.filterPriceNumber) return (this.data = this.originalData);
      if (!this.value) return alert("请选择<>=");
      switch (this.value) {
        case "lessthan":
          let lessthan = [];
          lessthan = this.originalData.filter(item => {
            return item.price < this.filterPriceNumber;
          });
          this.data = lessthan;
          // this.pageTotal = this.data.length;
          break;
        case "greaterthan":
          let greaterthan = [];
          greaterthan = this.originalData.filter(item => {
            return item.price > this.filterPriceNumber;
          });
          this.data = greaterthan;
          // this.pageTotal = this.data.length;
          break;
        case "equal":
          let equal = [];
          equal = this.originalData.filter(item => {
            return item.price === this.filterPriceNumber;
          });
          this.data = equal;
          // this.pageTotal = this.data.length;
          break;
        default:
          this.data = this.originalData;
          break;
      }
    },
    filterType() {
      this.data = this.data.filter(item => {
        console.log(item.type);
        return item.type == this.searchType;
      });
      // this.pageTotal = this.data.length;
    },

    filterDate(t) {
      console.log("TCL: filterDate -> t", t);
    },

    filterData() {
      this.data = this.originalData;
      if (this.filterPriceNumber) {
        this.filterPrice();
      }
      if (this.searchType) {
        this.filterType();
      }
      this.pageTotal = this.data.length;
    }
  }
};
</script>

<style>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.pagination {
  margin: 20px 0;
  text-align: right;
}
</style>
