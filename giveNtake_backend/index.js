/*
Youtube Video reference for DB project
https://www.youtube.com/watch?v=YYEC7ydDj4k&ab_channel=Simplilearn
*/

const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const md5 = require("md5");
const moment = require("moment");
const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "airline_reservation",
  connectionLimit: 30,
});
const app = express();

app.use(express.json());
app.use(cors());

// -- CREATING TABLES --
// CREATE TABLE Customer(
// email VARCHAR(255) NOT NULL,
// cust_password VARCHAR(320) NOT NULL,
// cust_name VARCHAR (70) NOT NULL,
// building_num INT,
// street VARCHAR(255),
// city VARCHAR(200),
// state VARCHAR(255),
// phone_num BIGINT,
// passport_num VARCHAR(10),
// passport_exp DATE,
// passport_country VARCHAR(90),
// DOB DATE,
// PRIMARY KEY (email)
// );

// CREATE TABLE AirlineStaff(
// username VARCHAR(255) NOT NULL,
// staff_password VARCHAR(320) NOT NULL,
// first_name VARCHAR (35) NOT NULL,
// last_name VARCHAR (35) NOT NULL,
// DOB DATE,
// airline_name VARCHAR(255) NOT NULL,
// FOREIGN KEY (airline_name) REFERENCES Airline(airline_name),
// PRIMARY KEY (username)
// );

// CREATE TABLE Ticket(
// ID VARCHAR(20) NOT NULL,
// sold_price INT NOT NULL,
// card_number VARCHAR(20) NOT NULL,
// card_type VARCHAR(10) NOT NULL,
// exp_date DATE NOT NULL,
// name_on_card VARCHAR(70) NOT NULL,
// purchase_date DATE NOT NULL,
// purchase_time TIME NOT NULL,
// airline_name VARCHAR(255),
// flight_num VARCHAR(10),
// dept_date DATE,
// dept_time TIME,
// FOREIGN KEY (airline_name,flight_num,dept_time,dept_date) REFERENCES Flight(airline_name,flight_num,dept_time,dept_date)
// on delete cascade on update cascade,
// PRIMARY KEY (ID)
// );

// CREATE TABLE Airport(
// airport_code VARCHAR(5) NOT NULL,
// airport_name VARCHAR(255),
// city VARCHAR(50),
// PRIMARY KEY (airport_code)
// );

// CREATE TABLE Flight(
// airline_name VARCHAR(255),
// flight_num VARCHAR(10) NOT NULL,
// dept_time TIME NOT NULL,
// dept_date DATE NOT NULL,
// arr_time TIME NOT NULL,
// arr_date DATE NOT NULL,
// base_price FLOAT NOT NULL,
// airplane_id VARCHAR(50),
// flight_status VARCHAR(10) NOT NULL,
// dept_airport VARCHAR(5),
// arr_airport VARCHAR(5),
// airplane_airline_name VARCHAR(255),
// FOREIGN KEY (airline_name) REFERENCES Airline(airline_name),
// FOREIGN KEY (airplane_id,airplane_airline_name) REFERENCES Airplane(ID,airline_name),
// FOREIGN KEY (dept_airport) REFERENCES Airport(airport_code),
// FOREIGN KEY (arr_airport) REFERENCES Airport(airport_code),
// PRIMARY KEY (airline_name,flight_num,dept_time,dept_date)
// );

// CREATE TABLE Airline(
// airline_name VARCHAR(255) NOT NULL,
// PRIMARY KEY (airline_name)
// );

// CREATE TABLE Airplane(
// airline_name VARCHAR(255),
// foreign key (airline_name) REFERENCES Airline(airline_name),
// ID VARCHAR(50) NOT NULL,
// seat_amt INT NOT NULL,
// PRIMARY KEY (airline_name, ID),
// INDEX(ID)
// );

