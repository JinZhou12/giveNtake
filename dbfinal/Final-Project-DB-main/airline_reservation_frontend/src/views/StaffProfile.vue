<template>
  <div class="root">
    <div>
      <p>First Name: {{ this.$store.state.staffInfo.first_name }}</p>
      <p>FLast Name: {{ this.$store.state.staffInfo.last_name }}</p>
      <p>DOB: {{ dob }}</p>
      <p>Airline Name: {{ this.$store.state.staffInfo.airline_name }}</p>
    </div>
    <el-tabs v-model="activeName" @tab-click="addedNewAirplane = false">
      <el-tab-pane label="All Flights" name="first">
        <h2>Flights in the next 30 days:</h2>
        <List
          firstButton="Edit Status"
          :tableData="this.$store.getters.getAllFutureFlightDataForStaff"
          :firstFunction="editStatus"
        ></List>
      </el-tab-pane>
      <el-tab-pane label="Add New..." name="second">
        <el-tabs
          tab-position="left"
          style="height: 1000px;"
          @tab-click="addedNewAirplane = false"
        >
          <el-tab-pane label="Flight">
            <el-form
              :model="newFlightInfo"
              :rules="rules"
              ref="newFlightInfo"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="Flight Number" prop="flight_num">
                <el-input v-model="newFlightInfo.flight_num"></el-input>
              </el-form-item>
              <el-form-item label="Airline Name" prop="airline_name">
                <el-input
                  v-model="newFlightInfo.airline_name"
                  disabled
                  :placeholder="this.$store.state.staffInfo.airline_name"
                ></el-input>
              </el-form-item>
              <el-form-item label="Departure Airport" prop="dept_airport">
                <el-input v-model="newFlightInfo.dept_airport"></el-input>
              </el-form-item>
              <el-form-item label="Arrival Airport" prop="arr_airport">
                <el-input v-model="newFlightInfo.arr_airport"></el-input>
              </el-form-item>
              <el-form-item label="Departure Date" prop="dept_date">
                <el-date-picker
                  type="date"
                  placeholder="Pick a date"
                  v-model="newFlightInfo.dept_date"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="Departure Time" prop="dept_time">
                <el-time-picker
                  v-model="newFlightInfo.dept_time"
                  placeholder="Pick a time"
                  style="width: 100%"
                >
                </el-time-picker>
              </el-form-item>
              <el-form-item label="Arrival Date" prop="arr_date">
                <el-date-picker
                  type="date"
                  placeholder="Pick a date"
                  v-model="newFlightInfo.arr_date"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="Arrival Time" prop="arr_time">
                <el-time-picker
                  v-model="newFlightInfo.arr_time"
                  placeholder="Pick a time"
                  style="width: 100%"
                >
                </el-time-picker>
              </el-form-item>
              <el-form-item label="Status" prop="flight_status">
                <el-radio-group v-model="newFlightInfo.flight_status">
                  <el-radio label="On-time"></el-radio>
                  <el-radio label="Delay"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Airplane ID" prop="airplane_id">
                <el-input v-model="newFlightInfo.airplane_id"></el-input>
              </el-form-item>
              <el-form-item
                label="Airplane From"
                prop="airplane_airline_name_in_flight"
              >
                <el-input
                  v-model="newFlightInfo.airplane_airline_name_in_flight"
                ></el-input>
              </el-form-item>
              <el-form-item label="Base Price" prop="base_price">
                <el-input v-model="newFlightInfo.base_price"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitNewFlight('newFlightInfo')"
                  >Submit</el-button
                >
                <el-button @click="resetForm('newFlightInfo')">Reset</el-button>
              </el-form-item>
            </el-form></el-tab-pane
          >
          <el-tab-pane label="Airplane">
            <el-form
              :model="newAirplaneInfo"
              :rules="rules"
              ref="newAirplaneInfo"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="Airplane ID" prop="ID">
                <el-input v-model="newAirplaneInfo.ID"></el-input>
              </el-form-item>
              <el-form-item label="Airplane From" prop="airplane_airline_name">
                <el-input
                  v-model="newFlightInfo.airplane_airline_name"
                  disabled
                  :placeholder="this.$store.state.staffInfo.airline_name"
                ></el-input>
              </el-form-item>
              <el-form-item label="Seat Amount" prop="seat_amt">
                <el-input v-model="newAirplaneInfo.seat_amt"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitNewAirplane('newAirplaneInfo')"
                  >Submit</el-button
                >
                <el-button @click="resetForm('newAirplaneInfo')"
                  >Reset</el-button
                >
              </el-form-item>
            </el-form>
            <el-table
              :data="this.$store.state.airplaneList"
              border
              style="width: 100%"
              v-if="addedNewAirplane"
            >
              <el-table-column prop="ID" label="Airplane ID" width="180" />
              <el-table-column
                prop="seat_amt"
                label="Seat Amount"
                width="180"
              />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Airport">
            <el-form
              :model="newAirportInfo"
              :rules="rules"
              ref="newAirportInfo"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="Airport Name" prop="airport_name">
                <el-input v-model="newAirportInfo.airport_name"></el-input>
              </el-form-item>
              <el-form-item label="Airport Code" prop="airport_code">
                <el-input v-model="newAirportInfo.airport_code"></el-input>
              </el-form-item>
              <el-form-item label="Airport City" prop="city">
                <el-input v-model="newAirportInfo.city"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitNewAirport('newAirportInfo')"
                  >Submit</el-button
                >
                <el-button @click="resetForm('newAirportInfo')"
                  >Reset</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import List from "../components/list.vue";

