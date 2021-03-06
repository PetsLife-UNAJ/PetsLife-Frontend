const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(__dirname + "/src"));
app.use("js", express.static(path.join(__dirname + "js")));

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

// ---------------------------- STORE ----------------------------
app.use("/add-producto", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/src/pages/store/add-producto.html")
  );
});

app.use("/producto/:id", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/src/pages/store/producto.html")
  );
});

app.use("/store", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/src/pages/store/store.html")
  );
});

// ---------------------------------------------------------------

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/pages/home.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/home`);
});
