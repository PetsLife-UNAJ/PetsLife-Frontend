const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(__dirname + "/src"));

//Ejemplo
app.use("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/pages/home.html"));
});
//
app.use("/add-client", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/src/pages/clinic-history/add-client.html")
  );
});
app.use("/add-mascota", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/src/pages/clinic-history/add-mascota.html")
  );
});

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/pages/home.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/home`);
});
