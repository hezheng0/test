<template>
	<div class="header">
		<div class="collapse-btn" @click="collapseChange">
			<i v-if="!collapse" class="el-icon-s-fold"></i>
			<i v-else class="el-icon-s-unfold"></i>
		</div>
		<div class="text">管理系统</div>
		<div class="header-right">
			<div class="header-user-con">
				<div class="btn-fullscreen" @click="handleFullScreen">
					<el-tooltip
						effect="dark"
						:content="fullscreen ? `取消全屏` : `全屏`"
						placement="bottom"
					>
						<i class="el-icon-rank"></i>
					</el-tooltip>
				</div>
				<div class="user-avator">
					<img src="../assets/img/cxk.jpg" />
				</div>
				<el-dropdown
					class="user-name"
					trigger="click"
					@command="handleCommand"
				>
					<span class="el-dropdown-link">
						{{ username }}
						<i class="el-icon-caret-bottom"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<a href="https://www.baidu.com" target="_blank">
							<el-dropdown-item>百度一下</el-dropdown-item>
						</a>
						<el-dropdown-item divided command="loginout"
							>退出登录</el-dropdown-item
						>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
import bus from "./bus";
export default {
	data() {
		return {
			fullscreen: false,
			name: "user",
			collapse: false
		};
	},
	computed: {
		username() {
			let username = localStorage.getItem("ms_username");
			return username ? username : this.name;
		}
	},
	methods: {
		handleCommand(command) {
			if (command == "loginout") {
				localStorage.removeItem("ms_username");
				this.$router.push("/");
			}
		},
		handleFullScreen() {
			let element = document.documentElement;
			if (this.fullscreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullScreen) {
					document.mozCancelFullScreen();
				}
			} else {
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.webkitCancelFullScreen) {
					element.webkitCancelFullScreen();
				} else if (element.mozCancelFullScreen) {
					element.mozCancelFullScreen();
				} else if (element.msRequestFullscreen) {
					element.msRequestFullscreen();
				}
			}
			this.fullscreen = !this.fullscreen;
		},
		collapseChange() {
			this.collapse = !this.collapse;
			bus.$emit("collapse", this.collapse);
		}
	}
};
</script>

<style>
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	font-size: 22px;
	color: #fff;
}
.collapse-btn {
	float: left;
	padding: 0 21px;
	cursor: pointer;
	line-height: 70px;
}
.header .text {
	float: left;
	width: 250px;
	line-height: 70px;
}
.header-right {
	float: right;
	padding-right: 50px;
}
.header-user-con {
	display: flex;
	height: 70px;
	align-items: center;
}
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	top: 6px;
}
.user-name {
	margin-left: 10px;
}
.user-avator {
	margin-left: 20px;
}
.user-avator img {
	display: block;
	width: 40px;
	height: 40px;
	margin-top: 40px;
	margin-left: 69px;
	border-radius: 50%;
}
.el-dropdown-link {
	color: #fff;
	cursor: pointer;
}
.el-dropdown-menu__item {
	text-align: center;
}
</style>
