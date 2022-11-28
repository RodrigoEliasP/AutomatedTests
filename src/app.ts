import express, { json } from 'express';
import mssql from 'mssql';
import { createMssqlDriverWrapper } from './db/driverWrapper';
import errorMiddleware from './middleware/errorHandler';
import {  setupRoutes } from './routes';
import { testDBConfig } from './tests/testDBConfig';

const app = express();

const setupApp = async () => {
  try { 

    app.use(json());

    console.log('Connecting to database');
  
    const cp = await mssql.connect(testDBConfig);
    const driverWrapper = createMssqlDriverWrapper(cp);
    const router = setupRoutes(driverWrapper);

    console.log('Database connected');

    app.use(router);

    app.use(errorMiddleware)

  } catch (e) {
    console.error('Error setting up database', e);
  }
  
}

export { app, setupApp };