// CREATE TABLE Feedback(
// email VARCHAR(255),
// airline_name VARCHAR(255),
// flight_num VARCHAR(10),
// dept_time TIME,
// dept_date DATE,
// comment VARCHAR(200),
// rating FLOAT,
// FOREIGN KEY (airline_name,flight_num,dept_time,dept_date) REFERENCES Flight(airline_name,flight_num,dept_time,dept_date)
// on delete cascade on update cascade,
// FOREIGN KEY (email) REFERENCES Customer(email),
// PRIMARY KEY (email,airline_name,flight_num,dept_time,dept_date)
// )

// CREATE TABLE Purchase(
// email VARCHAR(255),
// ticket_id VARCHAR(20),
// FOREIGN KEY (email) REFERENCES Customer(email),
// FOREIGN KEY (ticket_id) REFERENCES Ticket(ID),
// PRIMARY KEY (email,ticket_id)
// )

// CREATE TABLE StaffPhoneNum(
// username VARCHAR(255),
// phone_num BIGINT,
// FOREIGN KEY(username) REFERENCES AirlineStaff(username),
// PRIMARY KEY(username,phone_num)
// )

// ===========================
// User Authentication
// ===========================

// customer sign up
app.post("/newCustomer", (req, res) => {
  const {
    email,
    password,
    name,
    building_num,
    street,
    city,
    state,
    phone_num,
    passport_num,
    passport_exp,
    passport_country,
    birth,
  } = req.body;
  // check if the user already exists
  //   console.log(DOB);
  // convert DOB into mysql date format
  const birth_mysql = `${birth.slice(0, 4)}/${birth.slice(5, 7)}/${birth.slice(
    8,
    10
  )}`;
  // convert passport_exp into mysql date format
  const passport_exp_mysql = `${passport_exp.slice(0, 4)}/${passport_exp.slice(
    5,
    7
  )}/${passport_exp.slice(8, 10)}`;
  const hashedPassword = md5(password);
  connection.query(
    `SELECT * FROM Customer WHERE email = '${email}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (result.length > 0) {
        // send back a message saying the user already exists
        res.status(400).send("User already exists");
      } else {
        const query = `INSERT INTO Customer(email,cust_password,cust_name,building_num,street,city,state,phone_num,passport_num,passport_exp,passport_country,DOB) VALUES (
            '${email}',
            '${hashedPassword}',
            '${name}',
            ${building_num},
            '${street}',
            '${city}',
            '${state}',
            ${phone_num},
            '${passport_num}',
            '${passport_exp_mysql}',
            '${passport_country}',
            '${birth_mysql}'
        )`;
        // use md5 to hash the password
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            res.status(200).send(result);
          }
        });
      }
    }
  );
});

// customer login
app.post("/loginCustomer", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = md5(password);
  // select the user with the same email
  connection.query(
    `SELECT * FROM Customer WHERE email = '${email}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (result.length === 0) {
        // send back a message saying the user does not exist
        res.status(400).send("User does not exist");
      } else {
        // check if the password is correct
        if (result[0].cust_password === hashedPassword) {
          // send back the user information without the password
          const {
            cust_name,
            building_num,
            street,
            city,
            state,
            phone_num,
            passport_num,
            passport_exp,
            passport_country,
            DOB,
          } = result[0];
          const cust_info = {
            cust_name,
            email,
            building_num,
            street,
            city,
            state,
            phone_num,
            passport_num,
            passport_exp,
            passport_country,
            DOB,
          };
          // create a token for the user
          const token = jwt.sign(cust_info, "secret", {
            expiresIn: "1h",
          });
          res.status(200).send({ token, cust_info });
        } else {
          // send back a message saying the password is incorrect
          res.status(400).send("Incorrect password");
        }
      }
    }
  );
});

