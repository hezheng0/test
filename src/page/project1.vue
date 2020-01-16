<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-col :span="6">
					<h3>主叫号码</h3>
					<el-input
						class="handle-input mr10"
						v-model="callerNumber"
						@keyup.enter.native="filterData"
						clearable
					></el-input>
				</el-col>
				<el-col :span="6">
					<h3>被叫号码</h3>
					<el-input
						class="handle-input mr10"
						v-model="calledNumber"
						@keyup.enter.native="filterData"
						clearable
					></el-input>
				</el-col>
				<el-col :span="6">
					<h3>录音时长</h3>
					<el-select v-model="value" clearable placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
					<el-input
						v-model="filterDuration"
						placeholder="请输入"
						class="handle-input mr10"
						@keyup.enter.native="filterData"
						clearable
					></el-input
					>(秒)
				</el-col>
				<el-col :span="4"></el-col>

				<el-date-picker
					v-model="value2"
					type="datetimerange"
					:picker-options="pickerOptions"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					align="right"
					:default-time="['12:00:00', '08:00:00']"
					@change="filterData"
				></el-date-picker>
				<h3>原IP地址</h3>
				<el-input
					class="handle-input mr10"
					v-model="beforeIPAddress"
					@keyup.enter.native="filterData"
					clearable
				></el-input>
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
				<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column label="开始时间" align="center">
					<template slot-scope="scope">{{
						scope.row.startTime
					}}</template>
				</el-table-column>
				<el-table-column label="结束时间" align="center">
					<template slot-scope="scope">{{
						scope.row.endTime
					}}</template>
				</el-table-column>
				<el-table-column label="时长" align="center">
					<template slot-scope="scope">{{
						scope.row.duration
					}}</template>
				</el-table-column>
				<el-table-column label="主叫号码" align="center">
					<template slot-scope="scope">{{
						scope.row.activeNumber
					}}</template>
				</el-table-column>
				<el-table-column label="被叫号码" align="center">
					<template slot-scope="scope">{{
						scope.row.passiveNumber
					}}</template>
				</el-table-column>
				<el-table-column label="原IP地址" align="center">
					<template slot-scope="scope">{{
						scope.row.IPAddress
					}}</template>
				</el-table-column>
				<el-table-column label="原被叫号码" align="center">
					<template slot-scope="scope">{{
						scope.row.beforePassiveNumber
					}}</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							@click="handleAudition(scope.$index, scope.row)"
							>试听</el-button
						>
						<el-button
							type="text"
							@click="handleTransmit(scope.$index, scope.row)"
							>播音</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-button type="primary" @click="download">下载</el-button>
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

		<el-dialog title="试听" :visible.sync="auditionVisible">
			<el-table :data="dialogData" border>
				<el-table-column label="开始时间" align="center">
					<template slot-scope="scope">{{
						scope.row.startTime
					}}</template>
				</el-table-column>
				<el-table-column label="结束时间" align="center">
					<template slot-scope="scope">{{
						scope.row.endTime
					}}</template>
				</el-table-column>
				<el-table-column label="时长" align="center">
					<template slot-scope="scope">{{
						scope.row.duration
					}}</template>
				</el-table-column>
				<el-table-column label="主叫号码" align="center">
					<template slot-scope="scope">{{
						scope.row.activeNumber
					}}</template>
				</el-table-column>
				<el-table-column label="被叫号码" align="center">
					<template slot-scope="scope">{{
						scope.row.passiveNumber
					}}</template>
				</el-table-column>
				<el-table-column label="原IP地址" align="center">
					<template slot-scope="scope">{{
						scope.row.IPAddress
					}}</template>
				</el-table-column>
				<el-table-column label="原被叫号码" align="center">
					<template slot-scope="scope">{{
						scope.row.beforePassiveNumber
					}}</template>
				</el-table-column>
			</el-table>
			<div class="audio">
				<audio :src="audioSrc" controls v-if="auditionVisible"></audio>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="danger" @click="deleteMessage"
					>删除此条信息</el-button
				>
				<el-button type="primary" @click="auditionVisible = false"
					>关闭</el-button
				>
			</div>
		</el-dialog>

		<el-dialog title="播音" :visible.sync="transmitVisible">
			<el-table :data="dialogData" border>
				<el-table-column label="开始时间" align="center">
					<template slot-scope="scope">{{
						scope.row.startTime
					}}</template>
				</el-table-column>
				<el-table-column label="结束时间" align="center">
					<template slot-scope="scope">{{
						scope.row.endTime
					}}</template>
				</el-table-column>
				<el-table-column label="时长" align="center">
					<template slot-scope="scope">{{
						scope.row.duration
					}}</template>
				</el-table-column>
				<el-table-column label="主叫号码" align="center">
					<template slot-scope="scope">{{
						scope.row.activeNumber
					}}</template>
				</el-table-column>
				<el-table-column label="被叫号码" align="center">
					<template slot-scope="scope">{{
						scope.row.passiveNumber
					}}</template>
				</el-table-column>
				<el-table-column label="原IP地址" align="center">
					<template slot-scope="scope">{{
						scope.row.IPAddress
					}}</template>
				</el-table-column>
				<el-table-column label="原被叫号码" align="center">
					<template slot-scope="scope">{{
						scope.row.beforePassiveNumber
					}}</template>
				</el-table-column>
			</el-table>
			<div>
				<el-input></el-input>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="danger" @click="deleteMessage"
					>删除此条信息</el-button
				>
				<el-button type="primary" @click="transmitVisible = false"
					>关闭</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { fetchData, queryTable, getRMSData, deleteData } from "../api/index";
