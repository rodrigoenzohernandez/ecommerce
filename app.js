var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cartRouter = require('./routes/cart');
var productRouter = require('./routes/products');
var categoriasRouter = require('./routes/categorias');

var apiCategoriasRouter = require('./routes/api/categorias');
var apiProductosRouter = require('./routes/api/productos');
var apiUsersRouter = require('./routes/api/users');
var apiCartsRouter = require('./routes/api/carts');

const session = require('express-session');
const cors = require('./middlewares/cors');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session( {secret: "buahahahaha"}));
app.use(cors);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productCart', cartRouter);
app.use('/products', productRouter);
app.use('/categorias', categoriasRouter);

app.use('/api/categorias', apiCategoriasRouter);
app.use('/api/productos', apiProductosRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/carts', apiCartsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message)
  res.render('error', {error: 'No se encontró el recurso solicitado'});
});

module.exports = app;
