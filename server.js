const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
// add more sequelize dependent code here later like session information

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers })

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening on ' + PORT))
})