export default {
  name: "s_Profile",
  components: { List },
  data() {
    return {
      activeName: "first",
      newFlightInfo: {
        dept_airport: "",
        arr_airport: "",
        dept_date: "",
        dept_time: "",
        arr_date: "",
        arr_time: "",
        flight_status: "",
        flight_num: "",
        airline_name: this.$store.state.staffInfo.airline_name,
        airplane_id: "",
        base_price: "",
        airplane_airline_name_in_flight: "",
      },
      newAirplaneInfo: {
        ID: "",
        airplane_airline_name: this.$store.state.staffInfo.airline_name,
        seat_amt: "",
      },
      newAirportInfo: {
        airport_name: "",
        airport_code: "",
        city: "",
      },
      rules: {
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
        dept_date: [
          {
            required: true,
            message: "Please input your departure date",
            trigger: "blur",
          },
        ],
        dept_time: [
          {
            required: true,
            message: "Please input your departure time",
            trigger: "blur",
          },
        ],
        arr_date: [
          {
            required: true,
            message: "Please input your arrival date",
            trigger: "blur",
          },
        ],
        arr_time: [
          {
            required: true,
            message: "Please input your arrival time",
            trigger: "blur",
          },
        ],
        flight_status: [
          {
            required: true,
            message: "Please input your flight status",
            trigger: "blur",
          },
        ],
        flight_num: [
          {
            required: true,
            message: "Please input your flight number",
            trigger: "blur",
          },
        ],
        // airline_name: [
        //   {
        //     required: true,
        //     message: "Please input your airline name",
        //     trigger: "blur",
        //   },
        // ],
        airplane_id: [
          {
            required: true,
            message: "Please input your airplane ID",
            trigger: "blur",
          },
        ],
        ID: [
          {
            required: true,
            message: "Please input your airplane ID",
            trigger: "blur",
          },
        ],
        base_price: [
          {
            required: true,
            message: "Please input your base price",
            trigger: "blur",
          },
        ],
        airplane_airline_name_in_flight: [
          {
            required: true,
            message: "Please input your airplane airline name",
            trigger: "blur",
          },
        ],
        seat_amt: [
          {
            required: true,
            message: "Please input your seat amount",
            trigger: "blur",
          },
        ],
        airport_name: [
          {
            required: true,
            message: "Please input your airport name",
            trigger: "blur",
          },
        ],
        airport_code: [
          {
            required: true,
            message: "Please input your airport code",
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: "Please input your airport city",
            trigger: "blur",
          },
        ],
      },
      addedNewAirplane: false,
    };
  },
  async mounted() {
    // get all the flight data from the server
    await this.$store.dispatch("getAllFutureFlightData");
  },
  computed: {
    dob() {
      if (this.$store.state.staffInfo.DOB) {
        let dob = this.$store.state.staffInfo.DOB.split("T")[0];
        return dob;
      }
      return null;
    },
  },
  methods: {
    editStatus(flightNum) {
      alert("changing the status of flight " + flightNum);
      this.$store.dispatch("toggleFlightStatus", flightNum);
      alert("Reload the page to see the changes");
    },
    submitNewFlight(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch("addNewFlight", this.newFlightInfo);
          this.$refs[formName].resetFields();
        } else {
          this.$message({
            message: "Please fill in all the required fields",
            type: "error",
          });
        }
      });
    },
    submitNewAirplane(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.addedNewAirplane = true;
          await this.$store.dispatch("addNewAirplane", this.newAirplaneInfo);
          this.$refs[formName].resetFields();
        } else {
          this.$message({
            message: "Please fill in all the required fields",
            type: "error",
          });
        }
      });
    },
    async submitNewAirport(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // console.log(this.newAirportInfo);
          await this.$store.dispatch("addNewAirport", this.newAirportInfo);
          this.$refs[formName].resetFields();
        } else {
          this.$message({
            message: "Please fill in all the required fields",
            type: "error",
          });
        }
      });
    },
    async getAllAirplanes() {
      await this.$store.dispatch("getAllAirplanes");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  beforeUnmount() {
    this.$store.state.airplaneList = [];
    this.addedNewAirplane = false;
  },
};
</script>
