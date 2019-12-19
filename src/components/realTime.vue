<template>
  <div>
    <transition name="el-fade-in">
      <h1 v-if="show">{{ now | dataFormat('HH:mm:ss')}}</h1>
    </transition>
    <transition name="el-fade-in">
      <div v-if="show" id="date-div">
        <span id="date">{{now | dataFormat('YYYY-MM-DD')}}</span>
        <span id="week">{{now | dataFormat('dddd')}}</span>
      </div>
    </transition>
    <div @click="goBack">
      <el-button type="primary" icon="el-icon-arrow-left" @click="goBack">返回上一层</el-button>
    </div>
  </div>
</template>

<script>
import { clearInterval, setInterval } from "timers";
import navigationButton from "./navigation-button";
export default {
  name: "realTime",
  props: {},
  data() {
    return { now: new Date(), show: false };
  },
  mounted() {
    this.show = true;
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.now = new Date();
      }, 1000);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    week() {
      return `星期${"日一二三四五六".charAt(this.now.getDay())}`;
    }
  },
  components: {
    navigationButton
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style>
#realTime {
  position: absolute;
  top: 10px;
  left: 100px;
  display: flex;
  align-content: center;
  align-items: center;
}
#realTime h1 {
  text-align: left;
  width: 160px;
  font-size: 2.375rem;
  font-weight: normal;
  letter-spacing: 1px;
}
#date-div {
  display: inline-flex;
  justify-content: center;
  flex-flow: column nowrap;
  padding: 10px;
}
#date {
  color: rgb(50, 178, 250);
  font-size: 1.1rem;
}
#week {
  color: #4611cc;
  font-size: 0.7rem;
}
</style>