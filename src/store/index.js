import { createStore } from "vuex";

export default createStore({
  state: {
    currencies: [],
  },
  mutations: {
    UPDATE_FAVORITES(state, payload) {
      state.favorites = payload;
    },
  },
  actions: {
    updateCurrencies(context, payload) {
      return context.state.currencies = payload;
    //   context.commit("UPDATE_FAVORITES", favorites);
    },
  },
  getters: {
    currencies(state) {
      return state.currencies;
    },
  },
});
