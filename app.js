// REQUIRING PACKAGES
const methodOverride = require('method-override'),
      bodyParser     = require('body-parser'),
      express        = require('express'),
      mongoose       = require('mongoose'),
      app            = express();
      require('dotenv').config(); 

const journalRoutes  = require('./routes/journal');


// EXPRESS SET UP
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// MONGOOSE SET UP
// mongoose.connect('mongodb://localhost:27017/journal_app');            //Create a db after watching that 8min video..and put the path of the db here
const URI = process.env.DB_URI
mongoose.connect(URI, {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});

// ROUTES
app.use('/', journalRoutes);

// PORT SET UP
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));