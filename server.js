const helpers = require('./utils/helpers');
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const { options } = require('./models/Post');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {maxAge: 300000},
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
//creates helpers
const hbs = exphbs.create({helpers});
//
//register new handlebar function
hbs.handlebars.registerHelper("when", function(num1, num2, options) {
  if(num1 === num2){
    return options.fn(this);
  }
  return options.inverse(this);
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(require('./controllers/'));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});