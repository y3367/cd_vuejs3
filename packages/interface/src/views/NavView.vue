<script setup lang="ts"></script>

<template>
  <div class="cd-nav">
    <div>
      <el-button type="primary" plain>
        <RouterLink to="/utils">Utils</RouterLink>
      </el-button>
      <el-button type="primary" plain class="ml-20">
        <RouterLink to="/helpers">Helpers</RouterLink>
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cd-nav {
  width: 100vw;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid #dddddd;
  position: sticky;
  top: 0;
  .el-button {
    font-size: 20px;
  }
}

.ml-20 {
  margin-left: 20px;
}
</style>
