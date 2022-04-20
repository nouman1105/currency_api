import { createStore } from "vuex";

export default createStore({
  state: {
    currencies: [],
  },
  mutations: {
    UPDATE_CURRENCIES(state, payload) {
      state.currencies = payload;
    },
  },
  actions: {
    updateCurrencies(context, payload) {
      context.commit("UPDATE_CURRENCIES", payload);
    },
  },
  getters: {
    currencies(state) {
      return state.currencies;
    },
  },
});
