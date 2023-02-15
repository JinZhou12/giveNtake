import { createStore } from "vuex";
import router from "../router/index";
import axios from "axios";
import moment from "moment";

// usefull global functions
function parseDate(flight) {
  let dept_D = flight.dept_date.split("T")[0];
  let dept_T = flight.dept_time;
  let arr_D = flight.arr_date.split("T")[0];
  let arr_T = flight.arr_time;
  flight.dept_datetime = moment(
    dept_D + " " + dept_T,
    "YYYY-MM-DD HH:mm"
  ).format("YYYY-MM-DD HH:mm");
  flight.arr_datetime = moment(arr_D + " " + arr_T, "YYYY-MM-DD HH:mm").format(
    "YYYY-MM-DD HH:mm"
  );
}

export default createStore({
  state: {
    custInfo: {},
    staffInfo: {},
    custLoginInfo: {},
    staffLoginInfo: {},
    flightNumSearchInfo: {},
    roundTripSearchInfo: {},
    oneWaySearchInfo: {},
    frequentCustomer: {
      cust_name: "",
      email: "",
      DOB: "",
      flights: [],
      pastFlights: [],
      futureFlights: [],
    },
    button: false,
    staffLogin: false,
    customerLogin: false,
    URL: "http://localhost:3000",
    flightData: [],
    futureFlightData: [],
    searchFlightResult: [],
    singleCustomer: {
      cust_name: "",
      email: "",
      DOB: "",
      flights: [],
      pastFlights: [],
      futureFlights: [],
    },
    ticketSold: [],
    ticketSoldInRange: [],
    popularCityThreeMonths: [],
    popularCityLastYear: [],
    singleFlight: {
      remaining_seats: 0,
    },
    custTickets: [],
    custTicketsInRange: [],
    custFlightTaken: [],
    ratingsAndCustomer: [],
    airplaneList: [],
  },
  mutations: {
    openFlightDetail(_, flightNum) {
      router.push(`/detail/${flightNum}`);
    },
    openFlightReview(_, flightNum) {
      router.push(`/review/${flightNum}`);
    },
    openFlightRatings(_, flightNum) {
      router.push(`/ratings/${flightNum}`);
    },
    purchaseFlight(_, flightNum) {
      console.log("in pushing to purchase route");
      router.push(`/purchase/${flightNum}`);
    },
    setCustInfo(state, custInfo) {
      state.custInfo = custInfo;
    },
    setStaffInfo(state, staffInfo) {
      state.staffInfo = staffInfo;
    },
    resetFlightSearchResult(state) {
      state.searchFlightResult = [];
    },
  },
  actions: {
    // customer sign up
    async custSignUp(context, payload) {
      context.state.custInfo = payload;
      console.log(context.state.custInfo);
      await axios
        .post(context.state.URL + "/newCustomer", payload)
        .then((res) => {
          console.log(res.data);
          alert("Sign up successfully!");
          router.replace("/login");
        })
        .catch((err) => {
          // pull the error message from the response
          alert(err.response.data);
          console.log(err, "here");
        });
    },
    // customer log in
    async custLogin(context, payload) {
      context.state.custLoginInfo = payload;
      await axios
        .post(context.state.URL + "/loginCustomer", payload)
        .then((res) => {
          const token = res.data.token;
          // store the token in local storage
          localStorage.setItem("cust_token", token);
          context.state.customerLogin = true;
          context.state.custInfo = res.data.cust_info;
          alert("Welcome.");
          router.replace("/");
        })
        .catch((err) => {
          // pull the error message from the response
          alert("Sign up failed, check your fields");
          console.log(err, "here");
        });
    },
    // staff sign up
    async staffSignUp(context, payload) {
      context.state.staffInfo = payload;
      await axios
        .post(context.state.URL + "/newStaff", payload)
        .then((res) => {
          console.log(res.data);
          alert("Sign up successfully!");
          router.replace("/login");
        })
        .catch((err) => {
          alert("Sign up failed, check your fields");
          console.log(err, "here");
        });
    },
    // staff log in
    async staffLogin(context, payload) {
      context.state.staffLoginInfo = payload;
      await axios
        .post(context.state.URL + "/loginStaff", payload)
        .then((res) => {
          console.log(res.data);
          const token = res.data.token;
          // store the token in local storage
          localStorage.setItem("staff_token", token);
          context.state.staffLogin = true;
          context.state.staffInfo = res.data.staff_info;
          localStorage.setItem("airline", res.data.staff_info.airline_name);
          alert("Welcome.");
          router.replace("/");
        })
        .catch((err) => {
          alert(err.response.data);
          console.log(err, "here");
        });
    },
    // log out
    async logout(context) {
      await axios
        .post(context.state.URL + "/logout")
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem("cust_token");
          localStorage.removeItem("staff_token");
          localStorage.removeItem("airline");
          context.state.staffLogin = false;
          context.state.customerLogin = false;
          alert("Bye");
          router.replace("/");
        })
        .catch((err) => {
          console.log(err, "here");
        });
    },
    // get the flight data from the server
    async getAllFlightData(context) {
      try {
        let flightData = await axios.get(context.state.URL + "/allFlights");
        flightData.data.forEach((flight) => {
          parseDate(flight);
        });
        context.state.flightData = flightData.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllFutureFlightData(context) {
      try {
        let futureFlightData = await axios.get(
          context.state.URL + "/futureFlights"
        );
        futureFlightData.data.forEach((flight) => {
          parseDate(flight);
        });
        context.state.futureFlightData = futureFlightData.data;
      } catch (error) {
        console.log(error);
      }
    },
    async searchByFlightNum(context, payload) {
      context.state.flightNumSearchInfo = payload;
      await axios
        .post(context.state.URL + "/searchByFlightNum", payload)
        .then((res) => {
          res.data.forEach((flight) => {
            parseDate(flight);
          });
          context.state.searchFlightResult = res.data;
        })
        .catch((err) => {
          console.log(err, "here");
        });
    },
    async searchByRoundTrip(context, payload) {
      context.state.roundTripSearchInfo = payload;
      await axios
        .post(context.state.URL + "/searchByRoundTrip", payload)
        .then((res) => {
          if (res.data.length === 0) {
            throw new Error("No flight found");
          }
          res.data.forEach((flight) => {
            parseDate(flight);
          });
          context.state.searchFlightResult = res.data;
        })
        .catch((err) => {
          alert(err.message);
          console.log(err, "here");
        });
    },
    async searchByOneWay(context, payload) {
      context.state.oneWaySearchInfo = payload;
      await axios
        .post(context.state.URL + "/searchByOneWay", payload)
        .then((res) => {
          res.data.forEach((flight) => {
            parseDate(flight);
          });
          context.state.searchFlightResult = res.data;
        })
        .catch((err) => {
          console.log(err, "here");
        });
    },
    // get the top three arrival cities for the last three months with specified airline name and range of dates in request body
    async getCityThreeMonths(context) {
      let airline = context.state.staffInfo.airline_name;
      if (!airline) {
        // pull the airline name from local storage
        airline = localStorage.getItem("airline");
      }
      let startDate = moment()
        .subtract(3, "months")
        .format("YYYY-MM-DD");
      let endDate = moment().format("YYYY-MM-DD");
      try {
        let topThreeArrivalCities = await axios.post(
          context.state.URL + "/topThreeArrivalAirports",
          {
            airline_name: airline,
            start_date: startDate,
            end_date: endDate,
          }
        );
        context.state.popularCityThreeMonths = topThreeArrivalCities.data;
      } catch (error) {
        console.log(error);
      }
    },
    // get the top three arrival cities for the last year with specified airline name and range of dates in request body
    async getCityLastYear(context) {
      let airline = context.state.staffInfo.airline_name;
      if (!airline) {
        // pull the airline name from local storage
        airline = localStorage.getItem("airline");
      }
      let startDate = moment()
        .subtract(1, "year")
        .format("YYYY-MM-DD");
      let endDate = moment().format("YYYY-MM-DD");
      try {
        let topThreeArrivalCities = await axios.post(
          context.state.URL + "/topThreeArrivalAirports",
          {
            airline_name: airline,
            start_date: startDate,
            end_date: endDate,
          }
        );
        context.state.popularCityLastYear = topThreeArrivalCities.data;
      } catch (error) {
        console.log(error);
      }
    },
    // get a list of flight taken by a particular customer
    async getCustomerFlight(context, customerInfo) {
      console.log("getting a single customer's flight");
      console.log(customerInfo);
      try {
        let customerName;
        let isFreq;
        if (customerInfo.email) {
          customerName = customerInfo.email;
          isFreq = customerInfo.isFreq;
        } else {
          customerName = customerInfo;
        }
        let customerFlight = await axios.post(
          context.state.URL + "/customerFlights",
          {
            email: customerName,
          }
        );
        customerFlight.data.flights.forEach((flight) => {
          parseDate(flight);
        });
        if (isFreq) {
          context.state.frequentCustomer.flights = customerFlight.data.flights;
          return;
        } else {
          context.state.singleCustomer.flights = customerFlight.data.flights;
        }
        let pastFlights = [];
        customerFlight.data.flights.forEach((flight) => {
          if (new Date(flight.dept_date) < new Date()) {
            pastFlights.push(flight);
          }
        });
        context.state.singleCustomer.pastFlights = pastFlights;
        // fill out the future flight array based on all the flights
        let futureFlights = [];
        customerFlight.data.flights.forEach((flight) => {
          if (new Date(flight.dept_date) > new Date()) {
            futureFlights.push(flight);
          }
        });
        context.state.singleCustomer.futureFlights = futureFlights;
      } catch (error) {
        console.log(error);
      }
    },
    // get the most frequent customer for the last six months with specified airline name request body
    async getFrequentCustomer(context) {
      let airline = context.state.staffInfo.airline_name;
      if (!airline) {
        // get the airline data from local storage
        airline = localStorage.getItem("airline");
      }
      try {
        let mostFrequentCustomer = await axios.post(
          context.state.URL + "/mostFrequentCustomer",
          {
            airline_name: airline,
          }
        );
        context.state.frequentCustomer = mostFrequentCustomer.data.customer;
        // geth the flight taken by this customer based on the customer email
        await context.dispatch("getCustomerFlight", {
          email: context.state.frequentCustomer.email,
          isFreq: true,
        });
      } catch (error) {
        console.log(error);
      }
    },
    // get the tickets sold in last year
    async getTicketsSold(context) {
      let airline = context.state.staffInfo.airline_name;
      if (!airline) {
        // pull the airline name from local storage
        airline = localStorage.getItem("airline");
      }
      let startDate = moment()
        .subtract(1, "year")
        .format("YYYY-MM-DD");
      let endDate = moment().format("YYYY-MM-DD");
      try {
        let ticketSold = await axios.post(
          context.state.URL + "/airlineTickets",
          {
            airline_name: airline,
            start_date: startDate,
            end_date: endDate,
          }
        );
        context.state.ticketSold = ticketSold.data;
        // map each ticket sold to a month, value would be the number of tickets sold
        context.state.ticketSold.forEach((ticket) => {
          ticket.month = moment(ticket.purchase_date).format("MMM");
        });
      } catch (error) {
        console.log(error);
      }
    },
    // get the tickets sold in a specified range
    async getTicketSoldInRange(context, payload) {
      let airline = context.state.staffInfo.airline_name;
      if (!airline) {
        // pull the airline name from local storage
        airline = localStorage.getItem("airline");
      }
      try {
        let ticketSold = await axios.post(
          context.state.URL + "/airlineTickets",
          {
            airline_name: airline,
            start_date: payload.startDate,
            end_date: payload.endDate,
          }
        );
        context.state.ticketSoldInRange = ticketSold.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getSingleFlight(context, flightNum) {
      try {
        let singleFlight = await axios.post(
          context.state.URL + "/singleFlight",
          {
            flight_num: flightNum,
          }
        );
        context.state.singleFlight = { ...singleFlight.data.flight };
        let totalSeat = singleFlight.data.totalSeat;
        context.state.singleFlight.remaining_seats =
          singleFlight.data.remaining_seats;
        parseDate(context.state.singleFlight);
        let basePrice = context.state.singleFlight.base_price;
        if (context.state.singleFlight.remaining_seats / totalSeat <= 0.25) {
          basePrice = basePrice * 1.25;
          context.state.singleFlight.base_price = basePrice;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCustProfileInfo(context) {
      let email = context.state.custInfo.email;
      // call the get single customer flight action
      await context.dispatch("getCustomerFlight", email);
      // call the get customer tickets action
      await context.dispatch("getcustTickets", email);
    },
    async getcustTickets(context) {
      let email = context.state.custInfo.email;
      let startDate = moment()
        .subtract(1, "year")
        .format("YYYY-MM-DD");
      let endDate = moment().format("YYYY-MM-DD");
      try {
        let ticketBought = await axios.post(
          context.state.URL + "/custTickets",
          {
            email: email,
            start_date: startDate,
            end_date: endDate,
          }
        );
        context.state.custTickets = ticketBought.data;
        // map each ticket sold to a month, value would be the number of tickets sold
        context.state.custTickets.forEach((ticket) => {
          ticket.month = moment(ticket.purchase_date).format("MMM");
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getTicketBoughtInRange(context, payload) {
      let email = context.state.custInfo.email;
      try {
        let ticketBought = await axios.post(
          context.state.URL + "/custTickets",
          {
            email: email,
            start_date: payload.startDate,
            end_date: payload.endDate,
          }
        );
        context.state.custTicketsInRange = ticketBought.data;
      } catch (error) {
        console.log(error);
      }
    },
    async custPurchase(context, payload) {
      // get cust email
      let email = context.state.custInfo.email;
      let flightNum = context.state.singleFlight.flight_num;
      let price = context.state.singleFlight.base_price;
      let airlineName = context.state.singleFlight.airline_name;
      let dptDate = context.state.singleFlight.dept_date;
      let dptTime = context.state.singleFlight.dept_time;
      try {
        let purchaseRecord = await axios.post(
          context.state.URL + "/flightPurchase",
          {
            email: email,
            purchaseInfo: payload,
            purchasePrice: price,
            airlineName: airlineName,
            flightNumber: flightNum,
            deptDate: dptDate,
            deptTime: dptTime,
          }
        );
        console.log(purchaseRecord.status);
        alert("Purchase success");
        router.push("/");
      } catch (error) {
        console.log(error);
        alert("Purchase failed");
        router.push("/");
      }
    },

    async submitReview(context, payload) {
      let email = context.state.custInfo.email;
      let flightNum = context.state.singleFlight.flight_num;
      let airlineName = context.state.singleFlight.airline_name;
      let dptDate = context.state.singleFlight.dept_date;
      let dptTime = context.state.singleFlight.dept_time;
      try {
        let feedbackRecord = await axios.post(
          context.state.URL + "/addReview",
          {
            email,
            flightNum,
            airlineName,
            dptDate,
            dptTime,
            feedback: payload,
          }
        );
        alert("Review submitted");
        if (feedbackRecord.data.status == 500) {
          throw Error(feedbackRecord.data.message);
        }
      } catch (err) {
        alert(err);
      }
      router.push("/");
    },
    async getFlightInRangeForStaff(context, payload) {
      let airline = context.state.staffInfo.airline_name;
      let startDate = payload.pickedDates[0];
      let endDate = payload.pickedDates[1];
      // change the start date and end date to ISO string
      startDate = moment(startDate).format("YYYY-MM-DD");
      endDate = moment(endDate).format("YYYY-MM-DD");
      try {
        let flightInRange = await axios.post(
          context.state.URL + "/searchByDateRange",
          {
            airline_name: airline,
            start_date: startDate,
            end_date: endDate,
          }
        );
        console.log(flightInRange.data);
        // parse the date
        flightInRange.data.forEach((flight) => {
          parseDate(flight);
        });
        context.state.searchFlightResult = flightInRange.data;
      } catch (error) {
        console.log(error);
      }
    },
    // change a flight status
    async toggleFlightStatus(context, payload) {
      let flightNum = payload;
      console.log(flightNum);
      // get the information of the flight
      console.log(context.state.futureFlightData);
      let flight = context.state.futureFlightData.find(
        (flight) => flight.flight_num == flightNum
      );
      // extract the airline name, dept date and dept time
      let airlineName = flight.airline_name;
      let dptDate = flight.dept_date;
      let dptTime = flight.dept_time;
      console.log(airlineName, dptDate, dptTime, flightNum);
      try {
        let flightStatus = await axios.post(
          context.state.URL + "/toggleFlightStatus",
          {
            flight_num: flightNum,
            airline_name: airlineName,
            dept_date: dptDate,
            dept_time: dptTime,
          }
        );
        console.log(flightStatus.data);
      } catch (error) {
        console.log(error);
      }
    },
    // add a new flight to the database
    async addNewFlight(context, payload) {
      console.log(payload);
      try {
        let addFlight = await axios.post(context.state.URL + "/addFlight", {
          payload,
          airline_name: context.state.staffInfo.airline_name,
        });
        alert(addFlight.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    // add new airplane to the database
    async addNewAirplane(context, payload) {
      console.log(payload);
      console.log(context.state.staffInfo.airline_name);
      try {
        await axios.post(context.state.URL + "/addAirplane", {
          airline_name: context.state.staffInfo.airline_name,
          airplane_id: payload.ID,
          seat_amt: payload.seat_amt,
        });
        await context.dispatch("getAllAirplanes");
        alert("Add airplane success");
      } catch (error) {
        alert("Add airplane failed");
        console.log(error);
      }
    },

    // find all the airplanes that belong to the airline
    async getAllAirplanes(context) {
      let airlineName = context.state.staffInfo.airline_name;
      try {
        let airplane = await axios.post(
          context.state.URL + "/getAllAirplanes",
          {
            airline_name: airlineName,
          }
        );
        context.state.airplaneList = airplane.data;
      } catch (error) {
        console.log(error);
      }
    },

    // add new airport to the database
    async addNewAirport(context, payload) {
      console.log(payload);
      try {
        let airport = await axios.post(context.state.URL + "/addAirport", {
          airport_name: payload.airport_name,
          city: payload.city,
          airport_code: payload.airport_code,
        });
        console.log(airport.data);
        alert("Add airport success");
      } catch (error) {
        alert("Failed to add airport");
        console.log(error);
      }
    },

    // get ratings of a flight
    async getRatings(context) {
      let flightNum = context.state.singleFlight.flight_num;
      let airlineName = context.state.singleFlight.airline_name;
      let dptDate = context.state.singleFlight.dept_date;
      let dptTime = context.state.singleFlight.dept_time;
      try {
        let customers = await axios.post(
          context.state.URL + "/getAllCustomers",
          {
            flight_num: flightNum,
            airline_name: airlineName,
            dept_date: dptDate,
            dept_time: dptTime,
          }
        );
        console.log(customers.data);
        let allRatings = await axios.post(
          context.state.URL + "/getAllRatings",
          {
            flight_num: flightNum,
            airline_name: airlineName,
            dept_date: dptDate,
            dept_time: dptTime,
          }
        );
        customers = customers.data;
        // For each rating in allRatings array, find the corresponding customer
        // in customers array
        for (let i = 0; i < allRatings.data.length; i++) {
          let row = allRatings.data[i];
          for (let j = 0; j < customers.length; j++) {
            let customer = customers[j];
            if (row.email == customer.email) {
              customer.rating = row.rating;
              customer.comment = row.comment;
            }
          }
        }
        context.state.ratingsAndCustomer = customers;
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    user(state) {
      return state.username;
    },
    pass(state) {
      return state.password;
    },
    // get the data for the flight
    getAllFlightData(state) {
      return state.flightData;
    },
    getFrequentCustomer(state) {
      // change the DOB into just the date
      let customer = state.frequentCustomer;
      customer.DOB = new Date(customer.DOB).toLocaleDateString();
      return customer;
    },
    getTicketsSold(state) {
      return state.ticketSold;
    },
    getCityThreeMonths(state) {
      let cityThreeMonths = state.popularCityThreeMonths;
      cityThreeMonths.forEach((city, idx) => {
        city.rank = idx + 1;
      });
      return cityThreeMonths;
    },
    getCityLastYear(state) {
      let cityLastYear = state.popularCityLastYear;
      cityLastYear.forEach((city, idx) => {
        city.rank = idx + 1;
      });
      return cityLastYear;
    },
    getRevenueLastMonth: (state) => {
      // based on the ticket sold in last month, calculate the revenue
      let revenue = 0;
      let ticketsSold = state.ticketSold.filter((ticket) => {
        // if the ticket is in the last month, return it
        if (
          moment(ticket.purchase_date).isAfter(moment().subtract(1, "month")) &&
          moment(ticket.purchase_date).isBefore(moment())
        ) {
          return ticket;
        }
      });
      ticketsSold.forEach((ticket) => {
        revenue += ticket.sold_price;
      });
      return revenue;
    },
    getRevenueLastYear: (state) => {
      // based on the ticket sold in last year, calculate the revenue
      let revenue = 0;
      let ticketsSold = state.ticketSold.filter((ticket) => {
        // if the ticket is in the last year, return it
        if (
          moment(ticket.purchase_date).isAfter(moment().subtract(1, "year")) &&
          moment(ticket.purchase_date).isBefore(moment())
        ) {
          return ticket;
        }
      });
      ticketsSold.forEach((ticket) => {
        revenue += ticket.sold_price;
      });
      return revenue;
    },
    getDelayedFlightLastYear: (state) => {
      // from the flight data array, get the flights that are delayed in the last year
      let airline = state.staffInfo.airline_name;
      if (!airline) {
        // pull the airline name from local storage
        airline = localStorage.getItem("airline");
      }
      let delayedFlightLastYear = state.flightData.filter((flight) => {
        // if the flight is delayed in the last year, return it
        if (
          moment(flight.dept_datetime).isAfter(moment().subtract(1, "year")) &&
          moment(flight.dept_datetime).isBefore(moment()) &&
          flight.flight_status == "Delay" &&
          flight.airline_name == airline
        ) {
          return flight;
        }
      });
      return delayedFlightLastYear;
    },
    getDelayedFlightLastSixMonth: (state) => {
      // from the flight data array, get the flights that are delayed in the last month
      if (!airline) {
        // pull the airline name from local storage
        airline = localStorage.getItem("airline");
      }
      let airline = state.staffInfo.airline_name;
      let delayedFlightLastMonth = state.flightData.filter((flight) => {
        // if the flight is delayed in the last month, return it
        if (
          moment(flight.dept_datetime).isAfter(moment().subtract(6, "month")) &&
          moment(flight.dept_datetime).isBefore(moment()) &&
          flight.flight_status == "Delay" &&
          flight.airline_name == airline
        ) {
          return flight;
        }
      });
      return delayedFlightLastMonth;
    },
    getSearchResult(state) {
      // if the staff is searching for a flight, return only the flight belongs to that airline
      if (state.staffLogin) {
        let airline = state.staffInfo.airline_name;
        let searchResult = state.searchFlightResult.filter((flight) => {
          if (flight.airline_name == airline) {
            return flight;
          }
        });
        if (searchResult.length > 0) {
          return searchResult;
        }
      }
      // if the search result is not empty, return it
      if (state.searchFlightResult.length > 0) {
        return state.searchFlightResult;
      }
    },
    getAllFutureFlightDataForStaff(state) {
      let airline = state.staffInfo.airline_name;
      let futureFlightDataForStaff = state.futureFlightData;
      let result = futureFlightDataForStaff.filter((flight) => {
        let withtIn30Days = moment(flight.dept_datetime).isSameOrBefore(
          moment().add(30, "days")
        );
        if (flight.airline_name == airline && withtIn30Days) {
          return true;
        }
      });
      return result;
    },
  },

  modules: {},
});
