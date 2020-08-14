import google from 'googleapis';
import jwt from 'jsonwebtoken';

const OAuth2 = google.google.auth.OAuth2;

const googleConfig = {
  clientId: process.env.O2AUTH_CLIENT_ID ,
  clientSecret: process.env.O2AUTH_CLIENT_SECRET,
  redirect: process.env.O2AUTH_REDIRECT // this must match google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

// permission requested (just username and mail)
const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
  ];
  

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
 function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

/**
 * Create the google url to be sent to the client.
 */
export function urlGoogle() {

  const auth = createConnection();
  const url = getConnectionUrl(auth);
  
  return url;
}


export function loginCallback(req, res){

    const auth = createConnection();

    if (req.query.error) {
      // The user did not give us permission.
      return res.status(409).send({"error": "Error en login: No concediste los permisos necesarios, porfavor prueba nuevamente"});
    } 

    else {
        auth.getToken(req.query.code, (err, token) => {
          console.log(err);
          console.log(token);
          if (err){
            return res.status(409).send({"error": "Error al procesar, porfavor intenta nuevamente"});
          }
          // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'    
          const jwttoken = jwt.sign(token, process.env.JWT_SECRET, {expiresIn: 30}) // expires in 30 minutes
          return res.send({"token": jwttoken});
      });
    }
  };


export function authMiddleware(req, res, next){
    const token = req.headers['access-token'];

    if(token){
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if(err){
          return res.status(409).send({"error": "Token inválido"});
        }else{
          req.decoded = decoded; 
          next();
        }
      });
    } else{
      res.sendStatus(404);
    }
}
