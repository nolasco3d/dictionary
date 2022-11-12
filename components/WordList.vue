<template>
  <section class="">
    <h2 class="title" v-if="showTitle">Words List</h2>
    <div class="grid-container" id="wordList" ref="scrollElement"
      style="max-height: 50vh; overflow: scroll">
      <NuxtLink 
        class="card" 
        :to="`/${word}`"
        v-for="(word, index) in wordsList" 
        :key="index">
        {{ word }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDictionaryStore } from "@/stores/dictionary";
import { useScroll } from '@vueuse/core';

const props = defineProps<{
  showTitle?: boolean;
}>()

const scrollElement = ref(null);
const { arrivedState } = useScroll(scrollElement);
const dictionaryStore = useDictionaryStore();

let range = ref(70);


const wordsList = computed(() => {
  return dictionaryStore.wordsList.slice(0, range.value);
});

function incrementWords() {
  range.value += 30;
}

watch(arrivedState, (scroll) => {
  scroll.bottom && incrementWords()
}, {
  deep: true
})


</script>

<style scoped>

</style>
