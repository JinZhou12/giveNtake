import { createRouter, createWebHashHistory} from "vue-router";
// import store from "../store/index.js";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Detail from "../views/Detail";
import s_Profile from "../views/StaffProfile.vue";
import Report from "../views/Report.vue";
import c_Profile from "../views/CustomerProfile.vue";
import Search from "../views/Search.vue";
import Purchase from "../views/Purchase.vue";
import Review from "../views/Review.vue";
import Ratings from "../views/Ratings.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (
        localStorage.getItem("staff_token") ||
        localStorage.getItem("cust_token")
      ) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter(to, from, next) {
      if (
        localStorage.getItem("staff_token") ||
        localStorage.getItem("cust_token")
      ) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/detail/:flightNum",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/review/:flightNum",
    name: "Review",
    component: Review,
  },
  {
    path: "/staff_profile",
    name: "staff_Profile",
    component: s_Profile,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("staff_token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/ratings/:flightNum",
    name: "Ratings",
    component: Ratings,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("staff_token")) {
        next();
      } else {
        alert("Only logged in staff can view flight rating");
        next("/");
      }
    },
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("staff_token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/customer_profile",
    name: "customer_Profile",
    component: c_Profile,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("cust_token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/purchase/:flightNum",
    name: "Purchase",
    component: Purchase,
    beforeEnter(to, from, next) {
      if (localStorage.getItem("cust_token")) {
        next();
      } else {
        alert("Please login as a customer before making any purchase");
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
