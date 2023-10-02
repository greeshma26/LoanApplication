const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

const loansRouter = require('./routes/loanRoutes.js');

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

// 3) ROUTES
app.use('/api/v1/loans', loansRouter);

app.listen(port, () => console.log(`Example app listeneing on port ${port}!`));

module.exports = app;
