const express = require("express");
const app = express();
const port = 3000;
const path=require('path');

app.use( express.static(__dirname + '/src'))

//Ejemplo
app.use('/home', (req,res)=>{
  res.sendFile(path.join(__dirname, '/src/pages/home.html'));

}) //

app.use('/', (req,res)=>{
  res.sendFile(path.join(__dirname, '/src/index.html'));

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
