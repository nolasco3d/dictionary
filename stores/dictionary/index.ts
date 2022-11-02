import { defineStore } from "pinia";
import { State } from './types'

export const useDictionaryStore = defineStore('dictionary', {
  state: (): State => ({
    loading: false
  })
})