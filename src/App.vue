<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
</script>
<template>
  <div class="py-24">
    <div class="w-full container-2xl lg:container  mx-auto px-8  items-center">
      <Navigation class="mb-8" />
      <router-view></router-view>
    </div>
  </div>
</template>