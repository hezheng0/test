<template>
    <div>
        <div id="chart-line-example"></div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    data() {
        return {};
    },
    mounted() {
        let this_ = this;
        let myEchart = echarts.init(
            document.getElementById("chart-line-example")
        );
        let option = {
            title: {
                text: "折线图实例"
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                },
                confine: true
            },
            xAxis: [
                {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
                    boundaryGap: false
                }
            ],
            legend: {
                show: true,
                data: ["饮食", "娱乐", "教育", "交通", "日常"],
                left: "100"
            },
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: "饮食",
                    type: "line",
                    data: [94, 100, 200, 78, 314, 454, 337]
                },
                {
                    name: "娱乐",
                    type: "line",
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: "教育",
                    type: "line",
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: "交通",
                    type: "line",
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: "日常",
                    type: "line",
                    data: [320, 332, 301, 334, 390, 330, 320]
                }
            ]
        };
        myEchart.setOption(option);
    }
};
</script>

<style scoped>
#chart-line-example {
    width: 100%;
    height: 500px;
    margin: 0 auto;
    left: 0%;
}
</style>
