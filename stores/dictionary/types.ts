export interface State {
  loading: boolean;
  wordsList: Array<string>;
  favorites: Array<string>;
  history: Array<string>;
  fetchedWords: Object[];
}