<template>
  <div>
    <ul class="flex mb-4">
      <li class="tab" :class="{ 'active': tab.label === selected.label }"
        v-for="(tab, index) in tabs" :key="index" @click="setTab(tab)">
        {{ tab.label }}
      </li>
    </ul>
    <component :is="resolvedComp" class="py-4" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: any[];
  selected: { label: string, component: string };
}>()

const emit = defineEmits(['selected'])

const resolvedComp = computed(() => {
  return resolveComponent(props.selected.component)
})

function setTab(tab) {
  emit('selected', tab)
}

</script>

<style scoped>

</style>