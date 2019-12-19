import Vue from "vue";
import moment from "moment";
import "moment/locale/zh-cn";

Vue.filter("dataFormat", function filter(
  dateStr,
  pattern = "YYYY-MM-DD HH:mm:ss"
) {
  return moment(dateStr).format(pattern);
});
