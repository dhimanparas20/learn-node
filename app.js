const { execSync } = require('child_process');   // To run Bash Commands
const express = require('express');   // For Webserver 
const morgan = require('morgan');     // For automatically showing port info 
const path = require('path');         // To render public file locations
const bodyParser = require('body-parser'); //for parsing post request

const app = express();
const port = 5000;
const runBash = (command) => {
  try {
    const output = execSync(command, { stdio: 'inherit' });
    if (output !== null) {
      console.log(output.toString());
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
//runBash('clear && ls');

// Use of middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // To parse JSON data
app.use(express.urlencoded({ extended: false })); // To parse URL-encoded data

//Routing
app.get('/', (req, res) => {
  res.send("<h1>This is home page</h1>")
});

app.get('/getdata', (req, res) => {
  res.send("Hello this is data")
});

app.get('/getjson', (req, res) => {
  res.json([{id:1,name:"ABC"},{id:2,name:"CDE"}])
});

app.get('/gethtml', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// To read post requests
app.post('/data', (req, res) => {
  const postData = req.body;
  console.log(postData);
  res.send('Data received successfully');
});


//Starting the WebServer
app.listen(port, () => {
});

