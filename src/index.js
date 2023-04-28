import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from './App';
import reportWebVitals from "./reportWebVitals";
import ItemList from "./Components/ItemList";
import Navigation from "./Components/Navigation";
import Categories from "./Components/Categories";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserProfile from "./Components/UserProfile";
import DonationList from "./Components/DonationList";
import { donations } from "./Consts/donations";
import { clothes } from "./Consts/clothes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/index.css";
import "./CSS/App.css";
import "tachyons";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navigation />
      </>
    ),
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Categories />
            <ItemList items={clothes} />
          </>
        ),
      },
      {
        path: "/donation",
        element: <DonationList donations={donations} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
