<template>
	<div class="bohaopan">
		<el-row>
			<el-col :span="8">
				<div class="input">
					<el-input
						v-model="callNumber"
						clearable
						class="center"
						placeholder="请输入您要拨号的号码"
					></el-input>
				</div>

				<div class="container">
					<el-button @click="enterNumber1" class="enterNumber1"
						>1</el-button
					>
					<el-button @click="enterNumber2">2</el-button>
					<el-button @click="enterNumber3">3</el-button>
					<el-button @click="enterNumber4">4</el-button>
					<el-button @click="enterNumber5">5</el-button>
					<el-button @click="enterNumber6">6</el-button>
					<el-button @click="enterNumber7">7</el-button>
					<el-button @click="enterNumber8">8</el-button>
					<el-button @click="enterNumber9">9</el-button>
					<el-button @click="enterNumberstar" class="enterNumberstar"
						>*</el-button
					>
					<el-button @click="enterNumber0">0</el-button>
					<el-button @click="enterNumberwell">#</el-button>
					<el-button
						type="primary"
						icon="el-icon-phone"
						class="callButton"
						@click="calling"
						>拨打</el-button
					>
				</div>
			</el-col>

			<el-col :span="8">
				<el-card shadow="hover" style="530px">
					<el-button type="primary" @click="dialogVisible = true"
						>添加联系人</el-button
					>
					<el-button type="danger" @click="removeCont"
						>移除联系人</el-button
					>
					<el-button type="primary" @click="callListCont"
						>拨打联系人列表</el-button
					>
				</el-card>
			</el-col>
		</el-row>

		<div class="listView">
			<el-row>
				<div v-for="(item, index) in callList" :key="index">
					<el-col :span="4">
						<div class="container">
							<img
								src="../assets/img/headPortrait.png"
								class="phoneList-avator"
								alt
							/>
							<h5 class="listclass">
								联系人名字:{{ item.name }}
							</h5>
							<h5 class="listclass">
								联系人电话:{{ item.phoneNumber }}
							</h5>
							<el-checkbox
								v-model="item.isChecked"
								class="listclass"
								>选择连接</el-checkbox
							>
							<el-button
								v-show="isChosen"
								type="danger"
								@click="removeSomeOne(index)"
								>123</el-button
							>
						</div>
					</el-col>
				</div>
			</el-row>
		</div>

		<el-dialog title="联系人信息" :visible.sync="dialogVisible">
			<el-form :model="form">
				<el-form-item label="联系人名字">
					<el-input
						v-model="form.name"
						placeholder="请输入名字"
					></el-input>
				</el-form-item>
				<el-form-item label="联系人号码">
					<el-input
						v-model="form.phoneNumber"
						placeholder="请输入号码"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="diglog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addContact">添 加</el-button>
			</div>
		</el-dialog>

		<el-dialog title="calling" :visible.sync="toCall">
			<span v-for="item in chosenList">正在拨打{{ item }}...</span>
			<div slot="footer" class="diglog-footer">
				<el-button @click="hangUp">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			callNumber: "",
			dialogVisible: false,
			toCall: false,
			chosenList: [],
			form: {
				name: "",
				phoneNumber: ""
			},
			callList: [
				{ name: "Edison", phoneNumber: "111" },
				{ name: "Eason", phoneNumber: "222" },
				{ name: "Joey", phoneNumber: "333" },
				{ name: "Andy", phoneNumber: "444" },
				{ name: "Pakho", phoneNumber: "555" },
				{ name: "sammi", phoneNumber: "666" }
			],
			isChosen: false
		};
	},
	methods: {
		enterNumber1() {
			this.callNumber = this.callNumber.concat("1");
		},
		enterNumber2() {
			this.callNumber = this.callNumber.concat("2");
		},
		enterNumber3() {
			this.callNumber = this.callNumber.concat("3");
		},
		enterNumber4() {
			this.callNumber = this.callNumber.concat("4");
		},
		enterNumber5() {
			this.callNumber = this.callNumber.concat("5");
		},
		enterNumber6() {
			this.callNumber = this.callNumber.concat("6");
		},
		enterNumber7() {
			this.callNumber = this.callNumber.concat("7");
		},
		enterNumber8() {
			this.callNumber = this.callNumber.concat("8");
		},
		enterNumber9() {
			this.callNumber = this.callNumber.concat("9");
		},
		enterNumberwell() {
			this.callNumber = this.callNumber.concat("#");
		},
		enterNumberstar() {
			this.callNumber = this.callNumber.concat("*");
		},
		enterNumber0() {
			this.callNumber = this.callNumber.concat("0");
		},
		calling() {
			if (this.callNumber.length !== 0) {
				console.log(this.callNumber);
				this.chosenList.push(this.callNumber);
				this.toCall = true;
				this.callNumber = "";
			} else {
				alert("请输入正确的号码!!");
			}
		},
		removeCont() {
			this.isChosen = !this.isChosen;
			console.log("TCL: removeCont -> this.isChosen", this.isChosen);
		},
		removeSomeOne(index) {
			console.log(index);
			this.callList.splice(index, 1);
			return this.callList;
		},
		addContact() {
			this.callList.push({
				name: this.form.name,
				phoneNumber: this.form.phoneNumber
			});
			this.dialogVisible = false;
		},
		callListCont() {
			this.callList.forEach(item => {
				if (item.isChecked) {
					this.chosenList.push(item.name);
					console.log(
						"TCL: callListCont -> chosenList",
						this.chosenList
					);
				}
			});
			this.toCall = true;
		},
		hangUp() {
			this.toCall = false;
			this.chosenList = [];
		}
	}
};
</script>

<style>
.input {
	width: 261px;
	text-align: center;
}
.input .el-input--suffix .el-input__inner {
	text-align: center;
}
.bohaopan .container {
	width: 200px;
}
.listView .container {
	width: 200px;
}
.enterNumber1 {
	margin-left: 10px;
}
.enterNumberstar {
	width: 49.8px;
}
.callButton {
	margin: 8px 10px 0 50px;
}
.el-button {
	margin-bottom: 5px;
}
.listView .phoneList-avator {
	margin-left: 60px;
	margin-bottom: 10px;
}
.listView .listclass {
	text-align: center;
	margin-bottom: 10px;
}
</style>
