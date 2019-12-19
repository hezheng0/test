<template>
  <el-row>
    <el-col>
      <el-table :data="timeTable" :span-method="timeTableMethod" border>
        <el-table-column type="index" label="节次/时间" width="120"></el-table-column>
        <el-table-column prop="monday" label="星期一" width="200"></el-table-column>
        <el-table-column prop="tuesday" label="星期二" width="200"></el-table-column>
        <el-table-column prop="wednesday" label="星期三" width="200"></el-table-column>
        <el-table-column prop="thursday" label="星期四" width="200"></el-table-column>
        <el-table-column prop="friday" label="星期五" width="200"></el-table-column>
        <el-table-column prop="schedule" label="时间表" width="250"></el-table-column>
        <el-table-column label="当前课程">
          <template>
            <div>
              <el-button type="primary" @click="current()">当前课程</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      timeTable: [
        {
          monday: "单片机原理与应用  王雁平  实验室8304",
          tuesday: "电力电子技术   关健 8403",
          wednesday: "计算机控制技术     曹美媛 8403",
          thursday: "电力电子技术   关健 8403",
          friday: "",
          schedule: "第一节课8:10~8:55"
        },
        {
          monday: "单片机原理与应用  王雁平   实验室8304",
          tuesday: "电力电子技术   关健 8403",
          wednesday: "计算机控制技术     曹美媛 8403",
          thursday: "电力电子技术   关健 8403",
          friday: "",
          schedule: "第二节课9:05~9:50"
        },
        {
          monday: "电机与拖动   谷红霞 8403",
          tuesday: "嵌入式系统及应用    张晓亚 8403",
          wednesday: "单片机原理与应用  王雁平 8403",
          thursday: "电机与拖动   谷红霞 8403",
          friday: "",
          schedule: "第三节课10:20~11:05"
        },
        {
          monday: "电机与拖动   谷红霞 8403",
          tuesday: "嵌入式系统及应用    张晓亚 8403",
          wednesday: "单片机原理与应用  王雁平 8403",
          thursday: "电机与拖动   谷红霞 8403",
          friday: "",
          schedule: "第四节课11:15~12:00"
        },
        {
          monday: "计算机控制技术     曹美媛 8403",
          tuesday: "",
          wednesday: "现代控制理论   陈新欣 8403",
          thursday: "嵌入式系统及应用（单周）    张晓亚   实验室8305",
          friday: "",
          schedule: "第五节课14:30~15:15"
        },
        {
          monday: "计算机控制技术     曹美媛 8403",
          tuesday: "",
          wednesday: "现代控制理论   陈新欣 8403",
          thursday: "嵌入式系统及应用（单周）    张晓亚   实验室8305",
          friday: "",
          schedule: "第六节课15:25~16:10"
        }
      ]
    };
  },
  methods: {
    timeTableMethod({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4 ||
        columnIndex === 5
      ) {
        if (
          rowIndex === 0 ||
          rowIndex === 2 ||
          rowIndex === 4 ||
          rowIndex === 6 ||
          rowIndex === 8
        ) {
          return {
            colspan: 1,
            rowspan: 2
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex === 6) {
        if (
          rowIndex === 0 ||
          rowIndex === 2 ||
          rowIndex === 4 ||
          rowIndex === 6 ||
          rowIndex === 8
        ) {
          return {
            colspan: 1,
            rowspan: 1
          };
        }
      }
      if (columnIndex === 7) {
        if (
          rowIndex === 0 ||
          rowIndex === 2 ||
          rowIndex === 4 ||
          rowIndex === 6 ||
          rowIndex === 8
        ) {
          return {
            colspan: 2,
            rowspan: 8
          };
        }
      }
    },
    current() {
      const da = new Date();
      const day = da.getDate();
      const hour = da.getHours();
      const minute = da.getMinutes();
      if (minute < 10) {
        this.minute = "0" + minute.toString();
      }
      const week = da.getDay();
      const time = hour * 100 + minute;
      console.log(time);

      if (week == 2) {
        if (time >= 1200) {
          alert("星期二~下午休息！");
        } else if (time < 810) {
          alert("还没到上课时间");
        } else if (time >= 810 && time < 855) {
          let index = 0;
          alert(this.timeTable[index].tuesday);
        } else if (time >= 905 && time < 950) {
          let index = 1;
          alert(this.timeTable[index].tuesday);
        } else if (time >= 1020 && time < 1105) {
          let index = 2;
          alert(this.timeTable[index].tuesday);
        } else if (time >= 1115 && time < 1200) {
          let index = 3;
          alert(this.timeTable[index].tuesday);
        } else {
          alert("课间休息ing");
        }
      }
      if (week == 1) {
        if (time >= 1810) {
          alert("放学了！");
        } else if (time < 810) {
          alert("还没到上课时间");
        } else if (time >= 810 && time < 855) {
          let index = 0;
          alert(this.timeTable[index].monday);
        } else if (time >= 905 && time < 950) {
          let index = 1;
          alert(this.timeTable[index].monday);
        } else if (time >= 1020 && time < 1105) {
          let index = 2;
          alert(this.timeTable[index].monday);
        } else if (time >= 1115 && time < 1200) {
          let index = 3;
          alert(this.timeTable[index].monday);
        } else if (time >= 1430 && time < 1515) {
          let index = 4;
          alert(this.timeTable[index].monday);
        } else if (time >= 1525 && time < 1610) {
          let index = 5;
          alert(this.timeTable[index].monday);
        } else if (time >= 1630 && time < 1715) {
          let index = 6;
          alert(this.timeTable[index].monday);
        } else if (time >= 1725 && time < 1810) {
          let index = 7;
          alert(this.timeTable[index].monday);
        } else {
          alert("课间休息ing");
        }
      }
      if (week == 3) {
        if (time >= 1810) {
          alert("放学了！");
        } else if (time < 810) {
          alert("还没到上课时间");
        } else if (time >= 810 && time < 855) {
          let index = 0;
          alert(this.timeTable[index].wednesday);
        } else if (time >= 905 && time < 950) {
          let index = 1;
          alert(this.timeTable[index].wednesday);
        } else if (time >= 1020 && time < 1105) {
          let index = 2;
          alert(this.timeTable[index].wednesday);
        } else if (time >= 1115 && time < 1200) {
          let index = 3;
          alert(this.timeTable[index].wednesday);
        } else if (time >= 1430 && time < 1515) {
          let index = 4;
          alert(this.timeTable[index].wednesday);
        } else if (time >= 1525 && time < 1610) {
          let index = 5;
          alert(this.timeTable[index].wednesday);
        } else if (time >= 1630 && time < 1715) {
          let index = 6;
          alert(this.timeTable[index].wednesday);
        } else if (time >= 1725 && time < 1810) {
          let index = 7;
          alert(this.timeTable[index].wednesday);
        } else {
          alert("课间休息ing");
        }
      }
      if (week == 4) {
        if (time >= 1810) {
          alert("放学了！");
        } else if (time < 810) {
          alert("还没到上课时间");
        } else if (time >= 810 && time < 855) {
          let index = 0;
          alert(this.timeTable[index].thursday);
        } else if (time >= 905 && time < 950) {
          let index = 1;
          alert(this.timeTable[index].thursday);
        } else if (time >= 1020 && time < 1105) {
          let index = 2;
          alert(this.timeTable[index].thursday);
        } else if (time >= 1115 && time < 1200) {
          let index = 3;
          alert(this.timeTable[index].thursday);
        } else if (time >= 1430 && time < 1515) {
          let index = 4;
          alert(this.timeTable[index].thursday);
        } else if (time >= 1525 && time < 1610) {
          let index = 5;
          alert(this.timeTable[index].thursday);
        } else {
          alert("课间休息ing");
        }
      }
      if (week == 5) {
        alert("没有补课的话就放假了！");
      }
    }
  }
};
</script>

<style>
</style>