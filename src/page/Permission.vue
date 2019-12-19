<template>
  <div>
    <div class="container">
      <h1>权限界面</h1>
      <p>只有用了初始admin账号登录才能进去的界面，其他账号进来显示403界面</p>
      <p>在main中设置了beforeEach</p>
      <p>
        可以在
        <router-link to="/login" class="logout">登录界面</router-link>上换个账号试试
      </p>
    </div>
  </div>
</template>

<script>
import headerTop from "../components/headerTop";
export default {
  data() {
    return {};
  },
  components: {
    headerTop
  }
};
</script>

<style>
h1 {
  text-align: center;
  margin: 30px 0;
}
p {
  line-height: 30px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.logout {
  color: cyan;
}
</style>
