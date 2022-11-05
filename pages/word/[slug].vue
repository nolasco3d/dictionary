<template>
  <div
    class="container md:flex md:items-baseline md:min-h-screen mx-auto border">
    <div class="m-2 !md:py-10 md:w-3/5">

      <section class="text-center">
        <h3 class="font-bold text-5xl text-gray-900">{{ wordDetails.word }}</h3>

        <div class="flex flex-col items-center"
          v-for="(phonetic, index) in wordDetails.phonetics.filter(item => item.text && item.audio)"
          :key="index">

          <span class="text-2xl text-gray-500 mb-4">{{ phonetic.text }}</span>

          <audio controls v-if="phonetic.audio" class="mb-4">
            <source :src="phonetic.audio" type="audio/mp3">
          </audio>
        </div>
      </section>

      <section class="flex gap-3">
        <Transition name="fade" mode="out-in">
          <button class="btn inline-flex items-center justify-around"
            v-if="!isFavorite" @click="storeWord(wordDetails.word)">

            <IconsHeartOutline color="tomato" />
          </button>

          <button class="btn inline-flex items-center justify-around" v-else
            @click="removeWord(wordDetails.word)">
            <IconsHeartFill color="tomato" />
          </button>
        </Transition>

        <button class="btn" @click="backRoute">Voltar</button>
      </section>


      <section class="mt-4 text-left">
        <h3 class="title">Meanings</h3>
        <ul>
          <li v-for="(meaning, index) in wordDetails.meanings" :key="index"
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

      <!-- Buttons -->


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
const dictionaryStore = useDictionaryStore();

const route = useRoute();
const router = useRouter();
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

let wordDetails = dictionaryStore.fetchedWords.find(item => item.word === route.params.slug) || null

if (!wordDetails) {
  dictionaryStore.loading = true
  try {
    const data = await $fetch(`${BASE_URL_WORD_API()}${route.params.slug}`);

    wordDetails = data[0];
    dictionaryStore.fetchedWords.push(data[0]);

  } catch (error) {
    // MODAL FEEDBACK
    router.back();
  } finally {
    dictionaryStore.loading = false
  }
}

onBeforeUnmount(() => {
  dictionaryStore.addToHistory(wordDetails.word);
})


function setSelected(tab) {
  activetab.value = tab
}

const isFavorite = computed(() => {
  return !!(dictionaryStore.favorites.find(item => item === wordDetails.word))
})

function storeWord(word) {
  dictionaryStore.favorites.push(word)
}
function removeWord(word) {
  dictionaryStore.removeWord(word);
}

function backRoute() {
  dictionaryStore.loading = true
  router.back();
  dictionaryStore.loading = false
}
watch(dictionaryStore.$state, (state) => {
  useLocalStorage('dictionary', state, { mergeDefaults: true })
}, { deep: true })
</script>

<style scoped>

</style>