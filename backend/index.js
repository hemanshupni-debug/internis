const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();

const { connect } = require("./db");
const router = require("./Routes/index");

const port = 5000;

// ================= CORS =================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ================= BODY PARSER =================

app.use(bodyparser.json({ limit: "50mb" }));

app.use(
  bodyparser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(express.json());

// ================= ROUTES =================

app.get("/", (req, res) => {
  res.send("hello this is internshala backend");
});

app.use("/api", router);

// ================= DATABASE =================

connect();

// ================= SERVER =================

app.listen(port, () => {
  console.log(
    `Server is running on the port ${port}`
  );
});