import { BASE_URL } from "../utils/request";
import JSZip from "jszip";
import FileSaver from "file-saver";
export default {
	data() {
		return {
			callerNumber: "",
			calledNumber: "",
			beforeIPAddress: "",
			value: "",
			audioSrc: "",
			transferId: "",
			auditionVisible: false,
			transmitVisible: false,
			data: [],
			dialogData: [],
			multipleSelection: [],
			pageIndex: 1,
			pageSize: 10,
			pageSizes: [10, 15, 20, 25],
			pageTotal: 0,
			filterDuration: "",
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
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							);
							picker.$emit("pick", [start, end]);
						}
					},
					{
						text: "最近一个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 30
							);
							picker.$emit("pick", [start, end]);
						}
					},
					{
						text: "最近三个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 90
							);
							picker.$emit("pick", [start, end]);
						}
					}
				]
			},
			value2: []
			// value2: [
			// 	new Date(2019, 11, 27, 8, 5, 20),
			// 	new Date(2019, 11, 31, 17, 0, 30)
			// ]
		};
	},
	async created() {
		await this.getData();
	},
	watch: {},
	methods: {
		async getData() {
			let res = await getRMSData();
			console.log("TCL: getData -> res", res);

			this.data = res;
			this.getStartDate(this.data);
			this.getEndDate(this.data);
			this.getDuration(this.data);
			this.pageTotal = this.data.length;
		},

		getStartDate(array) {
			array.forEach(item => {
				return (item.startTime = this.handleDate(item.startTime));
			});
		},

		getEndDate(array) {
			array.forEach(item => {
				return (item.endTime = this.handleDate(item.endTime));
			});
		},

		getDuration(array) {
			array.forEach(item => {
				return (item.duration = this.handleDuration(item.duration));
			});
		},

		handleDuration(mss) {
			let hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60));
			let minutes = parseInt((mss % (60 * 60)) / 60);
			let seconds = (mss % 60) / 1;

			hours = hours < 10 ? "0" + hours : hours;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			return hours + ":" + minutes + ":" + seconds;
		},

		handleDate(obj) {
			let date = new Date(+obj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let Y = date.getFullYear() + "-";
			let M =
				(date.getMonth() + 1 < 10
					? "0" + (date.getMonth() + 1)
					: date.getMonth() + 1) + "-";
			let D =
				(date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
				" ";
			let h =
				(date.getHours() < 10
					? "0" + date.getHours()
					: date.getHours()) + ":";
			let m =
				(date.getMinutes() < 10
					? "0" + date.getMinutes()
					: date.getMinutes()) + ":";
			let s =
				date.getSeconds() < 10
					? "0" + date.getSeconds()
					: date.getSeconds();
			return Y + M + D + h + m + s;
		},

		//分页
		handlePageChange(val) {
			this.pageIndex = val;
		},
		handleSizeChange(val) {
			this.pageSize = val;
		},

		//多选
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},

		filterDurations(transferObject) {
			if (
				(this.value && !this.filterDuration) ||
				(!this.value && !this.filterDuration)
			) {
				delete transferObject.duration;
			}
			if (!this.value && this.filterDuration) {
				delete transferObject.duration;
				return alert("请选择<>=");
			}
			if (this.value && this.filterDuration) {
				console.log(
					"TCL: filterDurations -> this.filterDuration",
					this.value,
					this.filterDuration
				);
				switch (this.value) {
					case "lessthan":
						transferObject.duration = { $lt: +this.filterDuration };
						break;
					case "greaterthan":
						transferObject.duration = { $gt: +this.filterDuration };
						break;
					case "equal":
						transferObject.duration = { $eq: +this.filterDuration };
						break;
					default:
						break;
				}
			}
		},

		filterDate(transferObject) {
			if (this.value2 == null || this.value2.length == 0) {
				delete transferObject.startTime;
				delete transferObject.endTime;
				return;
			}

			if (this.value2.length) {
				transferObject.startTime = { $gte: Date.parse(this.value2[0]) };
				transferObject.endTime = { $lte: Date.parse(this.value2[1]) };
			}
		},

		filterInput(transferObject) {
			if (!this.callerNumber) {
				delete transferObject.activeNumber;
			}
			if (!this.calledNumber) {
				delete transferObject.passiveNumber;
			}
			if (!this.beforeIPAddress) {
				delete transferObject.IPAddress;
			}
		},

		async filterData() {
			let transferObject = {
				activeNumber: this.callerNumber,
				passiveNumber: this.calledNumber,
				IPAddress: this.beforeIPAddress,
				duration: {},
				startTime: {},
				endTime: {}
			};
			this.filterDurations(transferObject);
			this.filterDate(transferObject);
			this.filterInput(transferObject);

			const { data } = await queryTable(transferObject);
			this.data = data;
			this.getStartDate(this.data);
			this.getEndDate(this.data);
			this.getDuration(this.data);
			this.pageTotal = this.data.length;
		},

		//操作
		handleAudition(index, row) {
			this.dialogData = [];
			this.transferId = row._id;
			this.auditionVisible = true;
			this.dialogData.push(row);
			this.audioSrc = BASE_URL + row.recordingFile;
		},

		handleTransmit(index, row) {
			console.log("TCL: handleTransmit -> row", row);
			this.dialogData = [];
			this.transferId = row._id;
			this.transmitVisible = true;
			this.dialogData.push(row);
		},

		isFloat(n) {
			return n % 1 !== 0;
		},

		async deleteMessage() {
			const { data } = await deleteData(this.transferId);
			this.data = data;

			console.log("TCL: deleteMessage -> this.pageIndex", this.pageIndex);
			this.getStartDate(this.data);
			this.getEndDate(this.data);
			this.getDuration(this.data);
			this.pageTotal = this.data.length;
			if (!this.isFloat(this.data.length / this.pageSize)) {
				this.pageIndex = this.pageIndex - 1;
			}
			this.auditionVisible = false;
		},

		//下载
		download() {
			const getFile = url => {
				return new Promise((resolve, reject) => {
					this.$http({
						method: "get",
						url,
						responseType: "arraybuffer"
					})
						.then(data => {
							resolve(data.data);
						})
						.catch(error => {
							reject(error.toString());
						});
				});
			};
			const data = [];
			this.multipleSelection.forEach(item =>
				data.push(BASE_URL + item.recordingFile)
			);
			console.log("TCL: download -> data", data);
			const zip = new JSZip();
			const cache = {};
			const promises = [];
			data.forEach(item => {
				const promise = getFile(item).then(data => {
					const arr_name = item.split("/");
					const file_name = arr_name[arr_name.length - 1];
					zip.file(file_name, data, { binary: true });
					cache[file_name] = data;
				});
				promises.push(promise);
			});

			Promise.all(promises).then(() => {
				zip.generateAsync({ type: "blob" }).then(content => {
					FileSaver.saveAs(content, "录音文件.zip");
				});
			});
		}
	}
};
</script>

<style>
.handle-box {
	margin-bottom: 20px;
}
.mr10 {
	margin-right: 10px;
}
.handle-input {
	width: 300px;
	display: inline-block;
}
.audio {
	padding: 20px 0 0 0;
	width: 350px;
}
</style>
