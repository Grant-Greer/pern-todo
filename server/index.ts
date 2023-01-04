import express from "express";
import router from "./routes/api.route";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
