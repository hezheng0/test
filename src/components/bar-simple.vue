<template>
    <div>
        <div id="chart-bar-example"></div>
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
            document.getElementById("chart-bar-example")
        );
        let option = {
            title: {
                text: "柱状图实例"
            },
            color: ["#a14545"],
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
                    data: [
                        "1月",
                        "2月",
                        "3月",
                        "4月",
                        "5月",
                        "6月",
                        "7月",
                        "8月",
                        "9月",
                        "10月",
                        "11月",
                        "12月"
                    ],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            legend: {
                show: true
            },
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: "每月花费",
                    type: "bar",
                    barWidth: "60%",
                    data: [
                        941,
                        1000,
                        2100,
                        789,
                        314,
                        4564,
                        1237,
                        1500,
                        797,
                        1200,
                        416,
                        741
                    ]
                }
            ]
        };
        myEchart.setOption(option);
    }
};
</script>

<style scoped>
#chart-bar-example {
    width: 100%;
    height: 500px;
    margin: 0 auto;
    left: 0%;
}
</style>
