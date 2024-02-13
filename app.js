const express = require("express");
const loginRoutes = require('./routes/login');
const timeRoutes = require('./routes/time');
const moneyListRoutes = require('./routes/moneyList');
const session = require('express-session')



const app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat92347',
  cookie: {
    maxAge: 60000 * 60 * 24 * 100
  },
  resave: true,
  saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
const port = 3000;


// midleware for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  return next();
});



app.get("/hello", (req, res) => {
  return res.send("Hello World!");
});
app.get('/', (req, res) => {
  let isConnected = false;
  if (req.session.userId) {
    isConnected = true;
  }
  return res.render('index', {isConnected: isConnected});
});
app.use('/login', loginRoutes);
app.use('/time', timeRoutes);
app.get('/logout', (req, res) => {
  return req.session.destroy(() => {
    return res.redirect('/');
  });
});

app.get('/co', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

app.use('/money-list', moneyListRoutes);

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`);
});
