import words from 'word-list-json';

export default defineEventHandler(event => {
  return {
    words
  }
})