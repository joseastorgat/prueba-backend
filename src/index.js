'use strict';


import express from 'express';
import models, {sequelize} from './models/index.js';

import router from './routes.js';
import authRouter from './auth/routes.js';

const app = express();

app.use(express.json());
app.use('/', authRouter);
app.use('/', router);


const connectDb = async (retries = 5) => {
  sequelize.sync().then( () => {
    app.listen(process.env.PORT, process.env.HOST);
    console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);
  }).catch( (e) => {
    
    if(retries == 0){
      console.error("Couldnt sync with DB - Goodbye");
      console.error(e);
    }
    else{
      
      console.log(`Couldnt sync :( \n Trying again in 5 seconds - Tries left: ${retries}`);
      setTimeout( () => {connectDb(retries-1)}, 5000 )
  }
  })
}

connectDb();
