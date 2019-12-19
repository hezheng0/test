<template>
	<div>
		<div class="container">
			<el-tabs v-model="message">
				<el-tab-pane :label="`未读消息(${unread.length})`" name="first">
					<el-table
						:data="unread"
						:show-header="false"
						style="width:100%"
					>
						<el-table-column>
							<template slot-scope="scope">
								<span class="message-title">{{
									scope.row.title
								}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="date"
							width="150"
						></el-table-column>
						<el-table-column width="120">
							<template slot-scope="scope">
								<el-button
									type="danger"
									@click="handleRead(scope.$index)"
									>标记已读</el-button
								>
							</template>
						</el-table-column>
					</el-table>
					<div class="handle-row">
						<el-button type="primary" @click="allRead"
							>全部标记已读</el-button
						>
					</div>
				</el-tab-pane>
				<el-tab-pane :label="`已读消息(${read.length})`" name="second">
					<template v-if="message === 'second'">
						<el-table
							:data="read"
							:show-header="false"
							style="width:100%"
						>
							<el-table-column>
								<template slot-scope="scope">
									<span class="message-title">{{
										scope.row.title
									}}</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="date"
								width="150"
							></el-table-column>
							<el-table-column width="120">
								<template slot-scope="scope">
									<el-button
										type="danger"
										@click="handleDel(scope.$index)"
										>删除</el-button
									>
								</template>
							</el-table-column>
						</el-table>
						<div class="handle-row">
							<el-button type="danger" @click="delAll"
								>删除全部</el-button
							>
						</div>
					</template>
				</el-tab-pane>
				<el-tab-pane :label="`回收站(${recycle.length})`" name="third">
					<template v-if="message === 'third'">
						<el-table
							:data="recycle"
							:show-header="false"
							style="width:100%"
						>
							<el-table-column>
								<template slot-scope="scope">
									<span class="message-title">{{
										scope.row.title
									}}</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="date"
								width="150"
							></el-table-column>
							<el-table-column width="120">
								<template slot-scope="scope">
									<el-button
										@click="handleRestore(scope.$index)"
										>还原</el-button
									>
								</template>
							</el-table-column>
						</el-table>
						<div class="handle-row">
							<el-button type="danger">清空回收站</el-button>
						</div>
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	name: "tabs",
	data() {
		return {
			message: "first",
			showHeader: false,
			unread: [
				{ date: "2019-11-30 15:00", title: "完成message界面1" },
				{ date: "2019-11-30 16:00", title: "完成message界面2" }
			],
			read: [
				{ date: "2019-11-30 16:00", title: "test1" },
				{ date: "2019-11-29 15:00", title: "test2" }
			],
			recycle: [{ date: "2020-11-20 23:59", title: "recycle1" }]
		};
	},
	methods: {
		handleRead(index) {
			const item = this.unread.splice(index, 1);
			this.read = item.concat(this.read);
		},
		handleDel(index) {
			const item = this.read.splice(index, 1);
			this.recycle = item.concat(this.recycle);
		},
		handleRead(index) {
			const item = this.recycle.splice(index, 1);
			this.read = item.concat(this.read);
		},
		allRead() {
			const length = this.unread.length;
			const item = this.unread.splice(0, length);
			this.read = item.concat(this.read);
		},
		delAll() {
			const length = this.read.length;
			const item = this.read.splice(0, length);
			this.recycle = item.concat(this.recycle);
		},
		emptyRecycle() {
			const length = this.recycle.length;
			this.recycle = this.recycle.splice(0, length);
		},
		handleRestore(index) {
			console.log(index);
			const item = this.recycle.splice(index, 1);
			this.read = item.concat(this.read);
		}
	}
};
</script>

<style>
.message-title {
	cursor: pointer;
}
.handle-row {
	margin-top: 30px;
}
</style>
