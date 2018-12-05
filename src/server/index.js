// Express initialization
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Passport configuration
const db = require("../../config/connection");
require("../../services/passport");

// Mongoose Connection
db(process.env.MONGODB_URI || "mongodb://localhost/test");

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static
app.use(express.static("app/build"));

app.use(require("./routes").default);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
  console.log(`Dev app url https://localhost:${PORT}/`);
  console.log(`Dev api url https://localhost:${PORT}/`);
});