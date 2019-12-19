<template>
    <div>
        <div id="chart-radar-example"></div>
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
            document.getElementById("chart-radar-example")
        );
        let option = {
            title: {
                text: "雷达图实例"
            },
            tooltip: {
                confine: true
            },
            legend: {
                show: true,
                data: ["预算分配", "实际开销"]
            },
            radar: {
                name: {
                    textStyle: {
                        color: "#fff",
                        backgroundColor: "#c34",
                        borderRadius: 5,
                        padding: [5, 10]
                    }
                },
                indicator: [
                    { name: "饮食", max: 3000 },
                    { name: "娱乐", max: 2000 },
                    { name: "教育", max: 4000 },
                    { name: "交通", max: 500 },
                    { name: "日常", max: 3000 }
                ]
            },
            series: [
                {
                    type: "radar",
                    data: [
                        {
                            value: [2800, 1800, 3000, 300, 2000],
                            name: "预算分配"
                        },
                        {
                            value: [1800, 1500, 2756, 289, 2412],
                            name: "实际开销"
                        }
                    ]
                }
            ]
        };
        myEchart.setOption(option);
    }
};
</script>

<style scoped>
#chart-radar-example {
    width: 100%;
    height: 500px;
    margin: 0 auto;
    left: 0%;
}
</style>
