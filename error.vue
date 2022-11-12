<template>
  <div class="bg-gray-800 text-gray-300 min-h-screen flex justify-center items-center">

    <div class="text-center">
      <h2 class="text-9xl font-bold">{{error?.statusCode}}</h2>
      <p class="text-5xl">{{error?.statusMessage}}</p>
      <button 
        class="btn btn-primary mt-8" 
        @click="handleError">
          Voltar
        </button>
  
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  error: Object
})

function handleError() {
  clearError({redirect: '/'})
}
</script>