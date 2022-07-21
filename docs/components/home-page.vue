<script setup lang="ts">
import { ref } from 'vue'
const a = ref('123213')
// import { VPTeamMembers } from 'vitepress/theme'
// import { teamMembers } from '../contributors'
</script>

<template>
  <div class="a-content">
    <div>{{a}}</div>
  </div>
</template>
<style lang="less">
  .a-content{
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
