const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/user", require("./routes/auth"));
app.use("/api/post",require("./routes/posts"))


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.log(err));


app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
