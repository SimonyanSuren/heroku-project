require('dotenv').config();
//express
const express = require('express');
const app = express();

//packages
require('express-async-error');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

//database
const { sequelize } = require('./src/api/v1/models');

//routers
const routes = require('./src/api/v1/routes/index.route');

//middleware
const notFoundMiddleware = require('./src/api/v1/middleware/notFound.middleware');
const errorHandlerMiddleware = require('./src/api/v1/middleware/errorHandler.middleware');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
); 

app.use(bodyParser.urlencoded({
	extended: true
 }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api/v1', routes);
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connected!');
    app.listen(port, () => {
      console.log(`Server up on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
 