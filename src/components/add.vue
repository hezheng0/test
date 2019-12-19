<template>
  <div id="add" class="flip">
    <el-button @click="add">add</el-button>
    <el-button @click="remove">remove</el-button>
    <el-button @click="shuffle">shuffle</el-button>
    <transition-group name="flip-list" tag="ul" mode="in-out">
      <li v-for="item in items" :key="item" class="flip-list-item">{{item}}</li>
    </transition-group>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return { items: [1, 2, 3, 4, 5, 6, 7, 8], nextNum: 9 };
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length);
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove() {
      this.items.splice(this.randomIndex(), 1);
    },
    shuffle() {
      this.items = _.shuffle(this.items);
    }
  }
};
</script>

<style>
.flip-list-item {
  list-style-type: none;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s;
}
.flip-list-move {
  transition: all 1s;
}
.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
.flip-list-leave-active {
  position: absolute;
}
</style>