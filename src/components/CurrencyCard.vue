<template>
  <li v-for="(currency, index) in currencies" :key="currency.id">
    <h2>{{ title(currency, index) }}</h2>
    <country-flag
      :country="toLowerIso(currency, index)"
      class="flag"
      size="normal"
    ></country-flag>
    <ul>
      <li>{{ buyingRate(currency, index) }}</li>
      <li>{{ sellingRate(currency, index) }}</li>
    </ul>
  </li>
</template>

<script>
import CountryFlag from "vue-country-flag-next";
import axios from "axios";

export default {
  mounted() {
    this.getData();
  },
  components: {
    CountryFlag,
  },

  data() {
    return {
      isVisible: false,
      currencies: [],
    };
  },

  methods: {
    getData() {
      axios
        .get("https://currency-api.go.yj.fr/api/v1/list")
        .then((resp) => {
          resp.data.shift();
          resp.data.unshift({});
          this.currencies = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    title(currency, index) {
      return index === 0 ? "Currency" : currency.name;
    },

    toLowerIso(currency, index) {
      return index === 0 ? "0" : currency.iso.toLowerCase();
    },

    sellingRate(currency, index) {
      return index === 0 ? "Selling Rate" : this.rateCalc(currency.rate, "sell");
    },

    buyingRate(currency, index) {
      return index === 0 ? "Buying Rate" : this.rateCalc(currency.rate, "buy");
    },

    rateCalc(rate, op) {
      let r = rate;
      return op == "buy"
        ? this.subPerc(r, 1.2)
        : op == "sell"
        ? this.addPerc(r, 1.1)
        : +r;
    },
    calc4Dec(num) {
      let regex = /^-?\d+(?:\.\d{0,4})?/;
      return num.toString().match(regex)[0];
    },
    calc6Dec(num) {
      let regex = /^-?\d+(?:\.\d{0,6})?/;
      return num.toString().match(regex)[0];
    },
    subPerc(rate, perc) {
      let r = this.calc4Dec(rate);
      return this.calc4Dec(r - r * (perc / 100));
    },
    addPerc(rate, perc) {
      let r = this.calc4Dec(rate);
      return this.calc4Dec(r + r * (perc / 100));
    },
  },
};
</script>

<style scoped>
.flag {
  border-radius: 50%;
}
</style>
