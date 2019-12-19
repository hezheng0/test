<template>
  <div id="dynamic-fade-demo" class="demo">
    Fade In:
    <el-slider v-model="fadeInDuration" min="0" :max="maxFadeDuration"></el-slider>Fade Out:
    <el-slider v-model="fadeOutDuration" min="0" :max="maxFadeDuration"></el-slider>
    <transition :css="false" @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
      <p v-if="show">hello</p>
    </transition>
    <el-button v-if="stop" @click="show = false;stop = false">start animating</el-button>
    <el-button v-else @click="stop = true">stop it!</el-button>
  </div>
</template>

<script>
export default {
  data: {
    show: true,
    fadeInDuration: 1000,
    fadeOutDuration: 1000,
    maxFadeDuration: 1500,
    stop: true
  },
  mounted: {
    function() {
      this.show = false;
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    }
  }
};
</script>

<style>
</style>