// staff sign up
app.post("/newStaff", (req, res) => {
  const { username, password, first_name, last_name, birth, airline_name } =
    req.body;
  const birth_mysql = `${birth.slice(0, 4)}/${birth.slice(5, 7)}/${birth.slice(
    8,
    10
  )}`;
  const hashedPassword = md5(password);
  connection.query(
    `SELECT * FROM AirlineStaff WHERE username = '${username}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (result.length > 0) {
        res.status(400).send("User already exists");
      } else {
        const query = `INSERT INTO AirlineStaff(username,staff_password,first_name,last_name,DOB,airline_name) VALUES (
                    '${username}',
                    '${hashedPassword}',
                    '${first_name}',
                    '${last_name}',
                    '${birth_mysql}',
                    '${airline_name}'
                )`;
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            res.status(200).send(result);
          }
        });
      }
    }
  );
});
// staff login
app.post("/loginStaff", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = md5(password);
  // select the user with the same username
  connection.query(
    `SELECT * FROM AirlineStaff WHERE username = '${username}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (result.length === 0) {
        // send back a message saying the user does not exist
        res.status(400).send("User does not exist");
      } else {
        // check if the password is correct
        if (result[0].staff_password === hashedPassword) {
          // send back the user information without the password
          const { first_name, last_name, DOB, airline_name } = result[0];
          const staff_info = {
            username,
            first_name,
            last_name,
            DOB,
            airline_name,
          };
          // create a token for the user
          const token = jwt.sign(staff_info, "secret", {
            expiresIn: "1h",
          });
          res.status(200).send({ token, staff_info });
        } else {
          // send back a message saying the password is incorrect
          res.status(400).send("Incorrect password");
        }
      }
    }
  );
});

// check if the user is logged in
app.get("/auth", (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized");
      } else {
        res.status(200).send(decoded);
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

// log out for both customer and staff
app.post("/logout", (req, res) => {
  res.status(200).send("Logged out");
});

// ===========================
// The main get requests
// ===========================

// initialize connection to database

// get all flights - do we really need this?
app.get("/allFlights", (req, res) => {
  // select all the flight data
  connection.query("SELECT * FROM Flight", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      res.status(500).send(err);
      console.log(err);
    }
  });
});

