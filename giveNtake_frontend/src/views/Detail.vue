<template>
  <h1>This is the flight detail page</h1>
  <h1>Flight Number: {{ flightInfo.flight_num }}</h1>
  <h1>Departing At: {{ flightInfo.dept_datetime }}</h1>
  <h1>Arriving At: {{ flightInfo.arr_datetime }}</h1>
  <h1>Departure: {{ flightInfo.dept_airport }}</h1>
  <h1>Arrival: {{ flightInfo.arr_airport }}</h1>
  <h1>Airline: {{ flightInfo.airline_name }}</h1>
  <h1>price: {{ flightInfo.base_price }}</h1>
  <h1>available seats: {{ flightInfo.remaining_seats }}</h1>
  <h1>Status: {{ flightInfo.flight_status }}</h1>
  <!-- purchase button for logged in customer only -->
  <el-button
    v-show="this.$store.state.customerLogin"
    type="primary"
    @click="purchase"
    >Purchase</el-button
  >
  <el-button type="primary" @click="goBack">Go Back</el-button>
</template>

<script>
export default {
  name: "Detail",
  methods: {
    purchase(flightNum) {
      this.$store.commit("purchaseFlight", flightNum);
    },
    goBack() {
      console.log("go back");
      this.$router.go(-1);
    },
  },
  mounted() {
    const flightNum = this.$route.params.flightNum;
    this.$store.dispatch("getSingleFlight", flightNum);
  },
  computed: {
    flightInfo() {
      return this.$store.state.singleFlight;
    },
  },
};
</script>
