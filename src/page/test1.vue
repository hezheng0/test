<template>
	<div>
		<el-button @click="getElement">获取元素内容</el-button>
		<h1 ref="myh1">这个一个标题</h1>
		<test2 ref="myh5"></test2>
	</div>
</template>

<script>
import test2 from "../page/test2";
export default {
	data() {
		return {
			message: "通过父组件的ref取到的"
		};
	},
	components: { test2 },
	methods: {
		getElement() {
			console.log(this.$refs.myh1);
			console.log(this.$refs.myh5);
		}
	}
};
</script>

<style></style>
