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
      <div class="card" v-for="(item, idx) in source" :key="idx" >
        {{ item }}
      </div>
    </div>

    <!-- <flip-card></flip-card> -->
  </div>
</template>
<style lang="less">
.page-content {
  width: 1280px;
  margin: 60px auto 0px;
  height: calc(100vh - var(--vp-nav-height));

  .page-title {
    text-align: center;
    font-size: 66px;
    color: #e00026;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(255, 100, 0, 1);
  }
  .page-main {
    margin-top: 47px;
    margin-bottom: 47px;
  }
  .card {
    cursor: pointer;
    border-radius: 6px;
    padding: 12px;
    border: 1px solid var(--vp-c-divider);
    margin-bottom: 20px;
    font-size: 22px;
    box-shadow: 0 4px 8px var(--vp-c-bg-mute);
  }
}
</style>
