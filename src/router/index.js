import Vue from "vue";
import Router from "vue-router";
// import todoList from "../components/todoList";
// import realTime from "../components/realTime";
// import kechengbiao from "../components/kechengbiao";
import login from "../page/login";
import home from "../page/home";
import allTodo from "../page/allTodo";
import form from "../page/form";
import permission from "../page/Permission";
import basic from "../components/basic";
import fourothree from "../page/403";
import fourofour from "../page/404";
import messages from "../page/messages";
import schedule from "../components/classSchedule";
import table from "../page/table";
import test from "../page/test1";
import callTest from "../page/callTest";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return originalPush.call(this, location, onResolve, onReject);
	return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			component: login,
			meta: { title: "登录" }
		},
		{
			path: "/",
			component: basic,
			meta: { title: "zzz" },
			children: [
				{
					path: "/home",
					component: home,
					meta: { title: "首页" }
				},
				{
					path: "/permission",
					component: permission,
					meta: { title: "权限测试", permission: true }
				},
				{
					path: "/403",
					component: fourothree,
					meta: { title: "403" }
				},
				{
					path: "/messages",
					component: messages,
					meta: { title: "消息" }
				},
				{
					path: "/schedule",
					component: schedule,
					meta: { title: "课程表" }
				},
				{
					path: "/404",
					component: fourofour,
					meta: { title: "404" }
				},
				{
					path: "/table",
					component: table,
					meta: { title: "table实例" }
				},
				{
					path: "/form",
					component: form,
					meta: { title: "form实例" }
				},
				{
					path: "/test",
					component: test,
					meta: { title: "测试demo" }
				},
				{
					path: "/callTest",
					component: callTest,
					meta: { title: "拨号盘测试" }
				}
			]
		},
		{
			path: "/login",
			component: login,
			meta: { title: "登录" }
		}
	]
});
