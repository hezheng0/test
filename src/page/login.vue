<template>
	<div class="login-page">
		<div class="ms-login">
			<div class="manage-tip">
				Let do it
			</div>
			<el-form
				:model="param"
				:rules="rules"
				ref="login"
				label-width="0px"
				class="ms-content"
			>
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="账号">
						<el-button
							slot="prepend"
							icon="el-icon-user-solid"
						></el-button>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						type="password"
						placeholder="密码"
						v-model="param.password"
						@keyup.enter.native="submitForm"
					>
						<el-button
							slot="prepend"
							icon="el-icon-lock"
						></el-button>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm"
						>登录</el-button
					>
				</div>
			</el-form>
			<p class="tip">温馨提示：</p>
			<p class="tip">初始用户为管理员</p>
			<p class="tip">也可自行登录！</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			param: {
				username: "admin",
				password: "admin"
			},
			rules: {
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" }
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" }
				]
			}
		};
	},
	methods: {
		submitForm() {
			console.log(this.$refs.login.model);

			this.$refs.login.validate(valid => {
				if (valid) {
					this.$message.success("登录成功");
					localStorage.setItem("ms_username", this.param.username);
					this.$router.push("/home");
				} else {
					this.$message.error("请输入账号密码");
					console.log("error submit!");
					return false;
				}
			});
		}
	}
};
</script>

<style scoped>
.login-page {
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url("../assets/img/login-bg.jpg");
	background-size: 100%;
}
.manage-tip {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}
.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 10px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}
.ms-content {
	padding: 30px 30px;
}
.login-btn {
	text-align: center;
}
.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}
.tip {
	color: aqua;
	font-size: 20px;
	text-align: center;
	line-height: 30px;
}
</style>
