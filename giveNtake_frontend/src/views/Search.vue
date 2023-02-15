<template>
  <el-tabs v-model="activeName" @tab-click="changeTab">
    <el-tab-pane label="Search By Flight Number" name="first">
      <el-form
        :model="flightNumSearch"
        :rules="rules"
        ref="flightNumSearch"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Flight Number" prop="flight_num">
          <el-input v-model="flightNumSearch.flight_num"></el-input>
        </el-form-item>
        <el-form-item label="Airline Name" prop="airline_name">
          <el-input v-model="flightNumSearch.airline_name"></el-input>
        </el-form-item>
        <el-form-item label="Departure Date" prop="dept_date">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="flightNumSearch.dept_date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="searchByFlightNum('flightNumSearch')"
            >{{ searchState }}</el-button
          >
          <el-button @click="resetForm('flightNumSearch')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="Search By Round Trip Attributes" name="second">
      <el-form
        :model="roundTripSearch"
        :rules="rules"
        ref="roundTripSearch"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Departure Airport" prop="dept_airport">
          <el-input v-model="roundTripSearch.dept_airport"></el-input>
        </el-form-item>
        <el-form-item label="Arrival Airport" prop="arr_airport">
          <el-input v-model="roundTripSearch.arr_airport"></el-input>
        </el-form-item>
        <el-form-item label="Departure Date" prop="dept_date">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="roundTripSearch.dept_date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="Return Date" prop="arr_date">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="roundTripSearch.arr_date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="searchRoundTrip('roundTripSearch')"
            >{{ searchState }}</el-button
          >
          <el-button @click="resetForm('roundTripSearch')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="Search By One-Way Attributes" name="third">
      <el-form
        :model="oneWaySearch"
        :rules="rules"
        ref="oneWaySearch"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Departure Airport" prop="dept_airport">
          <el-input v-model="oneWaySearch.dept_airport"></el-input>
        </el-form-item>
        <el-form-item label="Arrival Airport" prop="arr_airport">
          <el-input v-model="oneWaySearch.arr_airport"></el-input>
        </el-form-item>
        <el-form-item label="Departure Date" prop="dept_date">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="oneWaySearch.dept_date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchOneWay('oneWaySearch')">{{
            searchState
          }}</el-button>
          <el-button @click="resetForm('oneWaySearch')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <!-- only show this tab if staff is logged in -->
    <el-tab-pane
      label="Search By Range of Dates (Staff Only)"
      name="fourth"
      v-if="this.$store.state.staffLogin"
    >
      <el-form
        :model="rangeSearch"
        :rules="rules"
        ref="rangeSearch"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item>
          <el-date-picker
            type="daterange"
            v-model="rangeSearch.pickedDates"
            range-separator="-"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchInRange('rangeSearch')">{{
            searchState
          }}</el-button>
          <el-button @click="resetForm('rangeSearch')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane
      label="Search For Customer (Staff only)"
      name="fifth"
      v-if="this.$store.state.staffLogin"
    >
      <el-form
        :model="custSearch"
        :rules="rules"
        ref="custSearch"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item>
          <el-input
            v-model="custSearch.email"
            placeholder="Customer Email"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchCust('custSearch')">{{
            searchState
          }}</el-button>
          <el-button @click="resetForm('custSearch')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <div v-if="searched && flight">
    <h2>Search Flight Result</h2>
    <List
      :firstButton="validStaff ? 'View Ratings' : ''"
      :firstFunction="openRatings"
      :secondButton="validStaff ? '' : 'Purchase'"
      :secondFunction="purchaseFlight"
      :tableData="this.$store.getters.getSearchResult"
    />
  </div>
  <div v-if="searched && cust">
    <h2>Search Customer Result</h2>
    <List
      header="Customer Flights"
      :firstButton="validStaff ? 'View Ratings' : ''"
      :firstFunction="openRatings"
      :tableData="this.$store.state.singleCustomer.flights"
    />
  </div>
</template>

<script>
import List from "../components/list.vue";

export default {
  name: "Search",
  components: {
    List,
  },
  data() {
    return {
      flightNumSearch: {
        flight_num: "",
        airline_name: "",
        dept_date: "",
      },
      roundTripSearch: {
        dept_airport: "",
        arr_airport: "",
        dept_date: "",
      },
      oneWaySearch: {
        dept_airport: "",
        arr_airport: "",
        dept_date: "",
      },
      rangeSearch: {
        pickedDates: [],
      },
      custSearch: {
        email: "",
      },
      activeName: "first",
      searchState: "Search",
      rules: {
        flight_num: [
          {
            required: true,
            message: "Please input your flight number",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "The length of flight number must be between 3 and 20",
            trigger: "blur",
          },
        ],
        airline_name: [
          {
            required: true,
            message: "Please input your airline name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "The length of airline name must be between 3 and 20",
            trigger: "blur",
          },
        ],
        dept_date: [
          {
            required: true,
            message: "Please input valid departure date",
            trigger: "blur",
            // can only be future dates
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("Please input your departure date"));
              } else {
                const today = new Date();
                const date = new Date(value);
                if (date < today) {
                  callback(new Error("Please input a future date"));
                } else {
                  callback();
                }
              }
            },
          },
        ],
        arr_date: [
          {
            required: true,
            message: "Please input your arrival date",
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("Please input your departure date"));
              } else {
                const today = new Date();
                const date = new Date(value);
                if (date < today) {
                  callback(new Error("Please input a future date"));
                } else {
                  callback();
                }
              }
            },
          },
        ],
        dept_airport: [
          {
            required: true,
            message: "Please input your departure airport",
            trigger: "blur",
          },
        ],
        arr_airport: [
          {
            required: true,
            message: "Please input your arrival airport",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input a customer email",
            trigger: "blur",
          },
        ],
      },
      searched: false,
      flight: true,
      cust: false,
    };
  },
  methods: {
    changeTab() {
      this.$store.commit("resetFlightSearchResult");
      this.searched = false;
    },
    openRatings(flightNum) {
      this.$store.commit("openFlightRatings", flightNum);
    },
    purchaseFlight(flightNum) {
      this.$store.commit("purchaseFlight", flightNum);
    },
    searchByFlightNum(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const flightNumSearchInfo = this.flightNumSearch;
          this.searched = true;
          this.$store.dispatch("searchByFlightNum", flightNumSearchInfo);
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    searchRoundTrip(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const roundTripSearchInfo = this.roundTripSearch;
          this.searched = true;
          this.flight = true;
          this.cust = false;
          this.$store.dispatch("searchByRoundTrip", roundTripSearchInfo);
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    searchOneWay(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const oneWaySearchInfo = this.oneWaySearch;
          this.searched = true;
          this.flight = true;
          this.cust = false;
          this.$store.dispatch("searchByOneWay", oneWaySearchInfo);
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    searchInRange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const rangeSearchInfo = this.rangeSearch;
          this.searched = true;
          this.flight = true;
          this.cust = false;
          this.$store.dispatch("getFlightInRangeForStaff", rangeSearchInfo);
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    searchCust(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.searched = true;
          this.cust = true;
          this.flight = false;
          const custSearchInfo = this.custSearch;
          this.$store.dispatch("getCustomerFlight", {
            email: custSearchInfo.email,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.searched = false;
      this.flight = true;
      this.cust = false;
    },
  },
  computed: {
    validStaff() {
      return this.$store.state.staffLogin;
    },
  },
  beforeUnmount() {
    this.$store.commit("resetFlightSearchResult");
    this.searched = false;
  },
};
</script>
