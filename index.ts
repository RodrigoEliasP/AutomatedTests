import express, { json } from 'express';
import { router } from './routes';

const app = express();
const port = 80;
app.use(json());
app.use(router);

app.listen(port, 'localhost', () => {
  console.log('all working just fine');
});