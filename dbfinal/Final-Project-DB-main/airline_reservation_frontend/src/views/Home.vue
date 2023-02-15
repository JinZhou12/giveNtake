<template>
  <div class="home">
    <!-- List Data -->
    <List
      firstButton="Purchase"
      secondButton="Detail"
      :tableData="this.$store.state.futureFlightData"
      :firstFunction="purchaseFlight"
      :secondFunction="openDetail"
    ></List>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import List from "../components/list.vue";

export default defineComponent({
  name: "Home",
  components: { List },
  methods: {
    openDetail(flightNum) {
      this.$store.commit("openFlightDetail", flightNum);
    },
    purchaseFlight(flightNum) {
      this.$store.commit("purchaseFlight", flightNum);
    },
  },
  async mounted() {
    // get all the flight data from the server
    await this.$store.dispatch("getAllFutureFlightData");
  },
});
</script>

<style>
.home-search-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
}
</style>
