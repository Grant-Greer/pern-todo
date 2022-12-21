import express from "express";

const app = express();
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(app.get("port"), () => {
  console.log(`Express server listening on port ${app.get("port")}`);
});
