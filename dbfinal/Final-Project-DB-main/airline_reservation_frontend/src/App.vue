<template>
  <div id="app">
    <!-- NAVIGATION -->
    <div class="navBar-center">
      <router-link to="/"
        ><el-button type="primary" v-on:click="page = true"
          >Home</el-button
        ></router-link
      >
      <router-link to="/search"
        ><el-button type="primary" v-on:click="page = true"
          >Search for Flight</el-button
        ></router-link
      >
      <div v-if="!validCustomer && !validStaff">
        <router-link to="/signUp"
          ><el-button type="success" v-on:click="page = false"
            >Sign Up</el-button
          ></router-link
        >
        <router-link to="/login"
          ><el-button type="success" v-on:click="page = false"
            >Login</el-button
          ></router-link
        >
      </div>
      <!-- if the userLogin is true, activate the profile button -->
      <div v-if="validCustomer">
        <router-link to="/customer_profile"
          ><el-button type="success" v-on:click="page = false"
            >Profile</el-button
          ></router-link
        >
      </div>
      <!-- if the staffLogin is true, activate the profile and the report button -->
      <div v-if="validStaff">
        <router-link to="/report"
          ><el-button type="success" v-on:click="page = false"
            >Report</el-button
          ></router-link
        >
        <router-link to="/staff_profile"
          ><el-button type="success" v-on:click="page = false"
            >Profile</el-button
          ></router-link
        >
      </div>
      <div v-if="validCustomer || validStaff">
        <el-button type="success" v-on:click="logout()">Logout</el-button>
      </div>
    </div>
    <!-- PAGES -->
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      page: true,
      BASE_URL: "http://localhost:3000",
    };
  },
  methods: {
    logout() {
      console.log("should log out");
      // dispatch the store action to log out
      this.$store.dispatch("logout");
    },
    // just removed this but have no time to test everything now.
    // if in future tests everything goes fine,
    // then just remove this function
    // provide() {
    //   return {
    //     BASEURL: this.BASE_URL,
    //   };
    // },
  },
  async mounted() {
    // everytime we load the page, we check if the user is logged in by checking the token
    // if the token is for a customer, we set the customerLogin to true
    if (localStorage.getItem("cust_token")) {
      console.log("hi customer logged in");
      const token = localStorage.getItem("cust_token");
      try {
        const response = await axios.get(`${this.BASE_URL}/auth`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data.cust_name);
        if (response.data.email) {
          this.$store.state.customerLogin = true;
          // change the custInfo in store to be the response data
          this.$store.commit("setCustInfo", response.data);
          // also update the profile information here
          await this.$store.dispatch("getCustProfileInfo");
          return;
        }
      } catch (error) {
        // delete the token if the token is invalid
        localStorage.removeItem("cust_token");
        console.log(error);
      }
    }
    // if the token is for a staff, we set the staffLogin to true
    if (localStorage.getItem("staff_token")) {
      try {
        const token = localStorage.getItem("staff_token");
        const response = await axios.get(`${this.BASE_URL}/auth`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data.first_name);
        if (response.data.username) {
          console.log("staff logged in");
          console.log(response.data);
          this.$store.state.staffLogin = true;
          // set the staffInfo in store to be the response data
          this.$store.commit("setStaffInfo", response.data);
          // store the airline name in local storage
          localStorage.setItem("airline", response.data.airline_name);
          console.log(this.$store.state.staffInfo);
          return;
        }
      } catch (error) {
        // delete the token if the token is invalid
        localStorage.removeItem("staff_token");
        localStorage.removeItem("airline");
        console.log(error);
      }
    }
  },

  computed: {
    validStaff() {
      return this.$store.state.staffLogin;
    },
    validCustomer() {
      return this.$store.state.customerLogin;
    },
  },
};
</script>

<style>
.navBar-center {
  display: flex;
  justify-content: center;
  margin: 1rem;
}
#light {
  margin-right: 0.5rem;
}
</style>
