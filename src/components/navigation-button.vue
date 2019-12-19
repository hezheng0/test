<template>
  <router-link class="natigationLink" :to="linkPath" :title="title">
    <slot>{{content}}</slot>
  </router-link>
</template>

<script>
export default {
  props: {
    linkPath: String,
    title: String,
    content: String
  }
};
</script>

<style>
</style>