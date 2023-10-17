/* eslint-disable prettier/prettier */
import * as winston from 'winston';
import 'winston-daily-rotate-file';
// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};
// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors);
// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Tell Winston that the logs must be colored
  // winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Log into different File when size exceeds 1 KB

const dailyRotateFile = new winston.transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  maxSize: '1k',
  dirname: 'Logs',
});

const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),
  dailyRotateFile,
  // Allow to print all the error level messages inside the error.log file
  // new winston.transports.File({
  //   filename: 'Logs/error.log',
  //   level: 'error',
  // }),

  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  // new winston.transports.File({ filename: 'Logs/all.log' }),
];

dailyRotateFile.on('new', function(newFilename) {
  // do something fun
  console.log('new--  ');
  console.log('new-File-  ', newFilename);
});

dailyRotateFile.on('rotate', function(oldFilename, newFilename) {
  // do something fun
  console.log('rotate--  ');
  console.log('old-File-  ', oldFilename);
  console.log('new-File-  ', newFilename);
});

dailyRotateFile.on('archive', function(zipFilename) {
  // do something fun
  console.log('archive--  ');
  console.log('zipFilename--  ', zipFilename);
});

dailyRotateFile.on('logRemoved', function(removedFilename) {
  // do something fun
  console.log('logRemoved--  ');
  console.log('removedFilename-  ', removedFilename);
});

// Create the logger instance that has to be exported
// and used to log messages.
export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});