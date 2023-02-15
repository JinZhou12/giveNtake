<template>
  <div class="about">
    <h3>Flight Number: {{ flightInfo.flight_num }}</h3>
    <h3>Departing At: {{ flightInfo.dept_datetime }}</h3>
    <h3>Airline: {{ flightInfo.airline_name }}</h3>

    <el-input
      v-model="comment"
      :rows="2"
      type="textarea"
      placeholder="Please input"
    />
    <el-rate v-model="rating" allow-half />

    <el-button type="primary" @click="submitReview"> Submit </el-button>
  </div>
</template>

<script>
export default {
  name: "Feedback",
  data() {
    return {
      rating: null,
      comment: "",
    };
  },
  methods: {
    submitReview() {
      // if the flight is in the future, do not allow review
      if (new Date(this.flightInfo.dept_datetime) > new Date()) {
        alert("Cannot review a flight in the future");
        return;
      }
      this.$store.dispatch("submitReview", {
        rating: this.rating,
        comment: this.comment,
      });
      this.rating = null;
      this.comment = "";
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
