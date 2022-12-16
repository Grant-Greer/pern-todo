import express from "express";
import pg from "pg";

const app = express();
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(app.get("port"), () => {
  console.log(`Express server listening on port ${app.get("port")}`);
});
