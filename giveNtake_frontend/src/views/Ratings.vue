<template>
  <div>
    <h2>Average Rating: {{ this.avg }}</h2>
    <el-table :data="this.$store.state.ratingsAndCustomer" style="width: 100%">
      <el-table-column prop="email" label="Customer Email" width="180">
      </el-table-column>
      <el-table-column prop="rating" label="Rating" width="180">
      </el-table-column>
      <el-table-column prop="comment" label="Comment"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Ratings",
  data() {
    return {
      tableData: [],
    };
  },
  async mounted() {
    this.flightNum = this.$route.params.flightNum;
    await this.$store.dispatch("getSingleFlight", this.flightNum);
    this.$store.dispatch("getRatings");
  },
  //   Computed method
  computed: {
    avg() {
      let sum = 0;
      let counter = 0;
      let rating = this.$store.state.ratingsAndCustomer;
      for (let i = 0; i < rating.length; i++) {
        let ratingGiven = rating[i];
        // If ratingGiven is not an empty string or null
        if (ratingGiven.rating != null && ratingGiven.rating != "") {
          sum += ratingGiven.rating;
          counter += 1;
        }
      }
      return sum / counter;
    },
  },
};
</script>
