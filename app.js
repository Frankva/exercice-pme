const express = require("express");
const loginRoutes = require('./routes/login');
const timeRoutes = require('./routes/time');
const session = require('express-session')



const app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat92347',
  cookie: {
    maxAge: 60000 * 60 * 24 * 100
  }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
const port = 3000;


// midleware a tout les routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



app.get("/hello", (req, res) => {
  res.send("Hello World!");
});
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
app.use('/login', loginRoutes);
app.use('/time', timeRoutes);

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

const moneyTimeModel = require('./models/MoneyList');
app.get('/money-list/:date?', async (req, res) => {
  const date = req.params.date;
  if (!date) {
    console.log('date undifine');
    const today = new Date().toISOString().slice(0, 10);
    return res.redirect('/money-list/' + today);
  }
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }
  if (! await moneyTimeModel.isAdmin(userId)) {
    return res.redirect('/');
  }
  const selectList = await moneyTimeModel.selectList(date);
  console.log(selectList);
  return res.render('money-list', { 
    selectList: selectList,
    dailyDate: date
  });
});

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`);
});
