import Vue from "vue";
import element from "element-ui";

Vue.use(element);

let aaaa = function(nums) {
    let ws = [[]];
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < ws.length; j++) {
            ws.push(ws[j].concat([nums[i]]));
        }
    }
    return ws;
};
