<template>
  <div class="root">
    <div>
      <p>Name: {{ this.$store.state.custInfo.cust_name }}</p>
      <p>DOB: {{ dob }}</p>
      <!-- Navigation Bar -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="My Flight" name="first">
          <el-tabs v-model="activeSubName" tab-position="left">
            <el-tab-pane label="Past Flight" name="one">
              <List
                firstButton="Review"
                :firstFunction="openReview"
                :tableData="this.$store.state.singleCustomer.pastFlights"
              ></List>
            </el-tab-pane>
            <el-tab-pane label="Future Flight" name="two">
              <List
                firstButton="Review"
                :firstFunction="openReview"
                :tableData="this.$store.state.singleCustomer.futureFlights"
              ></List>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="Spending" name="second">
          <el-tabs type="border-card">
            <el-tab-pane label="Monthly View">
              <el-table :data="getSpendingMonthly()" border style="width: 100%">
                <el-table-column prop="month" label="Month" width="180" />
                <el-table-column prop="spending" label="Spending" width="180" />
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="Last Year">
              <h1>$ {{ getSpendingLastYear() }}</h1>
            </el-tab-pane>

            <el-tab-pane label="Specify Dates">
              <el-date-picker
                v-model="pickedDates"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
              >
              </el-date-picker>
              <el-button type="primary" @click="getSpendingInRange"
                >Submit</el-button
              >
              <div v-if="rangeSubmitted">
                <h1>$ {{ spendingInRange() }}</h1>
                <el-table
                  :data="getSpendingInRangeMonthly()"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="month" label="Month" width="180" />
                  <el-table-column
                    prop="spending"
                    label="Spending"
                    width="180"
                  />
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import List from "../components/list.vue";

export default {
  name: "c_Profile",
  components: { List },
  data() {
    return {
      activeName: "first",
      activeSubName: "one",
      rangeSubmitted: false,
      pickedDates: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("getCustProfileInfo");
  },

  computed: {
    dob() {
      if (this.$store.state.custInfo.DOB) {
        let dob = this.$store.state.custInfo.DOB.split("T")[0];
        return dob;
      }
      return null;
    },
    custFlight() {
      console.log("GETTING CUSTFLIGHT");
      if (this.$store.state.custInfo.email) {
        console.log("this is computed custFlight");
        console.log(this.$store.state.custInfo);
        this.$store.dispatch("getCustomerFlight", {
          email: this.$store.state.custInfo.email,
          isFreq: false,
        });
        return this.$store.state.singleCustomer.flights;
      }
      return null;
    },
  },

  methods: {
    openReview(flightNum) {
      this.$store.commit("openFlightReview", flightNum);
    },
    debug() {
      console.log("hi");
    },
    pastFlights() {
      console.log("hi");
      let pastFlights = this.$store.state.singleCustomer.flights.filter(
        (flight) => {
          return new Date(flight.flight_date) < new Date();
        }
      );
      return pastFlights;
    },

    getSpendingMonthly() {
      // initialize an array of objects where month is the past 6 months and tickets sold is 0
      const months = [];
      for (let i = 0; i < 6; i++) {
        const month = new Date();
        month.setMonth(month.getMonth() - i);
        months.push({
          month: month.toLocaleString("default", { month: "long" }),
          ticketsSold: 0,
        });
      }
      //   Loop through all the tickets

      let totalTicket = this.$store.state.custTickets;

      for (let i = 0; i < totalTicket.length; i++) {
        // Get the date of the ticket
        const date = new Date(totalTicket[i].purchase_date);
        // Get the month of the ticket
        const month = date.toLocaleString("default", { month: "long" });
        // Get the index of the month in the months array
        const index = months.findIndex((monthObj) => monthObj.month === month);

        if (index !== -1) {
          if (!("spending" in months[index])) {
            months[index].spending = 0;
          }
          months[index].spending += totalTicket[i].sold_price;
        }
        for (let month of months) {
          if (!("spending" in month)) {
            month.spending = 0;
          }
        }
      }
      return months;
    },
    getSpendingInRangeMonthly() {
      const months = [];
      // the month should be between the range of the picked dates
      // calculate the number of months between the two dates
      const startDate = new Date(this.pickedDates[0]);
      const endDate = new Date(this.pickedDates[1]);
      const monthsBetween =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        endDate.getMonth() -
        startDate.getMonth();
      // initialize the array of objects starting from the first month
      for (let i = 0; i <= monthsBetween; i++) {
        const month = this.pickedDates[0].getMonth() + i;
        const monthObj = new Date();
        monthObj.setMonth(month);
        months.push({
          month: monthObj.toLocaleString("default", { month: "long" }),
          spending: 0,
        });
      }
      //   Loop through all the tickets
      let totalTicket = this.$store.state.custTickets;
      for (let i = 0; i < totalTicket.length; i++) {
        // Get the date of the ticket
        const date = new Date(totalTicket[i].purchase_date);
        // Get the month of the ticket
        const month = date.toLocaleString("default", { month: "long" });
        // Get the index of the month in the months array
        const index = months.findIndex((monthObj) => monthObj.month === month);
        if (index !== -1) {
          if (!("spending" in months[index])) {
            months[index].spending = 0;
          }
          months[index].spending += totalTicket[i].sold_price;
        }
        for (let month of months) {
          if (!("spending" in month)) {
            month.spending = 0;
          }
        }
      }
      return months;
    },

    getSpendingLastYear() {
      let totalTicket = this.$store.state.custTickets;
      let totalSpending = 0;
      totalTicket.forEach((ticket) => {
        totalSpending += ticket.sold_price;
      });
      return totalSpending;
    },

    async getSpendingInRange() {
      this.rangeSubmitted = true;
      const startDate = this.pickedDates[0];
      const endDate = this.pickedDates[1];
      this.$store.dispatch("getTicketBoughtInRange", { startDate, endDate });
    },

    spendingInRange() {
      console.log("DATE");
      console.log(this.pickedDates);
      let startDate = this.pickedDates[0];
      let endDate = this.pickedDates[1];

      let ticketInRange = this.$store.state.custTickets;
      let totalSpending = 0;
      console.log("TICKET IN RANGE");
      console.log(ticketInRange);
      for (let i = 0; i < ticketInRange.length; i++) {
        let ticket = ticketInRange[i];
        // Pull the date off of ticket
        let date = new Date(ticket.purchase_date);
        // Check if the date is in between the start and end date
        if (
          date.getTime() >= startDate.getTime() &&
          date.getTime() <= endDate.getTime()
        ) {
          totalSpending += ticket.sold_price;
        }
      }

      return totalSpending;
    },
  },
};
</script>
