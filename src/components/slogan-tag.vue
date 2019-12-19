<template>
  <div class="sloganTagView">
    <span class="sloganTagHightLight">{{ sloganItems[0].content}}</span>
    <marquee
      behavior="scroll"
      direction="right"
      scrollAmount="2"
      scrollDelay="0"
      align="middle"
      onMouseOut="this.start()"
      onMouseOver="this.stop()"
    >
      <span v-for="(item,index) in newSloganItems" :key="index" class="sloganTag">{{item.content}}</span>
    </marquee>
  </div>
</template>

<script>
export default {
  props: ["sloganItems"],
  computed: {
    newSloganItems() {
      return this.sloganItems.slice(1, this.sloganItems.length);
    }
  }
};
</script>

<style>
.sloganTagView {
  display: flex;
  align-content: center;
  align-items: center;
  width: 500px;
  height: 30px;
  border: solid 1px;
  border-color: #0000aa;
}
.sloganTagView span {
  letter-spacing: 2px;
}
.sloganTag {
  color: #abcd12;
  font-size: 18px;
  padding: 5px;
  background-color: blueviolet;
}
.sloganTagHightLight {
  width: 120px;
  color: #ff3c43;
  font-size: 21px;
  padding: 5px;
  background-color: rgba(0, 37, 107, 0.8);
}
</style>