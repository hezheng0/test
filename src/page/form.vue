<template>
	<div>
		<div class="container">
			<div class="form-box">
				<el-form
					:model="form"
					:rules="formRules"
					label-width="80px"
					ref="form"
				>
					<el-form-item label="名称" prop="name">
						<el-input
							v-model="form.name"
							placeholder="请输入名称"
						></el-input>
					</el-form-item>
					<el-form-item label="价格" prop="price">
						<el-input-number
							v-model="form.price"
							controls-position="right"
							:min="0"
						></el-input-number>
					</el-form-item>
					<el-form-item label="类别" prop="type">
						<el-select
							v-model="form.type"
							placeholder="请选择类别"
							clearable
						>
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.label"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="图片地址" prop="imgAddress">
						<el-input
							v-model="form.imgAddress"
							placeholder="请输入图片地址"
						></el-input>
					</el-form-item>
					<el-form-item label="详情" prop="info">
						<el-input
							type="textarea"
							v-model="form.info"
							placeholder="请输入产品详情"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit('form')"
							>产品提交</el-button
						>
						<el-button @click="reset('form')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchData } from "../api/index";
export default {
	name: "formTest",
	data() {
		return {
			options: [],
			form: {
				name: "",
				price: "",
				type: "",
				imgAddress: "",
				info: ""
			},
			formRules: {
				name: [
					{ required: true, message: "请输入名称", trigger: "blur" },
					{ min: 2, message: "名称要多于两个字符", trigger: "blur" }
				],
				price: [
					{ required: true, message: "价格不能为空" },
					{ type: "number", message: "价格必须为数字" }
				],
				type: [
					{ required: true, message: "请选择类别", trigger: "change" }
				],
				imgAddress: [
					{
						required: true,
						message: "请输入图片地址",
						trigger: "blur"
					}
				],
				info: [
					{
						required: true,
						message: "请输入产品详情",
						trigger: "blur"
					}
				]
			}
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getData() {
			fetchData(this.query).then(res => {
				console.log("TCL: getData -> res", res);
				this.options = res.typeList;
				console.log("TCL: getData -> options", this.options);
			});
		},
		submit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let params = JSON.stringify(this.form);
					console.log("TCL: submit -> params", params);
					console.log(this.$refs.form.model);
					this.$router.push({
						path: "/table",
						query: { id: this.params }
					});
				} else {
					console.log("error");
					return false;
				}
			});
		},
		reset() {
			this.$refs.form.resetFields();
			console.log("重置完成");
		}
	}
};
</script>

<style></style>
