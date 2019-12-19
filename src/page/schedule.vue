<template>
  <div>
    <headerTop></headerTop>
    <div class="table-container">
      <classSchedule></classSchedule>
    </div>
  </div>
</template>

<script>
import headerTop from "../components/headerTop";
import classSchedule from "../components/classSchedule";
export default {
  components: {
    headerTop,
    classSchedule
  }
};
</script>

<style>
.table-container {
}
</style>
