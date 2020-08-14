
import  Router from 'express';
const authRouter = Router();

import { urlGoogle, loginCallback } from './google-auth.js';

authRouter.get('/auth/google', (req, res) => { res.redirect (urlGoogle())} );
authRouter.get('/callback', loginCallback);

export default authRouter;