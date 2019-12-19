<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="mgb20" style="height:252px;">
					<div class="user-info">
						<img
							src="../assets/img/cxk.jpg"
							class="user-avator"
							alt
						/>
						<div class="user-info-cont">
							<div class="user-info-name">{{ name }}</div>
							<div>{{ role }}</div>
						</div>
					</div>
					<div class="user-info-list">
						上次登录时间：
						<span>{{ nowTime }}</span>
					</div>
					<div class="user-info-list">
						上次登录地点：
						<span>深圳</span>
					</div>
				</el-card>
				<el-card shadow="hover" style="height:252px;">
					<div slot="header" class="clearfix">
						<span>语言详情</span>
					</div>
					Vue
					<el-progress
						:percentage="71.3"
						color="#42b983"
					></el-progress
					>JavaScript
					<el-progress
						:percentage="24.1"
						color="#f1e05a"
					></el-progress
					>CSS
					<el-progress
						:percentage="13.7"
						color="#aee2fd"
					></el-progress
					>HTML
					<el-progress
						:percentage="5.9"
						color="#f56c6c"
					></el-progress>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-row :gutter="20" class="mgb20">
					<el-col :span="8">
						<el-card
							shadow="hover"
							:body-style="{ padding: '0px' }"
						>
							<div class="grid-content grid-con-1">
								<i class="el-icon-s-order grid-con-icon"></i>
								<div class="grid-cont-right">
									<div class="grid-num">{{ count }}</div>
									<div>总数</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card
							shadow="hover"
							:body-style="{ padding: '0px' }"
						>
							<div class="grid-content grid-con-2">
								<i class="el-icon-check grid-con-icon"></i>
								<div class="grid-cont-right">
									<div class="grid-num">{{ done }}</div>
									<div>OK</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card
							shadow="hover"
							:body-style="{ padding: '0px' }"
						>
							<div class="grid-content grid-con-3">
								<i class="el-icon-delete grid-con-icon"></i>
								<div class="grid-cont-right">
									<div class="grid-num">5000</div>
									<div>不行</div>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-card shadow="hover" style="height:403px;">
					<div slot="header" class="clearfix">
						<span>待办事项</span>
						<el-input
							style="width:600px ;padding-left:300px"
							placeholder="请输入待办事项"
							v-model="input"
							clearable
						></el-input>
						<el-button
							style="float: right; padding: 10px 0"
							type="text"
							@click.native="addTodo"
							>添加</el-button
						>
					</div>
					<el-table
						:show-header="false"
						:data="todoList"
						style="width:100%;"
						height="300px"
					>
						<el-table-column width="40">
							<template slot-scope="scope">
								<el-checkbox
									v-model="scope.row.status"
								></el-checkbox>
							</template>
						</el-table-column>
						<el-table-column>
							<template slot-scope="scope">
								<div
									class="todo-item"
									:class="{
										'todo-item-del': scope.row.status
									}"
								>
									{{ scope.row.title }}
								</div>
							</template>
						</el-table-column>
						<el-table-column width="60">
							<template>
								<i class="el-icon-edit"></i>
								<i class="el-icon-delete"></i>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" style="height:530px;">
					<div class="echarts">
						<barSimple></barSimple>
					</div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" style="height:530px;">
					<div class="echarts">
						<lineSimple></lineSimple>
					</div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" style="height:530px;">
					<div class="echarts">
						<radar></radar>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import bus from "../components/bus";
import barSimple from "../components/bar-simple";
import lineSimple from "../components/line-simple";
import radar from "../components/radar";
export default {
	name: "home",
	data() {
		return {
			name: localStorage.getItem("ms_username"),
			input: "",
			todoList: [
				{
					title: "明天接入todolist",
					status: false
				},
				{
					title: "完善其他页面",
					status: false
				},
				{
					title: "明天接入todolist",
					status: false
				},
				{
					title: "加入el-scrollbar",
					status: false
				},
				{
					title: "456",
					status: true
				},
				{
					title: "接入echarts",
					status: true
				}
			]
		};
	},
	components: {
		barSimple,
		lineSimple,
		radar
	},
	computed: {
		role() {
			return this.name === "admin"
				? "super Administrators"
				: "ordinary user";
		},
		nowTime() {
			const da = new Date();
			const year = da.getFullYear() + "/";
			const month = da.getMonth() + 1 + "/";
			const day = da.getDate() + "";
			return year + month + day;
		},
		count() {
			return this.todoList.length;
		},
		done() {
			let todoDone = this.todoList.filter(i => {
				return i.status === true;
			});
			return todoDone.length;
		}
	},
	methods: {
		addTodo() {
			console.log(123);

			if (this.input.length !== 0) {
				this.todoList.push({
					title: this.input,
					status: false
				});
			} else {
				alert("请输入待办事项");
			}
			this.input = "";
		}
	}
};
</script>

<style>
.el-row {
	margin-bottom: 20px;
}
.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
	color: rgb(242, 94, 67);
}

.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-avator {
	width: 120px;
	height: 120px;
	border-radius: 50%;
}
.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: rgb(28, 102, 199);
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: rgb(212, 80, 80);
}

.user-info-list {
	font-size: 14px;
	color: rgb(64, 155, 172);
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}
.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.mgb20 {
	margin-bottom: 20px;
}
.echarts {
	width: 100%;
	height: 500px;
}
</style>
