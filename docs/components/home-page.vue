<script setup lang="ts">
import source from "../public/source.js";
// import flipCard from './flip-card.vue'
// import { ref } from "vue";
// const a = ref("123213");
// import { VPTeamMembers } from 'vitepress/theme'
// import { teamMembers } from '../contributors'
</script>

<template>
  <div class="page-content">
    <p class="page-title">KFC Crazy Thursday</p>
    <div class="page-main">
      <div class="card" v-for="(item, idx) in source" :key="idx">
        {{ item }}
        <div class="btn">copy</div>
      </div>
    </div>

    <!-- <flip-card></flip-card> -->
  </div>
</template>
<style lang="less">
.page-content {
  width: 1280px;
  margin: 60px auto 0px;
  overflow: auto;
  height: calc(100vh - var(--vp-nav-height));
  // display: grid;
  // grid-template-columns: repeat(auto-fill, 300px);
  // grid-row-gap: 6px;
  // grid-column-gap: 10px;
  .page-title {
    text-align: center;
    font-size: 66px;
    color: #e00026;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(255, 100, 0, 1);
  }
  .page-main {
    margin-top: 47px;
  }
  .card {
    border-radius: 6px;
    padding: 12px;
    border: 1px solid var(--vp-c-divider);
    margin-bottom: 12px;
  }
  .btn {
    margin: 0 auto;
    width: 120px;
    background-color: #e4002b;
    padding: 10px;
    border-radius: 5px;
    font-weight: normal !important;
    text-align: center;
    margin: 5px 0% 15px 0%;
    color: #fff;
  }
}
</style>
