<template>
  <div class="container md:flex md:items-baseline md:min-h-screen mx-auto border">
    <div class="m-2 !md:py-10 md:w-3/5">
      <!-- Word Section -->
      <section class="text-center">
        <h3 class="font-bold text-5xl text-gray-900">{{ data[0].word }}</h3>

        <div 
          class="flex flex-col items-center"
          v-for="(phonetic, index) in filterPhonetics"
          :key="index">
            <span class="text-2xl text-gray-500 mb-4">{{ phonetic.text }}</span>

            <audio controls v-if="phonetic.audio" class="mb-4">
              <source :src="phonetic.audio" type="audio/mp3">
            </audio>
        </div>
      </section>

      <!-- Meanings -->
      <section class="mt-4 text-left">
        <h3 class="title">Meanings</h3>
        <ul>
          <li v-for="(meaning, index) in data[0].meanings" :key="index"
            class="mb-2">
            <h5 class="font-semibold italic">{{ meaning.partOfSpeech }}</h5>
            <div>
              <small class="inline-block w-full text-gray-500"
                v-for="(item, index) in meaning.definitions" :key="index">
                <strong>{{ index + 1 }}</strong>. {{ item.definition }}
              </small>
            </div>
          </li>
        </ul>
      </section>

      <!-- Buttons  -->
      <section class="flex gap-3">
        <Transition name="fade" mode="out-in">
          <button class="btn inline-flex items-center justify-around"
            v-if="!isFavorite" @click="storeWord(data[0].word)">

            <IconsHeartOutline color="tomato" />
          </button>

          <button class="btn inline-flex items-center justify-around" v-else
            @click="removeWord(data[0].word)">
            <IconsHeartFill color="tomato" />
          </button>
        </Transition>

        <button class="btn" @click="$router.back()">Voltar</button>
      </section>
    </div>

    <!-- Tabs -->
    <div class="w-full bg-white md:min-h-[50vh]">
      <TabsComponents :selected="activetab" @selected="setSelected"
        :tabs="tabs">
      </TabsComponents>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useDictionaryStore } from '@/stores/dictionary';
import { useLocalStorage } from '@vueuse/core';

const route = useRoute();
const config = useRuntimeConfig();
const slug = ref(route.params.slug);
const dictionaryStore = useDictionaryStore();
const tabs = ref([
  {
    label: 'Words List',
    component: 'WordList'
  },
  {
    label: 'Favorites',
    component: 'Favorites'
  },
  {
    label: 'History',
    component: 'History'
  }
])
let activetab = ref(tabs.value[0])

const {data, error} = await useFetch(`${slug.value}`, {
  key: `word-${slug.value}`,
  baseURL: config.public.BASE_URL_WORD_API,
})

if(error.value) {
  showError({
    statusCode: error.value.response.status, 
    statusMessage: error.value.response.statusText
  });
}


const filterPhonetics = computed(() => {
  return data.value[0].phonetics.filter(item => item.text && item.audio)
})

const isFavorite = computed(() => {
  return !!(dictionaryStore.favorites.find(item => item === data.value[0].word))
})




function storeWord(word) {
  dictionaryStore.favorites.push(word)
}
function removeWord(word) {
  dictionaryStore.removeWord(word);
}
function setSelected(tab) {
  activetab.value = tab
}



onBeforeUnmount(() => {
  if(!error.value) {
    dictionaryStore.addToHistory(data.value[0].word);
  }  
})

</script>

<style scoped>

</style>