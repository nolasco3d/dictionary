<template>
  <section>
    <h2 class="title" v-if="showTitle">Favorites</h2>
    <div class="grid-container"
      v-if="favorites?.length > 0 || store.favorites.length > 0">
      <NuxtLink class="card" :to="`/word/${word}`"
        v-for="(word, index) in favorites || store.favorites " :key="index">
        {{ word }}
      </NuxtLink>
    </div>
    <div v-else>
      <p>Nenhuma palavra favoritada.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDictionaryStore } from '@/stores/dictionary'
const store = useDictionaryStore();
const props = defineProps<{
  favorites?: string[];
  showTitle?: boolean
}>()
</script>

<style scoped>

</style>