// get all future flights
app.get("/futureFlights", (req, res) => {
  // select all the flight data
  connection.query(
    "SELECT * FROM Flight WHERE dept_date > CURDATE()",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// get the most frequent customer that took the airline specified in request body
app.post("/mostFrequentCustomer", (req, res) => {
  // search for all the customers that bought the airline's tickets and count the number of times they bought
  connection.query(
    `SELECT COUNT(*) AS num_of_purchases, Customer.email 
    FROM Customer, Purchase 
    WHERE Customer.email = Purchase.email 
    AND Purchase.ticket_id IN 
    (
        SELECT Ticket.ID 
        FROM Ticket 
        WHERE Ticket.airline_name = ?
    ) 
    GROUP BY Customer.email 
    ORDER BY num_of_purchases DESC LIMIT 1`,
    [req.body.airline_name],
    (err, rows) => {
      if (!err) {
        // send the email of the customer with the most purchases
        customoer_email = rows[0].email;
        // search the customer information from the customer table
        connection.query(
          `SELECT email, cust_name, DOB 
                FROM Customer 
                WHERE email = ?`,
          [customoer_email],
          (err, rows) => {
            if (!err) {
              // send the customer information as well as the number of purchases
              res.send({ customer: rows[0] });
            } else {
              res.send(err);
              console.log(err);
            }
          }
        );
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// get all the flights taken by a customer with the specified email and specified airline in request body, return a list of flights
app.post("/customerFlights", (req, res) => {
  // if the airline name is specified
  if (req.body.airline_name) {
    connection.query(
      `SELECT *
        FROM Flight
        WHERE airline_name = ?
        AND flight_num IN
        (
            SELECT Ticket.flight_num
            FROM Ticket
            WHERE Ticket.ID IN
            (
                SELECT Purchase.ticket_id
                FROM Purchase
                WHERE Purchase.email = ?
            )
        )`,
      [req.body.airline_name, req.body.email],
      (err, rows) => {
        if (!err) {
          res.send({
            flights: rows,
            cust_email: req.body.email,
          });
        } else {
          res.send(err);
          console.log(err);
        }
      }
    );
  } else {
    // search the flight taken by the customer
    connection.query(
      `SELECT *
        FROM Flight
        WHERE flight_num IN
        (
            SELECT Ticket.flight_num
            FROM Ticket
            WHERE Ticket.ID IN
            (
                SELECT Purchase.ticket_id
                FROM Purchase
                WHERE Purchase.email = ?
            )
        )`,
      [req.body.email],
      (err, rows) => {
        if (!err) {
          res.send({
            flights: rows,
            cust_email: req.body.email,
          });
        } else {
          res.send(err);
          console.log(err);
        }
      }
    );
  }
});

// select all the tickets sold by a airline with the specified airline name in request body in a range of dates, return a list of tickets
// this will be used on the frontend to calculate the revenue of an airline and display them accordingly (monthly, yearly, etc)
app.post("/airlineTickets", (req, res) => {
  console.log(req.body);
  connection.query(
    `SELECT *
    FROM Ticket
    WHERE airline_name = ?
    AND purchase_date BETWEEN ? AND ?`,
    [req.body.airline_name, req.body.start_date, req.body.end_date],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// find the top three arrival airports based on the specified date range in the request body, based on the sold tickets of a specified airline
app.post("/topThreeArrivalAirports", (req, res) => {
  connection.query(
    `SELECT COUNT(*) AS num_of_purchases, arr_airport
    FROM Ticket JOIN Flight
    ON Ticket.flight_num = Flight.flight_num
    WHERE Ticket.airline_name = ?
    AND Ticket.purchase_date BETWEEN ? AND ?
    GROUP BY arr_airport
    ORDER BY num_of_purchases DESC
    LIMIT 3`,
    [req.body.airline_name, req.body.start_date, req.body.end_date],
    (err, rows) => {
      if (!err) {
        // if the city name is needed, we will need to search the city name from the airport table, if not let's just ignore it
        res.send(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// find a single flight based on the flight number in the request body
app.post("/singleFlight", (req, res) => {
  connection.query(
    `SELECT *
    FROM Flight
    WHERE flight_num = ?`,
    [req.body.flight_num],
    (err, rows) => {
      if (!err && rows.length > 0) {
        let flightInfo = rows[0];
        // after finding the flight, find the remaining seats based on sold tickets of the flight and total seat_amt of this flight specified in Airplane table
        connection.query(
          `
                SELECT COUNT(*) AS sold_seats
                FROM Ticket
                WHERE Ticket.flight_num = ?
                `,
          [req.body.flight_num],
          (err, rows) => {
            if (!err && rows.length > 0) {
              let sold_seats = rows[0].sold_seats;
              // after finding the sold seats, find the total seats of this flight
              connection.query(
                `
                            SELECT seat_amt
                            FROM Airplane
                            WHERE ID = ?
                            `,
                [flightInfo.airplane_id],
                (err, rows) => {
                  if (!err && rows.length > 0) {
                    let remainging_seats = rows[0].seat_amt - sold_seats;
                    res.send({
                      flight: flightInfo,
                      remaining_seats: remainging_seats,
                      totalSeat: rows[0].seat_amt,
                    });
                  } else {
                    res.send(err);
                    console.log(err);
                  }
                }
              );
            } else {
              res.send(err);
              console.log(err);
            }
          }
        );
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// get last year ticket
app.post("/custTickets", (req, res) => {
  connection.query(
    `SELECT *
    FROM Ticket
    WHERE ID IN (
      SELECT Ticket.ID
      FROM Ticket
      WHERE Ticket.ID IN (
        SELECT Purchase.ticket_id
        FROM Purchase
        WHERE Purchase.email = ? 
      )
    )
    AND purchase_date BETWEEN ? AND ?`,
    [req.body.email, req.body.start_date, req.body.end_date],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/flightPurchase", (req, res) => {
  let purchase_date = new Date();
  let purchase_time = new Date();
  purchase_date = moment(purchase_date).format("YYYY-MM-DD");
  purchase_time = moment(purchase_time).format("HH:mm:ss");
  let dept_date = req.body.deptDate.split("T")[0];
  let ticket_id = Math.floor(Math.random() * 1000000000);
  let expireDate = req.body.purchaseInfo.card_exp;
  expireDate = moment(expireDate).format("YYYY-MM-DD");
  connection.query(
    `insert into Ticket (sold_price, card_number, card_type, exp_date, name_on_card, purchase_date, purchase_time, airline_name, flight_num, dept_date, dept_time,ID)
    values (?,?,?,?,?,?,?,?,?,?,?,?)
    `,
    [
      req.body.purchasePrice,
      req.body.purchaseInfo.card_num,
      req.body.purchaseInfo.card_type,
      expireDate,
      req.body.purchaseInfo.name,
      purchase_date,
      purchase_time,
      req.body.airlineName,
      req.body.flightNumber,
      dept_date,
      req.body.deptTime,
      ticket_id,
    ],
    (err, rows) => {
      if (!err) {
        connection.query(
          `insert into Purchase (email,ticket_id)
          values (?,?)`,
          [req.body.email, ticket_id],
          (err, rows) => {
            if (!err) {
              res.send({
                success: true,
              });
            } else {
              res.send(err);
              console.log(err);
            }
          }
        );
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/getAllRatings", (req, res) => {
  let dept_date = req.body.dept_date.split("T")[0];
  // get all the feedbacks from the feedback table based on the specified flight number, dept date, dept time and airline name
  connection.query(
    `SELECT *
    FROM Feedback
    WHERE flight_num = ?
    AND dept_date = ?
    AND dept_time = ?
    AND airline_name = ?`,
    [req.body.flight_num, dept_date, req.body.dept_time, req.body.airline_name],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// get all the customer that took a certain flight with specified flight num, dept date, dept time, airline name in the request body
app.post("/getAllCustomers", (req, res) => {
  // parse the dept date
  let customers = [];
  let dept_date = req.body.dept_date.split("T")[0];
  connection.query(
    `SELECT *
    FROM Customer
    WHERE email IN (
      SELECT Purchase.email
      FROM Purchase
      WHERE Purchase.ticket_id IN (
        SELECT Ticket.ID
        FROM Ticket
        WHERE Ticket.airline_name = ?
        AND Ticket.flight_num = ?
        AND Ticket.dept_date = ?
        AND Ticket.dept_time = ?
      )
    )
    `,
    [req.body.airline_name, req.body.flight_num, dept_date, req.body.dept_time],
    (err, rows) => {
      if (!err) {
        // find all the feedbacks of all the customer found, if there's no feedback, initialize it to be an empty string
        customers = rows;
        // initialize the rating and comment to be empty string
        for (let i = 0; i < customers.length; i++) {
          customers[i].rating = "";
          customers[i].comment = "N/A";
        }
        res.send(customers);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// get all the airplanes that belongs to the specified airline
app.post("/getAllAirplanes", (req, res) => {
  connection.query(
    `SELECT *
    FROM Airplane
    WHERE airline_name = ?`,
    [req.body.airline_name],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// ========================
// ========SEARCHING=======
// ========================

// search for a future flight based on the airline name, flight number, departure date, and departure time in the request body
app.post("/searchByFlightNum", (req, res) => {
  // change the req body dept date to sql date format
  let dept_date = req.body.dept_date.split("T")[0];
  connection.query(
    `SELECT *
        FROM Flight
        WHERE airline_name = ?
        AND flight_num = ?
        AND dept_date = ?`,
    [req.body.airline_name, req.body.flight_num, dept_date],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// search by round trip flights based on the departure and arrival airport, the departure and arrival date and time
app.post("/searchByRoundTrip", (req, res) => {
  // change the req body dept date to sql date format
  let dept_date = req.body.dept_date.split("T")[0];
  // Convert dept_date into a string
  let dept_date_string = dept_date.toString();
  let arr_date = req.body.arr_date.split("T")[0];
  // arr_date to string
  let arr_date_string = arr_date.toString();
  connection.query(
    `SELECT *
    FROM Flight
    WHERE dept_airport = ?
    AND arr_airport = ?
    AND dept_date = ?`,
    [req.body.dept_airport, req.body.arr_airport, dept_date_string],
    (err, rows) => {
      if (!err && rows.length > 0) {
        goingAwayFlight = rows[0];
        comingBackStartingAirport = goingAwayFlight.arr_airport;
        comingBackDestinationAirport = goingAwayFlight.dept_airport;
        // search for the return flight
        const goingAwayResult = rows[0];
        connection.query(
          `
          SELECT *
          FROM Flight
            WHERE dept_airport =?
            AND arr_airport = ?
            AND dept_date = ?`,
          [
            comingBackStartingAirport,
            comingBackDestinationAirport,
            arr_date_string,
          ],
          (err, rows) => {
            if (!err && rows.length > 0) {
              const ans = [goingAwayResult, rows[0]];
              res.send(ans);
            } else {
              res.send(err);
              console.log("Hi in first else");
              console.log(err);
            }
          }
        );
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// search one way flights based on the departure and arrival airport, the departur date and time
app.post("/searchByOneWay", (req, res) => {
  // change the req body dept date to sql date format
  let dept_date = req.body.dept_date.split("T")[0];
  connection.query(
    `SELECT *
            FROM Flight
            WHERE dept_airport = ?
            AND arr_airport = ?
            AND dept_date = ?`,
    // AND dept_time = ?
    [req.body.dept_airport, req.body.arr_airport, dept_date],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// get all the flights with specified range of start date and end date and airline
app.post("/searchByDateRange", (req, res) => {
  connection.query(
    `SELECT *
    FROM Flight
    WHERE airline_name = ?
    AND dept_date >= ?
    AND dept_date <= ?`,
    [req.body.airline_name, req.body.start_date, req.body.end_date],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// ========================
// =========POST===========
// ========================

// add a new review to the database
app.post("/addReview", (req, res) => {
  // console.log("REQUEST BODY");
  // console.log(req.body);
  let deptDate = req.body.dptDate.split("T")[0];
  // insert into Feedback table, if there is duplicate entries, send back the error saying already rated
  connection.query(
    `INSERT INTO Feedback (email, flight_num, airline_name, dept_date, dept_time, comment, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.email,
      req.body.flightNum,
      req.body.airlineName,
      deptDate,
      req.body.dptTime,
      req.body.feedback.comment,
      req.body.feedback.rating,
    ],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send({ status: 500, message: "Already rated" });
        // console.log(err.message);
      }
    }
  );
});

// toggle the status of a flight
app.post("/toggleFlightStatus", (req, res) => {
  // console.log(req.body);
  // parse the dept_date to sql date format
  let dept_date = req.body.dept_date.split("T")[0];
  // find the flight and extract the status
  connection.query(
    `SELECT *
    FROM Flight
    WHERE flight_num = ?
    AND airline_name = ?
    AND dept_date = ?
    AND dept_time = ?`,
    [req.body.flight_num, req.body.airline_name, dept_date, req.body.dept_time],
    (err, rows) => {
      if (!err) {
        // console.log(rows);
        // if the status is on time, change it to delayed
        if (rows[0].flight_status == "On-time") {
          connection.query(
            `UPDATE Flight
            SET flight_status = ?
            WHERE flight_num = ?
            AND airline_name = ?
            AND dept_date = ?
            AND dept_time = ?`,
            [
              "Delayed",
              req.body.flight_num,
              req.body.airline_name,
              dept_date,
              req.body.dept_time,
            ],
            (err, rows) => {
              if (!err) {
                res.send("Changed to Delayed");
              } else {
                console.log(err);
              }
            }
          );
        } else {
          // if the status is delayed, change it to on time
          connection.query(
            `UPDATE Flight
            SET flight_status = ?
            WHERE flight_num = ?
            AND airline_name = ?
            AND dept_date = ?
            AND dept_time = ?`,
            [
              "On-time",
              req.body.flight_num,
              req.body.airline_name,
              dept_date,
              req.body.dept_time,
            ],
            (err, rows) => {
              if (!err) {
                res.send("Changed to On Time");
              } else {
                console.log(err);
              }
            }
          );
        }
      } else {
        res.send("Unable to change flight status");
        console.log(err);
      }
    }
  );
});

// add new airport to the database
app.post("/addAirport", (req, res) => {
  connection.query(
    `INSERT INTO Airport
    (airport_code, airport_name, city)
    VALUES (?, ?, ?)`,
    [req.body.airport_code, req.body.airport_name, req.body.city],
    (err, rows) => {
      if (!err) {
        res.send("Added new airport");
      } else {
        res.send("Airport already exists");
        console.log(err);
      }
    }
  );
});

// add new airplane to the database
app.post("/addAirplane", (req, res) => {
  connection.query(
    `INSERT INTO Airplane
    (ID, airline_name, seat_amt)
    VALUES (?, ?, ?)`,
    [req.body.airplane_id, req.body.airline_name, req.body.seat_amt],
    (err, rows) => {
      if (!err) {
        res.send("Added new airplane");
      } else {
        res.send("Airplane already exists");
        console.log(err);
      }
    }
  );
});

// add new flight to the database
app.post("/addFlight", (req, res) => {
  // parse the dept_date to sql date format
  let dept_date = req.body.payload.dept_date.split("T")[0];
  let dept_time = req.body.payload.dept_time.split("T")[1];
  // parse the arr date to sql date format
  let arr_date = req.body.payload.arr_date.split("T")[0];
  let arr_time = req.body.payload.arr_time.split("T")[1];
  // change dept time and arr time to eastern standard time
  let dept_time_eastern = moment(dept_time, "HH:mm:ss")
    .add(-5, "hours")
    .format("HH:mm:ss");
  let arr_time_eastern = moment(arr_time, "HH:mm:ss")
    .add(-5, "hours")
    .format("HH:mm:ss");

  // check if the airports exist
  connection.query(
    `SELECT *
    FROM Airport
    WHERE airport_code = ?`,
    [req.body.payload.dept_airport],
    (err, rows) => {
      if (rows.length == 0) {
        // see if departure airport exists
        res.send("Error: Departure Airport does not exist");
      } else {
        connection.query(
          `SELECT *
          FROM Airport
          WHERE airport_code = ?`,
          [req.body.payload.arr_airport],
          (err, rows) => {
            if (rows.length == 0) {
              // see if arrival airport exists
              res.send("Error: Arrival Airport does not exist");
            } else {
              connection.query(
                `SELECT *
                FROM Airplane
                WHERE ID = ?
                AND airline_name = ?`,
                [
                  req.body.payload.airplane_id,
                  req.body.payload.airplane_airline_name_in_flight,
                ],
                (err, rows) => {
                  if (rows.length == 0) {
                    // see if airplane exists
                    res.send("Error: Airplane does not exist");
                  } else {
                    // if all the checks pass, add the flight
                    connection.query(
                      `INSERT INTO Flight
                    (flight_num, airline_name, dept_airport, arr_airport, dept_date, dept_time, arr_date, arr_time, airplane_id, flight_status, base_price, airplane_airline_name)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                      [
                        req.body.payload.flight_num,
                        req.body.airline_name,
                        req.body.payload.dept_airport,
                        req.body.payload.arr_airport,
                        dept_date,
                        dept_time_eastern,
                        arr_date,
                        arr_time_eastern,
                        req.body.payload.airplane_id,
                        req.body.payload.flight_status,
                        req.body.payload.base_price,
                        req.body.payload.airplane_airline_name_in_flight,
                      ],
                      (err, rows) => {
                        if (!err) {
                          res.send("Added new flight");
                        } else {
                          res.send(
                            "Unable to add the flight, check all your fields and try again"
                          );
                          console.log(err);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running");
});
