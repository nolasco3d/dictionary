<template>
  <section>
    <h2 class="title" v-if="showTitle">History</h2>
    <div class="grid-container"
      v-if="history?.length > 0 || store.history.length > 0">
      <NuxtLink class="card" :to="`/${word}`"
        v-for="(word, index) in history || store.history " :key="index">
        {{ word }}
      </NuxtLink>
    </div>
    <div v-else>
      <p>Nenhuma palavra vista recentemente.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDictionaryStore } from '@/stores/dictionary'
const store = useDictionaryStore();
const props = defineProps<{
  history?: Array<any>;
  showTitle?: boolean;
}>()
</script>

<style scoped>

</style>