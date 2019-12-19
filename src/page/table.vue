<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-button
					type="primary"
					icon="el-icon-delete"
					class="handle-del mr10"
					@click="delAllSelection"
					>批量删除</el-button
				>
				<el-button
					type="primary"
					icon="el-icon-refresh-left"
					class="handle-del mr10"
					@click="handleRevoke"
					>撤销上一步删除</el-button
				>
				<el-select
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
				</el-select>
				<el-input
					v-model="searchType"
					placeholder="名称"
					class="handle-input mr10"
					clearable
				></el-input>
				<el-button
					type="primary"
					icon="el-icon-search"
					@click="handleSearch"
					>搜索</el-button
				>
				<router-link to="/form">
					<el-button
						type="primary"
						icon="el-icon-circle-plus-outline"
						class="mr10"
						>添加数据</el-button
					>
				</router-link>
			</div>
			<el-table
				:data="data"
				border
				class="table"
				ref="multipleTable"
				@selection-change="handleSelectionChange"
			>
				<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column label="名称">
					<template slot-scope="scope">
						{{ scope.row.name }}
					</template>
				</el-table-column>
				<el-table-column label="价格">
					<template slot-scope="scope">
						￥{{ scope.row.price }}
					</template>
				</el-table-column>
				<el-table-column label="图片(可查看大图)" align="center">
					<template slot-scope="scope">
						<el-image
							class="table-td-img"
							:src="scope.row.img"
							:preview-src-list="[scope.row.img]"
						></el-image>
					</template>
				</el-table-column>
				<el-table-column label="类别" align="center">
					<template slot-scope="scope">
						{{ scope.row.type }}
					</template>
				</el-table-column>
				<el-table-column label="详情" align="center">
					<template slot-scope="scope">
						{{ scope.row.info }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							type="text"
							icon="el-icon-edit"
							@click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-button
							type="text"
							icon="el-icon-delete"
							@click="handleDel(scope.$index, scope.row)"
						>
							删除
						</el-button>
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
						</el-dropdown> -->
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
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
				type: "",
				pageIndex: 1,
				pageSize: 4
			},
			data: [],
			typeList: [],
			multipleSelection: [],
			delList: [],
			editVisible: false,
			pageTotal: 0,
			form: {},
			idx: -1,
			id: -1,
			searchType: ""
		};
	},
	created() {
		this.getData();
	},
	watch: {
		searchType(newValue) {
			console.log("TCL: searchType -> newValue", newValue);
			this.data = this.data.filter(item => {
				return item.name.includes(newValue);
			});
		}
	},
	methods: {
		getData() {
			fetchData(this.query).then(res => {
				console.log("TCL: getData -> res", res);

				this.data = res.list;
				this.pageTotal = res.pageTotal || 50;
				this.typeList = res.typeList;
			});
		},

		handleSearch() {
			this.data = this.data.filter(item =>
				Object.values(item)
					.join()
					.includes(this.searchType)
			);
			console.log(this.data);
		},

		// 删除
		handleDel(index, row) {
			this.$confirm("确定删除此信息吗？", "提示", {
				type: "warning"
			})
				.then(() => {
					this.$message.success("删除完成");
					this.data.splice(index, 1);
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
		handlePageChange() {
			this.$set(this.query, "pageIndex", val);
			this.getData();
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
