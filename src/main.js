// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import moment from "moment";
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/moment";
import echarts from "echarts";
import axios from "axios";

Vue.use(ElementUI);
Vue.use(moment);
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | kechengbiao`;
	const role = localStorage.getItem("ms_username");
	if (!role && to.path !== "/login") {
		next("/login");
	} else if (to.meta.permission) {
		role === "admin" ? next() : next("/403");
	} else {
		next();
	}
});

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	components: { App },
	template: "<App/>"
});
