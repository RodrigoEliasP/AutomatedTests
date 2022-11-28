
import { app, setupApp } from './app';

const port = 80;


setupApp()

app.listen(port, 'localhost', () => {
  console.log('listening on port', port);
});