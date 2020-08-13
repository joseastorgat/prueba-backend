'use strict';


import express from 'express';
import models, {sequelize} from './models/index.js';

import router from './routes.js';

const PORT = 4999;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());
app.use('/', router);


const connectDb = async (retries = 5) => {
  sequelize.sync().then( () => {
    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
  }).catch( () => {
    
    if(retries === 0){
      console.error("Couldnt sync with DB - Goodbye");
    }
    console.log(`Couldnt sync :( \n Trying again in 5 seconds - Tries left: ${retries}`);
    setTimeout( () => {connectDb(retries)}, 5000 )
  })
}

connectDb();
