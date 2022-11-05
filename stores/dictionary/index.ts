import words from 'word-list-json';
import { defineStore } from "pinia";
import { State } from './types'

export const useDictionaryStore = defineStore('dictionary', {
  state: (): State => ({
    loading: false,
    wordsList: words || [],
    favorites: [],
    history: [],
    fetchedWords: []
  }),
  getters: {
    isFavorited: (state) =>  {
      return (item: string) => state.favorites.find(word => word === item)
    }
  },
  actions: {
    saveWord(word) {
      this.favorites.push(word);
    },
    removeWord(word) {
      this.favorites = this.favorites.filter(item => item !== word);
    },
    addToHistory (word) {
      const alreadyOnList = this.history.find(item => item === word)
      if (alreadyOnList) return
      this.history.push(word);
    }
  }
})