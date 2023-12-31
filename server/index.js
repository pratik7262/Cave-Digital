const express = require("express");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const transactionRoutes = require("./routes/transaction");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());

const connectToMongoDB = require("./db");
const errorHandle = require("./middleware/errorHandler");

app.use(express.json());

app.use(errorHandle);

app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Origin": "*",
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/transaction", transactionRoutes);

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
