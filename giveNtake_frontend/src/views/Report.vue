<template>
  <div>
    <el-tabs tab-position="left" style="height: 500px">
      <el-tab-pane label="Most Frequent Customer">
        <div>
          <p>Name: {{ this.$store.getters.getFrequentCustomer.cust_name }}</p>
          <p>DOB: {{ this.$store.getters.getFrequentCustomer.DOB }}</p>
        </div>
        <List
          secondButton="Flight Detail"
          :tableData="this.$store.getters.getFrequentCustomer.flights"
          :secondFunction="openDetail"
        />
      </el-tab-pane>
      <el-tab-pane label="Total Revenue">
        <el-tabs type="border-card">
          <el-tab-pane label="Last Year">
            The revenue for last year is: ${{
              this.$store.getters.getRevenueLastYear
            }}</el-tab-pane
          >
          <el-tab-pane label="Last Month"
            >The revenue for last month is: ${{
              this.$store.getters.getRevenueLastMonth
            }}</el-tab-pane
          >
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="Tickets Sold">
        <el-tabs type="border-card">
          <el-tab-pane label="Monthly View">
            <el-table
              :data="getTicketsSoldMonthly()"
              border
              style="width: 100%"
            >
              <el-table-column prop="month" label="Month" width="180" />
              <el-table-column prop="ticketsSold" label="Tickets" width="180" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Last Year"
            >{{ getTicketsSoldSum() }} tickets</el-tab-pane
          >
          <el-tab-pane label="Specify Dates">
            <el-date-picker
              v-model="pickedDates"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            >
            </el-date-picker>
            <el-button type="primary" @click="getTicketSoldInRange"
              >Submit</el-button
            >
            <div v-if="rangeSubmitted">
              <h1>{{ this.$store.state.ticketSoldInRange.length }} tickets</h1>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="Flights Delayed">
        <el-tabs type="border-card">
          <el-tab-pane label="Last 6 months">
            <List
              secondButton="Flight Detail"
              :tableData="this.$store.getters.getDelayedFlightLastSixMonth"
              :secondFunction="openDetail"
            />
          </el-tab-pane>
          <el-tab-pane label="Last Year">
            <List
              secondButton="Flight Detail"
              :tableData="this.$store.getters.getDelayedFlightLastYear"
              :secondFunction="openDetail"
            />
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="Top Cities">
        <el-tabs type="border-card">
          <el-tab-pane label="Last 3 months">
            <el-table
              :data="this.$store.getters.getCityThreeMonths"
              border
              style="width: 100%"
            >
              <el-table-column prop="rank" label="Rank" width="180" />
              <el-table-column prop="arr_airport" label="City" width="180" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Last Year">
            <el-table
              :data="this.$store.getters.getCityLastYear"
              border
              style="width: 100%"
            >
              <el-table-column prop="rank" label="Rank" width="180" />
              <el-table-column prop="arr_airport" label="City" width="180" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import List from "../components/list.vue";

export default {
  name: "Report",
  components: { List },
  data() {
    return {
      pickedDates: [],
      tickets: [],
      rangeSubmitted: false,
    };
  },
  methods: {
    openDetail(flightNum) {
      this.$store.commit("openFlightDetail", flightNum);
    },
    getTicketsSoldSum() {
      this.tickets = this.$store.getters.getTicketsSold;
      return this.tickets.length;
    },
    async getTicketSoldInRange() {
      this.rangeSubmitted = true;
      const startDate = this.pickedDates[0];
      const endDate = this.pickedDates[1];
      this.$store.dispatch("getTicketSoldInRange", { startDate, endDate });
    },
    getTicketsSoldMonthly() {
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
      console.log("Tickets");
      //   Loop through all the tickets
      for (let i = 0; i < this.tickets.length; i++) {
        // Get the date of the ticket
        const date = new Date(this.tickets[i].purchase_date);
        // Get the month of the ticket
        const month = date.toLocaleString("default", { month: "long" });
        // Get the index of the month in the months array
        const index = months.findIndex((monthObj) => monthObj.month === month);
        if (index !== -1) {
          months[index].ticketsSold += 1;
        }
      }
      return months;
    },
  },
  mounted() {
    this.$store.dispatch("getFrequentCustomer");
    this.$store.dispatch("getTicketsSold");
    this.$store.dispatch("getCityThreeMonths");
    this.$store.dispatch("getCityLastYear");
    this.$store.dispatch("getAllFlightData");
  },
};
</script>
