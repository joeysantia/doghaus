import createError from "http-errors"
import express from 'express'
import path from 'path'
import cookieParser from "cookie-parser";
import logger from "morgan"
import indexRouter from "./routes/index.js"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from "compression";
import RateLimit from 'express-rate-limit'

const __dirname = path.resolve()
var app = express();

dotenv.config()



mongoose.set("strictQuery", false)
main().catch(err => console.log(err))

async function main() {
  await mongoose.connect(process.env.MONGO_KEY)
}

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60
})

app.use(limiter)
app.use(helmet())
app.use(compression())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
  res.render('error');
});

export default app;
