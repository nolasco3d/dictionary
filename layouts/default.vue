<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="w-full shadow-sm h-[60px] flex items-center bg-white">
      <NuxtLink to="/" class="title !text-4xl mx-4 !my-0">Dictionary</NuxtLink>
    </div>
    <main class="">
      <slot />
    </main>
  </div>
  <div v-show="store.loading"
    class="bg-opacity-20 bg-slate-900 absolute h-screen w-screen top-0 left-0 flex items-center justify-center transition-all">
    <span class="text-5xl text-slate-800">loading..</span>
  </div>
</template>

<script setup lang="ts">
import { useDictionaryStore } from '@/stores/dictionary'
const store = useDictionaryStore();
</script>

<style scoped>

</style>
